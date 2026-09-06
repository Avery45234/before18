import { useState } from "react";
import { exitDocuments } from "../../content/documents";
import { useLang, useT, pick } from "../../i18n";
import { Icon } from "../icons";
import { Button, PageHead } from "../parts";

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
          <li key={d.id} className={have[d.id] ? "have" : ""}>
            <label className="doc-check">
              <input type="checkbox" checked={!!have[d.id]} onChange={() => toggle(d.id)} />
              <span className="doc-name">{pick(d.name, lang)}</span>
            </label>
            <div className="doc-why">{pick(d.why, lang)}</div>
            <div className="doc-get"><b>{t.documents.getIt}:</b> {d.getIt} <a href={d.url} target="_blank" rel="noreferrer">↗</a></div>
            <div className="doc-cost"><b>{t.documents.cost}:</b> {d.replaceCost}</div>
          </li>
        ))}
      </ul>
      <div className="print-foot">Before 18 · 42 U.S.C. 675(5)(I) · California Foster Care Ombudsperson 1-877-846-1602</div>
    </div>
  );
}
