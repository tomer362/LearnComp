/* tools/verify-python.mjs — dev-only.
 *
 * Runs every code sample and every exercise solution in a lesson content file
 * through the real vendored Skulpt, in Node, with no browser. Asserts that:
 *   - every runnable teach `code` block executes without error
 *   - every teach block's declared `output` matches what actually happens
 *   - every exercise `solution` PASSES ITS OWN `check`
 *
 * That last one is the important guarantee: a solution that fails its checker
 * would strand her with an exercise nobody can complete.
 *
 *   node tools/verify-python.mjs                    # every content/lesson-*.js
 *   node tools/verify-python.mjs content/lesson-01.js
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ---- load Skulpt into a sandbox ------------------------------------- */

const sandbox = { console, setTimeout, clearTimeout, Date, Math, JSON, RegExp, Error };
sandbox.window = sandbox;
sandbox.self = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

sandbox.Promise = Promise;
for (const file of ["skulpt.min.js", "skulpt-stdlib.js"]) {
  const src = fs.readFileSync(path.join(root, "assets/js/vendor", file), "utf8");
  vm.runInContext(src, sandbox, { filename: file });
}
/* The battle engine is loaded into the SAME sandbox, so verification runs the
 * exact simulation the browser runs. See spec/09-battle-game.md. */
for (const file of ["sim.js", "pyapi.js", "play.js"]) {
  const src = fs.readFileSync(path.join(root, "assets/js/battle", file), "utf8");
  vm.runInContext(src, sandbox, { filename: "battle/" + file });
}
const Sk = sandbox.Sk;
const LCB = sandbox.LC;
if (!Sk) {
  console.error("Skulpt failed to load from assets/js/vendor/");
  process.exit(1);
}

/* ---- run one program ------------------------------------------------- */

/* Mirrors the page: the game words are always available, against a practice
 * field, so teaching examples and starters behave here exactly as they do for
 * her. See assets/js/battle/pyapi.js. */
function runPython(code, stdin = []) {
  const sandbox_ctx = LCB.PyApi.installSandbox();
  try {
    return runPythonBare(code, stdin);
  } finally {
    sandbox_ctx.uninstall();
  }
}

function runPythonBare(code, stdin = []) {
  let out = "";
  let i = 0;
  const captured = {};
  Sk.configure({
    output: (t) => { out += t; },
    read: (x) => {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
        throw "File not found: '" + x + "'";
      }
      return Sk.builtinFiles.files[x];
    },
    __future__: Sk.python3,
    execLimit: 5000,
    inputfun: () => (i < stdin.length ? String(stdin[i++]) : ""),
    inputfunTakesPrompt: true,
    retainGlobals: false,
  });
  try {
    const mod = Sk.importMainWithBody("<stdin>", false, code, true);
    return { ok: true, out, error: null, mod, captured };
  } catch (e) {
    /* Render errors exactly as assets/js/engine.js describeError() does, so a
     * lesson's declared `error` string can be compared against what she will
     * actually see on the page. */
    let type = "Error";
    let msg = String(e);
    let line = null;
    try {
      if (e && e.tp$name) type = e.tp$name;
      if (e && e.args && e.args.v && e.args.v.length) msg = String(e.args.v[0].v);
      if (e && e.traceback && e.traceback.length && e.traceback[0].lineno !== undefined) {
        line = e.traceback[0].lineno;
      }
    } catch { /* fall through to the regex below */ }
    if (line === null) {
      const m = /on line (\d+)/.exec(String(e));
      if (m) line = parseInt(m[1], 10);
    }
    const text = type + ": " + msg + (line ? " (line " + line + ")" : "");
    return { ok: false, out, error: text, mod: null, captured };
  }
}

function readVars(mod, names) {
  const out = {};
  if (!mod || !mod.$d) return out;
  for (const n of names) {
    const raw = mod.$d[n];
    if (raw === undefined) { out[n] = undefined; continue; }
    try { out[n] = Sk.ffi.remapToJs(raw); } catch { out[n] = undefined; }
  }
  return out;
}

/* ---- load the checker + a content file ------------------------------- */

function loadLesson(contentPath) {
  const shim = { LC: { LESSONS: {} } };
  shim.LC.registerLesson = (obj) => { shim.LC.LESSONS[obj.id] = obj; };
  shim.window = shim;
  vm.createContext(shim);
  vm.runInContext(fs.readFileSync(contentPath, "utf8"), shim, { filename: contentPath });
  const ids = Object.keys(shim.LC.LESSONS);
  if (!ids.length) throw new Error("no lesson registered by " + contentPath);
  return shim.LC.LESSONS[ids[0]];
}

/* Mirror of assets/js/checker.js. Kept deliberately small and separate so a
 * bug in one is not silently reproduced by the other. */
