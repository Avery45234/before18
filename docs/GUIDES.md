# Guides I followed

I am a high school student and I learned most of the browser features in this app
from the pages below. Where a piece of code was copied from a guide, the file says
so in a comment at the top of that piece, with the same link. This table is the
full list so nothing is hidden.

"Copied" means I took the guide's code and changed names or small details.
"Adapted" means I followed the guide's approach but wrote the code for my case.

| Where in the app | What it does | Guide | Copied or adapted |
|---|---|---|---|
| `public/sw.js` | Works offline | [MDN: Offline service workers (js13kGames tutorial)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers) | Copied, with one change: network first, then cache |
| `src/engine/download.ts` | Saving a file from the page | [MDN: URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static) | Copied |
| `src/engine/ics.ts` | The calendar (.ics) file format | [iCalendar.org: VEVENT component](https://icalendar.org/iCalendar-RFC-5545/3-6-1-event-component.html) | Adapted (the field names and the line order come from the spec) |
| `src/ui/screens/Share.tsx` | Share sheet on phones | [MDN: Navigator.share](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) | Copied |
| `src/ui/screens/Share.tsx`, `Letters.tsx` | Copy to clipboard | [MDN: Clipboard.writeText](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) | Copied |
| `src/ui/screens/Share.tsx` | Drawing the rights card image | [MDN: Canvas tutorial, drawing text](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text) and [MDN: canvas.toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) | Adapted |
| `src/ui/screens/Share.tsx` (`wrapText`) | Wrapping text on a canvas | [Stack Overflow: Text wrap in a canvas element](https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element) | Copied |
| `src/ui/screens/Home.tsx` (`Count`) | The number that counts up | [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame), [easings.net easeOutCubic](https://easings.net/#easeOutCubic), [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | Adapted; the easing formula is copied |
| `src/ui/App.tsx` | Page switching with `#/timeline` style links | [MDN: hashchange event](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) | Adapted |
| `src/i18n/index.ts` | Giving every screen the current language | [react.dev: Passing data deeply with context](https://react.dev/learn/passing-data-deeply-with-context) | Copied the pattern |
| `src/model/profile.ts`, `src/i18n/index.ts` | Remembering answers on the phone | [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Copied |
| `src/ui/screens/Flyer.tsx` | The QR code | [node-qrcode README](https://github.com/soldair/node-qrcode) | Copied the `toDataURL` example |
| `src/ui/Logo.tsx` | Falling back to a drawing if a PNG is missing | [MDN: error event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/error_event) | Adapted |
| `src/ui/screens/Letters.tsx` | Reading `?l=docs` from the address | [MDN: URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) | Copied |
| `src/ui/screens/Letters.tsx` | "Send as text" and "Send as email" links | [MDN: Creating links, email links](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links) | Adapted (`sms:` works the same way as `mailto:`) |
| `src/engine/dates.ts` (`fmtDate`) | Dates in four languages | [MDN: Date.toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) | Copied |
| `src/ui/Ribbon.tsx` | The 14-to-26 chart, drawn as SVG | [MDN: SVG from scratch](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch) | Adapted |
| several screens | `useMemo` (remember a result until its inputs change) | [react.dev: useMemo](https://react.dev/reference/react/useMemo) | Copied the pattern |
| `vite.config.ts`, `.github/workflows/deploy.yml` | Putting the site on GitHub Pages | [Vite: Deploying a static site, GitHub Pages](https://vite.dev/guide/static-deploy) | Copied |
| `src/config.ts` | Reading `VITE_APP_URL` | [Vite: Env variables](https://vite.dev/guide/env-and-mode) | Copied |
| `tests/engine.test.ts` | How the tests are written | [Vitest: Getting started](https://vitest.dev/guide/) | Copied the pattern |
| everything in React | How components, state, and props work | [react.dev: Tutorial, tic-tac-toe](https://react.dev/learn/tutorial-tic-tac-toe) | This is where I learned it |

Everything not in this table (the date math, the eligibility rules, the what-if
calculator, the story, the content files) is plain logic I wrote from the rules
themselves, with the legal sources cited inside `src/content/benefits.ts`.
