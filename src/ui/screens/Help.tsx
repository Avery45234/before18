import { helpLines } from "../../content/help";
import { useLang, useT, pick } from "../../i18n";
import { Button, PageHead, SectionTitle } from "../parts";

// Numbers to call. The list itself is src/content/help.ts.
export function HelpScreen() {
  const t = useT();
  const { lang } = useLang();
  const urgent = helpLines.filter((h) => h.urgent);
  const rest = helpLines.filter((h) => !h.urgent);
  const Line = ({ h }: { h: (typeof helpLines)[number] }) => (
    <li className={`helpline ${h.urgent ? "urgent" : ""}`}>
      <div className="help-name">{h.name}</div>
      <div className="help-what">{pick(h.what, lang)}</div>
      <div className="help-actions">
        {h.phone && <Button size="small" href={`tel:${h.phone.replace(/[^\d+]/g, "")}`}>{t.help.call} {h.phone}</Button>}
        {h.text && <Button size="small" kind="alt" href={`sms:${h.text}`}>{t.help.text} {h.text}</Button>}
        <Button size="small" kind="ghost" href={h.url} external>{t.help.website}</Button>
      </div>
      <div className="help-hours">{h.hours}</div>
    </li>
  );
  return (
    <div className="help">
      <PageHead title={t.help.title} />
      <SectionTitle>{t.help.urgent}</SectionTitle>
      <ul className="helplist">{urgent.map((h) => <Line key={h.id} h={h} />)}</ul>
      <SectionTitle>{t.help.everyone}</SectionTitle>
      <ul className="helplist">{rest.map((h) => <Line key={h.id} h={h} />)}</ul>
    </div>
  );
}
