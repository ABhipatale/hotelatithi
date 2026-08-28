/**
 * Bakes the rendered page into dist/index.html.
 *
 *   npm run build   # vite build → vite build --ssr → this
 *
 * WHY: the client build ships `<body><div id="root"></div></body>`. Every word
 * of copy, every heading, every dish name and price exists only after React
 * runs. Googlebot does execute JavaScript, but on a deferred second pass that
 * can lag the first by days, and most of the crawlers that matter to a
 * restaurant — Bing, WhatsApp and Facebook link previews, the scrapers behind
 * local directories — either render nothing or render badly.
 *
 * HOW: react-dom/server renders the app to a string. No browser.
 *
 * This used to drive headless Chrome, which worked on the machine it was
 * written on and failed every deploy: puppeteer-core ships no browser, so the
 * hardcoded Windows Chrome path did not exist on the build host and
 * `npm run build` exited 1. Rendering React with React needs no Chrome, runs
 * in milliseconds instead of seconds, and is deterministic — the same input
 * always produces the same HTML, which a screenshot of a live browser never
 * quite does.
 *
 * The client still boots with createRoot, not hydrateRoot: React replaces the
 * markup on mount. That is deliberate. Hydration would require the snapshot to
 * match React's first client render exactly, and it cannot — image load state
 * moves as soon as the bytes land. Re-rendering identical markup costs
 * milliseconds; a hydration mismatch costs correctness.
 */
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const ROOT = path.join(__dirname, "..");
const INDEX = path.join(ROOT, "dist", "index.html");
const SSR_ENTRY = path.join(ROOT, "dist-ssr", "entry-server.js");

(async () => {
  for (const [label, file] of [
    ["dist/index.html", INDEX],
    ["dist-ssr/entry-server.js", SSR_ENTRY],
  ]) {
    if (!fs.existsSync(file)) {
      console.error(`prerender: ${label} not found — run the full build.`);
      process.exit(1);
    }
  }

  const { render } = await import(pathToFileURL(SSR_ENTRY).href);
  const body = render();

  // A silently empty snapshot would be worse than none: it would serve a blank
  // page to every crawler that does not run scripts.
  if (!body || body.length < 5000 || !/<h1[\s>]/.test(body)) {
    console.error(
      `prerender: rendered ${body ? body.length : 0} chars, h1 present: ${/<h1[\s>]/.test(body || "")} — refusing to write.`
    );
    process.exit(1);
  }

  const html = fs.readFileSync(INDEX, "utf8");
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) {
    console.error("prerender: could not find an empty #root in dist/index.html.");
    process.exit(1);
  }

  fs.writeFileSync(INDEX, html.replace(marker, `<div id="root">${body}</div>`), "utf8");

  const h1 = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const text = h1 ? h1[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";
  console.log(
    `prerender: wrote dist/index.html — ${(body.length / 1024).toFixed(1)} kB of rendered content, h1 = "${text}"`
  );
})().catch((error) => {
  console.error("prerender failed:", error.message);
  process.exit(1);
});
