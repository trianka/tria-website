# Trinity — Portfolio

Personal site: design thinking at the intersection of humans, technology, and public-good systems.

## Stack

- [Astro](https://astro.build) (TypeScript, strict) — islands architecture
- [Tailwind CSS v4](https://tailwindcss.com) via the Vite plugin
- [React](https://react.dev) — scoped to the 3D hero island
- [three.js](https://threejs.org) + [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) — the node/systems network hero visual
- [GSAP](https://gsap.com) + ScrollTrigger — scroll-driven reveals
- [Lenis](https://lenis.darkroom.engineering) — smooth scroll

## Structure

Single scrolling homepage (`src/pages/index.astro`): Hero → Philosophy → Selected Work → Contact, with a sticky anchor nav.

```
src/
├── components/
│   ├── layout/      # Nav, Footer
│   ├── sections/    # Hero, Philosophy, WorkGrid, WorkCard, Contact
│   └── three/       # SystemsCanvas (R3F island), SystemsNetwork (3D scene)
├── data/work.ts      # case study content
├── lib/scroll.ts      # Lenis + GSAP ScrollTrigger wiring, reduced-motion aware
├── layouts/BaseLayout.astro
└── styles/global.css
```

## Commands

| Command           | Action                                      |
| :----------------- | :------------------------------------------- |
| `npm install`       | Install dependencies                         |
| `npm run dev`       | Start local dev server at `localhost:4321`   |
| `npm run build`     | Build production site to `./dist/`           |
| `npm run preview`   | Preview the build locally                    |
| `npx astro check`   | Type-check                                   |

## Deployment

Deploys to GitHub Pages via the `Build and deploy to GitHub Pages` workflow on pushes to `main`.
