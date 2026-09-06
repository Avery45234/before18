// Date math for birthdays. Kept tiny and tested, because "the day before your 18th
// birthday" is the difference between having health coverage until 26 and not.

export interface Age {
  years: number;
  months: number;
  days: number;
}

export function parseDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (isNaN(d.getTime())) return null;
  return d;
}

export function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// the date you turn `years` (and optional extra months) old
export function dateAtAge(birth: Date, years: number, months = 0): Date {
  const d = new Date(birth.getFullYear() + years, birth.getMonth() + months, birth.getDate());
  // Feb 29 birthdays roll to Mar 1 in non-leap years, which is what agencies do too
  return d;
}

export function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

export function ageOn(birth: Date, on: Date): Age {
  let years = on.getFullYear() - birth.getFullYear();
  let months = on.getMonth() - birth.getMonth();
  let days = on.getDate() - birth.getDate();
  if (days < 0) {
    months -= 1;
    // days in the month before `on`
    const prev = new Date(on.getFullYear(), on.getMonth(), 0).getDate();
    days += prev;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export function daysBetween(a: Date, b: Date): number {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(ms / 86400000);
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// Writes a date the way each language writes it ("April 6, 2027", "6 de abril de 2027").
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
const LOCALE: Record<string, string> = { en: "en-US", es: "es-US", vi: "vi-VN", zh: "zh-CN" };
export function fmtDate(d: Date, lang = "en"): string {
  return d.toLocaleDateString(LOCALE[lang] ?? "en-US", { year: "numeric", month: "long", day: "numeric" });
}
