/* checker.js — exercise validation.
 *
 * Four check kinds; see spec/04-lesson-template.md. The checker never mutates
 * game state — game.js decides rewards.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  function normalize(text) {
    return String(text === null || text === undefined ? "" : text)
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map(function (line) { return line.replace(/[ \t]+/g, " ").trim(); })
      .join("\n")
      .replace(/\n{2,}/g, "\n")
      .trim();
  }

  function fail(he, en) {
    return { pass: false, reason: { he: he, en: en } };
  }
  var PASS = { pass: true, reason: null };

  function compareOutput(actual, check) {
    var mode = check.mode || "normalized";
    var expect = check.expect === undefined ? "" : check.expect;

    if (mode === "exact") {
      if (String(actual).replace(/\s+$/, "") === String(expect).replace(/\s+$/, "")) return PASS;
      return fail("הפלט לא זהה למה שביקשנו. השוואי אות באות.",
                  "The output does not match exactly. Compare it character by character.");
    }
    if (mode === "contains") {
      if (normalize(actual).indexOf(normalize(expect)) !== -1) return PASS;
      return fail("הפלט לא מכיל את מה שחיפשנו.",
                  "The output does not contain what we were looking for.");
    }
    if (mode === "regex") {
      var re;
      try { re = new RegExp(expect, check.flags || "m"); }
      catch (e) { return fail("בדיקה לא תקינה בשיעור.", "The exercise has a broken check."); }
      if (re.test(String(actual))) return PASS;
      return fail("הפלט לא בצורה שציפינו לה.", "The output is not in the shape we expected.");
    }
    // default: normalized
    if (normalize(actual) === normalize(expect)) return PASS;
    if (normalize(actual) === "") {
      return fail("התוכנית לא הדפיסה כלום. שכחת print?",
                  "Your program printed nothing. Did you forget print?");
    }
    return fail("הפלט קרוב אבל לא מדויק. בדקי איות, סדר שורות וסימני פיסוק.",
                "The output is close but not exact. Check spelling, line order and punctuation.");
  }

  /* Compare a captured variable to an expected value. Uses JSON equality so
   * lists and dicts compare structurally. */
  function sameValue(a, b) {
    if (a === b) return true;
    if (typeof a === "number" && typeof b === "number") {
      return Math.abs(a - b) < 1e-9;
    }
    try { return JSON.stringify(a) === JSON.stringify(b); }
    catch (e) { return false; }
  }

  function checkVariables(result, check) {
    var wanted = check.vars || {};
    for (var name in wanted) {
      if (!Object.prototype.hasOwnProperty.call(wanted, name)) continue;
      var actual = result.vars ? result.vars[name] : undefined;
      if (actual === undefined) {
        return fail("לא מצאנו משתנה בשם " + name + ". בדקי את האיות.",
                    "We could not find a variable called " + name + ". Check the spelling.");
      }
      if (!sameValue(actual, wanted[name])) {
        return fail("המשתנה " + name + " לא מכיל את הערך הנכון.",
                    "The variable " + name + " does not hold the right value.");
      }
    }
    return PASS;
  }

  /* Strip comments and string literals before inspecting source, so that a
   * word inside a comment or a printed string cannot satisfy or break a
   * requirement. */
  function sourceSkeleton(src) {
    return String(src)
      .replace(/#[^\n]*/g, " ")
      .replace(/"""[\s\S]*?"""/g, ' "" ')
      .replace(/'''[\s\S]*?'''/g, " '' ")
      .replace(/"(?:\\.|[^"\\])*"/g, ' "" ')
      .replace(/'(?:\\.|[^'\\])*'/g, " '' ");
  }

  /* `raw: true` inspects the original source instead of the skeleton. Needed
   * when the requirement IS a comment (lesson 1 e4) — the skeleton strips
   * those, so a "must contain #" check could never pass against it. */
  /* A bare identifier like "for" or "sum" must match as a WORD, otherwise
   * `forest` satisfies a "must use for" rule and `sum_total` trips a
   * "must not use sum" rule. Anything containing punctuation (`print(`, `#`)
   * is matched literally. */
  function present(haystack, needle) {
    if (/^[A-Za-z_]\w*$/.test(needle)) {
      return new RegExp("\\b" + needle + "\\b").test(haystack);
    }
    return haystack.indexOf(needle) !== -1;
  }

  function checkSource(source, check) {
    var skeleton = check.raw ? String(source) : sourceSkeleton(source);
    var msg = check.message || {
      he: "הקוד לא עומד בדרישות המשימה.",
      en: "The code does not meet what the task asked for."
    };
    var i;
    if (check.mustInclude) {
      for (i = 0; i < check.mustInclude.length; i++) {
        if (!present(skeleton, check.mustInclude[i])) {
          return { pass: false, reason: msg };
        }
      }
    }
    if (check.mustExclude) {
      for (i = 0; i < check.mustExclude.length; i++) {
        if (present(skeleton, check.mustExclude[i])) {
          return { pass: false, reason: msg };
        }
      }
    }
    return PASS;
  }

  /**
   * Validate one exercise.
   * @returns {Promise<{pass, reason, runs:[], error}>}
   */
  function check(exercise, source) {
    var spec = exercise.check || {};
    var kind = spec.kind || "output";

    /* A battle level: run her code, simulate, judge against the objective.
     * See spec/09-battle-game.md. */
    if (kind === "battle") {
      return LC.Battle.play(exercise, source, function (code) {
        return LC.Engine.run(code, { execLimitMs: spec.execLimitMs || 5000 });
      }).then(function (r) {
        if (!r.ok) {
          return {
            pass: false, sim: null, runs: [r], error: r.error, explanation: r.explanation,
            reason: { he: "התוכנית נעצרה עם שגיאה לפני שהקרב התחיל.",
                      en: "Your program stopped with an error before the battle began." }
          };
        }
        var verdict = LC.Battle.objective(r.sim, exercise);

        /* A battle may also demand HOW she won — "yes, but with a loop". */
        if (verdict.pass && spec.also) {
          var extra = spec.also.kind === "source"
            ? checkSource(source, spec.also)
            : compareOutput(r.output, spec.also);
          if (!extra.pass) {
            return { pass: false, sim: r.sim, runs: [r], reason: extra.reason, error: null, explanation: null };
          }
        }

        return {
          pass: verdict.pass,
          sim: r.sim,
          runs: [r],
          error: null,
          explanation: null,
          reason: verdict.pass ? null : (LC.Battle.diagnose(r.sim, exercise) || {
            he: "ההגנה לא החזיקה. הריצי שוב וצפי איפה הן עוברות.",
            en: "The defense did not hold. Run it again and watch where they get through."
          })
        };
      });
    }

    /* `cases` runs the program once per case with queued stdin. */
    if (kind === "cases") {
      var cases = spec.cases || [];
      var runs = [];
      var chain = Promise.resolve();
      cases.forEach(function (c) {
        chain = chain.then(function () {
          return LC.Engine.run(source, { stdin: c.stdin || [] }).then(function (r) {
            var verdict;
            if (!r.ok) {
              verdict = { pass: false, reason: { he: "התוכנית נעצרה עם שגיאה.", en: "The program stopped with an error." } };
            } else {
              verdict = compareOutput(r.output, { mode: c.mode || spec.mode || "normalized", expect: c.expect });
            }
            runs.push({ stdin: c.stdin || [], expect: c.expect, actual: r.output, pass: verdict.pass, error: r.error, explanation: r.explanation });
          });
        });
      });
      return chain.then(function () {
        var passed = runs.filter(function (r) { return r.pass; }).length;
        var firstBad = runs.filter(function (r) { return !r.pass; })[0];
        return {
          pass: passed === runs.length && runs.length > 0,
          passedCount: passed,
          total: runs.length,
          runs: runs,
          error: firstBad ? firstBad.error : null,
          explanation: firstBad ? firstBad.explanation : null,
          reason: passed === runs.length ? null : {
            he: "עברת " + passed + " מתוך " + runs.length + " מבחנים.",
            en: "You passed " + passed + " of " + runs.length + " tests."
          }
        };
      });
    }

    var captureVars = kind === "variable" && spec.vars ? Object.keys(spec.vars) : [];

    return LC.Engine.run(source, { stdin: spec.stdin || [], captureVars: captureVars }).then(function (r) {
      if (!r.ok) {
        return {
          pass: false, runs: [r], error: r.error, explanation: r.explanation,
          reason: { he: "התוכנית נעצרה עם שגיאה. תקני אותה ונסי שוב.",
                    en: "The program stopped with an error. Fix it and try again." }
        };
      }

      var verdict;
      if (kind === "variable") verdict = checkVariables(r, spec);
      else if (kind === "source") verdict = checkSource(source, spec);
      else verdict = compareOutput(r.output, spec);

      /* An exercise may combine a source requirement with an output check —
       * used for open-ended tasks where she picks the text. */
      if (verdict.pass && spec.also) {
        var extra = spec.also.kind === "source"
          ? checkSource(source, spec.also)
          : compareOutput(r.output, spec.also);
        if (!extra.pass) verdict = extra;
      }

      return {
        pass: verdict.pass, reason: verdict.reason, runs: [r],
        error: null, explanation: null, actual: r.output,
        passedCount: verdict.pass ? 1 : 0, total: 1
      };
    });
  }

  LC.Checker = {
    check: check,
    normalize: normalize,
    sourceSkeleton: sourceSkeleton
  };
})(window.LC);
