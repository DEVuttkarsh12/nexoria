# Custom quoting and repository replacement — October 9, 2026

The user authorized replacing the website in `DEVuttkarsh12/nexoria` with this redesign and removing all published packages. All services and ongoing support now receive custom quotes. The original local folder and October 8 recovery checkpoint remain preserved; a snapshot of the redesign before this change is saved separately as `Zykken New Before Custom Pricing 2026-10-09.tar.gz` in Downloads.

## Current behavior

- Pricing links are removed from desktop navigation, phone navigation and the footer.
- Homepage package cards are replaced by the custom-quote process and a working quote CTA.
- The four build packages, four monthly tiers, package selector and their client-side code/data are removed from the active site.
- `/custom-quote` explains scope, investment and support, then provides the inquiry form. The old `/pricing` and `/pricing.html` URLs resolve to that page; Vercel redirects are configured.
- FAQs, terms, structured metadata and project instructions now describe custom quotations. Original audit records retain historical offers for context only.

## Verification

- Build generates 19 documents. All ten automated tests pass, including a regression check across every public content page for retired package offers and Pricing navigation, plus the legacy route and inquiry form contract.
- Generated-document checks resolve 144 asset references, 549 local links and 129 fragments with no errors. Every page contains one HTML/head/body. Server API source, environment files, documentation and rendering modules are excluded from static output.
- All 19 pages, including six case studies, three articles and 404, were checked through the browser at **320px, 390px, 768px, 1024px and 1440px**: 95 page/viewport combinations. No horizontal page overflow, broken loaded images or overflowing form controls were found. Local asset references are checked separately against generated output.
- Smartphone menu opens, cycles keyboard focus, and closes with Escape. Its link list contains Home, About us, Services, Work and Contact.
- The homepage custom-quote CTA reaches `/custom-quote#start`, where the form is present. Empty submission highlights name/email errors. No real inquiries were submitted.
- The Voice AI filter shows one matching project and updates the count. The carousel advances, and the custom-quote FAQ expands.
- ROI controls update correctly: changing weekly hours from 30 to 31 at $25/hour displays $2,685 estimated monthly recovered value. These amounts estimate time value; they are not agency prices.
- Browser warning/error logs were empty during the checks. API delivery is covered by mocked tests; real delivery still depends on the existing Resend environment configuration.

Hosted clean-URL behavior and real email delivery cannot be confirmed from a local preview. No credentials are included in the repository. Deployment configuration is retained in `vercel.json`, with browser assets in generated `dist/` and the serverless handler at root `api/contact.js`.

Current responsive results and screenshots are saved in `docs/previews/`. The October 8 report documents the earlier version and its package-fit check, which has now been removed.
