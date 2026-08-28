/**
 * Bakes the rendered page into dist/index.html.
 *
 *   npm run build   # vite build, then this
 *
 * WHY: the Vite build ships `<body><div id="root"></div></body>`. Every word
 * of copy, every heading, every dish name and price exists only after React
 * runs. Googlebot does execute JavaScript, but it does so on a second pass
 * that can lag the first by days, and most of the crawlers that matter to a
 * restaurant — Bing, WhatsApp and Facebook link previews, and the local
 * directory scrapers that feed sites like justdial and karaddiary — either
 * render nothing or render badly. A single-page marketing site has no reason
 * to make anyone wait for that.
 *
 * HOW: load the built site in headless Chrome, let the scroll reveals fire so
 * nothing is snapshotted at opacity 0 (a renderer that reads CSS may treat
 * hidden text as hidden), then write the resulting HTML back over dist.
 *
 * The client still boots with createRoot, not hydrateRoot: React replaces the
 * snapshot on mount. That is deliberate. Hydration would demand the snapshot
 * match React's first render exactly, and it cannot — image load state and the
 * reveal classes both move after mount. Re-rendering identical markup costs a
 * few milliseconds; a hydration mismatch costs correctness.
 */
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const puppeteer = require("puppeteer-core");

const DIST = path.join(__dirname, "..", "dist");
const CHROME =
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = Number(process.env.PRERENDER_PORT || 4179);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".pdf": "application/pdf",
};

/** Minimal static server — the built assets use absolute /assets/… paths. */
function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url.split("?")[0]);
      let file = path.join(DIST, url === "/" ? "index.html" : url);
      if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        file = path.join(DIST, "index.html");
      }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(PORT, () => resolve(server));
  });
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const indexPath = path.join(DIST, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("prerender: dist/index.html not found — run vite build first.");
    process.exit(1);
  }

  const server = await serve();
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // Walk the page so every IntersectionObserver reveal fires, then return to
    // the top so the navbar and the floating CTA are snapshotted at rest.
    await page.evaluate(
      () =>
        new Promise((done) => {
          let y = 0;
          const step = () => {
            y += 600;
            window.scrollTo(0, y);
            if (y < document.body.scrollHeight) setTimeout(step, 60);
            else {
              window.scrollTo(0, 0);
              setTimeout(done, 600);
            }
          };
          step();
        })
    );
    await wait(1200);

    const { html, bytes, h1 } = await page.evaluate(() => {
      // Belt and braces: any reveal that somehow did not fire would be baked in
      // at opacity 0, and hidden text is text a renderer may discount.
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("revealed"));
      const root = document.getElementById("root");
      return {
        html: `<!doctype html>\n${document.documentElement.outerHTML}`,
        bytes: root ? root.innerHTML.length : 0,
        h1: document.querySelector("h1")?.textContent.trim() ?? "",
      };
    });

    // Shipping a silently empty snapshot would be worse than shipping none: it
    // would serve a blank page to every crawler that does not run scripts.
    if (bytes < 5000 || !h1) {
      console.error(`prerender: only ${bytes} bytes and h1="${h1}" — refusing to write.`);
      process.exit(1);
    }

    fs.writeFileSync(indexPath, html, "utf8");
    console.log(
      `prerender: wrote dist/index.html — ${(html.length / 1024).toFixed(1)} kB total, ` +
        `${(bytes / 1024).toFixed(1)} kB of rendered content, h1 = "${h1}"`
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((error) => {
  console.error("prerender failed:", error.message);
  process.exit(1);
});
