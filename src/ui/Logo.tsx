import { useState } from "react";

// The b418 logo. The real artwork lives in public/ as PNGs (logo.png is the mark
// plus the wordmark, mark.png is the house alone). If a PNG is missing, the same
// mark is drawn in SVG so nothing on the page ever breaks.

export const BLUE = "#1a5fb4";
export const SKY = "#4aa3e8";
const BASE = import.meta.env.BASE_URL || "./";

function MarkSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden className="logo-mark">
      <rect x="84" y="24" width="13" height="26" rx="4" fill={BLUE} />
      <path d="M18 60 L60 22 L102 60 V104 a6 6 0 0 1 -6 6 H24 a6 6 0 0 1 -6 -6 Z" fill={BLUE} />
      <path d="M10 64 L60 18 L110 64" fill="none" stroke={BLUE} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 100 C34 82 50 84 62 90 C78 98 90 92 102 82 V104 a6 6 0 0 1 -6 6 H24 a6 6 0 0 1 -6 -6 Z" fill={SKY} />
      <path d="M62 74 C57 84 46 94 30 110 H48 C56 98 62 90 68 80 Z" fill="#fff" />
      <path d="M60 72 C42 60 40 44 51 41 C56 40 59 44 60 47 C61 44 64 40 69 41 C80 44 78 60 60 72 Z" fill={SKY} stroke="#fff" strokeWidth="4.5" strokeLinejoin="round" />
    </svg>
  );
}

function WordSvg({ height }: { height: number }) {
  return (
    <svg width={height * 3.1} height={height} viewBox="0 0 310 100" aria-label="b418" className="logo-word">
      <text x="0" y="82" fontFamily="Archivo, 'Public Sans', system-ui, sans-serif" fontWeight="800" fontSize="104" letterSpacing="-4">
        <tspan className="w1">b4</tspan>
        <tspan className="w2">18</tspan>
      </text>
    </svg>
  );
}

// If the PNG is missing the <img> fires an "error" event and we draw the SVG instead:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/error_event
export function LogoMark({ size = 40 }: { size?: number }) {
  const [png, setPng] = useState(true);
  if (!png) return <MarkSvg size={size} />;
  return <img className="logo-mark" src={`${BASE}mark.png`} width={size} height={size} alt="" onError={() => setPng(false)} />;
}

export function Logo({ height = 28 }: { height?: number }) {
  const [png, setPng] = useState(true);
  if (!png) {
    // no wide logo file yet: the real house mark (if present) next to the drawn wordmark
    return (
      <span className="logo">
        <LogoMark size={height * 1.25} />
        <WordSvg height={height} />
      </span>
    );
  }
  return <img className="logo" src={`${BASE}logo.png`} height={height} alt="b418" onError={() => setPng(false)} />;
}
