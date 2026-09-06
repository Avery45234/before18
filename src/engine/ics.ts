import type { Timeline } from "./timeline";
import type { Lang } from "../model/profile";
import { toISO } from "./dates";
import { pick } from "../i18n";
import { downloadFile } from "./download";

// Turns the timeline into a calendar file (.ics) the phone can import, so the
// deadlines show up next to everything else in life, with a reminder a week out.
// No server, no account - it is just a text file.
//
// The file format comes from the iCalendar spec. I took the field names and the
// order of the lines from this page and filled in my own values:
// https://icalendar.org/iCalendar-RFC-5545/3-6-1-event-component.html

// dates in the file look like 20270406 (no dashes)
function icsDate(d: Date): string {
  return toISO(d).replace(/-/g, "");
}

// the spec says commas, semicolons, backslashes and line breaks inside text
// must be written with a backslash in front
function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildICS(t: Timeline, lang: Lang): string {
  const lines: string[] = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Before 18//EN", "CALSCALE:GREGORIAN"];
  const stamp = icsDate(new Date()) + "T000000Z";
  let n = 0;
  const add = (on: Date, title: string, desc: string) => {
    n += 1;
    lines.push(
      "BEGIN:VEVENT",
      `UID:before18-${n}-${icsDate(on)}@before18`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(on)}`,
      `SUMMARY:${esc(title)}`,
      `DESCRIPTION:${esc(desc)}`,
      "BEGIN:VALARM",
      "TRIGGER:-P7D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${esc(title)}`,
      "END:VALARM",
      "END:VEVENT",
    );
  };
  const opens = lang === "es" ? "empieza" : "opens";
  const closes = lang === "es" ? "termina" : "closes";
  for (const it of t.items) {
    if (it.status === "ineligible") continue;
    const name = pick(it.benefit.name, lang);
    const how = it.benefit.howTo.map((h) => (typeof h === "string" ? h : pick(h, lang))).join(" ");
    if (it.opensOn && it.daysUntilOpen != null && it.daysUntilOpen > 0) add(it.opensOn, `${name} ${opens}`, how);
    if (it.closesOn && it.daysUntilClose != null && it.daysUntilClose > 0) add(it.closesOn, `${name} ${closes}`, how);
  }
  add(t.eighteenth, lang === "es" ? "Cumples 18 - revisa Before 18" : "You turn 18 - check Before 18", lang === "es" ? "El día que decide Medi-Cal hasta los 26 y el cuidado extendido." : "The day that decides Medi-Cal to 26 and extended foster care.");
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadICS(t: Timeline, lang: Lang): void {
  downloadFile(buildICS(t, lang), "before18.ics", "text/calendar");
}
