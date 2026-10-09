# Axonix reference capture

Captured 2026-10-08 from https://axonix.framer.ai/. Source identifies publish time Aug 27, 2026 10:27 UTC. This capture preserves source HTML/CSS and raster/vector/font assets for a custom-code Zykken rebuild. Root owns browser research; these files were acquired by HTTP and parsed as source, without separate browser UI automation.

## Design language

A monochrome white/silver site with light gray topographic wave patterns, black soft-gradient headings, glossy layered white cards, pronounced but soft grayscale shadows, generous whitespace, minimal line icons, and photo/3D accents. Primary color #121212, white #fff, off-white #f5f5f5, muted text rgba(18,18,18,.7). No accent hue.

Font: Geist. Three downloaded normal faces correspond to 400 (`gyBhhwUxId8gMGYQMKR3pzfaWI_RnOM4mJPby1QNtA.woff2`), 500 (`gyBhhwUxId8gMGYQMKR3pzfaWI_RruM4mJPby1QNtA.woff2`), 700 (`gyBhhwUxId8gMGYQMKR3pzfaWI_Re-Q4mJPby1QNtA.woff2`); italic variants also captured. Assets are under `assets/`.

Breakpoint layouts: desktop >=1200px, tablet 810–1199.98px, phone <=809.98px. General page container max-width1280px, side gutters30 desktop/tablet and20 phone. Home hero container1016px. Inner hero content868px (some pages full width). Most home section spacing160 desktop,80tablet,60phone. Section headers centered, tag/title/body stack gap16. Section card grids follow about56px below headers.

Typography: H1 Geist500 64px/1.2 letter-spacing-.06em desktop,48px/1.2 -.04em tablet,38px/1.2 -.02em mobile. H2 Geist 500: 48px/1.2 on desktop, 40px/1.2 on tablet, 34px/1.2 on phone; letter-spacing −.06em. The About card uses a separate H3 preset: 40px desktop, 32px tablet, 28px phone. Hero heading uses `linear-gradient(181deg, rgba(18,18,18,.4) 13%, #121212 83%)` clipped into text. Body18px/1.2 letter-spacing-.02em,400, opacity.7. Tag14px/1.2 uppercase weight500 -.02em. Button16px/1.24 weight500 -.04em. Several smaller card paragraphs16px/1.4.

Tags: rounded pill999px, white2px border, white→#f5f5f5 gradient, shadow0 8px16px #0000001f, padding8px14px8px8px, gap8. Hero pill has32px circular dark inset with16px CPU icon. Standard section pill has20–24px line icon.

Primary CTA: gradient180deg #363636→#000; 2px #121212 border; 12px corner radius; padding18px24px19px; shadow0 8px16 rgba(0,0,0,.24). Secondary white CTA gradient#fff→#f5f5f5; 2px white border; shadow0 4px16 rgba(0,0,0,.16). Header CTA has pill122px radius and width180. Buttons have animated duplicate text sliding vertically while incoming duplicate loses blur/scale on hover.

Card standard: white border2–3px, rounded24px; gradient#f9f9f9→#f0f0f0 or exact bitmap-background; shadow0 8px16 rgba(0,0,0,.12). Features3pxborder and shadow0 4px16 rgba(0,0,0,.16). Split illustration cards32px radius. Inner nested cards16–18px radius. FAQs closed light cards, open black gradient card with white text,16px radius,shadow0 8px16rgba(0,0,0,.24).

## Homepage

Header: position above hero, desktop padding20px30px, max-width1280, Axonix SVG135×28 at left, links Home/About us/Pricing/Blog/Contact/Pages gap40, right Book a Demo pill. At tablet/phone a hamburger replaces links/CTA; phone16px20px. Open menu occupies viewport with mobile links. Pages dropdown includes features/case-study and template subpages.

Hero: full-width section with fill background `CXf1VtliCLhgE72rnxykPb20LI8.png` (2160×1455 grayscale topographic waves). Desktop padding150px30px544px, tablet130px30px300px, mobile100px20px150px. Centered text max-width1016; main content gap40 (mobile24), title stack gap16. Headline “Smarter Solutions, Powered by AI”, text “We build intelligent tools, systems, and strategies that help businesses scale, automate, and innovate—faster.” CTAs Book a Demo and Explore Our Work (reference unexpectedly routes second CTA to pricing). Hands asset is **a static transparent PNG**, `G0SpZp0WpTBVplZfXSIJemcW0o.png` (3060×1056), mechanical left hand and human right hand reaching. Absolute left/right-20px, bottom-10px, aspect-ratio2.90133, rotate11deg, object-fitcover, z-index1. Text z-index4. No Spline or hero video.

Logo ticker: “Trusted by 2.200 Companies”, four distinct logo SVGs repeated under an edge-fade mask; container1200 and gap40. SVGs rQxLt...,oulRi...,C67c...,eOgGA....

