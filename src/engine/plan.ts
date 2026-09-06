import type { Timeline, TimelineItem } from "./timeline";
import { fmtDate } from "./dates";
import type { Lang } from "../model/profile";
import { pick } from "../i18n";

// "My plan": the handful of things to actually do next, in order, pulled out of the
// full timeline so nobody has to read fourteen cards to find out what to do today.

export interface PlanStep {
  item: TimelineItem;
  urgency: number; // days until the relevant date; lower = sooner
  kind: "closing" | "opening" | "open";
  action: string; // first how-to step
  when: string; // human date line
}

export function buildPlan(t: Timeline, lang: Lang, limit = 3, horizonDays = 240): PlanStep[] {
  const steps: PlanStep[] = [];
  for (const it of t.items) {
    const first = it.benefit.howTo[0];
    const action = typeof first === "string" ? first : pick(first, lang);
    if (it.status === "open" && it.daysUntilClose != null && it.daysUntilClose <= horizonDays) {
      steps.push({ item: it, urgency: it.daysUntilClose, kind: "closing", action, when: `${lang === "es" ? "termina" : "ends"} ${fmtDate(it.closesOn!, lang)}` });
    } else if (it.status === "upcoming" && it.daysUntilOpen != null && it.daysUntilOpen <= horizonDays) {
      steps.push({ item: it, urgency: it.daysUntilOpen + 0.5, kind: "opening", action, when: `${lang === "es" ? "empieza" : "opens"} ${fmtDate(it.opensOn!, lang)}` });
    } else if (it.status === "open" && it.benefit.category !== "rights") {
      steps.push({ item: it, urgency: 1000, kind: "open", action, when: lang === "es" ? "disponible ahora" : "available now" });
    }
  }
  return steps.sort((a, b) => a.urgency - b.urgency).slice(0, limit);
}
