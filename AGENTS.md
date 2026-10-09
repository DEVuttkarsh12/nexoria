# Future work in Zykken New

This is the authorized redesign workspace: `/home/uttkarsh/Downloads/Zykken New`. The user explicitly asked to preserve the original and work separately. Keep `/home/uttkarsh/Downloads/nexoria-main` and `/home/uttkarsh/Downloads/Zykken Checkpoint 2026-10-08` unchanged unless the user requests otherwise.

The repository checkout for publication is `/home/uttkarsh/Downloads/Zykken GitHub`, with origin `https://github.com/DEVuttkarsh12/nexoria.git`. On October 9, the user authorized replacing the old website in that repository and pushing the verified redesign to its default branch, `main`. Use that checkout for Git operations; the separate `Zykken New` folder is the local preview/source copy.

## Context to preserve

- Correct brand: **Zykken**, explicitly confirmed by the user. Initial speech said “Zycon”; existing archive filenames may retain that spelling.
- Existing domain: `zykken.com`, live at `https://www.zykken.com/`.
- Existing mailbox and fixed contact recipient: `info@zykken.com`. Do not invent or silently substitute an email, domain, address, phone or social account.
- Current visual reference: `https://agen-ai.framer.website/`, explicitly replacing Axonix on October 9, 2026. Recreate the chrome/orange hero, floating tool tiles, raised light surfaces, editorial work cards, process/metric/testimonial slides and spotlight dark sections. The template has one home page and four work details; Zykken retains its 19 native routes with that design language. Keep its actual business content and original logo.
- Five services, six case studies and existing client/team identities are preserved. On October 9, 2026, the user explicitly removed all fixed packages and published price tiers: **every service and ongoing support are custom-quoted**. Do not restore old pricing cards, package selectors, monthly tiers or Pricing navigation. Historical offers remain only in the original audit records.
- Original claims and testimonials are supplied website content, not independently audited evidence. Do not fabricate new results, client photos or verification claims.

Read `README.md`, `docs/ORIGINAL_SITE_CONTEXT.md`, `docs/AGEN_REFERENCE.md`, `docs/AGEN_INNER_REFERENCE.md` and the latest verification report before substantial work. `docs/original-content.json` is the original structured content record; `content.mjs` is the current rendering data. The original contact setup notes remain in `docs/CONTACT_SETUP.md` and describe the older preview port.

## Implementation contracts

- The main website is dependency-free pre-rendered HTML with progressive enhancement, not a React, Next.js or Framer application.
- `layout.mjs` owns the complete HTML document and shared UI helpers. `home.mjs` and `pages.mjs` return **body-only markup**. Do not nest documents or duplicate shared card implementations.
- Shared case and insight cards are exported from `home.mjs`. Keep homepage and inner-page card styling consistent.
- Edit source modules and `site.css`, not `dist/`. `scripts/build.cjs` recreates `dist/` with 19 pages and copies local assets.
- Routes and aliases live in `scripts/build.cjs`; production clean URLs/detail rewrites live in `vercel.json`. Keep both consistent.
- Use optimized `assets/agen/optimized/` artwork. Originals and exact provenance are retained in `assets/agen/provenance.json` and `docs/agen-reference/optimized-assets.json`. `caseVisual(c)` returns a src string for conceptual editorial illustration, not a client interface screenshot. The build copies only assets referenced by generated HTML and CSS; retain research sources outside production output.
- Preserve service anchors `#automation`, `#voice`, `#web`, `#software`, `#crm`; inquiry anchor `#start`; and About testimonials anchor `#voices`. Custom proposals use `/custom-quote`; legacy `/pricing` and `/pricing.html` resolve there.
- Keep content readable without JavaScript. FAQs are native `details`/`summary`; reveals are enhancement-only. Honor reduced motion and maintain keyboard access.
- The old multilingual greeting loader is restored with a white grain theme. Its markup and fail-open bootstrap are shared in `layout.mjs`, behavior is in `app.mjs`, and styling is in `site.css`. Preserve Skip/Escape, reduced-motion bypass, shorter repeat visits, focus/inert restoration and the independent timeout. Read `docs/GREETING_LOADER.md` before changing it.
- The current service catalog is in `offers.mjs`: Flowback, Carryline, IntentPath, PreviewOps and PledgeDesk. Keep the plain-language categories and concrete signature features with these names across home, services, forms and footer. `docs/SIGNATURE_SYSTEMS.md` explains their custom-build scope; do not advertise the illustrated client systems as live SaaS products or invent exclusivity/client results. Preserve the existing API values and fragment IDs.

## Contact contract

Preserve `/api/contact` and its validated fields: `name`, `email`, optional `phone`, `need` (`automation`, `website`, `voice`, `software`, `crm`), optional `message`, and hidden honeypot `company_site`. Never show success until the provider accepts a message. Preserve entered values on failure and provide a direct email alternative.

`RESEND_API_KEY` and `RESEND_FROM_EMAIL` are server-only configuration. No credentials should enter source, client modules, build output or logs. Keep local environment files untracked. Use mocked tests for routine verification; do not send real production inquiries as a side effect of checking the site. No booking/calendar service is currently connected; consultation CTAs lead to the audit form.

## Verification and resume

- Preview: `npm run dev` at `http://127.0.0.1:4180`.
- Build: `npm run build`.
- Relevant tests: `npm test`.
- For source/template visual work, compare actual rendered pages at desktop, tablet and phone widths. Check page overflow, navigation, card layout, artwork sizing, filters, ROI, loader behavior and form errors. Report checks actually performed.
- The current Agen checks are recorded in `docs/AGEN_VERIFICATION.md`: 19 generated pages, seventeen passing tests, all 19 routes checked at 320, 390, 768, 1024 and 1440 CSS pixels, actual slider/form/FAQ/navigation/ROI checks and tablet cover spacing corrections. Older reports describe earlier versions. Real email delivery remains untested.
- Keep a recoverable checkpoint before broad future visual changes. The user has explicitly authorized this Agen redesign and a push to main for the existing automatic Vercel deployment; no additional release approval is required. Do not alter mail routing or domain configuration without a request. Pre-Agen recovery: `/home/uttkarsh/Downloads/Zykken Before AgenAI 2026-10-09.tar.gz`.
