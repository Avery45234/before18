import { californiaRights } from "../../content/rights";
import { useLang, useT, pick } from "../../i18n";
import { Icon } from "../icons";
import { Button, PageHead } from "../parts";

// The rights card. The rights themselves are src/content/rights.ts.
export function RightsScreen() {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className="rights">
      <PageHead title={t.rights.title} lead={t.rights.intro} action={<Button size="small" icon={Icon.print()} onClick={() => window.print()}>{t.rights.print}</Button>} />
      <ol className="rights-list">
        {californiaRights.map((r, i) => (
          <li key={i}>
            <div className="right-text">{pick(r, lang)}</div>
            <a className="right-law" href={r.url} target="_blank" rel="noreferrer">{t.rights.law}: {r.law}</a>
          </li>
        ))}
      </ol>
      <div className="ignored">
        <div className="k">{t.rights.ignored}</div>
        <ol>
          <li>{t.rights.ignored1}</li>
          <li>{t.rights.ignored2} <a href="tel:18778461602">1-877-846-1602</a></li>
          <li>{t.rights.ignored3} <a href="#/letters?l=complaint">{t.letters.title} {Icon.arrow()}</a></li>
        </ol>
      </div>
      <div className="print-foot">Before 18 · fosteryouthhelp.ca.gov · California Foster Care Ombudsperson 1-877-846-1602</div>
    </div>
  );
}
