import { useMemo, useState } from "react";
import type { Profile } from "../../model/profile";
import { forgetEverything } from "../../model/profile";
import { buildTimeline, upcomingDeadlines, type TimelineItem } from "../../engine/timeline";
import { buildMilestones, nextMilestone, type Milestone } from "../../engine/milestones";
import { buildPlan } from "../../engine/plan";
import { downloadICS } from "../../engine/ics";
import { fmtDate } from "../../engine/dates";
import { useLang, useT, pick, missing } from "../../i18n";
import { Ribbon } from "../Ribbon";
import { CountyCard } from "../CountyCard";
import { Icon, type IconName } from "../icons";
import { Button, SectionTitle } from "../parts";

// The timeline page. Order, top to bottom: who you are and days to 18; the next
// three things to do; the age milestones; the chart; your county; then every rule
// as a card. Each card leads with "what this means for you" and keeps the long
// parts (how to get it, sources) behind a "Full details" button.

export function TimelineScreen({ profile }: { profile: Profile }) {
  const t = useT();
  const { lang } = useLang();
  // useMemo = remember the result until the inputs change (https://react.dev/reference/react/useMemo)
  const tl = useMemo(() => buildTimeline(profile), [profile]);
  if (!tl) return null;

  const by = (s: TimelineItem["status"]) => tl.items.filter((i) => i.status === s);
  const soon = upcomingDeadlines(tl, 4);
  const plan = buildPlan(tl, lang, 3);
  const milestones = buildMilestones(tl);
  const next = nextMilestone(milestones);

  return (
    <div className="timeline">
      <div className="you">
        <div>
          <div className="you-age">
            {t.timeline.youAre} <b>{tl.age.years}</b> {t.timeline.years}, <b>{tl.age.months}</b> {t.timeline.months}
          </div>
          <div className="you-18">
            {tl.daysTo18 > 0 ? (
              <>{t.timeline.turn18in} <b>{tl.daysTo18}</b> {t.timeline.days} · {fmtDate(tl.eighteenth, lang)}</>
            ) : (
              <>{t.timeline.turned18} {fmtDate(tl.eighteenth, lang)}</>
            )}
          </div>
        </div>
        <div className="you-btns">
          <Button size="small" kind="ghost" href="#/setup">{t.timeline.editAnswers}</Button>
          <Button size="small" kind="ghost" onClick={() => { if (window.confirm(t.common.forgetHint)) { forgetEverything(); window.location.hash = "/"; window.location.reload(); } }}>{t.common.forget}</Button>
        </div>
      </div>

      {plan.length > 0 && (
        <section className="plan">
          <SectionTitle>{t.timeline.plan}</SectionTitle>
          <ol className="plan-list">
            {plan.map((s, i) => (
              <li key={s.item.benefit.id + s.kind} className={`plan-step ${s.kind}`}>
                <span className="plan-n">{i + 1}</span>
                <div>
                  <div className="plan-title">{pick(s.item.benefit.name, lang)} <span className="plan-when">· {s.when}</span></div>
                  <div className="plan-action">{s.action}</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="plan-btns">
            <Button size="small" onClick={() => downloadICS(tl, lang)}>{t.timeline.calendar}</Button>
            <Button size="small" kind="ghost" href="#/meeting">{t.timeline.meeting}</Button>
          </div>
        </section>
      )}

      <section className="milestones">
        <SectionTitle>{t.timeline.milestones}</SectionTitle>
        <p className="section-lead small">{t.timeline.milestonesIntro}</p>
        <ol className="ms-list">
          {milestones.map((m) => <MilestoneRow key={`${m.years}-${m.months}`} m={m} isNext={m === next} />)}
        </ol>
      </section>

      <section>
        <SectionTitle>{t.timeline.ribbon}</SectionTitle>
        <Ribbon t={tl} label={t.timeline.ribbon} />
      </section>

      {profile.state === "CA" && <CountyCard county={profile.county} />}

      {soon.length > 0 && (
        <div className="soon">
          <SectionTitle>{t.timeline.comingUp}</SectionTitle>
          {soon.map((s) => (
            <div key={s.item.benefit.id + s.kind} className={`soon-row ${s.kind}`}>
              <span className="soon-days"><b>{s.days}</b> {t.timeline.days}</span>
              <span className="soon-what">{pick(s.item.benefit.name, lang)} <em>{s.kind === "opens" ? t.timeline.opens : t.timeline.closes}</em> · {fmtDate(s.on, lang)}</span>
            </div>
          ))}
        </div>
      )}

      <Group title={t.timeline.openNow} items={by("open")} tone="open" />
      <Group title={t.timeline.upcoming} items={by("upcoming")} tone="upcoming" />
      <Group title={t.timeline.unsure} items={by("unsure")} tone="unsure" />
      <Group title={t.timeline.ineligible} items={by("ineligible")} tone="ineligible" />
      <Group title={t.timeline.ended} items={by("closed")} tone="closed" />

      <p className="confirm">{t.timeline.confirm}</p>
    </div>
  );
}

// one age on the milestone list: the age, the date, what opens, what ends
function MilestoneRow({ m, isNext }: { m: Milestone; isNext: boolean }) {
  const t = useT();
  const { lang } = useLang();
  const passed = m.days < 0;
  const age = m.months ? `${m.years} ${t.timeline.yearsShort} ${m.months} ${t.timeline.monthsShort}` : `${m.years}`;
  const when = passed ? `${-m.days} ${t.timeline.days} ${t.timeline.ago}` : m.days === 0 ? t.timeline.today : `${t.timeline.in} ${m.days} ${t.timeline.days}`;
  return (
    <li className={`ms ${passed ? "passed" : ""} ${isNext ? "next" : ""} ${m.years === 18 && !m.months ? "eighteen" : ""}`}>
      <div className="ms-age"><span className="ms-age-label">{t.timeline.age}</span><b>{age}</b></div>
      <div className="ms-body">
        <div className="ms-date">{fmtDate(m.date, lang)} <span className="note">· {when}</span>{isNext && <span className="ms-next">{t.timeline.nextUp}</span>}</div>
        {m.opens.length > 0 && (
          <div className="ms-line"><span className="ms-k open">{t.timeline.opens}</span> {m.opens.map((i) => pick(i.benefit.name, lang)).join(" · ")}</div>
        )}
        {m.closes.length > 0 && (
          <div className="ms-line"><span className="ms-k close">{t.timeline.closes}</span> {m.closes.map((i) => pick(i.benefit.name, lang)).join(" · ")}</div>
        )}
        {m.opens.length === 0 && m.closes.length === 0 && <div className="ms-line note">{t.timeline.eighteenNote}</div>}
      </div>
    </li>
  );
}

function Group({ title, items, tone }: { title: string; items: TimelineItem[]; tone: string }) {
  if (!items.length) return null;
  return (
    <section className={`group ${tone}`}>
      <SectionTitle>{title}</SectionTitle>
      {items.map((it) => <Card key={it.benefit.id} item={it} />)}
    </section>
  );
}

const CAT_ICON: Record<string, IconName> = { money: "money", health: "health", housing: "home", school: "school", documents: "document", rights: "rights" };

function Card({ item }: { item: TimelineItem }) {
  const t = useT();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const b = item.benefit;

  // one plain sentence: what this rule means for this person right now
  let forYou = "";
  if (item.status === "open") forYou = item.closesOn ? `${t.timeline.forYouOpenUntil} ${fmtDate(item.closesOn, lang)}.` : t.timeline.forYouOpen;
  if (item.status === "upcoming" && item.opensOn) forYou = `${t.timeline.forYouOpens} ${fmtDate(item.opensOn, lang)} (${t.timeline.in} ${item.daysUntilOpen} ${t.timeline.days}).`;
  if (item.status === "closed" && item.closesOn) forYou = `${t.timeline.forYouEnded} ${fmtDate(item.closesOn, lang)}.`;
  if (item.status === "ineligible") forYou = t.timeline.forYouNo;
  if (item.status === "unsure") forYou = t.timeline.forYouUnsure;

  const when = (d: Date | null, days: number | null) => {
    if (!d || days == null) return null;
    const rel = days >= 0 ? `${t.timeline.in} ${days} ${t.timeline.days}` : `${-days} ${t.timeline.days} ${t.timeline.ago}`;
    return `${fmtDate(d, lang)} (${rel})`;
  };

  return (
    <article className={`card ${item.status}`}>
      <span className={`cat-icon c-${b.category}`} aria-hidden>{Icon[CAT_ICON[b.category]]()}</span>
      <div className="card-body">
        <div className="card-head">
          <div className="card-main">
            <div className="badges">
              <span className={`badge j-${b.jurisdiction}`}>{b.jurisdiction === "federal" ? t.timeline.federal : t.timeline.california}</span>
            </div>
            <h3>{pick(b.name, lang)}</h3>
          </div>
        </div>

        <div className="for-you">
          <div className="k">{t.timeline.forYou}</div>
          <p>{forYou}</p>
          {item.blockedBy.length > 0 && <ul className="reqs bad">{item.blockedBy.map((r, i) => <li key={i}>{pick(r.text, lang)}</li>)}</ul>}
          {item.unsureOn.length > 0 && <ul className="reqs unsure">{item.unsureOn.map((r, i) => <li key={i}>{pick(r.text, lang)}</li>)}</ul>}
          {b.value && (
            <div className="worth">
              {t.timeline.worth}{" "}
              {b.value.monthly && <b>${b.value.monthly.toLocaleString()} {t.timeline.perMonth}</b>}
              {b.value.perYear && <b>${b.value.perYear.toLocaleString()} {t.timeline.perYear}</b>}
              {b.value.years && !b.value.monthly && !b.value.perYear && <b>{b.value.years} {t.timeline.years}</b>}
            </div>
          )}
        </div>

        <p className="summary">{pick(b.summary, lang)}</p>
        {missing(b.summary, lang) && <span className="eng-note">{t.englishOnly}</span>}
        {b.changed && <div className="changed"><b>{t.timeline.changed}:</b> {pick(b.changed, lang)}</div>}

        <button className="details-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? t.common.less : t.common.more} <span className={`chev ${open ? "open" : ""}`}>{Icon.chevron()}</span>
        </button>

        {open && (
          <div className="card-more">
            <div className="sub">{t.timeline.dates}</div>
            <div className="dates">
              {item.opensOn && <span>{t.timeline.opens}: {when(item.opensOn, item.daysUntilOpen)}</span>}
              {item.closesOn && <span>{t.timeline.closes}: {when(item.closesOn, item.daysUntilClose)}</span>}
              {b.window.note && <span>{pick(b.window.note, lang)}</span>}
              {b.value && <span>{pick(b.value.note, lang)}</span>}
            </div>
            <div className="sub">{t.timeline.howTo}</div>
            <ol>{b.howTo.map((s, i) => <li key={i}>{typeof s === "string" ? s : pick(s, lang)}</li>)}</ol>
            <div className="sub">{t.timeline.sources}</div>
            <ul className="sources">
              {b.sources.map((s, i) => (
                <li key={i}><a href={s.url} target="_blank" rel="noreferrer">{s.name}</a> <span className="note">({s.retrieved})</span></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
