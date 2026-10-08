# Nosh — cinematic restaurant website

Repository: https://github.com/kirankumarrout/Nosh-demo1

A complete React + TypeScript website for Nosh, Kalinga Nagar, Bhubaneswar. Includes the full source, optimized assets, a ready-built `dist/` folder, and Netlify configuration.

## Run locally

Install Node.js 22 LTS or newer, unzip this project, and open a terminal inside `nosh-website`:

```bash
npm ci
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`.

To inspect the production build:

```bash
npm run build
npm run preview
```

Do not double-click `dist/index.html`: the JavaScript modules need an HTTP server.

## Deploy on Netlify

### GitHub deployment

1. Push the contents of this project folder to your GitHub repository.
2. In Netlify, import that repository.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Node version: `22` (already specified in `netlify.toml`).

No environment variables, database or API keys are required. If you commit the entire enclosing folder into a larger repository, set the Netlify base directory to that folder.

### Drag-and-drop deployment

The supplied `dist` folder already contains the production build. Drag that entire folder into Netlify's manual deploy area. After making source changes, run `npm run build` before deploying it again.

## What's included

- Scroll-controlled exterior → entrance shadow → Nosh interior → expanding plate transition.
- Floating platter, botanical accents and restrained scroll parallax.
- Responsive food photography and editorial gallery.
- Real, transcribed Chhadakhai special-menu prices with keyboard-accessible category filters.
- Original-menu viewer and native-dialog photo lightbox with arrow-key navigation.
- Cinematic food section, ready to accept an original kitchen video.
- Guest-review excerpts with manual carousel controls.
- Reservation planner with guest count, preferred date/time and clipboard copy.
- Call, Instagram and Google Maps directions links.
- Mobile call bar, reduced-motion support, a global motion toggle, keyboard focus states and a no-JavaScript contact fallback.
- Self-hosted fonts and optimized WebP assets; no runtime CDN dependencies.

## Editing content

| File                | Purpose                                                               |
| ------------------- | --------------------------------------------------------------------- |
| `src/data.ts`       | Restaurant contact details, menu, reviews, gallery and optional video |
| `src/App.tsx`       | Sections, navigation, dialogs and interactive controls                |
| `src/animations.ts` | GSAP timelines and scroll choreography                                |
| `src/styles.css`    | Colours, typography, layouts and responsive breakpoints               |
| `src/fonts.css`     | Self-hosted font definitions                                          |
| `public/assets/`    | Restaurant photographs, menu and platter asset                        |
| `index.html`        | SEO metadata, structured data and no-JavaScript content               |
| `netlify.toml`      | Build configuration and hosting headers                               |

Change contact details in both `src/data.ts` and `index.html` structured data when needed. Set an absolute `og:image` and canonical URL in `index.html` once the final domain is known. The current typographic wordmark is site lettering, not a vector reconstruction of the photographed logo.

### Add real kitchen footage

Place the original restaurant footage in `public/assets/kitchen.mp4`, then set:

```ts
kitchenVideo: './assets/kitchen.mp4',
```

in `src/data.ts`. The section switches to a muted, inline video with a play/pause control. Without footage it uses a real supplied food photo. The reference videos are recordings of other websites, so they are not embedded in the finished site.

## Reservations and menu accuracy

The reservation dialog is a **local planning tool**, not an online booking backend. No personal details are transmitted or stored. Visitors can copy their request and call Nosh; no reservation is shown as confirmed.

The supplied menu is a **Chhadakhai special promotion**, stating “This Friday, Saturday & Sunday Only.” Its original dish names and prices have been transcribed with a clear current-availability notice. It is not represented as the restaurant's complete everyday menu. The ₹200–400 dining-spend range and 4.5/250 review summary come from the supplied listing, not a live feed. No opening hours or food-availability claims were invented.

The reference's momo composition is adapted to a platter photographed at Nosh, because no supplied menu confirmed momos. The kitchen scene uses a real food close-up until original kitchen footage is provided. The entrance is a layered photo transition with scroll-driven zoom, masks and crossfades, not a measured 3D reconstruction or a filmed walkthrough.

## Validation

```bash
npm run check
npm test
npm run build
```

TypeScript and the production bundle are checked. The content check validates navigation targets, packaged image files, structured data, key destinations and honest menu/booking copy. An additional server-render inspection is used during delivery to check rendered local links and image references.

Browser automation was unavailable in the build environment, so visual layout, touch behavior and scroll smoothness still need a real-device review. Before public launch, open the site at 360, 390, 768 and 1440px; test the entrance, menu tabs, gallery keyboard controls, reservation planner, reduced-motion setting and call/directions destinations. Netlify deployment is a separate step; this repository is ready to connect using the settings above.

## Asset provenance

Restaurant exterior, interiors, menu and food photography come from the user's supplied screenshots. They are optimized into WebP with smaller variants. The floating platter is an AI-assisted background extraction from the user's upper platter photo; it is a presentation asset, not a newly claimed menu item. Full prompt and provenance: `ASSETS.md`. Font licenses: `FONT-LICENSES.txt`. Dependencies retain their own licenses.

The ZIP intentionally excludes `node_modules`; `npm ci` installs the exact versions in `package-lock.json`. The ready-built `dist/` folder is included for immediate deployment.
