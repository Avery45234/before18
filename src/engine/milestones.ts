import type { Timeline, TimelineItem } from "./timeline";
import { dateAtAge, daysBetween } from "./dates";

// The age milestones, in order: at each age, what opens and what ends for this
// person. Built from the same rules as the timeline, so it never disagrees with it.
// Rules that are not available to the person are left out.

export interface Milestone {
  years: number;
  months: number; // 0 for a plain birthday
  date: Date;
  days: number; // from today; negative = already passed
  opens: TimelineItem[];
  closes: TimelineItem[];
}

export function buildMilestones(t: Timeline): Milestone[] {
  const byAge = new Map<string, Milestone>();

  const get = (years: number, months: number): Milestone => {
    const key = `${years}-${months}`;
    let m = byAge.get(key);
    if (!m) {
      const date = dateAtAge(t.birth, years, months);
      m = { years, months, date, days: daysBetween(t.today, date), opens: [], closes: [] };
      byAge.set(key, m);
    }
    return m;
  };

  for (const item of t.items) {
    if (item.status === "ineligible") continue;
    const w = item.benefit.window;
    if (w.opens && w.opens !== "atExit") get(w.opens.years, w.opens.months ?? 0).opens.push(item);
    if (w.closes && w.closes !== "atExit") get(w.closes.years, w.closes.months ?? 0).closes.push(item);
  }

  // always show the 18th birthday, even if nothing is keyed to it for this person
  get(18, 0);

  return Array.from(byAge.values()).sort((a, b) => a.years - b.years || a.months - b.months);
}

// the first milestone that has not passed yet
export function nextMilestone(list: Milestone[]): Milestone | null {
  for (const m of list) if (m.days >= 0) return m;
  return null;
}
