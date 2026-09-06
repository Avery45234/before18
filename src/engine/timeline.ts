import type { Profile } from "../model/profile";
import { benefits, type Benefit, type Requirement } from "../content/benefits";
import { ageOn, dateAtAge, daysBetween, parseDate } from "./dates";

// Turns the rules plus one person's facts into a dated timeline: what is open for
// you right now, what opens next and when, what closes and when, and what you are
// not eligible for (and why). Pure function, no UI, tested.

export type Status = "open" | "upcoming" | "closed" | "ineligible" | "unsure";

export interface TimelineItem {
  benefit: Benefit;
  status: Status;
  opensOn: Date | null; // null = no age gate / at exit
  closesOn: Date | null;
  daysUntilOpen: number | null;
  daysUntilClose: number | null;
  requirements: Requirement[];
  blockedBy: Requirement[]; // requirements that are definitely not met
  unsureOn: Requirement[]; // requirements we could not tell
}

export interface Timeline {
  today: Date;
  birth: Date;
  age: { years: number; months: number; days: number };
  eighteenth: Date;
  daysTo18: number;
  items: TimelineItem[];
}

function ageDate(birth: Date, spec: { years: number; months?: number } | "atExit" | undefined): Date | null {
  if (!spec || spec === "atExit") return null;
  return dateAtAge(birth, spec.years, spec.months ?? 0);
}

export function buildTimeline(profile: Profile, today = new Date()): Timeline | null {
  const birth = parseDate(profile.birthdate);
  if (!birth) return null;
  const age = ageOn(birth, today);
  const eighteenth = dateAtAge(birth, 18);

  const items: TimelineItem[] = benefits.map((b) => {
    const opensOn = ageDate(birth, b.window.opens);
    const closesOn = ageDate(birth, b.window.closes);
    const reqs = b.requirements(profile);
    const blockedBy = reqs.filter((r) => r.ok === false);
    const unsureOn = reqs.filter((r) => r.ok === "unsure");

    let status: Status;
    if (blockedBy.length) status = "ineligible";
    else if (closesOn && daysBetween(today, closesOn) < 0) status = "closed";
    else if (opensOn && daysBetween(today, opensOn) > 0) status = "upcoming";
    else if (unsureOn.length) status = "unsure";
    else status = "open";

    return {
      benefit: b,
      status,
      opensOn,
      closesOn,
      daysUntilOpen: opensOn ? daysBetween(today, opensOn) : null,
      daysUntilClose: closesOn ? daysBetween(today, closesOn) : null,
      requirements: reqs,
      blockedBy,
      unsureOn,
    };
  });

  return { today, birth, age, eighteenth, daysTo18: daysBetween(today, eighteenth), items };
}

// the next few dates that matter, soonest first (for the "coming up" strip)
export function upcomingDeadlines(t: Timeline, limit = 4): { item: TimelineItem; on: Date; kind: "opens" | "closes"; days: number }[] {
  const out: { item: TimelineItem; on: Date; kind: "opens" | "closes"; days: number }[] = [];
  for (const it of t.items) {
    if (it.status === "ineligible") continue;
    if (it.opensOn && it.daysUntilOpen != null && it.daysUntilOpen > 0) out.push({ item: it, on: it.opensOn, kind: "opens", days: it.daysUntilOpen });
    if (it.closesOn && it.daysUntilClose != null && it.daysUntilClose > 0) out.push({ item: it, on: it.closesOn, kind: "closes", days: it.daysUntilClose });
  }
  return out.sort((a, b) => a.days - b.days).slice(0, limit);
}
