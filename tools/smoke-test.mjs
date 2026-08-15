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

section("Battle rendering");
check((await page.locator(".battle-canvas").count()) === 5, "every level renders a battlefield canvas",
  "found " + (await page.locator(".battle-canvas").count()));
const boardPainted = await page.evaluate(() => {
  const c = document.querySelector(".battle-canvas");
  const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
  let painted = 0;
  for (let i = 3; i < d.length; i += 4000) if (d[i] > 0) painted++;
  return painted;
});
check(boardPainted > 10, "the board is actually drawn, not blank", "opaque samples: " + boardPainted);
check((await page.locator(".battle-controls .btn").count()) >= 15, "each battle has playback controls");
check((await page.locator(".battle-canvas[aria-label]").count()) === 5,
  "every battlefield is labelled for screen readers");
check((await page.locator('.verdict[role="status"][aria-live]').count()) === 5,
  "outcomes are announced, not conveyed by colour alone");

section("Battle flow — lose, diagnose, win");
const e2 = page.locator(".exercise").nth(1); // b2: needs three towers
await e2.locator(".editor-area").fill('place_tower("archer", 0, 0)');
await e2.locator(".btn-run").click();
await page.waitForFunction(
  () => document.querySelectorAll(".exercise")[1].querySelector(".verdict")?.className.includes("is-fail"),
  { timeout: 30000 }
).catch(() => {});
check((await e2.locator(".verdict").getAttribute("class")).includes("is-fail"),
  "a losing defense is rejected");
const why = await e2.locator(".verdict").textContent();
check(/רחוק|too far|path|שביל/i.test(why),
  "the loss is explained, not just reported", why.trim().slice(0, 90));

const ambrosiaBefore = await page.locator(".hud-res .res").nth(1).textContent();
await e2.locator(".btn-hint").click();
check((await e2.locator(".hint").count()) === 1, "first hint appears");
const ambrosiaAfter = await page.locator(".hud-res .res").nth(1).textContent();
check(ambrosiaBefore !== ambrosiaAfter, "a hint costs ambrosia",
  `${ambrosiaBefore} -> ${ambrosiaAfter}`);

await e2.locator(".editor-area").fill(
  'place_tower("archer", 2, 3)\nplace_tower("archer", 5, 3)\nplace_tower("archer", 7, 5)'
);
await e2.locator(".btn-run").click();
await page.waitForFunction(
  () => document.querySelectorAll(".exercise")[1].querySelector(".verdict")?.className.includes("is-pass"),
  { timeout: 30000 }
);
check(true, "a winning defense is accepted");
check((await e2.getAttribute("class")).includes("is-solved"), "the level is marked solved");

/* ---- complete the whole lesson ---------------------------------------- */

section("Completing lesson 1");
/* The declared solutions from content/lesson-01.js. verify-python.mjs already
 * proves these win headlessly; this proves the page agrees. */
const solutions = [
  'place_tower("archer", 2, 3)',
  'place_tower("archer", 2, 3)\nplace_tower("archer", 5, 3)\nplace_tower("archer", 7, 5)',
  'place_tower("archer", 2, 3)\nplace_tower("archer", 5, 3)\nplace_tower("archer", 7, 5)',
  '# cover the straight run, then the corner\nplace_tower("archer", 2, 2)\n' +
    'place_tower("archer", 3, 4)\nplace_tower("archer", 6, 4)\nplace_tower("archer", 8, 6)',
  '# cover both bends and the final run\nplace_tower("archer", 2, 2)\n' +
    'place_tower("archer", 4, 3)\nplace_tower("archer", 2, 0)\nplace_tower("archer", 5, 3)\n' +
    'place_tower("archer", 6, 5)\nplace_tower("archer", 8, 5)',
];
for (let i = 0; i < solutions.length; i++) {
  const card = page.locator(".exercise").nth(i);
  await card.locator(".editor-area").fill(solutions[i]);
  await card.locator(".btn-run").click();
  await page.waitForFunction(
    (n) => document.querySelectorAll(".exercise")[n].className.includes("is-solved"),
    i, { timeout: 30000 }
  ).catch(() => {});
  check((await card.getAttribute("class")).includes("is-solved"),
    `battle ${i + 1} of 5 won`);
}

