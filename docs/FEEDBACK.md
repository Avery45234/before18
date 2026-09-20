# User feedback and what changed because of it

The Congressional App Challenge asks whether real users shaped the app. This is the
record. Each row is one thing a user said, what we changed because of it, and where.

## Round 1: foster-youth feedback via Kate (September 2026)

Kate reviewed the app with young people who had been in foster care and passed
their feedback on. Their comments, in the order we took them:

| What users said | What changed | Where in the code |
|---|---|---|
| The content is overwhelming. Some pages are too text-heavy to scan. | Every rule on the timeline now leads with a "What this means for you" box: one plain sentence about this person's situation (open now until a date, opens on a date, not available and why), then the short summary, then a "Full details" button that hides the how-to steps, the exact dates, and the sources until asked for. The What-if screen got an "In short" line under each decision. The exit-documents checklist became one card per document with "Where to get it" behind a button. The About page became cards. | `src/ui/screens/Timeline.tsx`, `WhatIf.tsx`, `Documents.tsx`, `About.tsx`, `styles.css` (`.for-you`, `.details-toggle`, `.in-short`, `.doc-card`, `.about-card`) |
| Long paragraphs should be visual blocks, not walls of text. | Same change as above. No substance was removed; it moved behind the button or into a card. | same |
| The text is too small on a phone. | Body text went from 16px to 17px, leads to 18px, notes and small labels from 12-14px to 13-15px, buttons to 15-18px, the bottom nav to 12px. Headings grew one step so the hierarchy (title, summary, detail) reads at a glance. | `src/ui/styles.css` (`:root` and the size rules) |
| The timeline is useful; keep it, and make the age progression clearer. | New "Your milestones, by age" section on the timeline: every age that matters for this person (14, 16, 90 days before 18, 18, 21, 25, 26 as applicable), with the real date, days until it, what opens and what ends at that age, and a "Next up" marker. The 18th birthday is highlighted. Built from the same rules as the timeline so they can never disagree. | `src/engine/milestones.ts`, `Timeline.tsx` (`MilestoneRow`) |
| The Spanish version has English in it and is incomplete. | Audited every sentence. 35 pieces of content had no Spanish (rule notes, where to get each document, help-line hours) and the whole About page was English only. All translated. A test now fails the build if any sentence the app shows lacks Spanish or is just the English again, so it cannot regress. Letter placeholders ("[your name]") are now in Spanish too. | `src/content/benefits.ts`, `documents.ts`, `help.ts`, `about.ts`, `letters.ts`, `tests/spanish.test.ts`, `scripts/es-audit.ts` |
| "Why I built it" is hard to find and inconsistent. | It is now its own page at one address, `#/why`, named "Why I built this" everywhere. It is in the top menu on desktop and in a footer on every page on phones (the footer also carries Voices, About, Share). The home page keeps a short version with a "Read the full story" link. | `src/ui/screens/Why.tsx`, `App.tsx` (route, menu, footer) |
| Add a photo of the student so it feels made by a person, not a generic site. | Avery's photo is on the "Why I built this" page, with a one-line bio. Not repeated elsewhere. | `public/avatar.jpg`, `src/ui/parts/Avatar.tsx`, `Why.tsx` |
| The AI disclosure should be clear and specific about what the student built, what tools helped, and how information was checked. | The About page's "AI use and authorship" section now has exactly those three parts, in English and Spanish. | `src/content/about.ts`, `AI_ASSISTANCE_LOG.md` |

## How to add the next round

Copy the table, add the date and who gave the feedback, and for each row say what
they said, what changed, and the file. Keep it to one line per row. Link the commit
if you can.
