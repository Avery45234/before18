// Spanish audit. Prints every place the Spanish version is missing or is just the
// English text again. Run with:  npx vite-node scripts/es-audit.ts
import { strings } from "../src/i18n/strings";
import { benefits } from "../src/content/benefits";
import { californiaRights } from "../src/content/rights";
import { exitDocuments } from "../src/content/documents";
import { letters } from "../src/content/letters";
import { helpLines } from "../src/content/help";
import { scenes } from "../src/content/story";

const same: string[] = [];
function walk(en: unknown, es: unknown, path: string) {
  if (typeof en === "string") {
    if (typeof es !== "string" || es.trim() === "") same.push(`${path}: MISSING`);
    else if (es === en && en.length > 3 && !/^[A-Z0-9 .$-]+$/.test(en)) same.push(`${path}: SAME AS ENGLISH "${en.slice(0, 50)}"`);
    return;
  }
  if (en && typeof en === "object") {
    for (const k of Object.keys(en as object)) walk((en as Record<string, unknown>)[k], (es as Record<string, unknown>)?.[k], `${path}.${k}`);
  }
}
walk(strings.en, strings.es, "strings");

type T = { en: string; es?: string };
const missing: string[] = [];
const need = (t: T | string | undefined, where: string) => {
  if (t === undefined) return;
  if (typeof t === "string") { missing.push(`${where}: plain English string "${t.slice(0, 50)}"`); return; }
  if (!t.es) missing.push(`${where}: no es "${t.en.slice(0, 50)}"`);
};
for (const b of benefits) {
  need(b.name, `benefit ${b.id}.name`);
  need(b.summary, `benefit ${b.id}.summary`);
  b.howTo.forEach((h, i) => need(h, `benefit ${b.id}.howTo[${i}]`));
  if (b.window.note) missing.push(`benefit ${b.id}.window.note: plain English "${b.window.note.slice(0, 40)}"`);
  if (b.value?.note) missing.push(`benefit ${b.id}.value.note: plain English "${b.value.note.slice(0, 40)}"`);
  if (b.changed) missing.push(`benefit ${b.id}.changed: plain English "${b.changed.slice(0, 40)}"`);
}
californiaRights.forEach((r, i) => need(r, `right ${i}`));
for (const d of exitDocuments) { need(d.name, `doc ${d.id}.name`); need(d.why, `doc ${d.id}.why`); need(d.getIt, `doc ${d.id}.getIt`); need(d.replaceCost, `doc ${d.id}.replaceCost`); }
for (const l of letters) { need(l.title, `letter ${l.id}.title`); need(l.when, `letter ${l.id}.when`); need(l.to, `letter ${l.id}.to`); need(l.subject, `letter ${l.id}.subject`); need(l.body, `letter ${l.id}.body`); }
for (const h of helpLines) { need(h.what, `help ${h.id}.what`); need(h.hours, `help ${h.id}.hours`); }
for (const s of scenes) { need(s.title, `story ${s.id}.title`); need(s.month, `story ${s.id}.month`); }

console.log(`\n== strings.ts: ${same.length} problems`);
same.forEach((x) => console.log("  " + x));
console.log(`\n== content: ${missing.length} problems`);
missing.forEach((x) => console.log("  " + x));
