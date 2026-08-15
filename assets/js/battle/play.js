/* battle/play.js — run her code, then simulate the battle.
 *
 * One code path for the browser and for tools/verify-python.mjs, so a lesson
 * cannot pass verification and then behave differently on the page. The Python
 * runner is injected, because Node and the browser get there differently.
 */
(function (root) {
  "use strict";
  root.LC = root.LC || {};
  var Sim = root.LC.Sim;
  var PyApi = root.LC.PyApi;

  /**
   * @param {object}   level  level definition
   * @param {string}   code   her Python
   * @param {function} runner (code) -> Promise<{ok, output, error, explanation, module}>
   * @returns {Promise<{ok, output, error, explanation, sim}>}
   */
  function play(level, code, runner) {
    var ctx = PyApi.install(level);

    function finish(res) {
      try { ctx.uninstall(); } catch (e) { /* never let cleanup mask a result */ }
      return res;
    }

    return runner(code).then(function (r) {
      if (!r.ok) {
        /* Her script threw before the battle could start. */
        return finish({
          ok: false, output: r.output, error: r.error, explanation: r.explanation,
          sim: null, placements: ctx.placements
        });
      }

      var hooks;
      try {
        hooks = PyApi.hooksFrom(r.module, ctx);
      } catch (e) {
        hooks = {};
      }

      var sim = Sim.run(level, ctx.placements, hooks);
      return finish({
        ok: true, output: r.output, error: null, explanation: null,
        sim: sim, placements: ctx.placements
      });
    }, function (err) {
      return finish({
        ok: false, output: "", error: { type: "EngineError", message: String(err), line: null, text: String(err) },
        explanation: null, sim: null, placements: ctx.placements
      });
    });
  }

  /**
   * Did she meet the level's objective? Separate from sim.survived — by default
   * a level demands a PERFECT defense (nothing gets through), because a level
   * she can pass by writing nothing teaches nothing.
   */
  function objective(sim, level) {
    var check = (level.check || {});
    var startHp = level.campHp === undefined ? 10 : level.campHp;
    var required = check.campHpAtLeast === undefined ? startHp : check.campHpAtLeast;

    if (!sim) return { pass: false, reason: "noSim" };
    if (sim.strategyError) return { pass: false, reason: "strategyError" };
    if (sim.buildErrors && sim.buildErrors.length) return { pass: false, reason: "build" };
    if (sim.timedOut) return { pass: false, reason: "timeout" };
    if (!sim.survived) return { pass: false, reason: "overrun" };
    if (sim.campHp < required) return { pass: false, reason: "leaks" };
    if (check.maxGoldSpent !== undefined && sim.goldSpent > check.maxGoldSpent) {
      return { pass: false, reason: "tooExpensive" };
    }
    if (check.maxTowers !== undefined && sim.towers.length > check.maxTowers) {
      return { pass: false, reason: "tooManyTowers" };
    }
    return { pass: true, reason: null };
  }

  /* Why she lost, in her language. Only meaningful on a failure — a won battle
   * with an idle tower is not a problem worth mentioning. */
  function diagnose(sim, level) {
    if (!sim) return null;
    var check = level.check || {};

    /* Budget and tower-cap failures are DEFINITIVE — they must be reported
     * before any heuristic like "a tower never fired", which would otherwise
     * shadow them and send her looking in the wrong place. */
    if (check.maxTowers !== undefined && sim.towers.length > check.maxTowers) return {
      he: "בנית " + sim.towers.length + " מגדלים, והשלב מרשה " + check.maxTowers + ". צריך לנצח עם פחות.",
      en: "You built " + sim.towers.length + " towers and this level allows " + check.maxTowers + ". You have to win with fewer." };

    if (check.maxGoldSpent !== undefined && sim.goldSpent > check.maxGoldSpent) return {
      he: "הוצאת " + sim.goldSpent + " זהב, והתקציב של השלב הוא " + check.maxGoldSpent + ".",
      en: "You spent " + sim.goldSpent + " gold and this level's budget is " + check.maxGoldSpent + "." };

    if (sim.buildErrors && sim.buildErrors.length) {
      var b = sim.buildErrors[0];
      if (b.type === "onPath") return {
        he: "אי אפשר לבנות על השביל עצמו — המפלצות הולכות שם. בחרי משבצת דשא ליד השביל.",
        en: "You cannot build on the path itself — that is where the monsters walk. Pick a grass square beside it." };
      if (b.type === "onRock") return {
        he: "המשבצת (" + b.x + ", " + b.y + ") היא סלע — אי אפשר לבנות עליה. `get_map()` מחזיר \"rock\" למשבצות כאלה.",
        en: "The square (" + b.x + ", " + b.y + ") is a rock — you cannot build there. `get_map()` reports those as \"rock\"." };
      if (b.type === "offMap") return {
        he: "המשבצת (" + b.x + ", " + b.y + ") נמצאת מחוץ למפה. בדקי את המספרים.",
        en: "The square (" + b.x + ", " + b.y + ") is off the map. Check the numbers." };
      if (b.type === "occupied") return {
        he: "כבר יש מגדל במשבצת הזאת. כל מגדל צריך משבצת משלו.",
        en: "There is already a tower on that square. Each tower needs its own." };
      if (b.type === "tooPoor") return {
        he: "לא נשאר מספיק זהב למגדל הזה — הוא עולה " + b.cost + " ונשארו " + b.gold + ".",
        en: "Not enough gold for that tower — it costs " + b.cost + " and you had " + b.gold + "." };
      if (b.type === "notAllowed") return {
        he: "המגדל \"" + b.kind + "\" עוד לא זמין בשלב הזה.",
        en: "The \"" + b.kind + "\" tower is not available in this level yet." };
      if (b.type === "unknownTower") return {
        he: "אין מגדל בשם \"" + b.kind + "\". בדקי את האיות.",
        en: "There is no tower called \"" + b.kind + "\". Check the spelling." };
    }

    if (sim.towers.length === 0) return {
      he: "לא בנית אף מגדל, אז אף אחד לא עצר אותן. השתמשי ב-place_tower.",
      en: "You did not build any towers, so nothing stopped them. Use place_tower." };

    if (sim.strategyError) return {
      he: "הפונקציה שלך נעצרה עם שגיאה באמצע הקרב, והמגדלים הפסיקו לירות. השגיאה האמיתית למטה.",
      en: "Your function stopped with an error in the middle of the battle, and the towers stopped firing. The real error is below." };

    /* Held fire vs never saw anything are completely different mistakes. */
    var held = sim.towers.filter(function (t) { return t.shots === 0 && t.heldFire > 0; });
    if (held.length) return {
      he: "המגדלים שלך ראו מפלצות אבל אף פעם לא ירו. הפונקציה choose_target מחזירה None — החזירי מפלצת מהרשימה.",
      en: "Your towers saw monsters but never fired. choose_target is returning None — return one of the monsters from the list instead." };

    /* A cannon that watched harpies fly past looks identical to a badly placed
     * tower unless we say so. */
    var grounded = sim.towers.filter(function (t) { return t.targetsSeen === 0 && t.flyersMissed > 0; });
    if (grounded.length) return {
      he: "המגדל במשבצת (" + grounded[0].x + ", " + grounded[0].y + ") הוא תותח, והוא לא מסוגל לפגוע במפלצות מעופפות. נגד הרפיות צריך קשת, קרח או ברק.",
      en: "The tower at (" + grounded[0].x + ", " + grounded[0].y + ") is a cannon, and it cannot hit anything airborne. Harpies need an archer, ice or lightning." };

    var blind = sim.towers.filter(function (t) { return t.targetsSeen === 0 && t.flyersMissed === 0; });
    if (blind.length === sim.towers.length) return {
      he: "אף מגדל לא ראה אפילו מפלצת אחת — כולם רחוקים מדי מהשביל. בני קרוב יותר.",
      en: "Not one tower ever saw a monster — they are all too far from the path. Build closer to it." };
    if (blind.length) return {
      he: "המגדל במשבצת (" + blind[0].x + ", " + blind[0].y + ") רחוק מדי מהשביל ולא ירה אף פעם.",
      en: "The tower at (" + blind[0].x + ", " + blind[0].y + ") is too far from the path and never fired." };

    if (sim.leaked > 0) return {
      he: "עברו " + sim.leaked + " מפלצות. את קרובה — נסי עוד מגדל, או להזיז אחד קרוב יותר לשביל.",
      en: sim.leaked + " monsters got through. You are close — try another tower, or move one nearer the path." };

    if (sim.goldSpent > 0) return {
      he: "ההגנה החזיקה, אבל לא עמדת בדרישות השלב. בדקי את המשימה שוב.",
      en: "The defense held, but the level's requirement was not met. Read the task again." };

    return null;
  }

  root.LC.Battle = { play: play, diagnose: diagnose, objective: objective };
})(typeof self !== "undefined" ? self : globalThis);
