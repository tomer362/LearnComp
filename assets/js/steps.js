/* steps.js — shared single-screen step navigator with a slide transition.
 * Used by hub.js (quest map) and lesson.js (the six beats + exercises).
 * One step is visible at a time; Next/Back replace the whole panel instead
 * of scrolling. See spec/05-visual-design.md for the motion budget and
 * spec/03-i18n-and-rtl.md for the RTL-aware direction rules.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function isRtl() {
    return document.documentElement.getAttribute("dir") === "rtl";
  }

  /* steps: array of { build: fn(panelEl), locked: fn()->bool (optional), label: string (optional, for aria) }
   * opts: { startIndex, onIndexChange: fn(index) }
   * A step is reachable if every step before it is unlocked; `locked()` is
   * only consulted going forward — she is never blocked from stepping back.
   */
  function create(host, steps, opts) {
    opts = opts || {};

    var viewport = document.createElement("div");
    viewport.className = "step-viewport";
    var track = document.createElement("div");
    track.className = "step-track";
    viewport.appendChild(track);

    var nav = document.createElement("div");
    nav.className = "step-nav";
    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "btn btn-ghost step-prev";
    prevBtn.textContent = "◂ " + LC.s("stepBack");
    var dots = document.createElement("div");
    dots.className = "step-dots";
    dots.setAttribute("aria-hidden", "true");
    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "btn btn-run step-next";
    nextBtn.textContent = LC.s("stepNext") + " ▸";
    nav.appendChild(prevBtn);
    nav.appendChild(dots);
    nav.appendChild(nextBtn);

    host.appendChild(viewport);
    host.appendChild(nav);

    var index = Math.min(Math.max(opts.startIndex || 0, 0), steps.length - 1);

    function isLocked(i) {
      var st = steps[i];
      return !!(st.locked && st.locked());
    }

    function paintDots() {
      dots.innerHTML = "";
      steps.forEach(function (st, i) {
        var d = document.createElement("span");
        d.className = "step-dot" +
          (i === index ? " is-current" : "") +
          (i > index && isLocked(i) ? " is-locked" : "");
        dots.appendChild(d);
      });
    }

    function paintNav() {
      prevBtn.style.visibility = index === 0 ? "hidden" : "visible";
      var atEnd = index === steps.length - 1;
      var lockedNext = !atEnd && isLocked(index + 1);
      nextBtn.disabled = lockedNext;
      nextBtn.style.visibility = atEnd ? "hidden" : "visible";
      paintDots();
    }

    function renderStep(direction) {
      var panel = document.createElement("div");
      panel.className = "step";
      track.innerHTML = "";
      track.appendChild(panel);
      /* Build while attached: widgets inside (e.g. the battle canvas) may
       * measure their own size on creation, which reads 0 off-DOM. */
      steps[index].build(panel);

      if (direction !== undefined && !prefersReducedMotion()) {
        var forward = direction > 0;
        var fromEnd = isRtl() ? !forward : forward;
        panel.style.setProperty("--step-offset", fromEnd ? "24px" : "-24px");
        panel.classList.add("step-anim");
        requestAnimationFrame(function () {
          panel.classList.add("step-settled");
        });
      }
    }

    function goTo(i, direction) {
      if (i < 0 || i >= steps.length) return;
      if (i > index && isLocked(i)) return;
      var dir = direction !== undefined ? direction : (i > index ? 1 : -1);
      index = i;
      renderStep(dir);
      paintNav();
      if (opts.onIndexChange) opts.onIndexChange(index);
    }

    prevBtn.addEventListener("click", function () { goTo(index - 1, -1); });
    nextBtn.addEventListener("click", function () { goTo(index + 1, 1); });

    renderStep();
    paintNav();

    return {
      goTo: function (i) { goTo(i); },
      next: function () { goTo(index + 1, 1); },
      current: function () { return index; },
      /* Re-run the current step's build() in place (e.g. content just
       * changed) without a slide animation. */
      refresh: function () { renderStep(); paintNav(); },
      /* Unlock state changed (an exercise was solved) — repaint the nav
       * without touching what is on screen. */
      refreshNav: paintNav
    };
  }

  LC.Steps = { create: create };
})(window.LC);
