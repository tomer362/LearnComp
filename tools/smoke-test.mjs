/* tools/smoke-test.mjs — dev-only end-to-end test.
 *
 * Opens the real pages over file:// WITH THE NETWORK BLOCKED and drives them
 * the way she would. This is the test that matters most: the entire delivery
 * model rests on the course working with no server and no internet.
 *
 *   node tools/smoke-test.mjs
 *   node tools/smoke-test.mjs --shots     # also write screenshots
 */
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shots = process.argv.includes("--shots");
const shotDir = path.join(root, ".screenshots");
if (shots) fs.mkdirSync(shotDir, { recursive: true });

const url = (rel) => pathToFileURL(path.join(root, rel)).href;

let pass = 0, fail = 0;
const problems = [];
function check(ok, label, detail) {
  if (ok) { pass++; console.log("  \x1b[32mPASS\x1b[0m " + label); }
  else {
    fail++; problems.push(label);
    console.log("  \x1b[31mFAIL\x1b[0m " + label + (detail ? "\n         " + detail : ""));
  }
}
const section = (t) => console.log("\n\x1b[1m" + t + "\x1b[0m");

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });

/* Block every non-file request. Any attempt is itself a failure. */
const networkAttempts = [];
await ctx.route("**", (route) => {
  const u = route.request().url();
  if (u.startsWith("file://") || u.startsWith("data:") || u.startsWith("about:")) return route.continue();
  networkAttempts.push(u);
  return route.abort();
});

const page = await ctx.newPage();
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message));

/* ---- hub: claiming ---------------------------------------------------- */

section("Hub — first visit and claiming");
await page.goto(url("index.html"));
await page.evaluate(() => localStorage.clear());
await page.reload();

check(await page.locator(".claim").isVisible(), "claiming flow appears on first visit");
check((await page.getAttribute("html", "dir")) === "rtl", "page opens in RTL");
check((await page.getAttribute("html", "lang")) === "he", "page opens in Hebrew");

await page.fill(".claim-input", "Tamar");
await page.click(".claim-name .btn-run");
for (let i = 0; i < 5; i++) {
  await page.locator(".claim-option").first().click();
}
check(await page.locator(".claim-result").isVisible(), "claiming resolves to a cabin");
const godName = await page.locator(".claim-god").textContent();
check(!!godName && godName.trim().length > 0, "a god is named", godName);
await page.click(".claim-result .btn-run");

check(await page.locator(".map").isVisible(), "quest map renders after claiming");
check((await page.locator(".stop").count()) === 20, "map shows all 20 stops",
  "found " + (await page.locator(".stop").count()));
check((await page.locator(".hud-name").textContent()).includes("Tamar"), "her name shows in the HUD");
check((await page.locator(".stop.is-soon").count()) === 19, "19 stops marked coming soon");
check(await page.locator('.stop a[href*="lesson-01"]').isVisible(), "lesson 1 is playable from the map");

if (shots) await page.screenshot({ path: path.join(shotDir, "hub-he.png"), fullPage: true });

/* ---- language toggle on the hub --------------------------------------- */

section("Language toggle");
await page.click(".btn-lang");
check((await page.getAttribute("html", "dir")) === "ltr", "toggling switches to LTR");
check((await page.getAttribute("html", "lang")) === "en", "toggling switches to English");
const enTitle = await page.locator(".hero h1").textContent();
check(/Quest/i.test(enTitle), "hub heading is translated", enTitle);
if (shots) await page.screenshot({ path: path.join(shotDir, "hub-en.png"), fullPage: true });
await page.click(".btn-lang");
check((await page.getAttribute("html", "dir")) === "rtl", "toggling back returns to RTL");

/* ---- lesson 1 --------------------------------------------------------- */

section("Lesson 1 — running Python from file://");
await page.goto(url("lessons/lesson-01.html"));
await page.waitForSelector(".beat-teach");

check(await page.locator(".scroll").isVisible(), "prophecy scroll renders");
check((await page.locator(".exercise").count()) === 5, "4 training exercises + 1 quest render",
  "found " + (await page.locator(".exercise").count()));

/* the first runnable teach block */
const firstRun = page.locator(".beat-teach .runner").first();
await firstRun.locator(".btn-run").click();
await page.waitForFunction(
  () => document.querySelector(".beat-teach .runner .output-body")?.textContent?.includes("Hello, Olympus"),
  { timeout: 30000 }
);
check(true, "vendored Skulpt runs Python from file:// with the network blocked");

/* code stays LTR in Hebrew mode — the rule that breaks the product */
const editorDir = await page.locator(".editor").first().getAttribute("dir");
check(editorDir === "ltr", "editor stays dir=ltr in Hebrew mode", "got " + editorDir);
const outDir = await page.locator(".output").first().getAttribute("dir");
check(outDir === "ltr", "output stays dir=ltr in Hebrew mode", "got " + outDir);

/* ---- exercise: wrong answer, hint ladder, right answer ----------------- */

section("Exercise flow — fail, hint, pass");
const e2 = page.locator(".exercise").nth(1); // e2: three lines
await e2.locator(".editor-area").fill('print("wrong")');
await e2.locator(".btn-run").click();
await page.waitForSelector(".exercise:nth-of-type(2) .verdict.is-fail", { timeout: 30000 }).catch(() => {});
check((await e2.locator(".verdict").getAttribute("class")).includes("is-fail"),
  "a wrong answer is rejected");

const ambrosiaBefore = await page.locator(".hud-res .res").nth(1).textContent();
await e2.locator(".btn-hint").click();
check((await e2.locator(".hint").count()) === 1, "first hint appears");
const ambrosiaAfter = await page.locator(".hud-res .res").nth(1).textContent();
check(ambrosiaBefore !== ambrosiaAfter, "a hint costs ambrosia",
  `${ambrosiaBefore} -> ${ambrosiaAfter}`);

