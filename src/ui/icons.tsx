// A small set of line icons drawn inline, so nothing loads from anywhere and they
// take the current text color. 24x24 grid, 1.75 stroke, rounded caps.

const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const Icon = {
  calendar: () => (
    <svg {...base}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><circle cx="15.5" cy="15.5" r="2" /></svg>
  ),
  branch: () => (
    <svg {...base}><path d="M6 3v12" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>
  ),
  book: () => (
    <svg {...base}><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" /><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z" /></svg>
  ),
  tools: () => (
    <svg {...base}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 13h3M8 16h6" /></svg>
  ),
  phone: () => (
    <svg {...base}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
  ),
  share: () => (
    <svg {...base}><path d="M12 3v12M8 7l4-4 4 4" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /></svg>
  ),
  print: () => (
    <svg {...base}><path d="M7 8V3h10v5" /><rect x="4" y="8" width="16" height="9" rx="2" /><path d="M7 14h10v7H7z" /></svg>
  ),
  check: () => (
    <svg {...base}><path d="M5 12l4 4L19 6" /></svg>
  ),
  arrow: () => (
    <svg {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
  chevron: () => (
    <svg {...base}><path d="M9 6l6 6-6 6" /></svg>
  ),
  alert: () => (
    <svg {...base}><path d="M12 3l10 18H2z" /><path d="M12 10v5M12 18h.01" /></svg>
  ),
  money: () => (
    <svg {...base}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  health: () => (
    <svg {...base}><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" /></svg>
  ),
  home: () => (
    <svg {...base}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>
  ),
  school: () => (
    <svg {...base}><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></svg>
  ),
  document: () => (
    <svg {...base}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></svg>
  ),
  rights: () => (
    <svg {...base}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
  ),
  mail: () => (
    <svg {...base}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
  ),
  globe: () => (
    <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></svg>
  ),
};

export type IconName = keyof typeof Icon;