function normalize(t) {
  return String(t ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n").map((l) => l.replace(/[ \t]+/g, " ").trim()).join("\n")
    .replace(/\n{2,}/g, "\n").trim();
}
function sourceSkeleton(src) {
  return String(src)
    .replace(/#[^\n]*/g, " ")
    .replace(/"""[\s\S]*?"""/g, ' "" ').replace(/'''[\s\S]*?'''/g, " '' ")
    .replace(/"(?:\\.|[^"\\])*"/g, ' "" ').replace(/'(?:\\.|[^'\\])*'/g, " '' ");
}
function compareOutput(actual, spec) {
  const mode = spec.mode || "normalized";
  const expect = spec.expect ?? "";
  if (mode === "exact") return String(actual).replace(/\s+$/, "") === String(expect).replace(/\s+$/, "");
  if (mode === "contains") return normalize(actual).includes(normalize(expect));
  if (mode === "regex") return new RegExp(expect, spec.flags || "m").test(String(actual));
  return normalize(actual) === normalize(expect);
}
function checkSource(src, spec) {
  const sk = spec.raw ? String(src) : sourceSkeleton(src);
  for (const m of spec.mustInclude || []) if (!sk.includes(m)) return false;
  for (const m of spec.mustExclude || []) if (sk.includes(m)) return false;
  return true;
}
function sameValue(a, b) {
  if (a === b) return true;
  if (typeof a === "number" && typeof b === "number") return Math.abs(a - b) < 1e-9;
  try { return JSON.stringify(a) === JSON.stringify(b); } catch { return false; }
}

/* Same runner shape LC.Battle.play expects in the browser.
 * MUST use the bare runner: LC.Battle.play has already installed the API for
 * this level, and installing the sandbox on top would swallow her placements. */
function makeRunner(stdin = []) {
  return function pyRunner(code) {
    const r = runPythonBare(code, stdin);
    return Promise.resolve({
      ok: r.ok, output: r.out, error: r.ok ? null : { text: r.error },
      explanation: null, module: r.mod,
    });
  };
}

/* Mirrors LC.Checker.runAlso: one rule or a list, source or output. */
function runAlso(also, source, output) {
  const rules = Array.isArray(also) ? also : [also];
  for (const rule of rules) {
    if (!rule) continue;
    const ok = rule.kind === "source"
      ? checkSource(source, rule)
      : compareOutput(output, rule);
    if (!ok) return rule.kind === "source" ? "a source requirement" : "an output requirement";
  }
  return null;
}

async function runBattleCheck(level, source) {
  const spec = level.check || {};
  const r = await LCB.Battle.play(level, source, makeRunner(spec.stdin || []));
  if (!r.ok) return { pass: false, why: "error before the battle: " + (r.error && r.error.text) };

  const verdict = LCB.Battle.objective(r.sim, level);
  if (!verdict.pass) {
    const d = LCB.Battle.diagnose(r.sim, level);
    return {
      pass: false,
      why: `lost (${verdict.reason}): hp ${r.sim.campHp}/${r.sim.campHpStart}, ` +
           `leaked ${r.sim.leaked}, towers ${r.sim.towers.length}, spent ${r.sim.goldSpent}` +
           (d ? `\n         → ${d.en}` : ""),
    };
  }
  if (spec.also) {
    const failed = runAlso(spec.also, source, r.output);
    if (failed) return { pass: false, why: `won, but ${failed} failed` };
  }
  return { pass: true, sim: r.sim };
}

function runCheck(exercise, source) {
  const spec = exercise.check || {};
  const kind = spec.kind || "output";

  if (kind === "cases") {
    for (const c of spec.cases || []) {
      const r = runPython(source, c.stdin || []);
      if (!r.ok) return { pass: false, why: "error: " + r.error };
      if (!compareOutput(r.out, { mode: c.mode || spec.mode || "normalized", expect: c.expect })) {
        return { pass: false, why: `case ${JSON.stringify(c.stdin || [])} → ${JSON.stringify(r.out)} ≠ ${JSON.stringify(c.expect)}` };
      }
    }
    return { pass: true };
  }

  const names = kind === "variable" && spec.vars ? Object.keys(spec.vars) : [];
  const r = runPython(source, spec.stdin || []);
  if (!r.ok) return { pass: false, why: "error: " + r.error };

  let ok;
  if (kind === "variable") {
    const got = readVars(r.mod, names);
    ok = names.every((n) => sameValue(got[n], spec.vars[n]));
    if (!ok) return { pass: false, why: `vars ${JSON.stringify(got)} ≠ ${JSON.stringify(spec.vars)}` };
  } else if (kind === "source") {
    ok = checkSource(source, spec);
    if (!ok) return { pass: false, why: "source requirement not met" };
  } else {
    ok = compareOutput(r.out, spec);
    if (!ok) return { pass: false, why: `output ${JSON.stringify(r.out)} ≠ ${JSON.stringify(spec.expect)}` };
  }

  if (spec.also) {
    const failed = runAlso(spec.also, source, r.out);
    if (failed) return { pass: false, why: `the \`also\` check failed (${failed})` };
  }
  return { pass: true };
}

/* ---- verify a lesson -------------------------------------------------- */

let failures = 0;
let checks = 0;

function report(ok, label, why) {
  checks++;
  if (ok) {
    console.log("  \x1b[32mPASS\x1b[0m " + label);
  } else {
    failures++;
    console.log("  \x1b[31mFAIL\x1b[0m " + label + (why ? "\n         " + why : ""));
  }
}

async function verify(contentPath) {
  const lesson = loadLesson(contentPath);
  console.log("\n\x1b[1m" + path.relative(root, contentPath) + "\x1b[0m  — lesson " + lesson.id);

  // teach blocks
  (lesson.teach || []).forEach((block, i) => {
    if (block.type === "code") {
      const r = runPython(block.code);
      report(r.ok, `teach[${i}] code runs`, r.error);
      if (r.ok && block.output !== undefined) {
        report(normalize(r.out) === normalize(block.output),
          `teach[${i}] output matches declared`,
          `got ${JSON.stringify(r.out)}, declared ${JSON.stringify(block.output)}`);
      }
    }
    if (block.type === "error") {
      const r = runPython(block.code);
      report(!r.ok, `teach[${i}] error block actually errors`,
        r.ok ? "it ran successfully — the lesson claims it fails" : null);
      /* Showing her an error message the engine never produces teaches her to
       * recognise the wrong thing. Skulpt's wording differs from CPython's in
       * several places, so this must be asserted, not assumed. */
      if (!r.ok && block.error) {
        report(r.error.trim() === block.error.trim(),
          `teach[${i}] declared error text matches reality`,
          `actual:   ${r.error}\n         declared: ${block.error}`);
      }
    }
    if (block.type === "compare") {
      for (const side of ["bad", "good"]) {
        if (!block[side] || !block[side].code) continue;
        const r = runPython(block[side].code);
        // A `bad` side is allowed (and usually expected) to fail.
        if (side === "good") report(r.ok, `teach[${i}] compare.good runs`, r.error);
        if (block[side].result) {
          const actual = r.ok ? r.out : r.error;
          report(normalize(actual).includes(normalize(block[side].result)),
            `teach[${i}] compare.${side} declared result matches reality`,
            `actual:   ${JSON.stringify(actual)}\n         declared: ${JSON.stringify(block[side].result)}`);
        }
      }
    }
  });

  // try it
  if (lesson.tryIt && lesson.tryIt.starter) {
    const r = runPython(lesson.tryIt.starter);
    report(r.ok, "tryIt starter runs", r.error);
  }

  // exercises: starter should at least not crash, solution MUST pass its check
  const all = [...(lesson.training || [])];
  if (lesson.quest) all.push(lesson.quest);

  for (const ex of all) {
    const isBattle = ex.check && ex.check.kind === "battle";

    /* A starter is allowed to be deliberately broken — that IS the task in a
     * "fix the code" level. Flag it as intentional rather than skipping by id. */
    if (ex.starter && ex.starter.trim() && !ex.brokenStarter) {
      const r = runPython(ex.starter);
      if (isBattle) {
        /* A battle starter may legitimately fail to win; it must merely run. */
        report(r.ok, `${ex.id} starter runs`, r.error);
      } else {
        report(r.ok, `${ex.id} starter runs`, r.error);
      }
    }

    if (!ex.solution) { report(false, `${ex.id} has a solution`); continue; }

    if (isBattle) {
      const verdict = await runBattleCheck(ex, ex.solution);
      report(verdict.pass, `${ex.id} solution WINS its battle`, verdict.why);

      /* The level must not be passable by doing nothing — otherwise it teaches
       * nothing and she can click straight through it. */
      const lazy = await runBattleCheck(ex, '# nothing\n');
      report(!lazy.pass, `${ex.id} cannot be won by writing nothing`,
        lazy.pass ? "an empty program passes this level" : null);
    } else {
      const verdict = runCheck(ex, ex.solution);
      report(verdict.pass, `${ex.id} solution passes its own check`, verdict.why);
    }

    const hints = ex.hints || [];
    report(hints.length === 3, `${ex.id} has exactly 3 hints`, `found ${hints.length}`);
  }
}

/* ---- main ------------------------------------------------------------- */

const args = process.argv.slice(2);
const files = args.length
  ? args.map((a) => path.resolve(root, a))
  : fs.readdirSync(path.join(root, "content"))
      .filter((f) => /^lesson-\d+\.js$/.test(f))
      .map((f) => path.join(root, "content", f));

for (const f of files) await verify(f);

console.log(`\n${checks - failures}/${checks} checks passed`);
if (failures) {
  console.log(`\x1b[31m${failures} failed\x1b[0m`);
  process.exit(1);
}
console.log("\x1b[32mall good\x1b[0m");
