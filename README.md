# luscious — editorial food landing page

This project recreates the attached food website video as a fresh React + TypeScript experience. It uses the same sequence and visual rhythm: dumpling hero, plate menu, noodle story, recipe signup, and compact cooking footer.

## Run locally

```bash
npm ci
npm run dev
```

Open the Vite URL shown in the terminal. For a production preview:

```bash
npm run check
npm run build
npm run preview
```

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Node: 22 or newer

No API keys or runtime services are required.

## Structure

- `src/App.tsx` — page sections and interactions
- `src/animations.ts` — GSAP scroll choreography
- `src/styles.css` — marble canvas, editorial typography, and responsive layouts
- `public/assets/` — generated food cutouts and self-hosted fonts
- `index.html` — metadata and no-JavaScript fallback

The page is responsive from small phones to large desktop screens. The motion toggle pauses the scroll choreography, and `prefers-reduced-motion` disables animated transforms automatically.
