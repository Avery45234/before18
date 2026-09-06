import { useEffect, useMemo, useState } from "react";
import { scenes, startFlags, ledger, epilogue, type Flags, type Choice, SILP, PELL, CHAFEE } from "../../content/story";
import { useLang, useT, pick, missing } from "../../i18n";
import { Button } from "../parts";

// The story screen. One month at a time, a choice, what happened and the real rule
// behind it, then the next month. You can move back and forth between the months
// you have reached, and change an answer - later months are rebuilt from the
// choices before them, because a different February changes June.

const KEY = "before18.story";

// what the world looks like after the first n choices
function replay(ids: string[]): { flags: Flags; choices: Choice[] } {
  let flags = { ...startFlags };
  const choices: Choice[] = [];
  ids.forEach((id, k) => {
    const c = scenes[k]?.choices(flags).find((x) => x.id === id);
    if (!c) return;
    choices.push(c);
    flags = { ...flags, ...c.effects };
  });
  return { flags, choices };
}

function load(): { ids: string[]; i: number } {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const v = JSON.parse(raw) as { ids: string[]; i: number };
      if (Array.isArray(v.ids)) return { ids: v.ids.slice(0, scenes.length), i: Math.min(v.i ?? 0, v.ids.length) };
    }
  } catch { /* fresh start */ }
  return { ids: [], i: 0 };
}