About: pill About us; centered “Empowering the Future with Artificial Intelligence” with floating faceted sphere `MSeK5W7fBYbdR7MTmXOXfO9sQE8.png` (2400×3000), then3 glossy stat tiles. Stat HTML starts0 because JS counters animate. Labels Performance Snapshot,Digital Reach,Client Trust; runtime final counter values can be read from browser. About bottom spacing is 110px desktop / 80px tablet / 60px phone. The framed panel has a #f5f5f5 background, 24px radius, white 2px border, shadow 0 4px 16px rgba(0,0,0,.16), and padding 56px 32px 32px. Its heading is max-width 415px; the panel uses a 370px gap between heading and metric row. The sphere is 495px wide at its original 0.8 aspect ratio, anchored at horizontal center and bottom 0. Tablet sphere: 434px wide, bottom 83px. Phone sphere: 65% panel width, top 63px; panel gap 150px, padding 32px 20px 20px, radius 16px. Metrics are three columns desktop/tablet and two columns phone, gap 20px. Stat background is ymcySA....

Features: centered header “Partner with an AI agency delivering smart solutions.” and paragraph. Three equal glossy cards at height432desktop: Real-Time Analytics,gauge `gafvjOKcY1DVZdyRaWiETmyZI.png`; AI-Driven Growth,bars `rjGU1GCjPxSGEtw13lCs5jIkLrw.png`; Superfast AI response,chat `N5itSKOFGXUajSDKYfTPt3jso.png`. White-wave card bgT9fo.... Card radii24,white3pxborder,padding32 with first card54px top. Under cards, horizontally moving pill-chip service ticker: Custom AI Development,Machine Learning Models,Automation & RPA,Natural Language Processing (NLP),AI Strategy & Consulting. Each chip white2px border,gradient#f9f9→#f0f0,pill999,shadow0 8px16 .12,24px icon. Decorative wave shape at bottom.

Process: two columns on desktop, max-width 1280px. At widths below 1200px the text and illustration stack vertically, separated by 60px tablet / 40px phone. Illustration height is 600px tablet / 400px phone. Left header “A transparent process of collaboration and feedback”, body, three icon/text rows: Workflow Assessment,Deploy with Confidence,Ongoing Support & Optimization,then Book a Demo. Right white framed32px radius card with bitmap hand image`AeD4G2F6xtDTfPZxF3cBhE7iaE.png`, backgroundYUzS...,floating commerce avatar card at bottom (Nicolas Jakson,San Francisco,$180.64,8 Orders) and avatarN5lf....

Why choose us: centered header “Unlock the potential of AI for your business.”; grid of6 cells, first5 light icon-led cards and last black CTA card. Text themes scalable tailored, hands-on expertise,ROI,cross-industry,security; final “We’ve partnered with companies in e-commerce and more…” Get Started. Light bgTc1...,blackbgck2.... Rounded24 layered cards.

Case studies: centered header, three broad split cards inside a horizontal slider/ticker. The source repeats this component for its desktop, tablet, and phone SSR variants. Each image left (clothGyGy...,sculpture nMP...,concrete l38...),content right includes logoFresh Care,case title,body,See Case Study button,2 inset numeric stat tiles90%/43%. Card backgroundFQI1...; statbgPEI....

Testimonials: centered header; five cards in two rows: two equally wide cards on the first row and three equally wide cards on the second row. Tablet uses two columns for the second row; phone stacks both rows vertically. Glossy backgrounds2PIF...andG9t...,logoPdCL...,avatars jQaQ...,iA1...,XuwB...,Blu51...,Y3az.... Star rating4.9. Phone becomes vertical cards.

Pricing: centered “Flexible Plans for Every Stage”,3 plan cards Starter$999/mo,Growth$2.999/mo,Enterprise$3.200/mo. All cards light; middle nested price box,Most Popular black badge.5feature checklist then plan CTA. No billing switcher observed in source. Plans currently contain placeholder-like identical lists.

Blog: header “Insights on AI, Automation & Innovation”,3 equal cards with3D sculpture images iFkvc...,JC7i...,zmIO...,rounded24 image top,white-wave body bgEHq...,title andRead Blog. Dedicated blog grid has9.

FAQ: two-column max-width1280,left explanatory header/contact CTA max545,right6accordion rows. First open by default,blackgradient/white text. Accordion gap 24px; summary text 20px/1.2, letter-spacing −.02em. Top question is generic brand/website placeholder. Other rows services,cancel,international,results,industries. Bottom padding160 desktop.

Final CTA: wide glossy card, 24px radius, max-width 1280px, padding 48px 56px. Desktop/tablet display text at left and Book a Free Consultation at bottom-right, using space-between. Title is 48px desktop / 40px tablet / 34px phone. Tablet padding is 48px 40px. Phone stacks content left-aligned with gap 24px and padding 40px 20px. Card background is a #f9f9f9→#f0f0f0 gradient. Section background`u57K7Fq0qMUmxKlucOIkzn6tRPk.png` (2160×1170 waves).

Footer: light background,bigAxonix wordmark,left tagline/mail; columnsQuick Link,Social Media,office/phone; bottomcopyright2025/privacy/terms. Max1280,gap40. The Framer “made in Framer” badge is platform chrome and not part of custom site design.

