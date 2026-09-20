// The Spanish version has to carry the same information as the English one. This
// test fails if any sentence the app shows has no Spanish, or if the "Spanish" is
// just the English text again. (Proper nouns like "California" are allowed.)
import { describe, expect, it } from "vitest";
import { strings } from "../src/i18n/strings";
import { benefits } from "../src/content/benefits";
import { californiaRights } from "../src/content/rights";
import { exitDocuments } from "../src/content/documents";
import { letters } from "../src/content/letters";
import { helpLines } from "../src/content/help";
import { scenes } from "../src/content/story";
import { aboutSections, aboutFooter } from "../src/content/about";

// words that are the same in both languages, or too short to judge ("No", "vs")
const ALLOWED_SAME = new Set(["Before 18", "California", "Federal", "24/7", ""]);
const sameIsFine = (en: string) => ALLOWED_SAME.has(en) || en.length <= 3;

function problems(): string[] {
  const out: string[] = [];
  const walk = (en: unknown, es: unknown, path: string) => {
    if (typeof en === "string") {
      if (typeof es !== "string") out.push(`${path}: missing`);
      else if (es === en && !sameIsFine(en)) out.push(`${path}: same as English`);
      return;
    }
    if (en && typeof en === "object") {
      for (const k of Object.keys(en as object)) walk((en as Record<string, unknown>)[k], (es as Record<string, unknown>)?.[k], `${path}.${k}`);
    }
  };
  walk(strings.en, strings.es, "strings");

  type T = { en: string; es?: string };
  const need = (t: T | string | undefined, where: string) => {
    if (t === undefined) return;
    if (typeof t === "string") { out.push(`${where}: English-only string`); return; }
    if (!t.es || (t.es === t.en && !sameIsFine(t.en))) out.push(`${where}: no Spanish`);
  };
  for (const b of benefits) {
    need(b.name, `${b.id}.name`); need(b.summary, `${b.id}.summary`);
    b.howTo.forEach((h, i) => need(h, `${b.id}.howTo[${i}]`));
    need(b.window.note, `${b.id}.window.note`); need(b.value?.note, `${b.id}.value.note`); need(b.changed, `${b.id}.changed`);
  }
  californiaRights.forEach((r, i) => need(r, `right ${i}`));
  for (const d of exitDocuments) { need(d.name, `${d.id}.name`); need(d.why, `${d.id}.why`); need(d.getIt, `${d.id}.getIt`); need(d.replaceCost, `${d.id}.replaceCost`); }
  for (const l of letters) { need(l.title, `${l.id}.title`); need(l.when, `${l.id}.when`); need(l.to, `${l.id}.to`); need(l.subject, `${l.id}.subject`); need(l.body, `${l.id}.body`); }
  for (const h of helpLines) { need(h.what, `${h.id}.what`); need(h.hours, `${h.id}.hours`); }
  for (const s of scenes) { need(s.title, `story ${s.id}.title`); need(s.month, `story ${s.id}.month`); }
  for (const s of aboutSections) { need(s.title, `about ${s.title.en}`); need(s.body, `about ${s.title.en} body`); }
  need(aboutFooter, "about footer");
  return out;
}

describe("Spanish version", () => {
  it("carries every sentence the English version does", () => {
    expect(problems()).toEqual([]);
  });
});
