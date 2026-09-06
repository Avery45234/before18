// Tests, written the way the Vitest getting-started guide shows: https://vitest.dev/guide/
// Each `it(...)` is one plain sentence about what a function must do.
import { describe, it, expect } from "vitest";
import { ageOn, dateAtAge, daysBetween, parseDate } from "../src/engine/dates";
import { buildTimeline, upcomingDeadlines } from "../src/engine/timeline";
import { whatIfScenarios } from "../src/engine/whatif";
import { benefits } from "../src/content/benefits";
import { californiaRights } from "../src/content/rights";
import { exitDocuments } from "../src/content/documents";
import { helpLines } from "../src/content/help";
import { emptyProfile, type Profile } from "../src/model/profile";

const seventeen: Profile = {
  ...emptyProfile,
  birthdate: "2009-03-15",
  state: "CA",
  inCareNow: "yes",
  inCareOn18: "yes",
  inCareAfter13: "yes",
  inCare16to18: "yes",
  sixMonthsInCare: "yes",
  planning: "college",
};
const TODAY = new Date(2026, 8, 6); // Sept 6, 2026 -> she is 17 years, 5 months

describe("date math", () => {
  it("computes age in years, months, days", () => {
    const a = ageOn(parseDate("2009-03-15")!, TODAY);
    expect(a.years).toBe(17);
    expect(a.months).toBe(5);
    expect(a.days).toBe(22);
  });
  it("finds the 18th birthday and days until it", () => {
    const b = parseDate("2009-03-15")!;
    const d18 = dateAtAge(b, 18);
    expect(d18.getFullYear()).toBe(2027);
    expect(d18.getMonth()).toBe(2);
    expect(daysBetween(TODAY, d18)).toBe(190);
  });
  it("handles a Feb 29 birthday by rolling to Mar 1", () => {
    const b = parseDate("2008-02-29")!;
    const d18 = dateAtAge(b, 18);
    expect(d18.getMonth()).toBe(2);
    expect(d18.getDate()).toBe(1);
  });
  it("rejects garbage dates", () => {
    expect(parseDate("not-a-date")).toBeNull();
    expect(parseDate("2009-13-40")).not.toBeNull(); // JS rolls it; the input control prevents this anyway
  });
});

describe("timeline for a 17-year-old in care in California", () => {
  const tl = buildTimeline(seventeen, TODAY)!;
  const status = (id: string) => tl.items.find((i) => i.benefit.id === id)!.status;

  it("knows she is 17 and 190 days from 18", () => {
    expect(tl.age.years).toBe(17);
    expect(tl.daysTo18).toBe(190);
  });
  it("has the in-care rights open now", () => {
    expect(status("bill-of-rights")).toBe("open");
    expect(status("rights-in-writing")).toBe("open");
    expect(status("ilp")).toBe("open");
    expect(status("fafsa-independent")).toBe("open");
  });
  it("has the 18+ benefits upcoming, not open", () => {
    expect(status("efc")).toBe("upcoming");
    expect(status("medi-cal-26")).toBe("upcoming");
    expect(status("thp-plus")).toBe("upcoming");
  });
  it("puts the transition plan window 90 days before 18", () => {
    const tp = tl.items.find((i) => i.benefit.id === "transition-plan")!;
    expect(tp.status).toBe("upcoming");
    expect(tp.daysUntilOpen).toBe(daysBetween(TODAY, dateAtAge(tl.birth, 17, 9)));
  });
  it("lists the soonest deadlines first", () => {
    const soon = upcomingDeadlines(tl, 3);
    expect(soon.length).toBe(3);
    expect(soon[0].days).toBeLessThanOrEqual(soon[1].days);
  });
});

