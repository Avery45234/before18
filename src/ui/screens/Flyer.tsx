import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useT } from "../../i18n";
import { Logo } from "../Logo";
import { Icon } from "../icons";
import { Button, PageHead } from "../parts";
import { APP_URL, APP_URL_IS_LOCAL } from "../../config";
import { flyer } from "../../content/flyer";

// One printed page for the wall of an ILP office, a school counselor's door, or
// a group home kitchen. The words are in src/content/flyer.ts; this is layout.
export function FlyerScreen() {
  const t = useT();
  const [qr, setQr] = useState<string>("");
  // QR code made with the qrcode library; this is its README example:
  // https://github.com/soldair/node-qrcode
  useEffect(() => {
    QRCode.toDataURL(APP_URL, { margin: 0, width: 360, color: { dark: "#16212b", light: "#ffffff" } }).then(setQr).catch(() => setQr(""));
  }, []);

  return (
    <div className="flyer">
      <PageHead title={t.share.flyer} lead={t.share.flyerText} action={<Button size="small" icon={Icon.print()} onClick={() => window.print()}>{t.rights.print}</Button>} />
      {APP_URL_IS_LOCAL && <p className="note">The QR code points at this computer for now. Once the site is deployed, set VITE_APP_URL and it points at the real address.</p>}

      <div className="flyer-page">
        <header className="fl-head">
          <div className="fl-brand"><Logo height={26} /></div>
          <div className="fl-title">
            <h2>{flyer.headline}</h2>
            <p>{flyer.sub}</p>
          </div>
        </header>

        <div className="fl-cols">
          <section className="fl-cal">
            <h3>The calendar</h3>
            <table>
              <tbody>
                {flyer.calendar.map((r) => (
                  <tr key={r.age} className={r.key ? "key" : ""}>
                    <th scope="row">{r.age}</th>
                    <td>{r.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <aside className="fl-side">
            <section className="fl-rule">
              <h3>{flyer.ruleTitle}</h3>
              <p>{flyer.rule}</p>
            </section>

            <section className="fl-docs">
              <h3>{flyer.docsTitle}</h3>
              <ul>{flyer.documents.map((d) => <li key={d}><span className="box" />{d}</li>)}</ul>
              <p className="fl-small">{flyer.docsNote}</p>
            </section>

            <section className="fl-call">
              <h3>{flyer.callTitle}</h3>
              <ul>{flyer.phones.map((p) => <li key={p.number}><b>{p.number}</b> {p.who}</li>)}</ul>
            </section>
          </aside>
        </div>

        <footer className="fl-foot">
          <div className="fl-qr">
            {qr ? <img src={qr} alt="QR code to the app" /> : <div className="fl-qr-blank" />}
            <div>
              <b>{t.appName}</b> {flyer.blurb}
              <div className="fl-url">{APP_URL}</div>
            </div>
          </div>
          <div className="fl-staff"><b>For staff:</b> {flyer.staff}</div>
        </footer>
      </div>
    </div>
  );
}
