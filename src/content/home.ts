// What the home page says, apart from the sentences that are translated (those
// live in src/i18n/strings.ts under home.*). Edit numbers and sources here.

export interface Promise {
  n: 1 | 2 | 3 | 4; // matches home.p1Title / home.p1Stat in strings.ts
  law: string; // shown small under the title
  stat: string; // the big number
  source: { name: string; url: string };
  href: string; // where the link under it goes
  ctaKey: "seeTimelineShort" | "seeWhatIf" | "documents" | "afford"; // which string is the link text
}

export const promises: Promise[] = [
  {
    n: 1,
    law: "AB 12, WIC §11403",
    stat: "1 in 4",
    source: { name: "California Policy Lab, 2024", url: "https://capolicylab.org/aging-out-of-foster-care-in-los-angeles/" },
    href: "#/timeline",
    ctaKey: "seeTimelineShort",
  },
  {
    n: 2,
    law: "42 U.S.C. §1396a(a)(10)(A)(i)(IX)",
    stat: "1 day",
    source: { name: "DHCS, Former Foster Youth program", url: "https://www.dhcs.ca.gov/services/medi-cal-resources/medi-cal-eligibility-division/frequently-asked-questions-for-the-former-foster-youth-program/" },
    href: "#/whatif",
    ctaKey: "seeWhatIf",
  },
  {
    n: 3,
    law: "42 U.S.C. §675(5)(I)",
    stat: "90%",
    source: { name: "Human Rights Watch, California interviews", url: "https://www.hrw.org/report/2010/05/12/my-so-called-emancipation/foster-care-homelessness-california-youth" },
    href: "#/documents",
    ctaKey: "documents",
  },
  {
    n: 4,
    law: "SILP rate, CDSS",
    stat: "$1,301",
    source: { name: "CDSS, July 2025 rate", url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12" },
    href: "#/afford",
    ctaKey: "afford",
  },
];

// how many real quotes to show on the home page before the "read all" link
export const HOME_VOICES = 4;

// the hero photo credit, shown small in the corner. Empty string hides it.
export const PHOTO_CREDIT = "Stand-in photo: Maryland GovPics, Foster Youth Day, CC BY 2.0. Replace with public/hero.jpg.";
