# Zykken redesign verification — October 8, 2026

The redesign is complete as a local, custom-coded website in `/home/uttkarsh/Downloads/Zykken New`. The original 41-file project remains unchanged in `/home/uttkarsh/Downloads/nexoria-main`; all original file hashes match the checkpoint manifest. The original source, homepage preview, business context and full Axonix reference capture are preserved in `/home/uttkarsh/Downloads/Zykken Checkpoint 2026-10-08`.

## Build and source checks

- `npm run build` successfully generates 19 public documents, assets, robots and sitemap.
- `npm test`: 9 of 9 tests pass. Coverage includes the original contact handler, provider failure/success mocks, inquiry validation, route aliases and ROI arithmetic. No real email is sent by the suite.
- Syntax checks pass for `app.mjs`, `layout.mjs`, `home.mjs` and `pages.mjs`.
- Generated pages contain one document, head and body each; local routes, assets and fragment links were checked.
- Static output excludes server API source, rendering modules, documentation, scripts and environment files.

## Browser checks

Desktop comparisons used the live Axonix reference and the rendered Zykken preview at 1440px. The reaching-hands asset, wave backgrounds, Geist type, gradient headings, button styling, card surfaces and major section geometry were compared directly. Hero heading top is 214px and content width is 1016px at that viewport. Desktop feature cards are 432px tall. The about illustration, process panel, horizontal case slider, testimonials, FAQs and final CTA were visually inspected.

Responsive checks used 320px, 390px, 768px, 1024px and 1440px widths. At 390px, the home, about, services, work, pricing, contact, insights, representative case detail, representative article and privacy pages were checked for horizontal overflow, broken images and console errors. At 320px, 768px and 1024px, home, services, pricing, contact and a representative case detail were checked. Narrow-screen grid and image sizing issues discovered on home and case details were corrected and rechecked. No horizontal page overflow remained in those checks.

Interactive checks completed:

- Case carousel advances horizontally with its navigation control.
- Native FAQ accordions expand and display their answers.
- The Voice AI work filter returns its matching project and updates the visible count.
- Complete Sales System recommends the original Revenue System package starting at $4,000.
- Changing the ROI slider updates hours saved and the monthly/yearly calculations.
- Phone navigation opens, routes to contact and closes. Keyboard focus cycles within the open menu; Escape closes it and restores focus to the menu control.
- Empty contact submission displays field errors. A synthetic local inquiry without credentials receives the expected unavailable response, preserves entered values and exposes the direct-email fallback. No real message was sent.
- No unexpected browser console errors appeared in the checked pages. The unavailable local contact response is an expected configuration state.

Reduced-motion behavior is implemented in CSS and JavaScript; an emulated reduced-motion browser session was not part of these checks. Representative routes were used for responsive detail-page checks rather than every detail at every width.

## Preview and remaining configuration

Run `npm run dev` and open `http://127.0.0.1:4180/`. Watch mode restarts on imported-module edits; refresh the browser to view changes.

Real email delivery requires an authorized server-only `RESEND_API_KEY` and a verified `RESEND_FROM_EMAIL` sender. The recipient remains `info@zykken.com`. Calendar booking is not connected; audit CTAs lead to the inquiry form. No deployment or domain replacement was performed. Vercel configuration is provided, but hosted clean-URL routing and delivery need to be checked on an actual deployment.

The project retains the original business content, prices, clients and supplied claims. It adds three explanatory insight articles derived from those services and concise legal overview pages. Those legal overviews describe the current site, rather than constituting a reviewed contract or an independently verified policy.

## Saved previews

- `previews/home-desktop.jpg` — finished desktop hero, 1440px viewport.
- `previews/home-mobile.jpg` — phone homepage.
- `previews/contact-mobile.jpg` — phone inquiry page.

These previews and the source/context records are durable files for future redesign work.
