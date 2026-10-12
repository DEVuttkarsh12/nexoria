# Website policies — October 12, 2026

The user requested Privacy Policy, Terms & Conditions, other relevant website policies, and publication of the changes to the existing `main` branch.

## Published scope

The public policy set is `/privacy`, `/terms`, `/cookies`, `/cancellation-refunds` and `/disclaimer`, with an index at `/legal`. Every shared footer links to all six pages above the final wordmark. The enquiry form now includes a plain-language purpose notice and a Privacy Policy link; its fields, validation, delivery recipient and API payload are unchanged.

`legal-data.mjs` owns the policy copy and shared link registry. `legal-pages.mjs` renders body-only pages with dated headings, anchored chapter navigation and related policies. `assets/ui/legal.css` supplies readable desktop and phone layouts. `pages.mjs` delegates legal rendering. The route catalog, sitemap and Vercel redirects include the additions and legacy cookie/refund/cancellation URLs.

The copy describes the implemented form, Resend delivery, Vercel hosting, optional enquiry fields, technical records, retention criteria, rights requests and the actual greeting session-storage key. It distinguishes website terms from accepted project agreements. Cancellation/refund copy does not invent refund percentages, deposits or universal deadlines. The disclaimer identifies supplied case-study claims, conceptual illustrations, the existing calculator assumptions and the need for appropriate AI review.

## Evidence and sources

- Source review: `api/contact.js` sends enquiries to `info@zykken.com` through Resend, with visitor Reply-To; `app.mjs` stores only `zykken_greeting_boot_v3` in sessionStorage for the greeting. No site-installed analytics or advertising tracker appears in the reviewed public runtime.
- [Vercel privacy notice](https://vercel.com/legal/privacy-notice) describes service-generated technical information, including IP addresses and logs. The policy uses qualified language because provider processing depends on configuration.
- [Resend privacy policy](https://resend.com/legal/privacy-policy) and [data processing addendum](https://resend.com/legal/dpa) support the description of the email delivery provider; provider-specific retention periods are not invented.
- [ICO privacy information guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/) was used for disclosure topics, including identity/contact, purposes, recipients, retention and rights. This is not a claim that all UK requirements apply to this business.
- [MeitY data protection framework](https://www.meity.gov.in/data-protection-framework) and the [official PIB summary](https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2190655&lang=2&reg=48) were checked. The framework has phased implementation; the pages do not claim universal statutory compliance or select a governing jurisdiction without confirmation.

## Checks

- Build: 34 pre-rendered documents, comprising 33 public routes and 404.
- Tests: 24 pass. Coverage includes all internal links and fragments, canonicals and headings, legal page discovery and aliases, dates, and privacy notices on each enquiry form without changing the validated payload.
- Native browser: all six legal pages checked at 320, 390, 768 and 1440px (24 checks), with no horizontal document overflow; each has one H1, all six footer destinations, and the wordmark below the links.
- Desktop screenshot inspection covers the legal hub and Privacy Policy; phone inspection covers the Cookie & Storage Policy and native chapter navigation. The contact form's privacy link opens the expected policy. The privacy rights anchor resolves to `/privacy#rights`.
- Rapid test navigation produced one browser-generated view-transition abort message; the checked pages and links still rendered. No application exception or contact request was triggered.
- Local browser evidence stays in the preview export's `docs/legal-proof/` folder, outside the publication checkout.

## Limits and business details

The confirmed identity is the Zykken brand and `info@zykken.com`. A registered legal entity, postal address, governing jurisdiction, fixed data-retention schedule and project refund schedule were not supplied. No such details are invented. The pages are factual website notices and general engagement policies; project-specific terms belong in accepted agreements. They are not a certification of legal compliance. The user was asked for business identity details while independent implementation continued.

No new tracking, consent fields, payment processing, mail routing, credentials or real enquiry submissions are introduced. The prior release is recoverable at Git commit `e893e868eb51412d923e3026f7ff998c3699ea84`. Publication uses the existing GitHub-to-Vercel integration.