check(await page.locator("#lesson-complete.show").isVisible(),
  "the reward panel appears when every exercise is solved");
const itemName = await page.locator(".item-name").textContent();
check(itemName.trim().length > 0, "the earned item is named", itemName);

await page.goto(url("index.html"));
await page.waitForSelector(".map");
check((await page.locator(".stop").first().getAttribute("class")).includes("is-done"),
  "lesson 1 shows as completed on the map");
const packName = await page.locator(".pack-item .pack-name").first().textContent();
check(!/camp-bead/.test(packName) && packName.trim().length > 0,
  "the inventory shows a real item name, not a raw id", packName);
check(await page.locator('.stop a[href*="lesson-01"]').isVisible(),
  "a completed lesson is still replayable");

await page.goto(url("lessons/lesson-01.html"));
await page.waitForSelector(".beat-teach");

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

/* ---- syntax diagnosis -------------------------------------------------- */

/* Skulpt reports every indentation mistake as a flat "bad input", which is
 * useless to a beginner and would sink lesson 6. The engine diagnoses these
 * from the source; if that regresses, lesson 6 becomes unteachable. */
/* Lesson 18 is built on reading a traceback from a strategy function that
 * crashed mid-battle. If the error is swallowed she sees "you lost" with full
 * camp HP and no explanation. */
section("A crashing strategy surfaces its real error");
const crash = await page.evaluate(async () => {
  const level = {
    map: { cols: 10, rows: 6, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]] },
    gold: 200, campHp: 3, seed: 1, allowed: ["archer"],
    waves: [{ delay: 0, enemies: [{ kind: "satyr", count: 3, gap: 1 }] }],
    check: { kind: "battle" },
  };
  const res = await LC.Checker.check(level,
    'place_tower("archer", 2, 3)\ndef choose_target(enemies):\n    return enemies[99]');
  return {
    pass: res.pass,
    err: res.error ? res.error.text : null,
    why: res.explanation ? res.explanation.en : null,
  };
});
check(crash.pass === false, "a crashing strategy loses the battle");
check(/IndexError/.test(crash.err || ""), "the real Python error is surfaced", crash.err);
check(!!crash.why, "and it is explained in her language", crash.why);

/* Lesson 3 asks her a question with input() before the battle, and several
 * levels demand both a printed report and a source construct. */
section("Battle stdin and multiple requirements");
const battleExtras = await page.evaluate(async () => {
  const base = {
    map: { cols: 10, rows: 6, path: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4]] },
    gold: 300, campHp: 3, seed: 1, allowed: ["archer"],
    waves: [{ delay: 0, enemies: [{ kind: "satyr", count: 3, gap: 1.2 }] }],
  };
  const WIN = 'place_tower("archer", 2, 3)\nplace_tower("archer", 5, 3)\nplace_tower("archer", 7, 5)';
  const SRC = { kind: "source", mustInclude: ["place_tower"], message: { he: "", en: "x" } };
  const OUT = { kind: "output", mode: "contains", expect: "ready" };
  const t = async (exercise, src) => (await LC.Checker.check(exercise, src)).pass;
  return [
    ["stdin reaches input() in a build script",
      await t({ ...base, check: { kind: "battle", stdin: ["3"] } },
        'row = int(input("row? "))\nplace_tower("archer", 2, row)\n' +
        'place_tower("archer", 5, row)\nplace_tower("archer", 7, 5)') === true],
    ["also accepts an array, all rules pass",
      await t({ ...base, check: { kind: "battle", also: [SRC, OUT] } }, WIN + '\nprint("ready")') === true],
    ["also array rejects a failing output rule",
      await t({ ...base, check: { kind: "battle", also: [SRC, OUT] } }, WIN) === false],
    ["also array rejects a failing source rule",
      await t({ ...base, check: { kind: "battle",
        also: [{ kind: "source", mustInclude: ["for"], message: { he: "", en: "need for" } }] } }, WIN) === false],
    ["a single also object still works",
      await t({ ...base, check: { kind: "battle", also: SRC } }, WIN) === true],
  ];
});
for (const [name, ok] of battleExtras) check(ok, name);

