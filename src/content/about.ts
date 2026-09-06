// The About page, as plain sections. Edit the words here; the page just prints
// them in order. The "Sources" section is built from benefits.ts automatically
// and the extra sources below are added to the end of it.

export const aboutSections: { title: string; body: string }[] = [
  {
    title: "Why I built this",
    body: "I started this project reading about what actually pushes people into homelessness. I kept running into the same group nobody was talking about: kids who age out of foster care. One in five is homeless the day they leave. Then I read the laws, and found that most of what they need already exists. It just hinges on dates nobody explains to them. So I built a calendar.",
  },
  {
    title: "The problem",
    body: "About 20,000 young people age out of foster care in the United States every year. Roughly one in five is homeless the day they leave, and 40 to 50 percent within eighteen months. Much of that is avoidable: federal and California law give these young people a placement and a monthly payment until 21, free health coverage until 26, thousands of dollars a year for school, and the right to leave care holding their own birth certificate, Social Security card, and ID. Each of those has an age or a date attached, and a lot of them turn on a single fact: were you in care on your 18th birthday? Most young people never get that explained to them. This app explains it, for one specific person, with the dates.",
  },
  {
    title: "How it works",
    body: "You answer a few questions on your own phone. The app builds a timeline from your birthdate and the rules, tells you what is open now, what opens and closes when, and what you are not eligible for and why. The What if screen runs the same rules with one decision changed and shows what falls off the list, with a dollar estimate where one is honest to give. Nothing is sent anywhere. There is no account. It works with no signal once it has loaded once.",
  },
  {
    title: "Accuracy",
    body: "Scope is federal law plus California. Every rule links to the official source it came from and the date I checked it. Dollar amounts (the SILP rate, the Chafee Grant, the Pell maximum) are the published figures for 2025-26 and will change. Rules change too, sometimes fast: CalFresh work rules for former foster youth changed in July 2025. This app is a map, not legal advice. Confirm anything with a deadline with your caseworker, your attorney, or your county ILP coordinator, and call the California Foster Care Ombudsperson (1-877-846-1602) if nobody will answer you.",
  },
  {
    title: "Technical notes",
    body: "TypeScript, React, and Vite. The rules live in plain data files with sources attached; the timeline and what-if engines are pure functions with unit tests (date math, eligibility, the consequence calculator). Four languages (English, Spanish, Vietnamese, Chinese); the Vietnamese and Chinese are first drafts awaiting a native speaker's review, and anything untranslated is labeled and shown in English. County ILP, extended foster care, and THP-Plus contacts for all 58 counties are bundled from the CDSS list with the date they were pulled. Installable as an offline web app; deployed from GitHub Pages.",
  },
  {
    title: "AI use and authorship",
    body: "I planned this app and sketched every screen, and I used AI tools in a supporting role to build it. The Congressional App Challenge asks for that to be disclosed fully. Claude (Anthropic) helped solve techincal problems and translate into Spanish, Vietnamese, and Chinese. ChatGPT made the logo artwork from my description. I chose the problem and the scope, decided what the app should do and how it should look, created/reviewed and changed the code. The complete record is in AI_ASSISTANCE_LOG.md in the repository, next to the git history.",
  },
];

export const extraSources = [
  { name: "Human Rights Watch, My So-Called Emancipation (2010)", url: "https://www.hrw.org/report/2010/05/12/my-so-called-emancipation/foster-care-homelessness-california-youth", note: "quotes and California statistics" },
  { name: "California Policy Lab, Aging Out of Foster Care in Los Angeles (2024)", url: "https://capolicylab.org/aging-out-of-foster-care-in-los-angeles/", note: "the 1 in 4 figure" },
  { name: "CAFO, U.S. Foster Care Statistics", url: "https://cafo.org/foster-care-statistics/", note: "" },
  { name: "Finally Family Homes, Aging Out statistics", url: "https://finallyfamilyhomes.org/the-problem/", note: "" },
];

export const aboutFooter = "Congressional App Challenge 2026 · This app does not collect or transmit any personal information.";
