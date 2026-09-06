import { useEffect, useMemo, useState } from "react";
import type { Profile } from "../../model/profile";
import { buildTimeline } from "../../engine/timeline";
import { meetingQuestions } from "../../content/meeting";
import { useLang, useT } from "../../i18n";
import { Icon } from "../icons";
import { Button, PageHead } from "../parts";
import { downloadFile } from "../../engine/download";

// The meeting sheet. Questions built from the person's own timeline, a line under
// each one for what was actually said, a short bring list, and the meeting date on
// a calendar. Everything stays on the phone.

const KEY = "before18.meeting";
interface Saved { asked: Record<string, boolean>; notes: Record<string, string>; when: string }

function load(): Saved {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return { asked: v.asked ?? {}, notes: v.notes ?? {}, when: v.when ?? "" };
  } catch {
    return { asked: {}, notes: {}, when: "" };
  }
}

// One calendar event for the meeting, with a reminder the day before.
// Field names from the iCalendar spec, same as src/engine/ics.ts:
// https://icalendar.org/iCalendar-RFC-5545/3-6-1-event-component.html
function meetingICS(when: string, title: string): string {
  const d = when.replace(/-/g, "");
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Before 18//EN", "BEGIN:VEVENT", `UID:meeting-${d}@before18`, `DTSTART;VALUE=DATE:${d}`, `SUMMARY:${title}`, "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", `DESCRIPTION:${title}`, "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
}

export function MeetingScreen({ profile }: { profile: Profile | null }) {
  const t = useT();
  const { lang } = useLang();
  // useMemo = remember the result until profile/lang change (https://react.dev/reference/react/useMemo)
  const tl = useMemo(() => (profile?.birthdate ? buildTimeline(profile) : null), [profile]);
  const qs = useMemo(() => (tl ? meetingQuestions(tl, lang) : []), [tl, lang]);
  const [s, setS] = useState<Saved>(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* fine */ }
  }, [s]);

  if (!tl) {
    return (
      <div className="meeting">
        <PageHead title={t.meeting.title} lead={t.meeting.needProfile} />
        <Button size="big" href="#/setup">{t.start}</Button>
      </div>
    );
  }

  const addToCalendar = () => {
    downloadFile(meetingICS(s.when, t.meeting.calTitle), "meeting.ics", "text/calendar");
  };

  const bring = [t.meeting.bring1, t.meeting.bring2, t.meeting.bring3, t.meeting.bring4];

  return (
    <div className="meeting">
      <PageHead title={t.meeting.title} lead={t.meeting.intro} action={<Button size="small" icon={Icon.print()} onClick={() => window.print()}>{t.rights.print}</Button>} />

      <div className="meeting-top">
        <div className="meeting-when">
          <label className="field">
            <span>{t.meeting.when}</span>
            <input type="date" value={s.when} onChange={(e) => setS({ ...s, when: e.target.value })} />
          </label>
          <Button size="small" kind="ghost" icon={Icon.calendar()} disabled={!s.when} onClick={addToCalendar}>{t.meeting.addCal}</Button>
        </div>
        <div className="bring">
          <div className="k">{t.meeting.bring}</div>
          <ul>{bring.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </div>
      </div>

      <ol className="questions">
        {qs.map((q) => (
          <li key={q.id} className={s.asked[q.id] ? "asked" : ""}>
            <label>
              <input type="checkbox" checked={!!s.asked[q.id]} onChange={() => setS({ ...s, asked: { ...s.asked, [q.id]: !s.asked[q.id] } })} />
              <span>{q.text}</span>
            </label>
            <textarea className="answer" placeholder={t.meeting.notes} value={s.notes[q.id] ?? ""} rows={2} onChange={(e) => setS({ ...s, notes: { ...s.notes, [q.id]: e.target.value } })} />
          </li>
        ))}
      </ol>
      <p className="note">{t.meeting.tip}</p>
      <div className="print-foot">Before 18 · fosteryouthhelp.ca.gov · California Foster Care Ombudsperson 1-877-846-1602</div>
    </div>
  );
}
