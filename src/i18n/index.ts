import { createContext, useContext } from "react";
import type { Lang } from "../model/profile";
import { strings } from "./strings";

// The current language is shared with every screen through React "context".
// Pattern copied from https://react.dev/learn/passing-data-deeply-with-context
export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });

export function useLang() {
  return useContext(LangContext);
}

// t = the UI strings for the current language
export function useT() {
  const { lang } = useLang();
  return strings[lang];
}

// a piece of content in one or more languages. English is always there; the others
// fall back to English when a translation has not been written yet.
export type Text = { en: string; es?: string; vi?: string; zh?: string };

// pick the right language out of a content field, falling back to English
export function pick(field: Text, lang: Lang): string {
  return field[lang] ?? field.en;
}

// true when the field has no translation for this language (so the UI can say so)
export function missing(field: Text, lang: Lang): boolean {
  return lang !== "en" && !field[lang];
}

export const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
  { id: "vi", label: "Tiếng Việt" },
  { id: "zh", label: "中文" },
];

// remembered on the phone with localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
const KEY = "before18.lang";
export function loadLang(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "es" || v === "en" || v === "vi" || v === "zh") return v;
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("vi")) return "vi";
    if (nav.startsWith("zh")) return "zh";
    return "en";
  } catch {
    return "en";
  }
}
export function saveLang(l: Lang) {
  try {
    localStorage.setItem(KEY, l);
  } catch {
    // fine
  }
}
