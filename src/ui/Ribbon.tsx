import type { Timeline } from "../engine/timeline";
import { useLang } from "../i18n";

// The life ribbon: ages 14 to 26 across the top, a bar for each benefit showing when
// it is open, and a marker for today. One glance says "this is what is still ahead".
// Drawn with SVG shapes (rect, line, text, circle). I learned SVG from
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch
const A0 = 14;
const A1 = 26;

export function Ribbon({ t }: { t: Timeline }) {
  const { lang } = useLang();
  const W = 1000;
  const PAD = 22; // room so the "14" and "26" labels do not clip at the edges
  // turn an age into a position across the drawing (14 = left edge, 26 = right edge)
  const x = (age: number) => {
    const clamped = Math.max(A0, Math.min(A1, age));
    return PAD + ((clamped - A0) / (A1 - A0)) * (W - 2 * PAD);
  };
  const ageNow = t.age.years + t.age.months / 12 + t.age.days / 365;

  const rows = t.items
    .filter((i) => i.status !== "ineligible" && i.status !== "closed")
    .filter((i) => i.opensOn || i.closesOn)
    .map((i) => {
      const open = i.benefit.window.opens && i.benefit.window.opens !== "atExit" ? i.benefit.window.opens.years + (i.benefit.window.opens.months ?? 0) / 12 : A0;
      const close = i.benefit.window.closes && i.benefit.window.closes !== "atExit" ? i.benefit.window.closes.years + (i.benefit.window.closes.months ?? 0) / 12 : A1;
      return { id: i.benefit.id, name: i.benefit.name[lang], open, close, cat: i.benefit.category };
    })
    .sort((a, b) => a.open - b.open || a.close - b.close);

  const rowH = 22;
  const top = 34;
  const H = top + rows.length * rowH + 10;

  return (
    <div className="ribbon-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="ribbon" role="img" aria-label="Timeline from 14 to 26">
        {/* age ticks */}
        {Array.from({ length: A1 - A0 + 1 }).map((_, k) => {
          const a = A0 + k;
          return (
            <g key={a}>
              <line x1={x(a)} y1={22} x2={x(a)} y2={H} stroke="rgba(23,32,42,0.12)" strokeWidth={a === 18 ? 2 : 1} />
              <text x={x(a)} y={14} textAnchor="middle" fontSize={13} fontWeight={a === 18 || a === 21 || a === 26 ? 800 : 500} fill="var(--ink)">{a}</text>
            </g>
          );
        })}
        {/* bars */}
        {rows.map((r, k) => {
          const y = top + k * rowH;
          const x1 = x(r.open);
          const x2 = x(r.close);
          return (
            <g key={r.id}>
              <rect x={x1} y={y} width={Math.max(6, x2 - x1)} height={rowH - 6} rx={6} className={`rb rb-${r.cat}`} />
              <text x={x1 + 8} y={y + rowH - 10} fontSize={12} fill="var(--ink)" fontWeight={600}>{r.name}</text>
            </g>
          );
        })}
        {/* today */}
        <line x1={x(ageNow)} y1={20} x2={x(ageNow)} y2={H} stroke="var(--primary)" strokeWidth={3} />
        <circle cx={x(ageNow)} cy={20} r={6} fill="var(--primary)" className="pulse-dot" />
      </svg>
    </div>
  );
}