await e2.locator(".editor-area").fill(
  'print("I am a demigod")\nprint("I am not afraid")\nprint("(mostly)")'
);
await e2.locator(".btn-run").click();
await page.waitForFunction(
  () => document.querySelectorAll(".exercise")[1].querySelector(".verdict")?.className.includes("is-pass"),
  { timeout: 30000 }
);
check(true, "the correct answer is accepted");
check((await e2.getAttribute("class")).includes("is-solved"), "the exercise is marked solved");

/* ---- error handling and the exec limit -------------------------------- */

section("Errors and the execution limit");
const tryIt = page.locator(".beat-try .runner");
await tryIt.locator(".editor-area").fill('print("unclosed)');
await tryIt.locator(".btn-run").click();
await page.waitForSelector(".beat-try .output.has-error", { timeout: 30000 });
const realErr = await tryIt.locator(".err-real").textContent();
check(/SyntaxError|EOL|bad input/i.test(realErr), "the real English error is shown", realErr);
check((await tryIt.locator(".err-why-body").textContent()).trim().length > 0,
  "a friendly explanation is shown beside it");

await tryIt.locator(".editor-area").fill("while True:\n    pass");
await tryIt.locator(".btn-run").click();
await page.waitForSelector(".beat-try .output.has-error", { timeout: 40000 });
const limitErr = await tryIt.locator(".err-real").textContent();
check(/TimeLimit/i.test(limitErr), "an infinite loop is stopped by the exec limit", limitErr);

/* ---- input() ---------------------------------------------------------- */

section("input() suspension");
await tryIt.locator(".editor-area").fill('name = input("Your name: ")\nprint("Hello, " + name)');
await tryIt.locator(".btn-run").click();
await page.waitForSelector(".input-ask", { timeout: 30000 });
check(true, "input() renders an in-page prompt");
await page.fill(".input-ask-field", "Annabeth");
await page.click(".input-ask .btn-small");
await page.waitForFunction(
  () => document.querySelector(".beat-try .output-body")?.textContent?.includes("Hello, Annabeth"),
  { timeout: 30000 }
);
check(true, "input() resumes the program with her answer");

if (shots) await page.screenshot({ path: path.join(shotDir, "lesson-he.png"), fullPage: true });

/* ---- persistence ------------------------------------------------------ */

section("Persistence");
const xpBefore = await page.locator(".hud-xp-label span").nth(1).textContent();
await page.reload();
await page.waitForSelector(".beat-teach");
const xpAfter = await page.locator(".hud-xp-label span").nth(1).textContent();
check(xpBefore === xpAfter, "XP survives a reload", `${xpBefore} -> ${xpAfter}`);
check((await page.locator(".exercise").nth(1).getAttribute("class")).includes("is-solved"),
  "the solved exercise is still solved after reload");

await page.goto(url("index.html"));
await page.waitForSelector(".map");
const exported = await page.evaluate(() => {
  document.querySelectorAll(".savebox .btn-ghost")[0].click();
  return document.querySelector(".savearea").value;
});
check(exported.includes("Tamar") && exported.includes("\"xp\""), "export produces a usable save");

/* ---- language toggle inside a lesson ---------------------------------- */

section("Lesson in English");
await page.goto(url("lessons/lesson-01.html"));
await page.waitForSelector(".beat-teach");
await page.click(".btn-lang");
check((await page.getAttribute("html", "dir")) === "ltr", "lesson flips to LTR");
const enScroll = await page.locator(".scroll-line").first().textContent();
check(/reach the camp|gates/i.test(enScroll), "prophecy is translated", enScroll);
const enEditorDir = await page.locator(".editor").first().getAttribute("dir");
check(enEditorDir === "ltr", "editor is still LTR in English");
if (shots) await page.screenshot({ path: path.join(shotDir, "lesson-en.png"), fullPage: true });

/* ---- mobile ----------------------------------------------------------- */

section("Phone width (390px)");
const phone = await ctx.newPage();
await phone.goto(url("lessons/lesson-01.html"));
await phone.setViewportSize({ width: 390, height: 844 });
await phone.waitForSelector(".beat-teach");
const overflow = await phone.evaluate(() =>
  document.documentElement.scrollWidth - document.documentElement.clientWidth);
check(overflow <= 1, "no horizontal scroll at 390px", "overflow " + overflow + "px");
if (shots) await phone.screenshot({ path: path.join(shotDir, "lesson-phone.png"), fullPage: true });

const hubPhone = await ctx.newPage();
await hubPhone.setViewportSize({ width: 390, height: 844 });
await hubPhone.goto(url("index.html"));
await hubPhone.waitForSelector(".map");
const hubOverflow = await hubPhone.evaluate(() =>
  document.documentElement.scrollWidth - document.documentElement.clientWidth);
check(hubOverflow <= 1, "hub has no horizontal scroll at 390px", "overflow " + hubOverflow + "px");

/* ---- global assertions ------------------------------------------------ */

section("Global");
check(networkAttempts.length === 0, "zero network requests attempted",
  networkAttempts.slice(0, 5).join(", "));
check(consoleErrors.length === 0, "zero console errors",
  consoleErrors.slice(0, 5).join(" | "));

await browser.close();

console.log(`\n${pass}/${pass + fail} checks passed`);
if (fail) {
  console.log("\x1b[31mfailed:\x1b[0m\n  - " + problems.join("\n  - "));
  process.exit(1);
}
console.log("\x1b[32mall good\x1b[0m");
