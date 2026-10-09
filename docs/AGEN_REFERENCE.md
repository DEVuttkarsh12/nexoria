# AgenAI reference capture — October 9, 2026

The current authorized visual reference is [AgenAI](https://agen-ai.framer.website/), replacing the earlier Axonix reference. The user asked for its complete custom-coded design, components, animation behavior and page layouts with Zykken's text and identity, in the existing redesign folders, then an authorized GitHub push. Keep Zykken's five named signature offers, genuine contact details, existing client/case/team content and custom-quote policy. Template demo client numbers, prices, names, awards, addresses and social destinations are visual placeholders and must not become Zykken claims.

## Durable captures

`docs/agen-reference/home.html` is the fetched published HTML (1.4 MB), `home.css` its embedded CSS (363 KB). `rules.json` flattens 1,120 CSS rules with their media-query contexts. `section-structure.json` links each section's named nodes to its exact CSS. `typography.json` contains the text preset rules and responsive changes. `appear-animations.json` is the server-exported initial animation data. `component-motion.json` records 208 source snippets tied to component classes, useful for checking individual behaviors. Published Framer source modules are captured in this folder for research; the custom site must remain native HTML/CSS/JavaScript rather than shipping Framer's runtime.

`assets-inventory.json` records all 65 home image resources. `assets/agen/provenance.json` records downloaded reference artwork/fonts, source URLs, original hashes and intended use. No template portrait, testimonial avatar or client/award logo was imported into the usable asset folder. The full original preview HTML naturally retains its demo identity for reference only.

## Routes

The preview is a single long home page. Its navigation uses anchors, rather than separate About/Services/Pricing/Contact documents:

- `/` and `/#home`
- `/#about`
- `/#services`
- `/#works`
- `/#pricing` (must adapt to Zykken's custom quote section)
- `/#contact`
- `/work/support-copilot`
- `/work/underwriting-risk-copilot`
- `/work/clinical-note-summarizer`
- `/work/catalog-intelligence-engine`
- `/404`

The existing Zykken routes may remain as native inner pages using this design language; work detail layout should map to existing genuine Zykken cases. Template demo case titles and results are not Zykken content.

## Tokens and typography

Layout breakpoints are desktop `>=1440px`, tablet `810–1439.98px`, phone `<810px`. Several typography presets change at `1200px`, so layout and font breakpoints differ. Body background `#edecec`, white panels `#ffffff`, light raised cards `#f4f4f5`/`#f5f5f5`, black section `#000000`, dark raised panels `#18181b`, button `#272727`. Text `#09090b` with dark gradient `#43484d`→`#292c2e`; muted `#71717a`; accent `#fd3a25`.

Urbanist is the main typeface: exact static normal 400/500/600/700 font files downloaded from the original template's fontshare resources as `urbanist-400.woff2` etc. Figtree 500 is auxiliary (template mobile menu/time components); `figtree.woff2` is local. License files accompany fonts.

| Text role | Large desktop | Intermediate | Phone |
| --- | --- | --- | --- |
| Hero H1 | 96px/96px, 600, -2.88px | 82px/82px, -1.8px at 810–1439 | 32px/40px, -0.96px |
| Most H2 | 72px/72px, 600, -2.16px | 42px/50px, -0.96px at 810–1199 | 40px/48px, -1.2px |
| About H2 | 72px/72px, 600, -2.16px | 58px/72px at 810–1439 | 40px/48px, -1.2px |
| Open service H3 | 48px/56px, 600, -0.96px | 42px/50px, -0.84px at 810–1199 | 26px/34px, -0.52px |
| Work/service/process title | 36px/48px, 600, -0.36px | 27px/39px, -0.27px at 810–1199 | 26px/34px, -0.26px |
| Card title | 24px/32px, 600 | 24px/32px | 20px/26px |
| Body | 16px/24px, 400 | unchanged | unchanged |
| Button/nav | 16px/24px, 600 | unchanged | unchanged |
| Brand label | 24px/24px, 700, +0.25px | unchanged | unchanged |

Large headings frequently use `background-clip:text` gradients. Pills have 100px radius. Section badges are small light raised rectangles with 8px radius/orange dot; dark-section variants use `#18181b`. Desktop panel radii are normally 40px, small phones 24px in compact components. Many cards and buttons use layered inset top highlights, lower inner shadow, and multiple external shadows for the soft molded look.

## Header and hero

Header is a floating glass capsule, white at 50% and `backdrop-filter:blur(44px)`, radius100. Desktop inner padding `8px 8px 8px 32px`, gap80px between logo/menu/action, menu gap24px. Tablet capsule uses 8px padding and gap30px. Phone switches to brand plus black round hamburger with two horizontal white strokes; expanded menu is a dark overlay with large text links.

Hero outer margin/inset is 16px. Inner max-width1440px, border-radius40px, overflow clipped, padding-top180px. Desktop height is content-driven (approx823–828px), mobile explicitly823px, horizontal inner padding12px. Artwork is `hero-background.jpg` (4224×2460), `object-fit:cover`, desktop `object-position:right center`, phone `64.6% 46.8%`. The reference orange/red edge glow is in this artwork.

Hero order: raised AI agency badge; title first line; second line alongside icon capsule (stacked on mobile); generous92px gap; body description; two pill buttons separated11px (stacked on phone); bottom curved scroll cue. Title group gaps24px/12px. Body group gaps24px; scroll cue gap104px desktop/54px phone.

The bright hero capsule is255×80px (223×70 on mobile), radius100px, gradient `#ba1e0d`→`#ff3b26`, multiple orange glows. Its three white 8px-radius tiles are deliberately clipped by the capsule:

- Tile1: top-27/left55, padding9, graphic54×54, rotate30deg. Mobile top-23 and graphic42.
- Tile2: bottom-21/right42, padding10px15px, graphic34×44, rotate-20deg. Mobile graphic27×35.
- Tile3: bottom-81/left38%, padding12, graphic42×42, rotate19deg, centered with translateX(-50%). Mobile graphic35.

Hero files are `hero-icon-openai.svg`, `hero-icon-claude.svg`, `hero-icon-gemini.svg`, with `agency-tag-icon.svg` and `down-arrow.svg`. Names are convenient local labels; original paths/provenance are preserved.

## Home section sequence and structure

1. **Hero** as above.
2. **About**: max1440/padding120px72px; tablet60px12px, phone50px12px. Heading followed by asymmetric row (left flex1.4/right1), gap24. Left dark globe panel contains green availability dot, location line, CTA and lower cropped globe. Right trust/number card above light quote card. Stack into full-width panels below1440. Use existing Zykken actual content rather than template Trustpilot claims. Globe `about-globe.png` includes the dark environmental background.
3. **Services**: large introductory text and rotating/card illustration beside expandable numbered service rows; open row has H3, short paragraph, three bullet details and graphic. The source has four services; adapt the same component to Zykken's five offers. Art resources `service-strategy.svg`, `service-design.svg`, `service-agent.svg`, `service-data.svg`, and `service-panel.png`. State changes use spring transitions, preserving one open row.
4. **Featured Works**: white contained section, max1440/padding0 56px120px, gap32. Tablet side12px/bottom60; phone side12px/bottom50. Cards are giant full-width image above title and three-column metadata; image hover reveals centered black pill “View Project”. The work art files are reference illustrations only, not client evidence.
5. **Process**: three sequential step slides (01/03,02/03,03/03) with title, description, duration and very large numbers; progress indicator and arrow navigation. Source steps Discover/Prototype/Validate; retain Zykken build process text. Component accommodates desktop/tablet/mobile layouts.
6. **Benefits**: white section with heading and four softly raised sculptural visualization cards: outcome pills, 3×3 icon grid, shield, and UI/window shapes. Labels include accuracy/latency/safety/cost. Files `benefit-accuracy.svg` etc are tiny label icons; main imagery uses `benefit-eval-icon.svg`, `benefit-security.svg`, `benefit-design.svg` plus native shapes.
7. **Features**: 3 feature cards left + central orange brand hub +3 right, connector paths drawing to hub. White container max1440, padding0 56px120px, gap70; tablet gap64/bottom60; phone side12px/bottom50. Hub is native HTML/CSS `#fd3a25`, radius32px, padding33px61px, orange outer shadows, icon75×50 and brand text. Hide hub/connectors below1440 and render features as regular grid then vertical stack. Feature card raised light panel radius40 desktop24mobile, padding32desktop/24tabletphone, gap32desktop/22phone; black16px-radius icon block. Connectors captured as `feature-connector-9.svg` left and `feature-connector-10.svg` right.
8. **Tools**: gray environment, heading, description and black pill CTA surrounded by floating tilted white logo tiles. Outer padding192px16px desktop/100px16px tablet/50px16px phone; contained side56desktop/12compact, gap48desktop/64tablet. Actual six tool SVGs are `tool-claude.svg`, `tool-gemini.svg`, `tool-perplexity.svg`, `tool-05.svg`, `tool-06.svg`, `tool-07.svg`. `tool-openai.svg` is the reference brand hub mark, not a tool grid logo.
9. **Team** begins a continuous black rounded section. Padding120px56px, gap64, radius40top; compact padding120px12px60 and phone64px12px50. Spotlight glows from top and white/gray orbiting gear decoration behind title. Use actual Zykken team identity/photo resources. `spotlight.svg` is the lit orange bar; `team-spotlight-beam.svg` and mobile variant are exact extracted inline beam SVGs; `tools-decoration.svg` is the gray gear decoration (actual use belongs here).
10. **Statistics** black section, padding0 56px64/gap64, horizontal divider above. Left heading; right vertical divider and rotating metric card/chart slides with thin orange bars. Compact side12; phone gap34/bottom34. Replace demo statistics with supported Zykken scope or existing claims only.
11. **Awards** black section, list rows/icons/dividers. Replace unearned demo awards with credible operating commitments/milestones using same layout.
12. **Testimonials** black section with bottom radius40, split graphic left/quote right. Cards have large molded dark panel containing decorative work graphic, quotation marks/stars, attribution, divider, 01/03 and arrow controls. Source art `testimonial-decoration-1.svg`, `-2.svg`, `-3.png`; use existing quote/client content. Section side56desktop/12compact, gap58desktop60tablet20phone.
13. **Custom proposals** adapt template pricing layout to user's custom quote policy. The original has monthly/yearly toggle and $9,900/$19,900 cards; do not restore fixed tiers or package selectors. Preserve visual density with two custom-scoping cards or a quotation flow, all prices based on scope.
14. **FAQ** white rounded panel, max1440/padding120px56px (compact60/50px12), first item open, other question rows with plus/minus and animated height.
15. **Contact** inset40px-radius warm illuminated artwork panel `contact-background.png`, max1440/padding48px48px48px56px; tablet stacks/padding48; phone radius24, gap80/padding48px12. Heading/contact details left, fully functional form on right; preserve Zykken contact API rather than Framer submission behavior.
16. **Shared footer** body-gray background, giant outline wordmark behind social cards, small black logo block, two-line intro, social grid, divider and compact link/copyright/back-to-top row. Giant AgenAI outline is a native SVG; recreate Zykken text or original logo, not an AgenAI asset. Desktop wordmark spans1298×380, absolute top0/side56; tabletheight245/side12; phoneheight114/side24. Contentpadding43px56px40/gap165; tabletgap125; phonegap60. Socialcards row max932 desktop, 2-column grid compact. Do not import template placeholder Twitter/Facebook links.

## Motion specifications

These values come from published component metadata, not guessed screenshot timing:

- Hero heading + second line: opacity0→1, translateY60→0, spring damping40/stiffness220/mass1, no delay. Description/buttons translateY40→0 with same spring. Typical heading viewport trigger at0.5 and animate-once.
- Hero tile loops: y0→15, mirrored forever, 2seconds per leg, cubic-bezier(.44,0,.56,1), no delay. Keep base rotations30/-20/19. No hover requirement.
- Scroll cue: opacity.001→1, delay.7sec, duration.4sec, cubic-bezier(.44,0,.56,1). Down arrow y0→4 mirrored1sec linear.
- Shared component state/hover transitions are commonly spring duration.4/bounce.2, or damping60/stiffness500/mass1. Buttons have an inset glint moving on hover and text scale1→1.025; the header nav underline goes opacity0→1 and scales/slides.
- Section headings generally opacity0/y50 or60→0 on view, one-time; cards commonly y20/30/40 or60→0. Exact individual snippets are in `component-motion.json` keyed by class.
- Feature connector paths draw via stroke-dashoffset; the source initial left/right line lengths are about971.409. Orange overlay paths pulse/draw over gray paths.
- Process/metric/testimonial slides transform along their axis, with explicit next/previous and auto progression components. Preserve working controls and swipe/drag behavior where provided; do not use click-only imitation.
- Tools logos float with their base tilt, in-view continuous loops. Team spotlight/gear has subtle movement.
- Back-to-top appears after300px scroll, size38, bottom80/right20, black/white arrow with orange progress ring. Arrow bounces y0→-3→0 over2sec ease-in-out. Opacity/visibility fade.3sec; tracks actual page scroll fraction.
- Source global route transitions fade and move ±30% over.2sec cubic-bezier(.44,0,.56,1), while shared header/footer stay consistent.

Honor reduced motion and readable/no-JavaScript behavior in the native implementation. Source Framer optimizations initially hide animated nodes until hydration; native enhancement should avoid trapping content if JavaScript fails. Keep the existing greeting loader's fail-open, Skip/Escape and focus behavior when combining with page reveals.

## Asset performance

Original reference artwork totals roughly24MB; several SVGs embed raster image data and exceed1–2MB each. Downloaded originals are provenance-preserving research/build resources. Before final publication use appropriate responsive/optimized derivatives and lazy loading, especially below-the-fold graphics. Fonts are small (~19KB each) and should preload only the required hero weight600. Do not load unused template artwork simply because it is captured.