## Inner pages

All same header/footer/CTA. A lighter large topographic wave image `KAoNe79NF0mCiwdi0jLjH729r2s.png` (2880×1246) covers hero/page header. Inner hero generally167px30px160px desktop,140px30px80px tablet,110px20px60px phone.

About: hero “Building the Future with Human-Centered AI”,body,social proof brands;3statcards;Our Journey centered statement;large framed phone illustration`KcHCyxxEFtdUUZK4TswROpwGeg.png` withbgJED2...;Our Values3cards;Meet Our Team6portraits3×2;cases,testimonials,CTA. PortraitsIjdog...,N07...,YRQl...,Ec4...,UbQ...,dllA.... ValuesCustomer Obsession,Ownership Mindset,Continuous Improvement. Hero content868px; mainsectionmax1280.

Features: hero “Everything You Need to Build, Scale & Succeed with AI”,body;service chipsticker;5feature cards(3top +2second row,one spans2cols). Additional illustrationsFsTI... (1548×594) and9cuGH... (379×440). Samewhychoosegrid. Splitsection “Classification & recommendation engines” with image`hLVgr03WU0jDVH9S6IpjrIyJzwU.png` (1092×1162);3iconrows. Testimonials/FAQ/CTA.

Pricing: header “Flexible Plans for Every Stage”,body;3plancards;testimonials;FAQ;CTA. Hero160px30pxdesktop,130px30px80px tablet,110px20px60pxmobile. Section containergap48. Cardwidth410basis,pad32px16px20px;innergrowthpriceboxpad24px16px,radius18,white2pxborder. Pricinglist5rows;no explicit checkout endpoint;planCTAsgotoContact.

Contact: tag Contact Us,headline “Let’s Build Something Intelligent, Together”,body. Maincontentgrid2equalcols,gap25; leftformglossy24pxcard pad24px24px28px,white2pxborder,shadow0 8px16 .12,background`5rtLe1uJCObajo5nC9XayYM9k0.png`(2504×2628). Rightframed24pxcard pad16,background`jwBBATKumDghvlAs2bgSfJLRJs.png`,illustration`yK9wWfFNz3yrI0jwKxQDjzZfH4.png`(2388×2500). Form labelsName,Email,Phone,Company Name,extra infoMessage. Requiredname/email. InputGeist14,1px#1212121aborder,radius10,pad12,focus#121212. Textarea116minheight. Formverticalgap16,labelgap12. Submitgradientblackbutton. Beneathgrid,horizontaldetailstrip4blocksOur Email,Location,OurPhone,WorkingHours usingbackground4Mxt...;tablet2×2/mobilevertical. FAQ/CTA.

Case study: header“Proven Results, Real Impact”,servicechips,3splitcases,FAQ/CTA. Case details at/case-study/fresh-care,/kondam-loius,/lokos-estate.

Blog: header2-line“Insights on AI, / Automation & Innovation”,9cards3×3,image822×632. Detail pages havetagBlog & Insight,title,articlelarge image,body,relatedposts,CTA.

Legal: centeredtagLegal,titlePrivacyPolicy orTerms ofConditions;articletext;CTA/footer. Preserve existing Zykken legal content rather than copying template placeholder policy.

Sitemap also includes/home-2(secondaryhomepagevariant)and/404. All 23 source-page paths in sitemap.xml.

## Files and provenance

`index.html` exact homepageHTML;`reference.css` combinedhomepageCSS;`text.txt`homepagecopy;`body-tree.txt`namedDOMhierarchy;`pages/*.html/.css/.txt`inner-pagecaptures;`*-styles.json`namedCSSrulesincludingviewportcontext;`asset-inventory.json`homepageassets;`inner-assets-inventory.json`innerassets;`assets/`originals. `contact-sheet.png`rasteroverview only. HTML contains breakpoint SSRduplicates,so visiblepage shouldnotrepeatduplicatetext/components.

No screenshot via separate headless browser was taken because root owns the CUA browser and requires it for browser interaction. Responsive exactity beyond parsed CSS must be verified against root's visible reference capture.

## Capture corrections and source preservation

A source review on 2026-10-08 corrected the initial typography/table-layout notes above: the desktop H2 preset is 48px, testimonials use a two-card row followed by a three-card row, and homepage case studies use a horizontal slider. The early regex extraction encountered tablet rules before desktop rules; the corrected values come from CSS parsed with its media-query contexts. The custom site may intentionally retain Zykken content, its four original project tiers, client identities, and service structure; those are content differences, separate from template geometry.

Original research source lives at `/tmp/zycon-reference/`; the durable project copy of this reference brief is `docs/REFERENCE_DESIGN.md`, with asset provenance in `docs/reference-assets.json` and `docs/reference-inner-assets.json`. Downloaded original files have their Framer content-hash filenames in `assets/`. Confirm geometry against the visible reference at 1200px or above, tablet around 1024px, and phone around 390px.
