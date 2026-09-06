import { useState } from "react";
import type { Profile, YesNoUnsure } from "../../model/profile";
import { emptyProfile } from "../../model/profile";
import { useT } from "../../i18n";
import { parseDate, ageOn } from "../../engine/dates";
import { CA_COUNTIES } from "../../content/countyNames";
import { Button, PageHead } from "../parts";

export function Setup({ initial, onSave }: { initial: Profile | null; onSave: (p: Profile) => void }) {
  const t = useT();
  const [p, setP] = useState<Profile>(initial ?? emptyProfile);
  const birth = parseDate(p.birthdate);
  const age = birth ? ageOn(birth, new Date()) : null;
  const under18 = age ? age.years < 18 : true;
  // change one answer and keep the rest
  const set = (k: keyof Profile, v: Profile[keyof Profile]) => setP({ ...p, [k]: v });

  const YNU = ({ k, label, hint }: { k: "inCareNow" | "inCareOn18" | "inCareAfter13" | "inCare16to18" | "sixMonthsInCare"; label: string; hint?: string }) => (
    <div className="q">
      <div className="q-label">{label}</div>
      {hint && <div className="q-hint">{hint}</div>}
      <div className="choices">
        {(["yes", "no", "unsure"] as YesNoUnsure[]).map((v) => (
          <button key={v} type="button" className={`choice ${p[k] === v ? "on" : ""}`} onClick={() => set(k, v)}>
            {v === "yes" ? t.setup.yes : v === "no" ? t.setup.no : t.setup.unsure}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <form
      className="setup"
      onSubmit={(e) => {
        e.preventDefault();
        if (!birth) return;
        // if you are under 18 and in care now, "in care on 18th birthday" is the expected path
        const inCareOn18 = under18 && p.inCareNow === "yes" && p.inCareOn18 === "unsure" ? "yes" : p.inCareOn18;
        onSave({ ...p, inCareOn18 });
      }}
    >
      <PageHead title={t.setup.title} lead={t.setup.why} />

      <div className="q">
        <label className="q-label" htmlFor="bd">{t.setup.birthdate}</label>
        <input id="bd" type="date" required value={p.birthdate} onChange={(e) => set("birthdate", e.target.value)} max={new Date().toISOString().slice(0, 10)} />
        {age && <div className="q-hint">{age.years} {t.timeline.years}, {age.months} {t.timeline.months}</div>}
      </div>

      <div className="q">
        <div className="q-label">{t.setup.state}</div>
        <div className="choices">
          <button type="button" className={`choice ${p.state === "CA" ? "on" : ""}`} onClick={() => set("state", "CA")}>{t.setup.ca}</button>
          <button type="button" className={`choice ${p.state === "other" ? "on" : ""}`} onClick={() => set("state", "other")}>{t.setup.other}</button>
        </div>
      </div>

      {p.state === "CA" && (
        <div className="q">
          <label className="q-label" htmlFor="county">{t.setup.county}</label>
          <select id="county" className="county-select" value={p.county ?? ""} onChange={(e) => set("county", e.target.value || undefined)}>
            <option value="">—</option>
            {CA_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      )}

      <YNU k="inCareNow" label={t.setup.inCareNow} />
      {!(under18 && p.inCareNow === "yes") && <YNU k="inCareOn18" label={t.setup.inCareOn18} hint={t.setup.inCareOn18Hint} />}
      <YNU k="inCareAfter13" label={t.setup.inCareAfter13} />
      <YNU k="inCare16to18" label={t.setup.inCare16to18} />
      <YNU k="sixMonthsInCare" label={t.setup.sixMonths} />

      <div className="q">
        <div className="q-label">{t.setup.planning}</div>
        <div className="choices">
          {(["college", "work", "unsure"] as Profile["planning"][]).map((v) => (
            <button key={v} type="button" className={`choice ${p.planning === v ? "on" : ""}`} onClick={() => set("planning", v)}>
              {v === "college" ? t.setup.college : v === "work" ? t.setup.work : t.setup.unsurePlan}
            </button>
          ))}
        </div>
      </div>

      <label className="check">
        <input type="checkbox" checked={p.parenting} onChange={(e) => set("parenting", e.target.checked)} /> {t.setup.parenting}
      </label>

      <Button size="big" type="submit" disabled={!birth}>{t.setup.save}</Button>
    </form>
  );
}
