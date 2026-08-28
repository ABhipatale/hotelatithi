/**
 * Design + accessibility audit for the built site.
 *
 *   npm run build && npm run preview   # in one terminal
 *   npm run audit                      # in another
 *
 * Checks, in order of how often they have actually caught something here:
 *
 *  1. WCAG AA contrast on every text node. Tailwind v4 emits `oklab()` for any
 *     colour carrying an opacity modifier, so the parser converts that to sRGB
 *     and composites alpha in *gamma* space — compositing in linear space
 *     reports false failures on exactly the colours we use most.
 *  2. Horizontal overflow at desktop and phone widths.
 *  3. Broken images.
 *  4. Scroll reveals that never fired.
 *  5. Runtime errors.
 *
 * Elements sitting on a CSS gradient are skipped: there is no single background
 * colour to compare against, so those are judged by eye.
 */
const puppeteer = require("puppeteer-core");

const URL = process.env.AUDIT_URL || "http://localhost:4173/";
const CHROME =
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const CONTRAST_PROBE = () => {
  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

  function parse(col) {
    if (!col) return null;
    let m = col.match(/^rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
      return { r: p[0] / 255, g: p[1] / 255, b: p[2] / 255, a: p.length > 3 ? p[3] : 1 };
    }
    m = col.match(/^oklab\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[\s/]+/).filter(Boolean).map(Number);
    const [L, A, B] = p;
    const a = p.length > 3 ? p[3] : 1;
    const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
    const mm = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
    const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
    const toS = (v) => {
      v = Math.min(1, Math.max(0, v));
      return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
    };
    return {
      r: toS(4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s),
      g: toS(-1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s),
      b: toS(-0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s),
      a,
    };
  }

  const lum = (c) =>
    0.2126 * toLinear(Math.min(1, Math.max(0, c.r))) +
    0.7152 * toLinear(Math.min(1, Math.max(0, c.g))) +
    0.0722 * toLinear(Math.min(1, Math.max(0, c.b)));

  const ratio = (x, y) => {
    const a = Math.max(lum(x), lum(y));
    const b = Math.min(lum(x), lum(y));
    return (a + 0.05) / (b + 0.05);
  };

  const out = [];
  document
    .querySelectorAll("h1,h2,h3,h4,p,span,a,cite,dd,dt,li,button,summary")
    .forEach((el) => {
      // must own a direct text node — wrappers inherit a colour they never paint
      const own = [...el.childNodes]
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent.trim())
        .join(" ")
        .trim();
      if (!own) return;

      const box = el.getBoundingClientRect();
      if (box.width < 6 || box.height < 6) return;

      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.15) return;
      if (cs.webkitTextFillColor === "rgba(0, 0, 0, 0)") return; // gradient text

      const fg = parse(cs.color);
      if (!fg || fg.a < 0.15) return;

      let node = el;
      let bg = null;
      let onGradient = false;
      while (node && node !== document.documentElement) {
        const ncs = getComputedStyle(node);
        if (ncs.backgroundImage && ncs.backgroundImage.includes("gradient")) {
          onGradient = true;
          break;
        }
        const c = parse(ncs.backgroundColor);
        if (c && c.a > 0.5) {
          bg = c;
          break;
        }
        node = node.parentElement;
      }
      if (onGradient || !bg) return;

      const eff =
        fg.a >= 1
          ? fg
          : {
              r: fg.r * fg.a + bg.r * (1 - fg.a),
              g: fg.g * fg.a + bg.g * (1 - fg.a),
              b: fg.b * fg.a + bg.b * (1 - fg.a),
            };

      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
      const need = large ? 3 : 4.5;
      const cr = ratio(eff, bg);
      if (cr < need) {
        const sec = el.closest("section,footer,header");
        out.push({
          section: (sec && (sec.id || sec.tagName.toLowerCase())) || "?",
          text: own.slice(0, 26),
          ratio: Number(cr.toFixed(2)),
          need,
          size: Math.round(size),
        });
      }
    });
  return out;
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--hide-scrollbars"],
  });

  const problems = [];
  const note = (m) => problems.push(m);

  for (const view of [
    { name: "desktop", width: 1440, height: 900, dsf: 1 },
    { name: "phone", width: 390, height: 844, dsf: 2, mobile: true },
  ]) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewport({
      width: view.width,
      height: view.height,
      deviceScaleFactor: view.dsf,
      isMobile: Boolean(view.mobile),
    });
    await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.5) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 190));
      }
    });
    await wait(1100);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    const broken = await page.evaluate(
      () => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length
    );
    const unrevealed = await page.evaluate(
      () => document.querySelectorAll("[data-reveal]:not(.revealed)").length
    );

    if (overflow > 0) note(`${view.name}: horizontal overflow ${overflow}px`);
    if (broken > 0) note(`${view.name}: ${broken} broken image(s)`);
    if (unrevealed > 0) note(`${view.name}: ${unrevealed} reveal(s) never fired`);
    if (errors.length) note(`${view.name}: runtime error — ${errors.join(" | ")}`);

    if (view.name === "desktop") {
      const fails = await page.evaluate(CONTRAST_PROBE);
      if (fails.length) {
        note(`contrast: ${fails.length} element(s) below WCAG AA`);
        fails
          .sort((a, b) => a.ratio - b.ratio)
          .slice(0, 12)
          .forEach((f) =>
            note(
              `    ${f.ratio}:1 (needs ${f.need}) ${f.size}px  [${f.section}]  "${f.text}"`
            )
          );
      }
    }

    console.log(
      `${view.name.padEnd(8)} overflow=${overflow} broken=${broken} unrevealed=${unrevealed} errors=${errors.length}`
    );
    await page.close();
  }

  await browser.close();

  if (problems.length) {
    console.log("\nProblems found:");
    problems.forEach((p) => console.log("  " + p));
    process.exitCode = 1;
  } else {
    console.log("\nClean: contrast, overflow, images, reveals and console all pass.");
  }
})().catch((e) => {
  console.error("audit failed to run:", e.message);
  process.exit(1);
});