export function StoryScreen() {
  const t = useT();
  const { lang } = useLang();
  const [saved] = useState(load);
  const [ids, setIds] = useState<string[]>(saved.ids); // choice id per month, in order
  const [i, setI] = useState<number>(saved.i); // the month on screen; scenes.length = the ending

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ ids, i })); } catch { /* fine */ }
  }, [ids, i]);

  // flags going INTO month i, and the choice already made there (if any)
  // useMemo = remember the result until the inputs change (https://react.dev/reference/react/useMemo)
  const before = useMemo(() => replay(ids.slice(0, i)), [ids, i]);
  const made = useMemo(() => (ids[i] ? replay(ids.slice(0, i + 1)).choices[i] ?? null : null), [ids, i]);
  const reached = ids.length; // months you can jump to: 0..reached (and the ending once all are answered)
  const englishOnly = missing(scenes[0].title, lang);

  const goTo = (k: number) => { setI(k); window.scrollTo(0, 0); };
  const choose = (c: Choice) => setIds([...ids.slice(0, i), c.id]); // later answers are dropped: the branch changed
  const changeAnswer = () => setIds(ids.slice(0, i));
  const restart = () => { setIds([]); setI(0); window.scrollTo(0, 0); };

  const Tabs = () => (
    <div className="story-tabs" role="tablist" aria-label={t.story.months}>
      {scenes.map((s, k) => {
        const can = k <= reached;
        const cls = k < ids.length ? "done" : k === i ? "now" : "";
        return (
          <button key={s.id} role="tab" aria-selected={k === i} className={`story-tab ${cls} ${k === i ? "on" : ""}`} disabled={!can} onClick={() => goTo(k)} title={pick(s.month, lang)}>
            <span className="story-tab-bar" />
            <span className="story-tab-label">{pick(s.month, lang).slice(0, 3)}</span>
          </button>
        );
      })}
      <button role="tab" aria-selected={i === scenes.length} className={`story-tab ${i === scenes.length ? "on now" : ""}`} disabled={ids.length < scenes.length} onClick={() => goTo(scenes.length)} title={t.story.endTitle}>
        <span className="story-tab-bar" />
        <span className="story-tab-label">19</span>
      </button>
    </div>
  );

  const Nav = ({ next }: { next: boolean }) => (
    <div className="story-nav">
      <Button kind="ghost" size="small" disabled={i === 0} onClick={() => goTo(i - 1)}>{t.story.back}</Button>
      {next && <Button size="small" onClick={() => goTo(i + 1)}>{i + 1 < scenes.length ? t.story.next : t.story.seeHow}</Button>}
    </div>
  );

  // ---- the ending
  if (i >= scenes.length) {
    const flags = replay(ids).flags;
    const L = ledger(flags);
    const best = ledger({ ...startFlags, meeting: true, stayedTo18: true, efc: true, efcKept: true, fafsa: true, docs: true });
    return (
      <div className="story">
        <Tabs />
        <div className="story-age">{t.story.nineteen}</div>
        <h1>{t.story.endTitle}</h1>
        <p className="story-text">{pick(epilogue(flags), lang)}</p>
        <div className="ledger">
          <Row label={t.story.monthly} you={`$${L.monthlySupport.toLocaleString()}`} best={`$${best.monthlySupport.toLocaleString()}`} good={L.monthlySupport > 0} />
          <Row label={t.story.school} you={`$${L.schoolMoneyPerYear.toLocaleString()}`} best={`$${best.schoolMoneyPerYear.toLocaleString()}`} good={L.schoolMoneyPerYear > 0} />
          <Row label={t.story.health} you={L.healthTo26 ? t.story.yesTo26 : t.story.no} best={t.story.yesTo26} good={L.healthTo26} />
          <Row label={t.story.housing} you={pick(L.housing, lang)} best={pick(best.housing, lang)} good={flags.efc && flags.efcKept && flags.stayedTo18} />
          <Row label={t.story.docs} you={L.docsWeeksLost ? `${L.docsWeeksLost} ${t.story.weeksLost}` : t.story.inHand} best={t.story.inHand} good={L.docsWeeksLost === 0} />
        </div>
        <div className="story-total">
          {t.story.threeYears}: <b>${((L.monthlySupport * 36) + L.schoolMoneyPerYear * 3).toLocaleString()}</b>
          <span className="note"> {t.story.vs} ${((best.monthlySupport * 36) + best.schoolMoneyPerYear * 3).toLocaleString()}</span>
        </div>
        <p className="story-moral">{t.story.moral}</p>
        <div className="story-recap">
          {replay(ids).choices.map((c, k) => (
            <button key={k} className={`recap ${c.tone}`} onClick={() => goTo(k)} title={pick(scenes[k].month, lang)}>{pick(scenes[k].month, lang)}: {pick(c.label, lang)}</button>
          ))}
        </div>
        <Nav next={false} />
        <div className="hero-btns">
          <Button size="big" href="#/setup">{t.story.forReal}</Button>
          <Button size="big" kind="ghost" onClick={restart}>{t.story.again}</Button>
        </div>
        <p className="note">{t.story.numbers}: SILP ${SILP}/mo · Pell ${PELL}/yr · Chafee ${CHAFEE}/yr</p>
      </div>
    );
  }

  // ---- a month
  const scene = scenes[i];
  const text = scene.text(before.flags);
  const choices = scene.choices(before.flags);

  return (
    <div className="story">
      <Tabs />
      <div className="story-age">{pick(scene.month, lang)} · Jordan, {pick(scene.age, lang)}</div>
      <h1>{pick(scene.title, lang)}</h1>
      {i === 0 && !made && <p className="composite">{t.story.composite} <a href="#/voices">{t.voices.title}</a></p>}
      {englishOnly && <span className="eng-note">{t.englishOnly}</span>}
      <p className="story-text">{pick(text, lang)}</p>

      {!made && (
        <div className="story-choices">
          {choices.map((c) => (
            <button key={c.id} className="story-choice" onClick={() => choose(c)}>{pick(c.label, lang)}</button>
          ))}
        </div>
      )}

      {made && (
        <div className={`story-result ${made.tone}`}>
          <div className="story-chosen"><span className="k">{t.story.youChose}</span> {pick(made.label, lang)}</div>
          <p>{pick(made.result, lang)}</p>
          {made.rule && (
            <div className="story-rule">
              <b>{t.story.theRule}:</b> {pick(made.rule.text, lang)} <a href={made.rule.url} target="_blank" rel="noreferrer">{made.rule.source}</a>
            </div>
          )}
          <Button kind="ghost" size="small" onClick={changeAnswer}>{t.story.changeAnswer}</Button>
        </div>
      )}

      <Nav next={!!made} />
    </div>
  );
}

function Row({ label, you, best, good }: { label: string; you: string; best: string; good: boolean }) {
  const t = useT();
  return (
    <div className={`ledger-row ${good ? "good" : "bad"}`}>
      <div className="ledger-label">{label}</div>
      <div className="ledger-you"><span className="k">{t.story.you}</span> {you}</div>
      <div className="ledger-best"><span className="k">{t.story.couldHave}</span> {best}</div>
    </div>
  );
}
