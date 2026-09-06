// Who is using the app. Everything is optional-ish and "I'm not sure" is always an
// answer, because a lot of the people this is for genuinely do not know their own
// case history. Nothing here ever leaves the phone.

export type YesNoUnsure = "yes" | "no" | "unsure";
export type Lang = "en" | "es" | "vi" | "zh";

export interface Profile {
  birthdate: string; // YYYY-MM-DD
  state: "CA" | "other";
  county?: string; // California county name, optional
  inCareNow: YesNoUnsure;
  // were you (or will you be) in foster care on your 18th birthday? This single fact
  // decides Medi-Cal to 26 and Extended Foster Care, so we ask it directly.
  inCareOn18: YesNoUnsure;
  inCareAfter13: YesNoUnsure; // in care at any point on or after your 13th birthday
  inCare16to18: YesNoUnsure; // in care at any point between 16 and 18
  sixMonthsInCare: YesNoUnsure; // at least 6 months in care total
  planning: "college" | "work" | "unsure";
  parenting: boolean;
}

export const emptyProfile: Profile = {
  birthdate: "",
  state: "CA",
  inCareNow: "unsure",
  inCareOn18: "unsure",
  inCareAfter13: "unsure",
  inCare16to18: "unsure",
  sixMonthsInCare: "unsure",
  planning: "unsure",
  parenting: false,
};

// Saved on the phone with localStorage, copied from
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// Everything is inside try/catch because private browsing can block storage.
const KEY = "before18.profile";

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return { ...emptyProfile, ...(JSON.parse(raw) as Partial<Profile>) };
  } catch {
    return null;
  }
}

export function saveProfile(p: Profile): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // private mode or storage blocked - the app still works, it just forgets
  }
}

export function clearProfile(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // nothing to do
  }
}

// Wipe everything the app has stored on this device: answers, story progress,
// documents checklist, language. For borrowed phones, and for peace of mind.
export function forgetEverything(): void {
  try {
    for (const k of Object.keys(localStorage)) if (k.startsWith("before18.")) localStorage.removeItem(k);
  } catch {
    // nothing to clear
  }
}
