/* tools/try-level.mjs — dev-only. Play one battle level from the command line.
 *
 * Designing a level is iterative: move a tower, change a wave, see if it still
 * works. This runs a single level through the real engine without needing a
 * whole content file or a browser.
 *
 *   node tools/try-level.mjs level.json solution.py
 *   node tools/try-level.mjs level.json solution.py --quiet
 *
 * level.json is the level object from spec/09-battle-game.md (map, gold,
 * campHp, seed, allowed, waves, and optionally check).
 *
 * It always ALSO runs an empty program, because a level that an empty program
 * beats is a broken level — that is the check most easily forgotten.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const sandbox = { console, setTimeout, clearTimeout, Date, Math, JSON, RegExp, Error, Promise };
sandbox.window = sandbox; sandbox.self = sandbox; sandbox.globalThis = sandbox;
vm.createContext(sandbox);
for (const f of ["vendor/skulpt.min.js", "vendor/skulpt-stdlib.js",
                 "battle/sim.js", "battle/pyapi.js", "battle/play.js"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "assets/js", f), "utf8"), sandbox, { filename: f });
}
const { Sk, LC } = sandbox;

function runner(code) {
  let out = "";
  Sk.configure({
    output: (t) => { out += t; },
    read: (x) => {
      if (!Sk.builtinFiles || Sk.builtinFiles.files[x] === undefined) throw "File not found: '" + x + "'";
      return Sk.builtinFiles.files[x];
    },
    __future__: Sk.python3, execLimit: 5000,
  });
  try {
    const mod = Sk.importMainWithBody("<stdin>", false, code, true);
    return Promise.resolve({ ok: true, output: out, error: null, module: mod });
  } catch (e) {
    let msg = String(e);
    try { if (e.args && e.args.v && e.args.v.length) msg = (e.tp$name || "Error") + ": " + e.args.v[0].v; } catch {}
    return Promise.resolve({ ok: false, output: out, error: { text: msg }, module: null });
  }
}

const [levelPath, solutionPath] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const quiet = process.argv.includes("--quiet");

if (!levelPath || !solutionPath) {
  console.error("usage: node tools/try-level.mjs <level.json> <solution.py> [--quiet]");
  process.exit(2);
}

const level = JSON.parse(fs.readFileSync(levelPath, "utf8"));
const solution = fs.readFileSync(solutionPath, "utf8");

function describe(label, r) {
  if (!r.ok) {
    console.log(`${label}: \x1b[31mERROR\x1b[0m before the battle — ${r.error && r.error.text}`);
    return { pass: false };
  }
  const s = r.sim;
  const verdict = LC.Battle.objective(s, level);
  const tag = verdict.pass ? "\x1b[32mWIN \x1b[0m" : "\x1b[31mLOSS\x1b[0m";
  console.log(
    `${label}: ${tag} camp ${s.campHp}/${s.campHpStart}  killed ${s.killed}  leaked ${s.leaked}  ` +
    `towers ${s.towers.length}  gold spent ${s.goldSpent}  ${s.duration.toFixed(1)}s`
  );
  if (!verdict.pass) {
    const d = LC.Battle.diagnose(s, level);
    if (d) console.log(`        → ${d.en}`);
  }
  if (!quiet && s.buildErrors.length) {
    console.log("        build problems: " + JSON.stringify(s.buildErrors));
  }
  if (!quiet && s.towers.length) {
    console.log("        per tower: " + s.towers
      .map((t) => `(${t.x},${t.y}) ${t.kind} shots=${t.shots} dmg=${t.damageDealt}` +
                  (t.targetsSeen === 0 ? " NEVER-SAW-ANYTHING" : ""))
      .join("  "));
  }
  if (!quiet && r.output.trim()) {
    console.log("        stdout: " + JSON.stringify(r.output.trim()).slice(0, 160));
  }
  return verdict;
}

const solved = describe("solution     ", await LC.Battle.play(level, solution, runner));
const empty = describe("empty program", await LC.Battle.play(level, "# nothing\n", runner));

console.log("");
let bad = 0;
if (!solved.pass) { console.log("\x1b[31m✗ the solution does not win this level\x1b[0m"); bad++; }
else console.log("\x1b[32m✓ the solution wins\x1b[0m");
if (empty.pass) { console.log("\x1b[31m✗ an empty program also wins — this level teaches nothing\x1b[0m"); bad++; }
else console.log("\x1b[32m✓ an empty program loses\x1b[0m");

process.exit(bad ? 1 : 0);
