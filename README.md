# हॉटेल अतिथी · Hotel Atithi

Website for **हॉटेल अतिथी — फॅमिली गार्डन रेस्टॉरंट**, Karad.
_गावाकडची माणसं... गावाकडची चव..!_

React 19 + Vite + Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
npm run lint
npm run audit    # needs `npm run preview` running in another terminal
```

`npm run audit` drives a real browser over the built site and fails on WCAG AA
contrast, horizontal overflow, broken images, reveals that never fired, and
console errors. It has caught every visual regression in this project so far —
run it before shipping.

---

## Where the content comes from

**The copy is entirely the hotel's own. The photography is mixed.** Sixteen
photographs shot on site in September 2026 fill the gallery and one hero slide.
The hero, the signature medallions and the menu grid still run on sourced stock
images — that was a deliberate choice on the grounds that they look better; one
of them is flagged AI-generated in its own metadata. The table below records
what is verified; the sections after it record what is not.

Every fact and every line of copy is taken from the hotel's signboard, menu
cards and table card:

| Fact | Source |
|---|---|
| Tagline — गावाकडची माणसं... गावाकडची चव..! | signboard, `exterior-front.webp` |
| फॅमिली गार्डन रेस्टॉरंट · व्हेज / नॉनव्हेज | signboard |
| Phone 8999244403 | supplied by the hotel — note the signboard photograph still shows the older number 9929667979 |
| Instagram `@hotelatithi_` | table card, `card-jatra-dhangari.webp` |
| **जत्रा धनगरी थाळी (मटण/चिकन)** and **जत्रा धनगरी हंडी** | table card |
| "कमी कालावधीत प्रसिद्ध झालेले थाळी" | table card |
| "ऑर्डरनंतर ३० मिनिटे लागतील" | menu card footer |
| `\|\| अतिथी देवो भव \|\|` | menu card |
| Every dish and price | `menucard-*.webp` |
| Owner portrait | `owner.jpeg` (cropped to `owner-portrait.webp`) |
| Brand yellow `#FDEE3E` | sampled from `logo.png`, the lossless artwork |

The hotel's **actual printed menu cards are published on the page**, under the
dish grid, so guests can read the full price list as it really is.

### The hotel's own photography, September 2026

Sixteen originals (~64 MB of phone JPEGs, 3024×4032 to 6048×8064) were supplied
and resized to 1500px WebP — 2.8 MB in total, a 24× reduction. The originals
live in `src/assets/real image/`, which `.gitignore` excludes: the derivatives
are what the site imports, and there is no reason to put 64 MB in every clone.

| Files | Subject | Used in |
|---|---|---|
| `thali-*.webp` (11) | thalis on the green marble table, red brick wall behind | hero, signature medallions, menu grid, gallery |
| `mutton-fry-plate.webp` | mutton fry plate with tomato | menu — मटण फ्राय मसाला प्लेट |
| `sign-night.webp`, `sign-neon-closeup.webp` | the lit signboard after dark | hero, gallery |
| `hall-guests-night.webp`, `hall-guests-wide.webp` | the hall mid-service, guests eating | hero, gallery |

### ⚠️ Seven rendered images are sourced stock, not the hotel's plates

The hero, the signature medallions and three menu cards run on stock re-encodes
of `hero2`/`hero3` and the hash-named JPEGs. Each pair was matched by dHash over
a 16x16 greyscale downscale; 0-2 out of 256 bits means the same picture
re-encoded, and every unrelated pair in the folder scores above 40.

| Rendered file | Sourced from | Distance | Used in |
|---|---|---|---|
| `hero-curry-brass.webp` | `hero2.jpg` | 1 | hero slideshow |
| `hero-paneer-spread.webp` | `hero3.jpg` | 2 | hero slideshow |
| `dish-tandoori-sizzler.webp` | `c777201985...jpg` | 0 | hero slideshow |
| `hero-mutton-bowl.webp` | `76e5ea5bee...jpg` | 1 | signature medallion |
| `thali-chapati-top.webp` | `a1d821fa23...jpg` | 0 | menu — जत्रा धनगरी थाळी |
| `guests-thali-window.webp` | `973ff6bc6d...jpg` | 0 | menu — मटण थाळी |
| `thali-steel-closeup.webp` | `98cbbb61b6...jpg` | 0 | menu — मटण थाळी विथ सोलकढी |

