import { benefits } from "../../content/benefits";
import { aboutSections, extraSources, aboutFooter } from "../../content/about";
import { useLang, useT, pick } from "../../i18n";
import { forgetEverything } from "../../model/profile";
import { Icon } from "../icons";
import { Button, PageHead } from "../parts";

// Words live in src/content/about.ts. This file only lays them out: one card per
// section, the sources list, and the privacy button.
export function AboutScreen() {
  const t = useT();
  const { lang } = useLang();
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
      <PageHead title={t.about.title} lead={t.about.lead} action={<Button size="small" kind="ghost" href="#/why" iconAfter={Icon.arrow()}>{t.why.title}</Button>} />

      {aboutSections.map((s) => (
        <section key={s.title.en} className="about-card">
          <h3>{pick(s.title, lang)}</h3>
          <p>{pick(s.body, lang)}</p>
        </section>
      ))}

      <section className="about-card">
        <h3>{t.timeline.sources}</h3>
        <ul className="sources">
          {sources.map((s) => (
            <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.name}</a> <span className="note">({t.about.checked} {s.retrieved})</span></li>
          ))}
          {extraSources.map((s) => (
            <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.name}</a>{pick(s.note, lang) && <span className="note"> ({pick(s.note, lang)})</span>}</li>
          ))}
        </ul>
      </section>

      <section className="about-card">
        <h3>{t.about.privacy}</h3>
        <p>{t.common.forgetHint}</p>
        <Button kind="ghost" size="small" onClick={() => { forgetEverything(); window.location.hash = "/"; window.location.reload(); }}>{t.common.forget}</Button>
      </section>

      <p className="note">{pick(aboutFooter, lang)}</p>
    </div>
  );
}
