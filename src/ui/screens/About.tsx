import { benefits } from "../../content/benefits";
import { aboutSections, extraSources, aboutFooter } from "../../content/about";
import { useT } from "../../i18n";
import { forgetEverything } from "../../model/profile";
import { Button, PageHead } from "../parts";

// Words live in src/content/about.ts. This file only lays them out.
export function AboutScreen() {
  const t = useT();
  // every source used anywhere in the rules, each one listed once
  const sources: { name: string; url: string; retrieved: string }[] = [];
  for (const b of benefits) {
    for (const src of b.sources) {
      const alreadyListed = sources.some((x) => x.url === src.url);
      if (!alreadyListed) sources.push(src);
    }
  }

  return (
    <div className="about">
      <PageHead title={t.about.title} />

      {aboutSections.map((s) => (
        <section key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </section>
      ))}

      <section>
        <h3>Sources</h3>
        <ul className="sources">
          {sources.map((s) => (
            <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.name}</a> <span className="note">(checked {s.retrieved})</span></li>
          ))}
          {extraSources.map((s) => (
            <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.name}</a>{s.note && <span className="note"> ({s.note})</span>}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Privacy</h3>
        <p>{t.common.forgetHint}</p>
        <Button kind="ghost" size="small" onClick={() => { forgetEverything(); window.location.hash = "/"; window.location.reload(); }}>{t.common.forget}</Button>
      </section>

      <section className="note">{aboutFooter}</section>
    </div>
  );
}
