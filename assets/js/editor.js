/* editor.js — the code editor.
 *
 * A textarea over a line-number gutter. No syntax highlighting: doing it well
 * needs a real editor library (which we cannot fetch), and doing it badly is
 * worse than not doing it. See spec/05-visual-design.md.
 *
 * ALWAYS dir=ltr, even in Hebrew. See spec/03-i18n-and-rtl.md.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  var INDENT = "    "; // four spaces, matching what the lessons teach

  /* Curly quotes are a real hazard: they arrive from copy-paste and from some
   * keyboard layouts, and produce a SyntaxError a beginner cannot diagnose.
   * Normalise them on the way in. See spec/lessons/lesson-01.md. */
  function normalizeQuotes(text) {
    return String(text)
      .replace(/[‘’‛′]/g, "'")
      .replace(/[“”‟″]/g, '"')
      .replace(/ /g, " "); // non-breaking space -> plain space
  }

  /* Tabs are a trap here specifically: Skulpt happily RUNS a file that mixes
   * tabs and spaces, but real CPython rejects it with TabError. Code that works
   * in the course and breaks the day she installs Python is the worst possible
   * outcome, so tabs never make it into the buffer. */
  function normalizeTabs(text) {
    return String(text).replace(/\t/g, INDENT);
  }

  function clean(text) {
    return normalizeTabs(normalizeQuotes(text));
  }

  function create(container, options) {
    options = options || {};
    var value = options.value || "";

    var wrap = document.createElement("div");
    wrap.className = "editor";
    wrap.setAttribute("dir", "ltr");

    var gutter = document.createElement("div");
    gutter.className = "editor-gutter";
    gutter.setAttribute("aria-hidden", "true");

    var area = document.createElement("textarea");
    area.className = "editor-area";
    area.setAttribute("dir", "ltr");
    area.setAttribute("spellcheck", "false");
    area.setAttribute("autocapitalize", "off");
    area.setAttribute("autocorrect", "off");
    area.setAttribute("autocomplete", "off");
    area.setAttribute("aria-label", options.label || "Python code");
    area.value = value;

    wrap.appendChild(gutter);
    wrap.appendChild(area);
    container.appendChild(wrap);

    function renderGutter() {
      var lines = area.value.split("\n").length;
      var html = "";
      for (var i = 1; i <= lines; i++) html += i + "\n";
      gutter.textContent = html;
      // Keep the textarea tall enough that it never scrolls internally —
      // a beginner losing her code off the bottom of a small box is awful.
      area.style.height = "auto";
      area.style.height = Math.max(area.scrollHeight, 80) + "px";
      gutter.style.height = area.style.height;
    }

    function syncScroll() {
      gutter.scrollTop = area.scrollTop;
    }

    area.addEventListener("input", renderGutter);
    area.addEventListener("scroll", syncScroll);

    area.addEventListener("paste", function (e) {
      var text = (e.clipboardData || window.clipboardData);
      if (!text) return;
      var pasted = text.getData("text");
      if (pasted === null || pasted === undefined) return;
      var fixed = clean(pasted);
      if (fixed === pasted) return; // nothing to fix, let the browser handle it
      e.preventDefault();
      var start = area.selectionStart, end = area.selectionEnd;
      area.value = area.value.slice(0, start) + fixed + area.value.slice(end);
      area.selectionStart = area.selectionEnd = start + fixed.length;
      renderGutter();
    });

    area.addEventListener("keydown", function (e) {
      /* Ctrl/Cmd+Enter runs. */
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (options.onRun) options.onRun();
        return;
      }

      /* Tab indents instead of leaving the field. Shift+Tab still escapes, so
       * the editor never becomes a keyboard trap. */
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        var start = area.selectionStart, end = area.selectionEnd;
        area.value = area.value.slice(0, start) + INDENT + area.value.slice(end);
        area.selectionStart = area.selectionEnd = start + INDENT.length;
        renderGutter();
        return;
      }

      /* Auto-indent on Enter, and add a level after a colon. Indentation is
       * the single biggest source of beginner errors — help her get it right
       * without hiding it from her. */
      if (e.key === "Enter") {
        var pos = area.selectionStart;
        var before = area.value.slice(0, pos);
        var lineStart = before.lastIndexOf("\n") + 1;
        var line = before.slice(lineStart);
        var indentMatch = /^[ \t]*/.exec(line);
        var indent = indentMatch ? indentMatch[0] : "";
        if (/:\s*$/.test(line)) indent += INDENT;
        if (!indent) return; // nothing to add, let the browser do it
        e.preventDefault();
        var after = area.value.slice(area.selectionEnd);
        area.value = before + "\n" + indent + after;
        area.selectionStart = area.selectionEnd = pos + 1 + indent.length;
        renderGutter();
      }
    });

    renderGutter();

    return {
      el: wrap,
      textarea: area,
      get: function () { return clean(area.value); },
      set: function (text) { area.value = text; renderGutter(); },
      reset: function () { area.value = value; renderGutter(); },
      focus: function () { area.focus(); },
      /** Highlight a line number reported by an error, 1-indexed. */
      markError: function (line) {
        gutter.setAttribute("data-error-line", line === null || line === undefined ? "" : String(line));
        renderGutter();
      }
    };
  }

  LC.Editor = { create: create, normalizeQuotes: normalizeQuotes, normalizeTabs: normalizeTabs, clean: clean };
})(window.LC);
