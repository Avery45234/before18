# Before 18

A free app for foster youth in California who are about to turn 18. It shows what
you are owed, when each thing opens, when it closes, and what one decision would
cost. No account. Nothing leaves your phone. Works without signal.

Live: https://avery45234.github.io/before18/

Built by Avery Updike, 12th grade, Cerritos, for the Congressional App Challenge 2026.

## The problem

About 20,000 young people in the United States age out of foster care every year.
Roughly one in five is homeless the day they leave, and 40 to 50 percent within
eighteen months. Much of that is avoidable with programs that already exist: a
placement and about $1,301 a month until 21 (extended foster care), free Medi-Cal
until 26, up to $5,000 a year for school, priority class registration, transitional
housing until 25, and the legal right to leave care holding your own birth
certificate, Social Security card, and ID. Each one has an age or a date attached,
and several hinge on a single fact, whether you were in foster care on your 18th
birthday, that nobody explains to you in person.

## What the app does

- **Timeline** - your birthdate plus five yes/no/not-sure questions become your own calendar: what is open now, what opens and closes on which date, what you are not eligible for and exactly why, and your milestones by age. Every rule leads with "what this means for you" and keeps the details behind a button.
- **What if** - the same rules with one decision changed, and what falls off the list, with a dollar estimate where one is honest to give.
- **Story** - a year in care as Jordan, a composite built from documented cases; each choice shows its consequence and the real rule behind it.
- **Toolkit** - the rights card, the exit-documents checklist, questions for the transition meeting, six ready-to-send letters, an affordability calculator, a printable flyer with a QR code, and a share screen.
- **Real voices** - people who aged out of care, quoted verbatim from published sources.
- **My plan + calendar** - the next three things to do, and every deadline as a calendar file.
- **County contacts** - your county's ILP, extended foster care, and THP-Plus contacts from the CDSS list.
- **Help** - who to call, starting with the crisis lines.
- English and Spanish, complete and tested for parity; Vietnamese and Chinese as drafts awaiting a native speaker. Installable, works offline.

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
- `src/i18n/` - every sentence the interface shows, in four languages
- `src/ui/` - the screens (React)
- `tests/` - unit tests for the engine, a check that every rule cites a source, and a check that the Spanish is complete

See `AI_ASSISTANCE_LOG.md` for how I used AI tools while building this.

## Guides I followed

Every browser feature I had to look up is listed in [docs/GUIDES.md](docs/GUIDES.md) with the guide's link, and the same link sits in a comment on the code that came from it.

## What users said

[docs/FEEDBACK.md](docs/FEEDBACK.md) records the feedback from foster youth and what changed in the app because of it.

## Where things are

See [docs/EDITING.md](docs/EDITING.md): every folder, every file, and a table of "to change X, open Y".

## Logo files

- `public/mark.png` is the b418 house mark (committed, transparent background). It is used on the home page and in the header.
- The "b418" wordmark next to it is drawn by the app in the two logo blues (`src/ui/Logo.tsx`), so the full logo shows in the header and on the flyer without a second file.
- Optional: if you have the original wide artwork (house plus wordmark as one image), save it as `public/logo.png` and the header and flyer will use that file instead of the drawn wordmark. The `public/icon.svg` app icon can be replaced the same way.

## Site address

The flyer's QR code and the share links use `VITE_APP_URL`. Put the deployed address in a `.env` file (`VITE_APP_URL=https://<you>.github.io/<repo>/`) or as an env var in the deploy workflow. Without it, the flyer uses wherever the app is running from.
