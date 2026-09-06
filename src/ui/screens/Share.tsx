import { useState } from "react";
import { californiaRights } from "../../content/rights";
import { useLang, useT, pick } from "../../i18n";
import { Button, PageHead } from "../parts";
import { APP_URL } from "../../config";
import { downloadFile } from "../../engine/download";

// Getting the app to the next person. The rights card as an image is the thing a
// teenager can text to a friend; the flyer is for the adults around them.
//
// Guides I copied from:
//   sharing:   https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
//   clipboard: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
//   canvas:    https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text
//   toBlob:    https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob

export function ShareScreen() {
  const t = useT();
  const { lang } = useLang();
  const [msg, setMsg] = useState<string | null>(null);

  // Share the link with the phone's share sheet. If the browser has no share
  // sheet (most desktop browsers), copy the link instead. Both from the MDN pages above.
  const shareApp = async () => {
    const data = { title: "Before 18", text: t.tagline, url: APP_URL };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // the person closed the share sheet; nothing to do
      }
    }
    try {
      await navigator.clipboard.writeText(APP_URL);
      setMsg(t.share.copied);
    } catch {
      setMsg(APP_URL);
    }
  };

  // Draw the rights onto an image and share it, or save it if sharing files is not supported.
  const shareCard = async () => {
    const lines = californiaRights.map((r) => pick(r, lang));
    const blob = await renderRightsCard(lines, lang);
    const file = new File([blob], "before18-rights.png", { type: "image/png" });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "Before 18" });
        return;
      } catch {
        // closed the share sheet
      }
    }
    downloadFile(blob, "before18-rights.png");
  };

  return (
    <div className="share">
      <PageHead title={t.share.title} lead={t.share.intro} />
      <div className="hero-btns">
        <Button size="big" onClick={shareApp}>{t.share.app}</Button>
        <Button size="big" kind="ghost" onClick={shareCard}>{t.share.card}</Button>
        <Button size="big" kind="ghost" href="#/flyer">{t.share.flyer}</Button>
      </div>
      {msg && <p className="note">{msg}</p>}
      <p className="note">{t.share.flyerText}</p>
    </div>
  );
}

// Draws the rights list onto a canvas and returns it as a PNG.
// Drawing text on a canvas follows the MDN canvas tutorial linked at the top.
const BLUE = "#1a5fb4";
const INK = "#16212b";
const TITLES: Record<string, string> = {
  en: "Your rights in foster care (California)",
  es: "Tus derechos en cuidado adoptivo (California)",
  vi: "Quyền của bạn (California)",
  zh: "你的权利（加州）",
};

async function renderRightsCard(lines: string[], lang: string): Promise<Blob> {
  const width = 1080;
  const pad = 64;
  const lineHeight = 40;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const font = (px: number, weight = 400) => `${weight} ${px}px 'Public Sans', system-ui, sans-serif`;

  // measure first so the image is exactly as tall as it needs to be
  ctx.font = font(30);
  const wrapped = lines.map((line) => wrapText(ctx, line, width - pad * 2 - 60));
  let bodyHeight = 0;
  for (const w of wrapped) bodyHeight += w.length * lineHeight + 26;
  const height = pad + 120 + bodyHeight + pad + 80;
  canvas.width = width;
  canvas.height = height;

  // background and the blue header bar
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = BLUE;
  ctx.fillRect(0, 0, width, 130);
  ctx.fillStyle = "#9ecbf5";
  ctx.font = font(24, 800);
  ctx.fillText("BEFORE 18", pad, 56);
  ctx.fillStyle = "#ffffff";
  ctx.font = font(44, 700);
  ctx.fillText(TITLES[lang] || TITLES.en, pad, 106);

  // the numbered rights
  let y = 130 + pad;
  wrapped.forEach((lineGroup, i) => {
    ctx.font = font(30, 700);
    ctx.fillStyle = BLUE;
    ctx.fillText(`${i + 1}.`, pad, y);
    ctx.fillStyle = INK;
    ctx.font = font(30);
    lineGroup.forEach((line, k) => ctx.fillText(line, pad + 60, y + k * lineHeight));
    y += lineGroup.length * lineHeight + 26;
  });

  ctx.fillStyle = "#5c6b78";
  ctx.font = font(22);
  ctx.fillText("WIC §16001.9 · 42 U.S.C. §675 · Ombudsperson 1-877-846-1602", pad, height - 40);

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b!), "image/png"));
}

// Canvas cannot wrap text by itself, so this splits a sentence into lines that fit.
// This is the standard answer everyone copies, from Stack Overflow:
// https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
// (measureText is documented at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText)
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}
