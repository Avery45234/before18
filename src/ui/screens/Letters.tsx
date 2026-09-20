import { useEffect, useMemo, useState } from "react";
import type { Profile } from "../../model/profile";
import { letters, fill } from "../../content/letters";
import { useLang, useT, pick, missing } from "../../i18n";
import { fmtDate, parseDate } from "../../engine/dates";
import { Icon } from "../icons";
import { Button, PageHead } from "../parts";

// Messages that are ready to send. Pick one, fill in two names, send it as a text
// or an email, keep a copy. The person can edit the text before it goes.

const KEY = "before18.letters";

function load(): { name: string; caseworker: string } {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return { name: v.name ?? "", caseworker: v.caseworker ?? "" };
  } catch {
    return { name: "", caseworker: "" };
  }
}

export function LettersScreen({ profile }: { profile: Profile | null }) {
  const t = useT();
  const { lang } = useLang();
  // a link like #/letters?l=docs opens that letter first (https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
  const query = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const first = query.get("l") ?? "";
  const [id, setId] = useState(letters.some((l) => l.id === first) ? first : letters[0].id);
  const [f, setF] = useState(load);
  const [edited, setEdited] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(f)); } catch { /* fine */ }
  }, [f]);

  const letter = letters.find((l) => l.id === id) ?? letters[0];
  const today = fmtDate(new Date(), lang);
  const born = profile?.birthdate ? parseDate(profile.birthdate) : null;
  const birthdate = born ? fmtDate(born, lang) : "";
  // useMemo = remember the result until the inputs change (https://react.dev/reference/react/useMemo)
  const generated = useMemo(
    () => fill(pick(letter.body, lang), { ...f, county: profile?.county ?? "", date: today, birthdate }, lang),
    [letter, lang, f, profile, today, birthdate],
  );
  const text = edited ?? generated;
  const subject = pick(letter.subject, lang);
  const englishOnly = missing(letter.body, lang);

  const choose = (next: string) => { setId(next); setEdited(null); setCopied(false); };
  // copy to clipboard: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* no clipboard */ }
  };
  // sms: and mailto: links open the phone's texting and email apps with the message filled in
  // https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links
  const enc = encodeURIComponent;

  return (
    <div className="letters">
      <PageHead title={t.letters.title} lead={t.letters.intro} />

      <div className="letter-pick" role="tablist">
        {letters.map((l) => (
          <button key={l.id} role="tab" aria-selected={l.id === id} className={`letter-tab ${l.id === id ? "on" : ""}`} onClick={() => choose(l.id)}>
            {pick(l.title, lang)}
          </button>
        ))}
      </div>

      <div className="letter-meta">
        <div><span className="k">{t.letters.when}</span> {pick(letter.when, lang)}</div>
        <div><span className="k">{t.letters.to}</span> {pick(letter.to, lang)}</div>
      </div>

      <div className="letter-fields">
        <label className="field"><span>{t.letters.yourName}</span><input type="text" value={f.name} onChange={(e) => { setF({ ...f, name: e.target.value }); setEdited(null); }} /></label>
        <label className="field"><span>{t.letters.caseworker}</span><input type="text" value={f.caseworker} onChange={(e) => { setF({ ...f, caseworker: e.target.value }); setEdited(null); }} /></label>
      </div>

      {englishOnly && <span className="eng-note">{t.englishOnly}</span>}
      <div className="letter-paper">
        <div className="letter-subject">{subject}</div>
        <textarea className="letter-body" value={text} rows={text.split("\n").length + 8} onChange={(e) => setEdited(e.target.value)} spellCheck={false} />
        <div className="note">{t.letters.edit}</div>
      </div>

      <div className="letter-actions">
        <Button icon={Icon.check()} onClick={copy}>{copied ? t.letters.copied : t.letters.copy}</Button>
        <Button kind="ghost" icon={Icon.phone()} href={`sms:?&body=${enc(text)}`}>{t.letters.text}</Button>
        <Button kind="ghost" icon={Icon.share()} href={`mailto:?subject=${enc(subject)}&body=${enc(text)}`}>{t.letters.email}</Button>
        <Button kind="ghost" icon={Icon.print()} onClick={() => window.print()}>{t.letters.print}</Button>
      </div>

      <p className="note">{t.letters.source}: <a href={letter.source.url} target="_blank" rel="noreferrer">{letter.source.name}</a>. {t.timeline.confirm}</p>
      <div className="print-foot">Before 18 · fosteryouthhelp.ca.gov · California Foster Care Ombudsperson 1-877-846-1602</div>
    </div>
  );
}
