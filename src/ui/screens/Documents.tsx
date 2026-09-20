import { useState } from "react";
import { exitDocuments } from "../../content/documents";
import { useLang, useT, pick } from "../../i18n";
import { Icon } from "../icons";
import { Button, PageHead } from "../parts";

// The exit documents checklist. Each document is one card: the checkbox and the
// name, one line on why it matters, and "where to get it" behind a button.

const KEY = "before18.docs";

function load(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function DocumentsScreen() {
  const t = useT();
  const { lang } = useLang();
  const [have, setHave] = useState<Record<string, boolean>>(load);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => {
    const next = { ...have, [id]: !have[id] };
    setHave(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // fine
    }
  };
  const count = exitDocuments.filter((d) => have[d.id]).length;

  return (
    <div className="documents">
      <PageHead title={t.documents.title} lead={t.documents.intro} action={<Button size="small" icon={Icon.print()} onClick={() => window.print()}>{t.documents.print}</Button>} />
      <div className="order">
        <div className="k">{t.documents.order}</div>
        <ol className="order-steps">{exitDocuments.slice(0, 3).map((d, i) => <li key={d.id}><span>{i + 1}</span> {pick(d.name, lang)}</li>)}</ol>
        <p>{t.documents.orderText}</p>
        <Button size="small" kind="ghost" icon={Icon.mail()} href="#/letters?l=docs">{t.documents.askWriting}</Button>
      </div>
      <div className="progress">
        <div className="progress-bar"><span style={{ width: `${(count / exitDocuments.length) * 100}%` }} /></div>
        <div className="progress-text"><b>{count}</b> / {exitDocuments.length} {t.documents.progress}</div>
      </div>
      <ul className="doclist">
        {exitDocuments.map((d) => (
          <li key={d.id} className={`doc-card ${have[d.id] ? "have" : ""}`}>
            <label className="doc-check">
              <input type="checkbox" checked={!!have[d.id]} onChange={() => toggle(d.id)} />
              <span className="doc-name">{pick(d.name, lang)}</span>
            </label>
            <div className="doc-why">{pick(d.why, lang)}</div>
            <button className="details-toggle" onClick={() => setOpen({ ...open, [d.id]: !open[d.id] })} aria-expanded={!!open[d.id]}>
              {open[d.id] ? t.common.less : t.documents.getIt} <span className={`chev ${open[d.id] ? "open" : ""}`}>{Icon.chevron()}</span>
            </button>
            {open[d.id] && (
              <div className="doc-more">
                <div><b>{t.documents.getIt}:</b> {pick(d.getIt, lang)} <a href={d.url} target="_blank" rel="noreferrer">{t.common.openSite}</a></div>
                <div><b>{t.documents.cost}:</b> {pick(d.replaceCost, lang)}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="print-foot">Before 18 · 42 U.S.C. 675(5)(I) · California Foster Care Ombudsperson 1-877-846-1602</div>
    </div>
  );
}
