import { useState } from "react";
import { useT } from "../../i18n";
import { PageHead } from "../parts";

// "Can I afford it?" A reality check for living on your own at 18 in California.
// Every default has a source; every default can be changed.
const SILP = 1301; // CDSS SILP basic rate, eff. July 1, 2025
const MIN_WAGE = 16.5; // California minimum wage, 2025 (dir.ca.gov)
const CALFRESH_MAX_1 = 292; // USDA SNAP max allotment, 1-person household, FY2025

export function AffordScreen() {
  const t = useT();
  const [rent, setRent] = useState(1800);
  const [roommate, setRoommate] = useState(true);
  const [hours, setHours] = useState(20);
  const [efc, setEfc] = useState(true);
  const [calfresh, setCalfresh] = useState(true);
  const [other, setOther] = useState(160); // phone + utilities share

  const earnings = Math.round(hours * MIN_WAGE * 4.33 * 0.92); // rough after payroll taxes
  const income = (efc ? SILP : 0) + earnings + (calfresh ? CALFRESH_MAX_1 : 0);
  const myRent = roommate ? Math.round(rent / 2) : rent;
  const food = calfresh ? 120 : 350;
  const expenses = myRent + other + food;
  const left = income - expenses;
  const rentShare = income > 0 ? Math.round((myRent / income) * 100) : 100;

  return (
    <div className="afford">
      <PageHead title={t.afford.title} lead={t.afford.intro} />

      <div className="afford-grid">
        <label className="field">
          <span>{t.afford.rent}</span>
          <input type="number" value={rent} min={0} step={50} onChange={(e) => setRent(Number(e.target.value))} />
          <a className="note" href="https://www.huduser.gov/portal/datasets/fmr.html" target="_blank" rel="noreferrer">{t.afford.rentHint}</a>
        </label>
        <label className="toggle"><input type="checkbox" checked={roommate} onChange={(e) => setRoommate(e.target.checked)} /> {t.afford.roommate}</label>
        <label className="toggle"><input type="checkbox" checked={efc} onChange={(e) => setEfc(e.target.checked)} /> {t.afford.efc} (${SILP}/mo)</label>
        <label className="toggle"><input type="checkbox" checked={calfresh} onChange={(e) => setCalfresh(e.target.checked)} /> {t.afford.calfresh} (${CALFRESH_MAX_1}/mo)</label>
        <label className="field">
          <span>{t.afford.hours}: <b>{hours}</b></span>
          <input type="range" min={0} max={40} value={hours} onChange={(e) => setHours(Number(e.target.value))} />
          <span className="note">${MIN_WAGE}/hr → ≈ ${earnings.toLocaleString()}/mo</span>
        </label>
        <label className="field">
          <span>{t.afford.other}</span>
          <input type="number" value={other} min={0} step={10} onChange={(e) => setOther(Number(e.target.value))} />
        </label>
      </div>

      <div className={`afford-result ${left >= 0 ? "good" : "bad"}`}>
        <div className="ar-row"><span>{t.afford.in}</span><b>${income.toLocaleString()}</b></div>
        <div className="ar-row"><span>{t.afford.rentLine} {roommate ? `(${t.afford.half})` : ""}</span><b>-${myRent.toLocaleString()}</b></div>
        <div className="ar-row"><span>{t.afford.food}</span><b>-${food}</b></div>
        <div className="ar-row"><span>{t.afford.otherLine}</span><b>-${other}</b></div>
        <div className="ar-row total"><span>{t.afford.left}</span><b>{left >= 0 ? "+" : "-"}${Math.abs(left).toLocaleString()}</b></div>
        <div className="ar-note">
          {t.afford.rentShare}: <b>{rentShare}%</b>. {rentShare > 50 ? t.afford.severe : rentShare > 30 ? t.afford.burdened : t.afford.ok}
        </div>
      </div>

      <p className="note">
        {t.afford.sources}: <a href="https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12" target="_blank" rel="noreferrer">CDSS (SILP)</a> · <a href="https://www.dir.ca.gov/dlse/faq_minimumwage.htm" target="_blank" rel="noreferrer">CA DIR (minimum wage)</a> · <a href="https://www.fns.usda.gov/snap/allotment/COLA" target="_blank" rel="noreferrer">USDA FNS (SNAP allotments)</a> · <a href="https://www.huduser.gov/portal/datasets/fmr.html" target="_blank" rel="noreferrer">HUD Fair Market Rents</a>
      </p>
    </div>
  );
}