**`76e5ea5beec2a4792a49f797ab712ea6.jpg` declares itself AI-generated.** Its XMP
carries the IPTC code for synthetic media:

```
DigitalSourceType -> http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia
```

It is the source of `hero-mutton-bowl.webp`, which sits in the signature
medallion. A dish that has never existed is shown as a plate this kitchen
serves.

These were briefly replaced with the hotel's own photographs and then restored,
because the stock frames were judged to look better. The hotel's own equivalents
are all present in `src/assets/` and wired into the gallery, so swapping back is
a one-line change per placement in `menuData.js` / `signatureData.js` / `Hero.jsx`.
**Before launch someone should still establish a licence for these seven files.**

### ⚠️ `hero4.jpg` was a watermarked Adobe Stock comp and has been removed

It carried a visible **Adobe Stock watermark** (“Adobe Stock · #153571595”) and
was never referenced by the build. It is no longer tracked by git — it is listed
in `.gitignore`, so the file can stay on a local machine without ever being
published again. Buy the licence and add the clean file if the shot is wanted.

### Two things still need you

1. **Reviews are placeholder text.** `src/data/testimonialsData.js` carries a
   loud warning at the top. Replace the five entries with real Google or
   Instagram reviews before launch — published testimonials must be genuine.
   The **owner's quote in `OWNER` (`src/data/siteData.js`) is also a draft**
   written on his behalf. इम्रान अत्तार should approve or rewrite it — nothing
   should go out in his voice that he has not agreed to.
2. **Address, email and opening hours are unconfirmed.** The photographs show a
   highway-side location with parking but no readable street address. The
   `TODO` markers are in `src/data/siteData.js`.

Menu prices follow the spiral-bound card; the older card shows different rates
for some items, so confirm before launch.

Claims that could not be evidenced were removed rather than guessed — there is
no founding year, no "20 years of experience", and no star rating anywhere.

---

## Design direction

**Maharashtrian poster-art × modern editorial.** Every device comes from the
supplied logo:

| Logo element | How the site uses it |
|---|---|
| The flat yellow disc | Full-bleed `bg-saffron` fields and the hero halo |
| The red brush lettering | `--color-vermillion` CTAs, the rule under the H1, kickers |
| The turbaned figure | Extracted to a transparent PNG; leans on the hero ticker, the services banner and the booking panel |
| The circular badge | The recurring **arch** framing hero, signature and why-us photography |

Supporting devices: gold hairlines, oversized Playfair numerals, Devanagari
**marquee tickers**, and film grain — but only on the ink surfaces, where it
reads as photographic depth.

### Restraint rules

An earlier build tiled the diamond motif across all fourteen sections and
floated twelve blurred colour blobs behind the content. Texture applied
everywhere stops being texture and becomes noise — it was the single biggest
reason the page read as amateur. The rules now are:

- **Pattern is an accent, never wallpaper.** One motif overlay survives on the
  page. If you add another, ask what it earns.
- **No decorative glow blobs.** The only blurred fill left is the pool of light
  under the hero plate, which exists to separate the cut-out from the backdrop.
- **Three corner radii, plus the arch** — `rounded-xl` / `2xl` / `3xl` /
  `rounded-full`, and `.arch` for the signature shape. Semantic marks (the
  veg/non-veg box) keep their own tiny radius.
- **Colour bands are expensive.** Every full-bleed change of background is a
  hard cut for the reader; the page uses ink / cream / one yellow moment, and
  the stats strip sits quietly on cream rather than shouting in red.

### Palette

| Token | Value | Role |
|---|---|---|
| `--color-cream` | `#FFF8F0` | Primary surface — the page is cream-dominant |
| `--color-cream-2` | `#FBEEE0` | Alternate light band |
| `--color-maroon` | `#3E0000` | Accent bands (promise, stats, services) |
| `--color-maroon-2` | `#260000` | Footer |
| `--color-ink` | `#100E0C` | Hero backdrop, body text |
| `--color-saffron` | `#FFD900` | Brand yellow — a **fill** colour only |
| `--color-amber-deep` | `#9A5B08` | Warm **text** on light surfaces |
| `--color-gold` | `#E8A900` | Hairlines, ornaments |
| `--color-amber` | `#F0A020` | Active nav pill, headline highlight, gradient stop |
| `--color-vermillion` | `#C8102E` | CTAs, headings on yellow |
| `--color-cream` | `#FBF6EA` | Light surface |
| `--color-sand` | `#F2E8D3` | Secondary light surface |

Tailwind v4 keeps config in CSS — it all lives in `src/index.css` under
`@theme`. There is no `tailwind.config.js`.

### Typography

| Face | Token / class | Use |
|---|---|---|
| **Baloo 2** (800) | `--font-marathi` → `font-marathi` | All Marathi display — headings, dish names, nav, ticker |
| **Mukta** | `--font-mr-ui` → `font-mr-ui` | Long-form Marathi — paragraphs, quotes, the brand lockup |
| **Playfair Display** | `--font-display` → `font-display` | Latin numerals and figures |

> Two Devanagari rules the layout depends on:
>
> 1. **Never letter-space Devanagari** — it splits matras and conjuncts apart.
>    `.font-marathi, .font-mr-ui { letter-spacing: 0 !important }` enforces it.
>    Don't add `tracking-*` or `uppercase` to Marathi text.
> 2. **Never set display leading below ~1.05.** Matras (ी ै ो) rise well above
>    the shirorekha and descenders (ु ृ) fall below it, so a tight line-height
>    plus any ancestor `overflow: hidden` shaves the top bar clean off. The
>    `clip` reveal carries `padding-block: 0.34em` for exactly this reason.
>
> 3. **Baloo 2 must be set at weight 800.** It is a variable face that renders
>    at 400 by default, which looks thin and wrong; `.font-marathi` pins the
>    weight. Unlike a high-contrast display face it holds up at nav size, so it
>    can carry every heading on the page.

---

## Section order

1. **Hero** — centred over full-bleed food photography (the hotel's own mutton
   thali with solkadhi) — now a **four-slide rotation** cross-fading every six
   seconds, each slide on its own slow zoom (`HeroSlideshow.jsx`). It pauses
   when the tab is hidden and settles on one frame under reduced-motion. The legibility stack is three
   layers: a **maroon veil that stays lighter through the middle band** so the
   dish still reads while nav and headline keep contrast, a fine amber dot
   screen for texture, and a foot that melts into the cream section below
   instead of cutting hard. Above it, a slim utility bar carries hours, phone
   and location.
2. **Signature** — जत्रा धनगरी थाळी · जत्रा धनगरी हंडी · मटण थाळी
3. **Statement** — the yellow brand moment: `अतिथी देवो भव` + four promises
4. **About** — the real exterior, garden and guests, closing with the
   **owner block** (इम्रान अत्तार, संचालक) — portrait, introduction and quote
5. **Menu** — filters (थाळी / मटण / व्हेज / स्टार्टर / नाश्ता) with the
   green-and-maroon plate markers, then the **real printed menu cards**
6. **Stats** — countable facts only (dishes, 30-minute prep, halls, thali types)
7. **Why choose us** — arch image, numbered reasons
8. **Gallery** — dense masonry + lightbox
9. **Reviews** — carousel (⚠️ placeholder content)
10. **Services** — family room, garden, hall, parking, takeaway, ice cream
11. **Reservation** — validated booking form
12. **FAQ** — native `<details>`, also feeds FAQ rich results
13. **Contact** — signboard, details, Instagram, map
14. **Footer** — ticker cap, links, contact

---

## Motion

No animation library. CSS plus a little `IntersectionObserver` / `rAF` glue:

- **`Reveal`** — one shared observer; entrances `up`, `clip` (line wipe),
  `scale`, `blur`
- **`useParallax`** — hero backdrop drifts against the scroll
- **`useMagnetic`** — the primary CTA leans toward the cursor and springs back
- Ken Burns, light sweep on the gold arch and CTAs, a gold **sheen** travelling
  across the wordmark, ornament rules that draw themselves in, 3D tilt on the
  signature plates, scroll-progress bar, marquee tickers, animated counters,
  hover lift and image zoom

> The `clip` reveal deliberately avoids `clip-path` on the observed element.
> Clipping it to zero area makes IntersectionObserver report it as never
> intersecting, so the reveal never fires — the wrapper keeps its box and the
> child slides instead.

---

## SEO

- Marathi-first title around **जत्रा धनगरी थाळी + गावरान मटण + कराड**
- `Restaurant` structured data — real phone, Instagram `sameAs`, cuisines,
  amenities, hours
- `Menu` structured data carrying the real thali and mutton prices
- `FAQPage` structured data generated from `src/data/faqData.js`, so the two
  cannot drift — if you edit a question, re-sync the block in `index.html`
- Open Graph / Twitter cards using an `og-image.jpg` built from the hotel's own
  thali photograph
- `geo` local signals, canonical URL, `robots.txt`, `sitemap.xml`
- Semantic landmarks, one `<h1>`, alt text on every image

Update the canonical/OG URLs, `sitemap.xml` and `robots.txt` with the real
domain before launch.

---

## Booking form

There is no booking backend, and the form does not need one. The hotel has no
inbox it watches — the number on the signboard is a WhatsApp number — so the
form's job is to *compose* the booking, not to transmit it.

`src/lib/whatsapp.js` builds every deep link the site opens: dish orders, the
hall enquiry, and the table booking. On submit the form validates, formats the
details the way the kitchen wants to read them (Devanagari numerals for the
date, time and party size; Latin digits for the phone number so it stays
diallable) and hands over to WhatsApp with the message already typed:

```
नमस्कार हॉटेल अतिथी! मला टेबल बुक करायचं आहे.

👤 नाव: अमोल पाटील       📅 तारीख: २८-०८-२०२६
📞 मोबाईल: 9876543210    🕒 वेळ: रात्री ८:३०
👥 पाहुणे: ४             📝 सूचना: खिडकीजवळचे टेबल
```

The window is opened straight from the submit gesture so it is not treated as a
popup, and the confirmation screen repeats the link in case a blocker eats it.

---

## Brand assets

The supplied artwork is used as-is; nothing was redrawn.

- `src/assets/logo.png`, `logo2.jpeg` — originals as supplied
- `src/assets/logo/atithi-badge.png` — circular mark, cropped to its circle with
  transparent corners
- `src/assets/logo/atithi-wordmark.png` — full lockup, yellow keyed out
- `src/assets/logo/atithi-figure.png` — the turbaned figure, isolated
- `public/favicon.png`, `apple-touch-icon.png`, `og-image.jpg`

## Photography

`src/data/images.js` imports every photograph and is the single source of truth.
To add or swap one, drop the file in `src/assets/` and add an import there.
`SmartImage` handles lazy loading, a shimmer placeholder and a cream fallback,
so the page never shows a broken-image icon.

## Structure

```
src/
├── components/
│   ├── ui/          Button, SmartImage, Reveal, SectionHeading, Ornament, Marquee, Icon, BrandIcons
│   ├── Navbar  Hero  Signature  Statement  About  Owner  Menu  Stats  WhyChooseUs
│   ├── Gallery  Testimonials  Services  Reservation  Faq  Contact  Footer
│   ├── ScrollProgress  FloatingCall  Logo
├── data/            siteData, menuData, signatureData, galleryData, testimonialsData, servicesData, faqData, images
├── hooks/           useActiveSection, useInView, useCountUp, useLockBodyScroll, useParallax
├── lib/             whatsapp (order / enquiry / booking deep links)
├── App.jsx  main.jsx  index.css
```

## Accessibility

- Keyboard support for the lightbox (`Esc`, `←`, `→`) and drawer (`Esc`)
- FAQ uses native `<details>` — works without JavaScript
- Focus rings, `aria-current`, `aria-invalid`, `aria-expanded`, skip link
- All motion disabled under `prefers-reduced-motion`, counters included


---

## Colour rules the audit enforces

`scripts/audit.cjs` walks every text node, converts `oklab()` — which Tailwind
emits for any colour with an opacity modifier — into sRGB, composites alpha
**in gamma space**, and fails anything under WCAG AA. Compositing in linear
space instead reports false failures on exactly the colours used most here.
Two rules came out of it:

1. **Saffron is a fill, never text on a light surface.** `#FFD900` on white is
   1.2:1. Warm text on cream uses `--color-amber-deep`; prices use vermillion.
2. **Body text needs ≥70% ink on cream.** The old dark layout could afford
   `text-ink/45`; on cream that is 1.7:1.

`Button` falls back to the `ember` variant if given an unknown name — an earlier
typo (`outline` instead of `outlineInk`) silently rendered `undefined` into the
class list and produced an invisible button.
