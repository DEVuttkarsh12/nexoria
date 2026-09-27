# Black-hole background integration

The site is static HTML with React bundles built by esbuild. The interactive background is mounted behind `.home-main` on the homepage and behind `.page-sub` content after `.page-hero` on secondary pages. The existing homepage hero remains independent.

## Component layout

- Default UI component path: `components/ui/` at the repository root. Keeping reusable UI components here matches the `@/components/ui` alias and the `components.json` CLI configuration; the shadcn CLI can then find and generate components in the expected location.
- Existing site styles: `site.css`. Tailwind source for this component: `src/black-hole-tailwind.css`; compiled output: `assets/black-hole-tailwind.css`.
- Component: `components/ui/optimized-black-hole.tsx`. Renderer: `components/ui/optimized-black-hole-utils/renderer.ts`. The supplied snippet omitted the renderer, so this repository includes a self-contained WebGL renderer with a 2D fallback.
- Isolated full-screen example: `components/ui/demo.tsx`. The live site mounts the component through `src/black-hole-entry.tsx` instead of the demo wrapper.

## Build and dependencies

Run `npm install`, then `npm run build:black-hole` and `npm run typecheck`. Tailwind CSS, its CLI, TypeScript, and React types are in `package.json`; no component-specific providers, images, icons, or stock assets are required. The component manages only its canvas-ready state. The renderer listens for pointer movement without covering links or forms, scales to the viewport, and holds still when reduced motion is requested.

The Tailwind source excludes Preflight so that adopting Tailwind does not reset the existing site's typography and controls. `components.json` and the `@/*` TypeScript alias establish the usual shadcn folder structure for future components. For a full shadcn registry setup in a framework project, use the [shadcn CLI installation guide](https://ui.shadcn.com/docs/installation/manual) and run `npx shadcn@latest init`; this static site currently uses the copy-and-paste component path without a framework migration. The [Tailwind CLI guide](https://tailwindcss.com/docs/installation/tailwind-cli) describes the same standalone CSS build used here.
