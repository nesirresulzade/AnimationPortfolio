# Motion Portfolio (React + Vite)

Animated portfolio starter with GSAP, ScrollTrigger and Tailwind.

## Features
- Hero with mini video preview and smooth transition
- Scroll-triggered clip-path About reveal
- 3D hover `VideoPreview` micro-interactions
- Uiverse `btn-12` button style

## Media structure
Place your assets under `public/`:
- Fonts: `public/fonts/` (zentry, circularweb, robert)
- Images: `public/imgs/` (e.g. `myProject/projects-1.png`)

You can change paths inside `src/components/Hero.jsx` and `src/components/About.jsx` if your names differ.

## Scripts
- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Customize
- Edit `tailwind.config.js` colors and fonts
- Update the hero heading text in `Hero.jsx`
- Replace About image path in `About.jsx`

## Notes
- GSAP + ScrollTrigger drive the animations similar to the reference README.
- The `btn-12` CSS is included in `src/index.css` and used via `<Button title="..." />`.