/* A budget or tower-cap failure is definitive and must not be shadowed by a
 * heuristic like "a tower never fired", which would send her looking in the
 * wrong place entirely. */
section("Level constraints are explained");
const constraints = await page.evaluate(async () => {
  const base = {
    map: { cols: 12, rows: 7, path: Array.from({ length: 12 }, (_, x) => [x, 4]) },
    gold: 600, campHp: 3, seed: 1, allowed: ["archer"],
    waves: [{ delay: 0, enemies: [{ kind: "satyr", count: 3, gap: 1 }] }],
  };
  const txt = (v) => (v.reason ? (v.reason.en || "") + (v.reason.he || "") : "");
  const cap = await LC.Checker.check({ ...base, check: { kind: "battle", maxTowers: 2 } },
    'place_tower("archer",2,3)\nplace_tower("archer",4,3)\nplace_tower("archer",6,3)\nplace_tower("archer",8,3)');
  const gold = await LC.Checker.check({ ...base, check: { kind: "battle", maxGoldSpent: 100 } },
    'place_tower("archer",2,3)\nplace_tower("archer",4,3)\nplace_tower("archer",6,3)');
  return [
    ["a tower cap is enforced", cap.pass === false],
    ["and named in the message", /allows 2|מרשה 2/.test(txt(cap))],
    ["a gold budget is enforced", gold.pass === false],
    ["and named in the message", /budget is 100|תקציב.*100/.test(txt(gold))],
  ];
});
for (const [name, ok] of constraints) check(ok, name);

/* Battle bosses have no test cases, so the old segment-counting bar always
 * drew one segment. It tracks the monster's own HP now. */
section("Boss health bar");
const bossBar = await page.evaluate(async () => {
  const path = Array.from({ length: 16 }, (_, x) => [x, 4]);
  LC.registerLesson({
    id: "99", act: 1, slug: "boss-test", minutes: 1,
    title: { he: "בוס", en: "Boss" },
    item: { id: "x", icon: "x", name: { he: "x", en: "x" }, desc: { he: "x", en: "x" } },
    prophecy: { lines: [{ he: "x", en: "x" }] }, teach: [], training: [],
    quest: {
      id: "qb", xp: 10, drachmas: 1, title: { he: "בוס", en: "Boss" }, brief: { he: "x", en: "x" },
      boss: { icon: "🐂", name: { he: "המינוטאור", en: "The Minotaur" }, hp: 420 },
      map: { cols: 16, rows: 7, path }, gold: 1200, campHp: 5, seed: 1, allowed: ["cannon"],
      waves: [{ delay: 0, enemies: [{ kind: "minotaur", count: 1, gap: 1 }] }],
      starter: "", solution: "", hints: [{ he: "a", en: "a" }, { he: "b", en: "b" }, { he: "c", en: "c" }],
      check: { kind: "battle" },
    },
    recap: { bullets: [{ he: "x", en: "x" }], next: { he: "x", en: "x" } },
  });
  LC.Lesson.mount("99");
  const bar = document.querySelector(".boss-track-hp");
  const name = document.querySelector(".boss-name");
  return { exists: !!bar, named: name ? /Minotaur|מינוטאור/.test(name.textContent) : false };
});
check(bossBar.exists, "a battle boss renders an HP bar");
check(bossBar.named, "and the boss is named");

const drain = await page.evaluate(async () => {
  const ta = document.querySelector(".exercise .editor-area");
  ta.value = Array.from({ length: 12 }, (_, i) => `place_tower("cannon", ${i + 2}, ${i % 2 ? 3 : 5})`).join("\n");
  document.querySelector(".exercise .btn-run").click();
  await new Promise((r) => setTimeout(r, 1500));
  const mid = parseFloat(document.querySelector(".boss-fill").style.width) || 100;
  await new Promise((r) => setTimeout(r, 6000));
  const end = parseFloat(document.querySelector(".boss-fill").style.width) || 0;
  return { mid, end };
});
check(drain.end < drain.mid, "the boss bar drains as it takes damage",
  `${drain.mid}% → ${drain.end}%`);

