import { voices, reading } from "../../content/voices";
import { useT } from "../../i18n";
import { PageHead } from "../parts";

// Real people, as published. The quotes are src/content/voices.ts.
export function VoicesScreen() {
  const t = useT();
  return (
    <div className="voices">
      <PageHead title={t.voices.title} lead={t.voices.intro} />
      <p className="note">{t.voices.note}</p>
      <ul className="voice-list">
        {voices.map((v) => (
          <li key={v.id} className="voice">
            <blockquote>“{v.quote}”</blockquote>
            <div className="voice-who"><b>{v.who}</b>, {v.where}</div>
            <div className="voice-ctx">{v.context}</div>
            <a className="voice-src" href={v.source.url} target="_blank" rel="noreferrer">{v.source.name}, {v.source.year}</a>
          </li>
        ))}
      </ul>
      <h2>{t.voices.reading}</h2>
      <ul className="reading">
        {reading.map((r) => (
          <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer">{r.name}</a><span className="note"> {r.by}</span></li>
        ))}
      </ul>
    </div>
  );
}
