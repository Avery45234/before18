# How this project is laid out, and where to change things

Everything you would want to edit is in one of three places:

| I want to change... | Open this |
|---|---|
| Any sentence the app shows, in any language | `src/i18n/strings.ts` |
| A rule, a dollar amount, a date, a source | `src/content/benefits.ts` |
| The rights list | `src/content/rights.ts` |
| The exit documents checklist | `src/content/documents.ts` |
| The six ready-to-send letters | `src/content/letters.ts` |
| Meeting questions | `src/content/meeting.ts` |
| Jordan's story, month by month | `src/content/story.ts` |
| The real quotes and the reading list | `src/content/voices.ts` |
| Phone numbers on the Help page | `src/content/help.ts` |
| Home page numbers, sources, photo credit | `src/content/home.ts` |
| The printed flyer's words | `src/content/flyer.ts` |
| The About page's paragraphs | `src/content/about.ts` |
| County contacts (from the CDSS list) | `src/content/counties.ts` |
| Colors, fonts, spacing | `src/ui/styles.css` (the `:root` block at the top holds every color) |
| The logo | `public/mark.png` (house), `public/logo.png` (house plus wordmark, optional) |
| The home page photo | `public/hero.jpg` |
| The site address for the QR code and share links | `.env` file, `VITE_APP_URL=...` |

## Folders

```
.
├── index.html                 the one HTML page; loads fonts and src/main.tsx
├── public/                    files served as they are
│   ├── hero.jpg               home page photo
│   ├── mark.png               the house mark, transparent
│   ├── icon.svg               app icon for the home screen
│   ├── manifest.webmanifest   makes the site installable
│   └── sw.js                  makes it work offline after the first visit
├── src/
│   ├── main.tsx               starts React, registers the offline worker
│   ├── config.ts              the public site address
│   ├── i18n/
│   │   ├── strings.ts         EVERY sentence in the interface, four languages
│   │   └── index.ts           useT() gives a screen its strings; pick() picks a language from content
│   ├── content/               THE FACTS. Plain data files, each with sources.
│   │   ├── benefits.ts        the 16 rules: who qualifies, when it opens and closes, worth, how to get it
│   │   ├── rights.ts          12 rights with the law behind each
│   │   ├── documents.ts       8 exit documents
│   │   ├── letters.ts         6 messages to send
│   │   ├── meeting.ts         questions, matched to rules by id
│   │   ├── story.ts           the composite story (7 scenes, choices, outcomes)
│   │   ├── voices.ts          real quotes, as published
│   │   ├── help.ts            phone lines
│   │   ├── home.ts, flyer.ts, about.ts   words for those three pages
│   │   ├── counties.ts        57 counties of contacts, parsed from CDSS
│   │   └── translations.ts    Spanish/Vietnamese/Chinese for content that has them
│   ├── engine/                THE MATH. No React here. All tested.
│   │   ├── dates.ts           age on a date, date at an age, days between
│   │   ├── timeline.ts        rules + profile -> what is open, upcoming, closed, ineligible, unsure
│   │   ├── whatif.ts          same timeline with one fact changed, and the difference in dollars
│   │   ├── plan.ts            the next three things to do
│   │   └── ics.ts             calendar file export
│   ├── model/
│   │   └── profile.ts         the person's answers; saved on the phone only
│   └── ui/                    THE SCREENS.
│       ├── App.tsx            routes (#/timeline, #/story, ...) and the header + bottom nav
│       ├── styles.css         all styling; colors at the top
│       ├── icons.tsx          the line icons
│       ├── Logo.tsx           the mark and wordmark
│       ├── Ribbon.tsx         the 14-to-26 chart on the timeline
│       ├── CountyCard.tsx     your county's contacts
│       ├── parts/             SHARED PIECES. Use these instead of raw markup.
│       │   ├── Button.tsx     <Button href|onClick kind size icon>   every button and button-link
│       │   ├── PageHead.tsx   <PageHead title lead action>           the top of every inner page
│       │   ├── Door.tsx       <Door href icon title text>            a card that is a link
│       │   └── SectionTitle.tsx                                      small uppercase section label
│       └── screens/           one file per page
│           Home, Setup, Timeline, WhatIf, Story, Toolkit, Rights, Documents,
│           Meeting, Afford, Letters, Voices, Help, About, Share, Flyer
├── tests/engine.test.ts       28 tests: dates, eligibility, what-if, content hygiene, languages
├── docs/                      demo script, outreach, authorship checklist, design references
└── .github/workflows/         deploys to GitHub Pages on push
```

## The rules of the house

- **No sentence in a screen file.** If a screen needs words, they go in `strings.ts` (four languages) or a `content/` file. A screen file is layout only.
- **No raw `<button>` or `className="btn"`.** Use `<Button>`. Kinds: `primary` (default), `ghost`, `light`, `outline`, `danger`, `alt`. Sizes: `big`, `small`.
- **Every inner page starts with `<PageHead>`.** The small blue label above it comes from `strings.labels`, keyed by route, so you do not add it yourself.
- **Every number has a source.** In `benefits.ts` each rule carries `sources: [{ name, url, retrieved }]`. The tests fail if one is missing.
- **Adding a language string:** add the key to `en`, then to `es`, `vi`, and `zh`. The test suite checks that all four have the same keys.

## Adding a page

1. Make `src/ui/screens/NewPage.tsx` that returns `<div><PageHead title={...} /> ... </div>`.
2. In `App.tsx`: add the route name to `Route` and `ROUTES`, and one line in the `<Shell>` that renders it.
3. In `strings.ts`: add `labels.newpage` in all four languages, plus any words the page uses.
4. Link to it from the Toolkit (`Toolkit.tsx`, one line in a group) or the home page.

## Running it

```
npm install
npm run dev          http://localhost:5173
npx vitest run       the tests
npx tsc --noEmit     the type check
npm run build        the deployable site in dist/
```