await page.goto(url("lessons/lesson-01.html"));
await page.waitForSelector(".beat-teach");

section("Beginner error diagnosis");
const diagnoses = await page.evaluate(async () => {
  const cases = [
    ["missing indent",     'if True:\nprint("hi")',                        /מוזחת|indent/],
    ["unexpected indent",  'print("a")\n    print("b")',                   /לא פותחת בלוק|does not open a block/],
    ["missing colon",      'x = 1\nif x == 1\n    print("hi")',            /נקודתיים|colon/],
    ["else if",            'x=1\nif x==1:\n    print("a")\nelse if x==2:\n    print("b")', /elif/],
    ["unclosed quote",     'print("hi)',                                   /גרשיים|quote/],
    ["ragged indent",      'if True:\n    print("a")\n  print("b")',       /עקבית|inconsistent/],
    ["python 2 print",     'print "hi"',                                   /סוגריים|brackets/],
  ];
  const out = [];
  for (const [name, code, re] of cases) {
    const r = await LC.Engine.run(code, { execLimitMs: 3000 });
    out.push({
      name,
      ok: !r.ok && re.test(r.explanation.he + " " + r.explanation.en),
      got: r.explanation ? r.explanation.en.slice(0, 60) : "(ran without error)",
    });
  }
  return out;
});
for (const d of diagnoses) check(d.ok, `diagnoses: ${d.name}`, d.got);

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

/* ---- checker kinds ----------------------------------------------------- */

/* Lesson 1 only exercises `output` and `source`. `variable` and `cases` are
 * load-bearing from lesson 2 and every boss, so cover them here rather than
 * discovering they are broken when someone writes lesson 4. */
section("Checker kinds");
const checkerResults = await page.evaluate(async () => {
  const t = async (name, exercise, source, want) => {
    const v = await LC.Checker.check(exercise, source);
    return { name, ok: v.pass === want, detail: `${v.passedCount ?? "?"}/${v.total ?? "?"}` };
  };
  return [
    await t("variable: correct values accepted",
      { check: { kind: "variable", vars: { hero: "Percy", age: 12, hp: 3.5, party: ["a", "b"] } } },
      'hero = "Percy"\nage = 12\nhp = 3.5\nparty = ["a", "b"]', true),
    await t("variable: wrong value rejected",
      { check: { kind: "variable", vars: { hero: "Percy" } } }, 'hero = "Annabeth"', false),
    await t("variable: missing variable rejected",
      { check: { kind: "variable", vars: { hero: "Percy" } } }, "x = 1", false),
    await t("cases: stdin is queued per case",
      { check: { kind: "cases", cases: [
        { stdin: ["Percy"], expect: "Hello, Percy!" },
        { stdin: ["Annabeth"], expect: "Hello, Annabeth!" }] } },
      'n = input("Name: ")\nprint(f"Hello, {n}!")', true),
    await t("cases: partial progress is counted (boss health)",
      { check: { kind: "cases", cases: [
        { stdin: ["1"], expect: "one" }, { stdin: ["2"], expect: "two" }] } },
      'n = input()\nprint("one")', false),
    await t("source: mustInclude / mustExclude",
      { check: { kind: "source", mustInclude: ["for"], mustExclude: ["while"], message: { he: "", en: "" } } },
      "for i in range(3):\n    print(i)", true),
    await t("source: not fooled by a string literal",
      { check: { kind: "source", mustInclude: ["for"], message: { he: "", en: "" } } },
      'print("for")', false),
    await t("source: raw:true sees comments",
      { check: { kind: "source", raw: true, mustInclude: ["#"], message: { he: "", en: "" } } },
      '# a note\nprint("hi")', true),
  ];
});
for (const r of checkerResults) check(r.ok, r.name, r.detail);

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
