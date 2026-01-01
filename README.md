# Motion Portfolio

**Layihə haqqında**

Motion-portfolio — personal portfolio / motion design demo saytıdır. Layihə React (Vite) + Tailwind CSS istifadə edilərək hazırlanmışdır və UI animasiyaları üçün GSAP və react-three/fiber kimi kitabxanalardan istifadə edir. Bu repo tərtibatçı portfoliosu, layihələr nümayişi, animasiya olunmuş hero və interaktiv elementlər (hexagon grid, rotasiyaedici kartlar və s.) ehtiva edir.

**Əsas Xüsusiyyətlər**
- **Interaktiv Hero**: 3D hexagon grid və animasiyaedilmiş başlıq.
- **Projects Carousel**: Sol tərəfdə aktiv layihə, sağ tərəfdə stacked kartlar.
- **GSAP Animations**: Saytın müxtəlif elementləri üçün yumşaq keçidlər və giriş/çıxış animasiyaları.
- **Responsive**: Tailwind ilə mobil və desktop dəstəyi.
- **Video & Media preview**: Preview komponentləri və linklər.

**Texnologiya Stack**
- React + Vite
- Tailwind CSS
- GSAP (GreenSock) + ScrollTrigger
- react-three/fiber + drei (3D canvas)

**Quraşdırma (local)**

1. Repoyu klonlayın (əgər hələ klonlamamısınız):

```bash
git clone <repository-url>
cd motion-portfolio
```

2. Asılılıqları quraşdırın:

```bash
npm install
```

3. İnkişaf serverini çalışdırın:

```bash
npm run dev
```

Brauzerdə açın: http://localhost:5173 (və ya Vite tərəfindən verilən port)

**Build və Deploy**

```bash
npm run build
npm run preview    # yerli preview üçün
```

Build qovluğu `dist/` yaradılacaq — hosting xidməti (Netlify, Vercel, GitHub Pages və s.) ilə yerləşdirilə bilər.

**Fayl Strukturu (xülasə)**
- `src/` — əsas mənbə kodu
  - `components/` — bütün React komponentləri (Hero, About, ProjectCarousel, Navbar, VideoPreview və s.)
  - `assets/` — şəkillər və media
  - `main.jsx`, `App.jsx` — tətbiq giriş nöqtələri
  - `index.css` — qlobal Tailwind stilləri
- `public/` — statik fayllar (fonts, images, videos)
- `vite.config.js`, `tailwind.config.js`, `postcss.config.js` — quraşdırma və konfiqurasiya

**Əsas Komponentlər (qısa təsvir)**
- `Hero.jsx` — interaktiv başlıq və 3D grid yerləşməsi (`Hexagon-grid` komponenti istifadə olunur).
- `Hexagon-grid.tsx` — react-three/fiber ilə hazırlanmış 3D hexagon sahəsi.
- `ProjectCarousel.jsx` — sol tərəfdə aktiv layihə görünüşü, sağda stacked preview kartları.
- `ProjectPreview` / `VideoPreview` — media ilə interaktiv bloklar.
- `Navbar.jsx` — saytın naviqasiya çubuğu (sticky).

**Təkmilləşdirmə və Debug tövsiyələri**
- `pointer` və `mousemove` eventləri DOM elementləri ilə qarşılıqlı əlaqə yaradır — hover davranışı üçün `elementFromPoint` və ya `pointermove` global tracker istifadə etmək tövsiyə olunur.
- 3D canvas (`react-three/fiber`) və DOM elementləri arasında stacking context mövzuları yaranarsa, `z-index` və `pointer-events` property-lərinə diqqət yetirin.

**Stil və Konfiqurasiya**
- Tailwind konfiqurasiyasını `tailwind.config.js` faylında tapacaqsınız; rənglər və ölçüləri rahatlıqla dəyişə bilərsiniz.
- Global stillər `src/index.css` içindədir — burada qlobal font və utility klasslar əlavə edilə bilər.

**Kod Yazma Prinsipləri**
- Komponentlər funksional və hooks ilə yazılıb.
- Animasiya üçün GSAP-in `useGSAP` hook-u istifadə olunur (komponent daxili animasiyalar üçün).
- React state yalnız lazım olan komponentlərdə saxlanılır, performans üçün tələb olunmayan geniş state-lərdən çəkinin.

**Deploy tövsiyələri (Vercel / Netlify)**
- Repository-ni Vercel/Netlify ilə bağlayın və build komandası olaraq `npm run build` qeyd edin.
- `dist/` qovluğu avtomatik deploy ediləcək.

**Tez-tez yaşanan problemlər**
- Kartlar navbarın üzərinə çıxırsa, `Navbar` komponentində `z-index` artırın və ya card elementlərinin `z-index`-lərini azaltın.
- Mouse tracking arxa plan animasiyasını kəsirsə, `pointer-events` və `elementFromPoint` ilə yoxlayın ki, yalnız mətnin üzərində olduğu halda background dayansın.

**Əlavə Qeydlər**
- Layihəni fərdiləşdirmək üçün `src/components` altında komponentləri redaktə edin və `public/imgs` qovluğuna öz şəkillərinizi əlavə edin.

**Əlaqə**
- Layihə müəllifi: Nasir Rasulzada
- GitHub: https://github.com/nesirresulzade

---

Əgər README-də əlavə məlumat (məsələn, xüsusi deployment addımları, CI konfiqurasiyası, və ya layihə spesifik dəyişiklik qeydləri) istəsəniz, mən əlavə edim.

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