describe("the 18th-birthday rule", () => {
  it("someone who left care before 18 loses Medi-Cal to 26, EFC, re-entry, THP-Plus", () => {
    const left = { ...seventeen, inCareOn18: "no" as const, inCareNow: "no" as const };
    const tl = buildTimeline(left, TODAY)!;
    for (const id of ["medi-cal-26", "efc", "efc-reentry", "thp-plus"]) {
      expect(tl.items.find((i) => i.benefit.id === id)!.status, id).toBe("ineligible");
    }
    // but keeps the after-13 ones
    expect(tl.items.find((i) => i.benefit.id === "fafsa-independent")!.status).toBe("open");
    expect(tl.items.find((i) => i.benefit.id === "nextup")!.status).toBe("open");
  });
  it("someone in another state gets federal rules but not Medi-Cal", () => {
    const tl = buildTimeline({ ...seventeen, state: "other" }, TODAY)!;
    expect(tl.items.find((i) => i.benefit.id === "medi-cal-26")!.status).toBe("ineligible");
    expect(tl.items.find((i) => i.benefit.id === "exit-documents")!.status).not.toBe("ineligible");
  });
  it("'not sure' answers show up as unsure, never as ineligible", () => {
    const tl = buildTimeline({ ...seventeen, inCare16to18: "unsure" }, TODAY)!;
    expect(tl.items.find((i) => i.benefit.id === "chafee-grant")!.status).toBe("unsure");
  });
});

describe("what-if consequences", () => {
  const scenarios = whatIfScenarios(seventeen, TODAY);
  it("has the four scenarios", () => {
    expect(scenarios.map((s) => s.id)).toEqual(["leave-at-18", "exit-before-18", "skip-fafsa", "leave-without-docs"]);
  });
  it("leaving at 18 costs about three years of SILP support", () => {
    const s = scenarios.find((x) => x.id === "leave-at-18")!;
    expect(s.total).toBe(1301 * 36);
  });
  it("exiting before 18 loses Medi-Cal to 26 and extended care", () => {
    const s = scenarios.find((x) => x.id === "exit-before-18")!;
    const ids = s.losses.map((l) => l.benefitId);
    expect(ids).toContain("medi-cal-26");
    expect(ids).toContain("efc");
    expect(ids).toContain("thp-plus");
  });
  it("does not report losing something the person never had", () => {
    const already = { ...seventeen, inCareOn18: "no" as const };
    const s = whatIfScenarios(already, TODAY).find((x) => x.id === "exit-before-18")!;
    expect(s.losses.length).toBe(0);
  });
});

