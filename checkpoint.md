# Hero DitherVeil integration checkpoint

## Follow-up: frameless artwork

- Before the follow-up edits, `codex/dither-hero` was at commit `6ef13d25ccfb468022285cb4ba3e03a38a30871b`. Branch `codex/checkpoint-pre-frameless-dither` points to that version.
- User requested removing the visible frame around DitherVeil so the artwork sits directly on the hero background, then pushing the result to GitHub.
- [x] Removed the artwork border, rounded card, shadow, and overlaid caption. The dither uses the hero background colour and fades at its edges.
- [x] Verified the canvas, desktop side-by-side layout, mobile stacked layout, no horizontal overflow, no browser errors, and click-to-reveal colour interaction.
- [x] Committed the frameless change as `cb46e1c` and pushed `codex/dither-hero` to `origin`. Also pushed `codex/checkpoint-pre-frameless-dither` so the previous framed version is recoverable from GitHub.

## Recovery point

- Before changes: commit `b9fff5c3db7168b6b9f24bdf214842c15fd2481b` on `main`.
- Git branch `codex/checkpoint-pre-dither-hero` points to that exact commit. Implementation is on `codex/dither-hero`. To see the original site again after saving any new work, run `git switch main` (or `git switch codex/checkpoint-pre-dither-hero`). Switch back to `codex/dither-hero` to see this version.
- `framer-shim.js` was already untracked before this task and is unrelated. Leave it in place.

## Requested result

- Integrate the supplied React Bits `DitherVeil` component with its `ogl` dependency.
- Replace the homepage video hero with a desktop split layout: existing text on the left, interactive DitherVeil visual on the right. Keep mobile layout usable.

## Progress

- [x] Inspected pasted component, homepage hero, CSS, and repository status.
- [x] Created baseline Git branch before editing site files.
- [x] Copied the supplied component to `src/DitherVeil.jsx` and its CSS; added React, OGL, and esbuild with a committed static bundle target.
- [x] Saved the example image locally at `assets/dither-hero.jpg` so the effect and fallback do not depend on remote image CORS.
- [x] Updated homepage hero markup and responsive styling for left text and right DitherVeil artwork. The previous hero video markup is removed.
- [x] Ran `npm run build:hero`; output is `assets/hero-dither.js` and `assets/hero-dither.css`.
- [x] Fixed the local static preview server to serve JPEG assets.
- [x] Verified the desktop split layout, stacked mobile layout, loaded canvas, click reveal, image and JS responses, and no browser errors. No horizontal overflow was observed on mobile.
- [x] Ran `node --test tests/contact.test.cjs` (6 passed) and `git diff --check` (clean).

## Resume here

The site is plain HTML/CSS/JS. The homepage mounts React only inside `.hero-visual`; the rest of the page remains static. If source changes, run `npm install` (if needed) and `npm run build:hero` so the static assets match the source. Preview with `node scripts/dev-server.cjs`. The baseline branch above remains the recovery point. `framer-shim.js` was present before this task and must not be added or removed as part of this work.
