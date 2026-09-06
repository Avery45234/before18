// The small uppercase label that starts a section inside a page ("MY PLAN",
// "COMING UP", "BEFORE THE MEETING"). One component so they all match.

export function SectionTitle({ children }: { children: string }) {
  return <div className="section-title">{children}</div>;
}
