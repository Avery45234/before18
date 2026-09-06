# Before 18

What foster youth in California are owed, when it opens, when it closes, and what
one decision costs. No account, nothing leaves the phone, works without signal.

Built for the Congressional App Challenge 2026.

## The problem

About 20,000 young people age out of foster care in the U.S. every year. Roughly one
in five is homeless the day they leave; 40 to 50 percent within eighteen months.
A lot of that is avoidable and already paid for: a placement and about $1,301 a month
until 21 (extended foster care), free Medi-Cal until 26, up to $5,000 a year for
school, priority registration, transitional housing to 25, and the legal right to walk
out holding your own birth certificate, Social Security card, and ID. Every one has an
age or a date attached, and several turn on a single fact - were you in care on your
18th birthday? - that nobody explains to the person it happens to.

## What the app does

- **My timeline** - from your birthdate and a few yes/no/not-sure answers: what is
  open for you now, what opens and closes when (with day counts), and what you are
  not eligible for and exactly why.
- **What if** - runs the same rules with one decision changed (leave at 18, exit
  before your 18th birthday, skip the FAFSA, leave without documents) and shows what
  falls off the list, with a dollar estimate where one is honest to give.
- **Rights** - the California Foster Youth Bill of Rights and the federal transition
  rights, each with the law behind it. Printable.
- **Documents** - the exit-documents checklist federal law requires, with where to
  get each one and what it costs to replace.
- **Help** - who to call, urgent lines first.
- **Story** - walk a year in a foster youth's shoes; every choice shows its real consequence and the law behind it.
- **My plan + calendar** - the next three things to do, and every deadline as a calendar file with reminders.
- **County contacts** - your county's ILP / extended foster care / THP-Plus contacts, from the CDSS list.
- English, Spanish, Vietnamese, Chinese (the last two are drafts awaiting native-speaker review). Installable, offline.

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
