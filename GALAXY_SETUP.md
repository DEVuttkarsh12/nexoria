# Galaxy background integration

The site is static HTML with React bundles built by esbuild. The animated galaxy is mounted behind `.home-main` on the homepage and behind `.page-sub` content after `.page-hero` on secondary pages. The homepage hero remains independent.

## Component layout

- Default UI component path: `components/ui/` at the repository root. Keeping reusable UI components here matches the `@/components/ui` alias and the `components.json` CLI configuration; the shadcn CLI can then find and generate components in the expected location.
- Existing site styles: `site.css`. Tailwind source for this component: `src/galaxy-tailwind.css`; compiled output: `assets/galaxy-tailwind.css`.
- Component: `components/ui/galaxy-background.tsx`. Renderer: `components/ui/galaxy-utils/renderer.ts`. The canvas draws a quiet nebula, slowly falling stars, and occasional meteors behind section content.
- Isolated full-screen example: `components/ui/demo.tsx`. The live site mounts the component through `src/galaxy-entry.tsx` instead of the demo wrapper.

## Build and dependencies

Run `npm install`, then `npm run build:galaxy` and `npm run typecheck`. Tailwind CSS, its CLI, TypeScript, and React types are in `package.json`; no component-specific providers, images, icons, or stock assets are required. The component manages only its canvas-ready state. The renderer stays behind links and forms, scales to the viewport, pauses when offscreen, and holds still when reduced motion is requested.

The Tailwind source excludes Preflight so that adopting Tailwind does not reset the existing site's typography and controls. `components.json` and the `@/*` TypeScript alias establish the usual shadcn folder structure for future components. For a full shadcn registry setup in a framework project, use the [shadcn CLI installation guide](https://ui.shadcn.com/docs/installation/manual) and run `npx shadcn@latest init`; this static site currently uses the copy-and-paste component path without a framework migration. The [Tailwind CLI guide](https://tailwindcss.com/docs/installation/tailwind-cli) describes the same standalone CSS build used here.
