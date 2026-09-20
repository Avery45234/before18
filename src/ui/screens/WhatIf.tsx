import { useMemo, useState } from "react";
import type { Profile } from "../../model/profile";
import { whatIfScenarios } from "../../engine/whatif";
import { useLang, useT, pick } from "../../i18n";
import { PageHead } from "../parts";

export function WhatIfScreen({ profile }: { profile: Profile }) {
  const t = useT();
  const { lang } = useLang();
  // useMemo = remember the result until the inputs change (https://react.dev/reference/react/useMemo)
  const scenarios = useMemo(() => whatIfScenarios(profile), [profile]);
  const [openId, setOpenId] = useState<string | null>(scenarios[0]?.id ?? null);

  return (
    <div className="whatif">
      <PageHead title={t.whatif.title} lead={t.whatif.intro} />

      {scenarios.map((s) => {
        const open = openId === s.id;
        return (
          <article key={s.id} className={`scenario ${open ? "open" : ""}`}>
            <button className="scenario-head" onClick={() => setOpenId(open ? null : s.id)} aria-expanded={open}>
              <span className="scenario-title">{pick(s.title, lang)}</span>
              {s.total > 0 && <span className="scenario-total">-${s.total.toLocaleString()}</span>}
              <span className="chev">{open ? "▾" : "▸"}</span>
            </button>
            {open && (
              <div className="scenario-body">
                <p className="decision">{pick(s.decision, lang)}</p>
                <div className="in-short">
                  <span className="k">{t.whatif.inShort}</span> <b>{s.losses.length}</b> {s.losses.length === 1 ? t.whatif.fallOffOne : t.whatif.fallOff}
                  {s.total > 0 && <>, {t.whatif.worthAbout} <b>${s.total.toLocaleString()}</b></>}.
                </div>

                <div className="sub">{t.whatif.chain}</div>
                <ol className="chain">
                  {s.chain.map((c, i) => <li key={i}>{pick(c, lang)}</li>)}
                </ol>

                <div className="sub">{t.whatif.youLose}</div>
                {s.losses.length === 0 && <p className="note">—</p>}
                <ul className="losses">
                  {s.losses.map((l) => (
                    <li key={l.benefitId}>
                      <div className="loss-top">
                        <b>{pick(l.name, lang)}</b>
                        <span className="loss-est">{l.estimate ? `≈ $${l.estimate.toLocaleString()}` : t.whatif.noEstimate}</span>
                      </div>
                      <div className="loss-how">{pick(l.how, lang)}</div>
                    </li>
                  ))}
                </ul>
                {s.total > 0 && <div className="total">{t.whatif.total}: <b>${s.total.toLocaleString()}</b></div>}

                <div className="sub">{t.whatif.youKeep}</div>
                <ul className="keeps">{s.keeps.map((k, i) => <li key={i}>✓ {pick(k, lang)}</li>)}</ul>

                <div className="factbox">
                  <div className="sub">{t.whatif.fact}</div>
                  <p>{pick(s.fact, lang)} <a href={s.fact.url} target="_blank" rel="noreferrer">{s.fact.source}</a></p>
                </div>
              </div>
            )}
          </article>
        );
      })}
      <p className="confirm">{t.timeline.confirm}</p>
    </div>
  );
}
