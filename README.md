# Before 18

California’s foster youth deserve, opening time, closing time, and the price of one choice. 
No record, nothing comes out of the phone, works without signal.

Built for the Congressional App Challenge 2026.

## The problem

20,000 adolescents in America "age out" of the foster care system annually.
Approximately one in five is homeless upon exiting; up to 40 to 50 percent within
eighteen months. Much of this could be avoided through funding and systems that already exist:
placement and around $1,301 monthly until age 21 (extended foster care), Medi-Cal for
life until age 26, up to $5,000 annually for schooling, preference registration,
transitional housing until 25, and the legal right to leave in possession of your own
birth certificate, Social Security number, and ID. Each comes with either an age or
date of eligibility attached, while several hinge on a single qualification - whether
or not you were in foster care on your 18th birthday - that nobody tells you
personally.

## What the app does

- **My timeline** - using your birthdate and answering a handful of yes/no/maybe questions: what's open to you, when what opens/closes (counting days), and what you are not eligible for and exactly why.
- **What if** - run the rules above but switch one decision, and show how that affects what falls out of eligibility, with a good-faith dollar value estimate where applicable.
- **Rights** - the California Foster Youth Bill of Rights, and the federal transition rights, with the legal basis for each. Printable.
- **Documents** - the list of exit documentation mandated by federal law, and how to get each document and how much it would cost to replace it.
- **Help** - who to call, starting with hotlines.
- **Walkthrough** - walk a year as a foster youth; every decision reveals its consequence and the law behind it.
- **My plan + calendar** - the top three next steps, and all deadlines as a calendar file.
- **County contacts** - your county's ILP / extended foster care / THP-Plus contacts, from the CDSS list.
- English, Spanish, Vietnamese, Chinese (last two are preliminary drafts). Installable, offline.

## Accuracy

Federal law plus California. Every rule links to the official source it came from and
the date it was checked (`src/content/benefits.ts`). Dollar figures are the published
2025-26 numbers and will change. This is a map, not legal advice; the app says
"confirm with your caseworker or ILP coordinator" next to anything with a deadline.

## Running it

```
npm install
npm run dev        # http://localhost:5173  (add ?demo=1 to load a sample profile)
npm test           # date math, eligibility, what-if, and content-hygiene tests
npm run build
```

Deploys to GitHub Pages automatically on push (`.github/workflows/deploy.yml`).
See `docs/` for the demo video script, the expert-review outreach message, and the
authorship checklist.

## How it is put together

- `src/content/` - the rules, rights, documents, and help lines as plain data with sources
- `src/engine/` - pure functions: date math, the timeline builder, the what-if calculator
- `src/i18n/` - UI strings in English and Spanish
- `src/ui/` - the screens (React)
- `tests/` - unit tests for the engine and a check that every rule cites a source

See `AI_ASSISTANCE_LOG.md` for how I used AI tools while building this.

## Guides I followed

Every browser feature I had to look up is listed in [docs/GUIDES.md](docs/GUIDES.md) with the guide's link, and the same link sits in a comment on the code that came from it.

## Where things are

See [docs/EDITING.md](docs/EDITING.md): every folder, every file, and a table of "to change X, open Y".

## Logo files

The b418 artwork is not committed as code. Put the two PNGs in `public/`:

- `public/logo.png` : the house mark with the `b418` wordmark (used in the header and the flyer)
- `public/mark.png` : the house mark alone, square with a transparent background (in place; used on the home page and, until logo.png exists, in the header)

If either file is missing the app draws the same mark as an SVG, so nothing breaks.

## Site address

The flyer's QR code and the share links use `VITE_APP_URL`. Put the deployed address in a `.env` file (`VITE_APP_URL=https://<you>.github.io/<repo>/`) or as an env var in the deploy workflow. Without it, the flyer uses wherever the app is running from.
