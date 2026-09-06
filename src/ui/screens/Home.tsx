import { useEffect, useState } from "react";
import type { Profile } from "../../model/profile";
import { useT, useLang } from "../../i18n";
import { parseDate, dateAtAge, daysBetween, fmtDate } from "../../engine/dates";
import { voices } from "../../content/voices";
import { promises, HOME_VOICES, PHOTO_CREDIT } from "../../content/home";
import { Icon } from "../icons";
import { Button, Door } from "../parts";

// The home page, built like a goal page: a photograph and one sentence, then the
// promises the law makes and how often they are kept, then real people in their
// own words, then what to do about it.
//
// Words: src/i18n/strings.ts (home.*)   Numbers and sources: src/content/home.ts
// Photo: public/hero.jpg                Quotes: src/content/voices.ts
const BASE = import.meta.env.BASE_URL || "./";

export function Home({ profile }: { profile: Profile | null }) {
  const t = useT();
  const { lang } = useLang();
  const birth = profile?.birthdate ? parseDate(profile.birthdate) : null;
  const d18 = birth ? dateAtAge(birth, 18) : null;
  const days = d18 ? daysBetween(new Date(), d18) : null;
  const [photo, setPhoto] = useState(true);
  // the words for each promise, matched by number to src/content/home.ts
  const promiseTitle = { 1: t.home.p1Title, 2: t.home.p2Title, 3: t.home.p3Title, 4: t.home.p4Title };
  const promiseStat = { 1: t.home.p1Stat, 2: t.home.p2Stat, 3: t.home.p3Stat, 4: t.home.p4Stat };
  const promiseLink = { seeTimelineShort: t.home.seeTimelineShort, seeWhatIf: t.home.seeWhatIf, documents: t.nav.documents, afford: t.afford.title };

  return (
    <div className="home">
      <section className={`hero ${photo ? "has-photo" : ""}`}>
        {photo && <img className="hero-photo" src={`${BASE}hero.jpg`} alt="" onError={() => setPhoto(false)} />}
        <div className="hero-inner">
          <div className="eyebrow">{t.forWho}</div>
          <h1>{t.appName}</h1>
          <p className="lead">{t.tagline}</p>
          {days != null && d18 ? (
            <div className="countdown">
              <div className="cd-label">{days > 0 ? t.home.countdown : t.home.countdownPast}</div>
              {days > 0 ? <div className="cd-num"><Count to={days} /> <span>{t.timeline.days}</span></div> : <div className="cd-date">{fmtDate(d18, lang)}</div>}
              <Button size="big" href="#/timeline" iconAfter={Icon.arrow()}>{t.home.seeTimeline}</Button>
            </div>
          ) : (
            <div className="hero-btns">
              <Button size="big" kind="light" href="#/setup" iconAfter={Icon.arrow()}>{t.start}</Button>
              <Button size="big" kind="outline" href="#/help" icon={Icon.phone()}>{t.helpNow}</Button>
            </div>
          )}
          <p className="fine">{t.noLogin}</p>
        </div>
        {photo && PHOTO_CREDIT && <div className="hero-credit">{PHOTO_CREDIT}</div>}
      </section>

      <div className="home-inner">
        <section className="promises">
          <h2>{t.home.promisesTitle}</h2>
          <p className="section-lead">{t.home.promisesIntro}</p>
          {promises.map((p) => (
            <article key={p.n} className="promise">
              <div className="promise-head">
                <div className="promise-label">{t.home.promise} {p.n}</div>
                <h3>{promiseTitle[p.n]}</h3>
                <div className="promise-law">{p.law}</div>
              </div>
              <div className="promise-stat">
                <div className="stat-n">{p.stat}</div>
                <div className="stat-t">{promiseStat[p.n]}</div>
                <a className="stat-s" href={p.source.url} target="_blank" rel="noreferrer">{p.source.name}</a>
              </div>
              <a className="promise-go" href={p.href}>{promiseLink[p.ctaKey]} {Icon.arrow()}</a>
            </article>
          ))}
        </section>

        <section className="voices-home">
          <h2>{t.home.voicesTitle}</h2>
          <p className="section-lead">{t.home.voicesIntro}</p>
          <div className="voice-grid">
            {voices.slice(0, HOME_VOICES).map((v) => (
              <blockquote key={v.id} className="voice-card">
                <p>“{v.quote}”</p>
                <footer><b>{v.who}</b>, {v.where} · <a href={v.source.url} target="_blank" rel="noreferrer">{v.source.name.split(",")[0]}</a></footer>
              </blockquote>
            ))}
          </div>
          <Button kind="ghost" href="#/voices" iconAfter={Icon.arrow()}>{t.home.voicesAll}</Button>
        </section>

        <section className="asks">
          <h2>{t.home.asksTitle}</h2>
          <div className="doors">
            <Door href="#/setup" icon="calendar" title={t.home.askYouthTitle} text={t.home.askYouthText} />
            <Door href="#/story" icon="book" title={t.home.understandTitle} text={t.home.storyComposite} />
            <Door href="#/flyer" icon="share" title={t.home.helpingTitle} text={t.home.helpingText} />
          </div>
        </section>

        <section className="why">
          <h2>{t.home.whyTitle}</h2>
          <p>{t.home.why1}</p>
          <p>{t.home.why2}</p>
          <div className="why-sig">Avery, 2026</div>
        </section>
      </div>
    </div>
  );
}

// A number that counts up when it appears, because a countdown should feel like one.
// Adapted from the MDN requestAnimationFrame page:
//   https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
// The "ease out" formula is copied from https://easings.net/#easeOutCubic
// Skipping the animation for people who turned off motion:
//   https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
function Count({ to }: { to: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(to); return; }
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <b>{n}</b>;
}
