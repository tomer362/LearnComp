/* tools/make-icons.mjs — dev-only.
 *
 * Renders the PWA icon set and the social preview image with the real
 * Chromium so they use the same rendering as the game itself, then writes
 * PNGs into assets/img/. Never loaded by a page; run by hand after changing
 * the brand mark or palette.
 *
 *   node tools/make-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "assets/img");
fs.mkdirSync(outDir, { recursive: true });

/* Matches assets/css/theme.css :root — kept as plain values here since this
 * script never loads the stylesheet. */
const SEA_DEEP = "#0b2545";
const SEA = "#13315c";
const BRONZE = "#c98b3a";
const GOLD = "#ffd166";

function iconHtml(size, { maskableSafe = false } = {}) {
  /* Maskable icons are cropped to a shape by the OS; keep the mark inside the
   * ~80% "safe zone" so it never gets clipped. */
  const markSize = maskableSafe ? Math.round(size * 0.55) : Math.round(size * 0.68);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;width:${size}px;height:${size}px;overflow:hidden;}
    .icon{width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;
      background:radial-gradient(${size * 1.4}px ${size * 0.9}px at 50% -10%, ${SEA} 0%, transparent 60%), ${SEA_DEEP};}
    .mark{font-size:${markSize}px;line-height:1;filter:drop-shadow(0 ${Math.round(size * 0.02)}px ${Math.round(size * 0.05)}px rgba(0,0,0,.35));}
  </style></head><body><div class="icon"><span class="mark">⚡</span></div></body></html>`;
}

function ogHtml() {
  const w = 1200, h = 630;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;width:${w}px;height:${h}px;overflow:hidden;
      font-family:"Assistant","Rubik","Heebo",system-ui,sans-serif;}
    .card{width:${w}px;height:${h}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;
      background:radial-gradient(1200px 600px at 50% -10%, ${SEA} 0%, transparent 60%), ${SEA_DEEP};color:#f4f1ea;}
    .mark{font-size:160px;line-height:1;}
    .title{font-size:56px;font-weight:700;}
    .tagline{font-size:30px;color:${BRONZE};direction:rtl;}
    .rule{width:120px;height:4px;background:${GOLD};border-radius:99px;}
  </style></head><body><div class="card">
    <div class="mark">⚡</div>
    <div class="title">קוד של חצי־אל · Demigod Code</div>
    <div class="rule"></div>
    <div class="tagline">ללמוד פייתון במחנה חצי־דם</div>
  </div></body></html>`;
}

const browser = await chromium.launch();

async function shoot(html, size, file) {
  const page = await browser.newPage({ viewport: size });
  await page.setContent(html);
  await page.screenshot({ path: path.join(outDir, file), omitBackground: false });
  await page.close();
  console.log("  wrote " + file);
}

await shoot(iconHtml(192), { width: 192, height: 192 }, "icon-192.png");
await shoot(iconHtml(512), { width: 512, height: 512 }, "icon-512.png");
await shoot(iconHtml(512, { maskableSafe: true }), { width: 512, height: 512 }, "icon-maskable-512.png");
await shoot(iconHtml(180), { width: 180, height: 180 }, "apple-touch-icon.png");
await shoot(ogHtml(), { width: 1200, height: 630 }, "og.png");

await browser.close();
console.log("done — assets/img/*.png");