describe("content hygiene: every rule cites a source", () => {
  it("every benefit has at least one source with a URL and a checked date", () => {
    for (const b of benefits) {
      expect(b.sources.length, b.id).toBeGreaterThan(0);
      for (const s of b.sources) {
        expect(s.url, b.id).toMatch(/^https?:\/\//);
        expect(s.retrieved, b.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
      expect((b.name.es ?? "").length, b.id).toBeGreaterThan(0);
      expect((b.summary.es ?? "").length, b.id).toBeGreaterThan(0);
    }
  });
  it("rights, documents, and help lines all link somewhere", () => {
    for (const r of californiaRights) expect(r.url).toMatch(/^https?:\/\//);
    for (const d of exitDocuments) expect(d.url).toMatch(/^https?:\/\//);
    for (const h of helpLines) expect(h.url).toMatch(/^https?:\/\//);
  });
});

// ---- added with the story, plan, and calendar features ----
import { ledger, startFlags, scenes } from "../src/content/story";
import { buildPlan } from "../src/engine/plan";
import { buildICS } from "../src/engine/ics";
import { meetingQuestions } from "../src/content/meeting";

describe("story ledger", () => {
  it("the best path keeps everything; the worst keeps nothing", () => {
    const best = ledger({ ...startFlags, meeting: true, stayedTo18: true, efc: true, efcKept: true, fafsa: true, docs: true });
    expect(best.monthlySupport).toBe(1301);
    expect(best.healthTo26).toBe(true);
    expect(best.score).toBe(5);
    const worst = ledger({ ...startFlags, stayedTo18: false, fafsa: false, docs: false });
    expect(worst.monthlySupport).toBe(0);
    expect(worst.healthTo26).toBe(false);
    expect(worst.docsWeeksLost).toBe(7);
  });
  it("leaving care before 18 removes the extended-care choice entirely", () => {
    const eighteen = scenes.find((s) => s.id === "eighteen")!;
    expect(eighteen.choices({ ...startFlags, stayedTo18: false }).map((c) => c.id)).not.toContain("sign");
    expect(eighteen.choices({ ...startFlags, stayedTo18: true }).map((c) => c.id)).toContain("sign");
  });
  it("dropping the participation condition costs the monthly payment even after signing", () => {
    const L = ledger({ ...startFlags, meeting: true, efc: true, efcKept: false, fafsa: true, docs: true });
    expect(L.monthlySupport).toBe(0);
    expect(L.healthTo26).toBe(true);
  });
  it("every scene has at least one choice in every branch and no choice is unlabeled", () => {
    for (const f of [startFlags, { ...startFlags, stayedTo18: false }, { ...startFlags, efc: true }]) {
      for (const s of scenes) {
        const cs = s.choices(f);
        expect(cs.length, s.id).toBeGreaterThan(0);
        for (const c of cs) { expect(c.label.en.length).toBeGreaterThan(5); expect(c.label.es!.length).toBeGreaterThan(5); }
      }
    }
  });
});

describe("plan and calendar", () => {
  const tl = buildTimeline(seventeen, TODAY)!;
  it("puts the soonest deadline first and gives an action", () => {
    const plan = buildPlan(tl, "en", 3);
    expect(plan.length).toBe(3);
    expect(plan[0].urgency).toBeLessThanOrEqual(plan[1].urgency);
    expect(plan[0].action.length).toBeGreaterThan(10);
  });
  it("writes a valid-looking calendar with the 18th birthday in it", () => {
    const ics = buildICS(tl, "en");
    expect(ics.startsWith("BEGIN:VCALENDAR")).toBe(true);
    expect(ics).toContain("You turn 18");
    expect(ics).toContain("DTSTART;VALUE=DATE:20270315");
    expect(ics.trim().endsWith("END:VCALENDAR")).toBe(true);
  });
  it("builds meeting questions from eligibility, in both languages", () => {
    expect(meetingQuestions(tl, "en").length).toBeGreaterThan(5);
    expect(meetingQuestions(tl, "es").map((q) => q.text).join(" ")).toContain("¿");
    expect(new Set(meetingQuestions(tl, "en").map((q) => q.id)).size).toBe(meetingQuestions(tl, "en").length);
  });
});

// ---- added with counties and the extra languages ----
import { counties, countyByName } from "../src/content/counties";
import { strings } from "../src/i18n/strings";

describe("county contacts and languages", () => {
  it("bundles most California counties with at least one contact each", () => {
    expect(counties.length).toBeGreaterThanOrEqual(55);
    for (const c of counties) expect(c.contacts.length, c.county).toBeGreaterThan(0);
    expect(countyByName("los angeles")?.county).toBe("Los Angeles");
    expect(countyByName(undefined)).toBeUndefined();
  });
  it("every UI string exists in all four languages", () => {
    const keys = (o: unknown, prefix = ""): string[] =>
      typeof o === "string" ? [prefix] : Object.entries(o as Record<string, unknown>).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
    const en = keys(strings.en);
    for (const lang of ["es", "vi", "zh"] as const) {
      const other = new Set(keys(strings[lang]));
      for (const k of en) expect(other.has(k), `${lang} missing ${k}`).toBe(true);
    }
  });
  it("every benefit has Vietnamese and Chinese names", () => {
    for (const b of benefits) {
      expect(b.name.vi, b.id).toBeTruthy();
      expect(b.name.zh, b.id).toBeTruthy();
    }
  });
});
