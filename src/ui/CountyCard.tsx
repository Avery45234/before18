import { countyByName, COUNTY_SOURCE } from "../content/counties";
import { useT } from "../i18n";
import { Button } from "./parts";

// Your county's ILP / extended foster care / THP-Plus contacts, from the CDSS list.
// The actual person to call, not a generic "contact your county".
export function CountyCard({ county }: { county?: string }) {
  const t = useT();
  const entry = countyByName(county);
  return (
    <section className="county">
      <div className="section-title" style={{ margin: "4px 0 8px" }}>{t.timeline.county}{entry ? `: ${entry.county}` : ""}</div>
      {!entry && (
        <p className="note">
          <a href="#/setup">{t.setup.county}</a> · <a href={COUNTY_SOURCE.url} target="_blank" rel="noreferrer">{t.timeline.countyList}</a>
        </p>
      )}
      {entry && (
        <>
          <p className="note">{t.timeline.countyIlp}</p>
          {entry.contacts.map((c, i) => (
            <div key={i} className="contact">
              <div className="contact-prog">{c.programs}</div>
              <div className="contact-name">{c.name}</div>
              {c.title && <div className="contact-title">{c.title}</div>}
              <div className="contact-actions">
                {c.phone && <Button size="small" href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}>{t.help.call} {c.phone}</Button>}
                {c.email && <Button size="small" kind="ghost" href={`mailto:${c.email}`}>{c.email}</Button>}
              </div>
              {c.note && <div className="note">{c.note}</div>}
            </div>
          ))}
          <p className="note">
            <a href={COUNTY_SOURCE.url} target="_blank" rel="noreferrer">{COUNTY_SOURCE.name}</a> ({COUNTY_SOURCE.retrieved}{entry.confirmed ? `; ${entry.confirmed}` : ""}) · {t.timeline.countyOmbuds}: <a href="tel:18778461602">1-877-846-1602</a>
          </p>
        </>
      )}
    </section>
  );
}
