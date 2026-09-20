import { useT } from "../../i18n";
import { Icon } from "../icons";
import { Avatar } from "../parts/Avatar";
import { Button, PageHead } from "../parts";

// "Why I built this", as its own page with one address (#/why) so it is in the
// same place on every screen size: the top menu on desktop, the footer on phones.
// The words are in strings.ts under why.* and home.why1 / home.why2.
const ESSAY = "https://www.today.com/parents/essay/foster-care-aging-out-homelessness-rcna53014";

export function WhyScreen() {
  const t = useT();
  return (
    <div className="why-page">
      <PageHead title={t.why.title} lead={t.why.lead} />

      <div className="who">
        <Avatar name="Avery Updike" size={112} />
        <div>
          <div className="who-name">Avery Updike</div>
          <div className="who-line">{t.why.whoLine}</div>
        </div>
      </div>

      <section className="why-block">
        <h2>{t.why.foundTitle}</h2>
        <p>{t.home.why1}</p>
        <p>{t.home.why2}</p>
        <a className="why-essay" href={ESSAY} target="_blank" rel="noreferrer">{t.why.essay} {Icon.arrow()}</a>
      </section>

      <section className="why-block">
        <h2>{t.why.mattersTitle}</h2>
        <p>{t.why.matters}</p>
      </section>

      <section className="why-block">
        <h2>{t.why.wantTitle}</h2>
        <p>{t.why.want}</p>
      </section>

      <div className="why-links">
        <Button kind="ghost" href="#/voices" iconAfter={Icon.arrow()}>{t.voices.title}</Button>
        <Button kind="ghost" href="#/about" iconAfter={Icon.arrow()}>{t.why.aboutLink}</Button>
      </div>
    </div>
  );
}
