# Before 18 - demo video script (target 2:30, max 3:00)

Record on a phone screen (portrait) with a laptop cut-in for the code. Talk plainly.
Say your name, the app name, who it is for, and the tools in the first 20 seconds -
the rules require it, and judges check.

| Time | On screen | Say |
|---|---|---|
| 0:00-0:15 | Home page, the door, your face in a corner | "I'm Avery. This is Before 18, an app for teenagers aging out of foster care in California. About 20,000 young people age out every year. One in five is homeless the day they leave. Built with TypeScript and React." |
| 0:15-0:35 | Scroll to "Why I built this" | "I started by researching what pushes people into homelessness, and I kept finding the same group nobody talks about. Then I read the laws: a place to live and $1,301 a month until 21, free Medi-Cal until 26, thousands for school. It all exists. It all depends on dates." |
| 0:35-1:00 | Setup: birthdate, tap "Not sure" once, save. Timeline: countdown "212 days", the plan, the ribbon | "You answer five questions. 'Not sure' is always allowed. The app turns your birthdate into your timeline: what is open now, what opens and closes when, and the three things to do next. Every rule links to the law and the date I checked it." |
| 1:00-1:30 | What if -> "Leave the system before my 18th birthday" | "This is the part that matters most. Say your aunt offers guardianship and the court can close your case a few days before your birthday. Watch what disappears: Medi-Cal to 26, extended foster care, THP-Plus housing. Same love, different date, and the app shows it before the decision, not after." |
| 1:30-1:55 | Story: first scene, one choice, the rule card | "For people who are not in care, the Story mode walks you through Jordan's year. Every choice shows the real consequence and the real rule." |
| 1:55-2:15 | Toolkit: Documents checklist, Add to calendar (show the .ics opening in the phone calendar), language switch to Español then Tiếng Việt | "Then the tools: the exit documents federal law requires, questions to bring to the meeting, a rent reality check, and every deadline into your calendar with a reminder. Four languages. No account. Works offline." |
| 2:15-2:40 | Laptop: `src/content/benefits.ts` with a source block, `tests/engine.test.ts`, run `npm test` (23 green) | "Under the hood the rules are plain data with sources attached. Pure functions build the timeline and the what-if. Tests cover the date math, including leap-day birthdays, the 18th-birthday rule, and a check that every rule cites a source." |
| 2:40-2:55 | Flyer page, then back to the countdown | "I built it to be handed to a 16-year-old at their first ILP meeting and again 90 days before 18. [If you have it: 'Reviewed by ___ at ___.'] It is a calendar for the year nobody hands you one." |
| 2:55-3:00 | Title card: Before 18, URL, "AI assistance disclosed in the repository" | (silence, or "Thank you.") |

Notes
- Show the AI disclosure line on the end card and say "I used AI tools for research and translation drafts; the disclosure is in the repository."
- Do the What-if segment slowly. It is the one thing a judge should remember.
- If a reviewer or a real user gave you a quote, put it on screen at 2:40.
