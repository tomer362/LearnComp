/* engine.js — the shared Python runtime (Skulpt wrapper).
 *
 * Everything about running Python lives here. Lessons never touch Sk directly.
 * See spec/01-architecture.md for the verified capability matrix.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  var DEFAULT_LIMIT_MS = 5000;

  function builtinRead(x) {
    if (typeof Sk === "undefined" || !Sk.builtinFiles || Sk.builtinFiles.files[x] === undefined) {
      throw "File not found: '" + x + "'";
    }
    return Sk.builtinFiles.files[x];
  }

  /* ---- error normalisation -------------------------------------------- */

  /* Skulpt error objects are not uniform. Pull out a type, a message and a
   * line number without ever throwing while doing it. */
  function describeError(err) {
    var out = { type: "Error", message: String(err), line: null };

    if (err && typeof err === "object") {
      if (err.tp$name) out.type = err.tp$name;
      else if (err.constructor && err.constructor.name) out.type = err.constructor.name;

      // Skulpt stores the message as a Python str in args[0]
      try {
        if (err.args && err.args.v && err.args.v.length) {
          var first = err.args.v[0];
          out.message = first && first.v !== undefined ? String(first.v) : String(first);
        } else if (err.message) {
          out.message = String(err.message);
        }
      } catch (e) { /* keep the String(err) fallback */ }

      try {
        if (err.traceback && err.traceback.length && err.traceback[0].lineno !== undefined) {
          out.line = err.traceback[0].lineno;
        }
      } catch (e) { /* no line info */ }
    }

    // Last resort: dig a line number out of the rendered text.
    if (out.line === null) {
      var m = /on line (\d+)/.exec(String(err));
      if (m) out.line = parseInt(m[1], 10);
    }

    out.text = out.type + ": " + out.message + (out.line ? " (line " + out.line + ")" : "");
    return out;
  }

  /* Friendly bilingual explanations. The real English error is ALWAYS shown
   * alongside these — never instead of them. See spec/00-overview.md rule 5. */
  var EXPLAIN = [
    { test: /TimeLimit/i, he: "התוכנית רצה יותר מדי זמן ונעצרה. כמעט תמיד זו לולאה שאף פעם לא נגמרת — בדקי שהתנאי של ה-while באמת הופך לשקר בשלב מסוים.",
      en: "Your program ran too long and was stopped. This is almost always a loop that never ends — check that your while condition eventually becomes false." },
    { test: /EOL|EOF .*string|unterminated/i, he: "פתחת גרשיים אבל לא סגרת אותם. לכל \" צריך בן זוג באותה שורה.",
      en: "You opened a quote but never closed it. Every \" needs a partner on the same line." },
    { test: /IndentationError|expected an indented block|unexpected indent/i, he: "בעיית הזחה. כל השורות שנמצאות בתוך if או לולאה צריכות להיות מוזחות באותו מרחק בדיוק — ארבעה רווחים.",
      en: "Indentation problem. Every line inside an if or a loop must be indented by the same amount — four spaces." },
    { test: /NameError/i, he: "פייתון פגש שם שהוא לא מכיר. או שיש שגיאת כתיב, או שהמשתנה לא נוצר עדיין, או ששכחת גרשיים מסביב לטקסט.",
      en: "Python met a name it does not know. Either a typo, or the variable was never created, or text is missing its quotes." },
    { test: /TypeError/i, he: "ניסית לחבר או להשוות שני דברים מסוגים שונים — למשל string ו-int. אפשר להמיר עם int() או str().",
      en: "You tried to combine two different types — for example a string and an int. Convert with int() or str()." },
    { test: /ZeroDivision/i, he: "חילקת באפס. שום דבר לא מתחלק באפס, גם לא אצל האלים.",
      en: "You divided by zero. Nothing divides by zero, not even for the gods." },
    { test: /IndexError/i, he: "ביקשת מקום ברשימה שלא קיים. זכרי שהמקום הראשון הוא 0, אז ברשימה עם 3 פריטים המקומות הם 0, 1, 2.",
      en: "You asked for a position that does not exist. The first position is 0, so a list of 3 items has positions 0, 1 and 2." },
    { test: /KeyError/i, he: "ביקשת מפתח שלא קיים במילון. אפשר לבדוק עם in, או להשתמש ב-get() שמחזיר ערך ברירת מחדל.",
      en: "You asked for a key that is not in the dictionary. Check with in, or use get() which returns a default." },
    { test: /ValueError/i, he: "הערך לא מתאים לפעולה. למשל int(\"שלום\") — אי אפשר להפוך טקסט שאינו מספר למספר.",
      en: "The value does not fit the operation. For example int(\"hello\") — text that is not a number cannot become one." },
    { test: /AttributeError/i, he: "ניסית להשתמש בפעולה שלא קיימת עבור הסוג הזה. בדקי את האיות של שם הפעולה.",
      en: "You used an operation that does not exist for this type. Check the spelling of the method name." },
    { test: /RecursionError|maximum recursion/i, he: "פונקציה קראה לעצמה בלי סוף. כל רקורסיה חייבת מקרה בסיס שעוצר אותה.",
      en: "A function called itself forever. Every recursion needs a base case that stops it." },
    { test: /SyntaxError|ParseError|bad input/i, he: "פייתון לא הצליח לקרוא את השורה הזאת. בדקי סוגריים שלא נסגרו, גרשיים חסרים, או נקודתיים חסרות בסוף שורת if או לולאה.",
      en: "Python could not read that line. Check for unclosed brackets, missing quotes, or a missing colon at the end of an if or loop line." }
  ];

  function explain(err) {
    var probe = err.type + " " + err.message;
    for (var i = 0; i < EXPLAIN.length; i++) {
      if (EXPLAIN[i].test.test(probe)) {
        return { he: EXPLAIN[i].he, en: EXPLAIN[i].en };
      }
    }
    return {
      he: "משהו בקוד עצר את פייתון. קראי את השורה שמופיעה בשגיאה — היא כמעט תמיד המקום הנכון להתחיל בו.",
      en: "Something stopped Python. Read the line named in the error — it is almost always the right place to start."
    };
  }

  /* ---- running --------------------------------------------------------- */

  /**
   * Run Python source.
   * @param {string} code
   * @param {object} [opts]
   *   onStdout(text)      called per write
   *   onInput(prompt)     -> Promise<string>; powers input(). If absent, input()
   *                         reads from opts.stdin, then returns "".
   *   stdin               array of queued answers for input()
   *   execLimitMs         wall clock limit, default 5000
   *   captureVars         array of variable names to read back after the run
   * @returns {Promise<{ok, output, error, explanation, vars}>}
   */
  function run(code, opts) {
    opts = opts || {};
    var buffer = "";
    var queued = (opts.stdin || []).slice();

    return new Promise(function (resolve) {
      if (typeof Sk === "undefined") {
        resolve({
          ok: false, output: "",
          error: { type: "EngineError", message: "Skulpt did not load", line: null, text: "Skulpt did not load" },
          explanation: { he: "מנוע הפייתון לא נטען.", en: "The Python engine did not load." },
          vars: {}
        });
        return;
      }

      function write(text) {
        buffer += text;
        if (opts.onStdout) opts.onStdout(text);
      }

      function inputfun(promptText) {
        if (queued.length) return Promise.resolve(String(queued.shift()));
        if (opts.onInput) return Promise.resolve(opts.onInput(promptText || ""));
        return Promise.resolve("");
      }

      /* Configured per run so a callback from a previous section can never
       * leak into this one. */
      Sk.configure({
        output: write,
        read: builtinRead,
        __future__: Sk.python3,
        execLimit: opts.execLimitMs || DEFAULT_LIMIT_MS,
        inputfun: inputfun,
        inputfunTakesPrompt: true,
        retainGlobals: false
      });

      var module;
      Sk.misceval.asyncToPromise(function () {
        module = Sk.importMainWithBody("<stdin>", false, code, true);
        return module;
      }).then(function (mod) {
        resolve({
          ok: true,
          output: buffer,
          error: null,
          explanation: null,
          vars: readVars(mod, opts.captureVars)
        });
      }, function (err) {
        var described = describeError(err);
        resolve({
          ok: false,
          output: buffer,
          error: described,
          explanation: explain(described),
          vars: {}
        });
      });
    });
  }

  /* Read named globals back out of the finished module, converted to plain JS
   * where possible. Used by `variable` checks. */
  function readVars(mod, names) {
    var out = {};
    if (!names || !names.length || !mod || !mod.$d) return out;
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      var raw = mod.$d[name];
      if (raw === undefined) { out[name] = undefined; continue; }
      try {
        out[name] = Sk.ffi.remapToJs(raw);
      } catch (e) {
        try { out[name] = Sk.misceval.objectRepr(raw).v; }
        catch (e2) { out[name] = undefined; }
      }
    }
    return out;
  }

  LC.Engine = {
    run: run,
    describeError: describeError,
    explain: explain,
    DEFAULT_LIMIT_MS: DEFAULT_LIMIT_MS
  };
})(window.LC);
