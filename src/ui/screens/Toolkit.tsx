import { useT } from "../../i18n";
import type { IconName } from "../icons";
import { Door, PageHead, SectionTitle } from "../parts";

// The toolkit hub, sorted by the moment you need each thing. To add a tool: add a
// line to the right group below, and its words to strings.ts (toolkit.*).
export function ToolkitScreen() {
  const t = useT();
  type Tool = { href: string; icon: IconName; title: string; text: string };
  const groups: { title: string; tools: Tool[] }[] = [
    { title: t.toolkit.before, tools: [
      { href: "#/meeting", icon: "check", title: t.meeting.title, text: t.toolkit.meeting },
      { href: "#/rights", icon: "rights", title: t.nav.rights, text: t.toolkit.rights },
    ] },
    { title: t.toolkit.signing, tools: [
      { href: "#/documents", icon: "document", title: t.nav.documents, text: t.toolkit.documents },
      { href: "#/letters", icon: "mail", title: t.letters.title, text: t.toolkit.letters },
    ] },
    { title: t.toolkit.after, tools: [
      { href: "#/afford", icon: "money", title: t.afford.title, text: t.toolkit.afford },
      { href: "#/help", icon: "phone", title: t.nav.help, text: t.toolkit.help },
    ] },
    { title: t.toolkit.others, tools: [
      { href: "#/share", icon: "share", title: t.share.title, text: t.toolkit.share },
      { href: "#/flyer", icon: "print", title: t.share.flyer, text: t.toolkit.flyer },
    ] },
  ];
  return (
    <div className="toolkit">
      <PageHead title={t.nav.toolkit} lead={t.toolkit.intro} />
      {groups.map((g) => (
        <section key={g.title} className="tool-group">
          <SectionTitle>{g.title}</SectionTitle>
          <div className="doors">
            {g.tools.map((x) => <Door key={x.href} href={x.href} icon={x.icon} title={x.title} text={x.text} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
