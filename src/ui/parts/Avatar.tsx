import { useState } from "react";

// A round photo. Put the picture at public/avatar.jpg. If the file is missing the
// circle shows the initials instead, so the page never shows a broken image.
// Same missing-file trick as the logo: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/error_event
const BASE = import.meta.env.BASE_URL || "./";

export function Avatar({ name, size = 96 }: { name: string; size?: number }) {
  const [ok, setOk] = useState(true);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  if (!ok) return <div className="avatar avatar-initials" style={{ width: size, height: size, fontSize: size * 0.38 }} aria-label={name}>{initials}</div>;
  return <img className="avatar" src={`${BASE}avatar.jpg`} width={size} height={size} alt={name} onError={() => setOk(false)} />;
}
