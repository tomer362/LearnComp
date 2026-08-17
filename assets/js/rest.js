/* rest.js — break reminders that cost her nothing.
 *
 * She is 14 and she learns with music on. So this file is defined as much by
 * what it refuses to do as by what it does:
 *
 *   - It never pauses, mutes or stops anything. Not her music, not the battle
 *     replay, not the editor. A break here is a card and a countdown, and the
 *     rest of the page carries on exactly as it was.
 *   - It never punishes. Skipping a break costs no XP, breaks no streak, loses
 *     nothing. There is no streak. See CLAUDE.md.
 *   - It only counts time she is actually here — ticks while the tab is hidden
 *     are dropped, so a page left open overnight does not greet her with a
 *     reminder she did not earn.
 *
 * The end-of-break signal is a sound (assets/js/sound.js) precisely because she
 * will have looked away. That sound is built to play *over* her music.
 * See spec/02-game-design.md.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  var MIN = 60000;
  var TICK_MS = 30000;   // how often active time is counted
  var SNOOZE_MS = 5 * MIN;

  var activeMs = 0;
  var phase = "work";    // work | offered | resting | done
  var endsAt = 0;
  var workTimer = null;
  var restTimer = null;
  var finishTimer = null;
  var card = null;

  function settings() {
    try { return LC.store.get().rest || {}; }
    catch (e) { return {}; }
  }
  function on() { return settings().on !== false; }
  function workMs() { return Math.max(1, settings().workMin || 25) * MIN; }
  function restMs() { return Math.max(1, settings().restMin || 5) * MIN; }

  /* ---- card ------------------------------------------------------------ */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function button(label, cls, onClick) {
    var b = el("button", cls, label);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }

  function ensureCard() {
    if (card && card.parentNode) return card;
    card = el("div", "rest-card");
    card.id = "lc-rest";
    card.setAttribute("role", "status");
    card.setAttribute("aria-live", "polite");
    document.body.appendChild(card);
    /* On a narrow screen the card sits over the Run button. It is fixed, so
     * the page needs somewhere to scroll to — otherwise "non-blocking" is a
     * claim the layout does not honour. */
    document.body.classList.add("has-rest-card");
    return card;
  }

  function hideCard() {
    if (card && card.parentNode) card.parentNode.removeChild(card);
    card = null;
    document.body.classList.remove("has-rest-card");
  }

  function clockText() {
    var left = Math.max(0, endsAt - Date.now());
    var total = Math.round(left / 1000);
    var m = Math.floor(total / 60);
    var sec = total % 60;
    return m + ":" + (sec < 10 ? "0" : "") + sec;
  }

  function render() {
    if (phase === "work") { hideCard(); return; }
    var c = ensureCard();
    c.innerHTML = "";

    if (phase === "offered") {
      c.appendChild(el("p", "rest-title", LC.s("restTitle")));
      c.appendChild(el("p", "rest-body", LC.s("restBody")));
      c.appendChild(el("p", "rest-note", LC.s("restMusicNote")));
      var bar = el("div", "rest-actions");
      bar.appendChild(button(LC.s("restStart"), "btn btn-small", beginRest));
      bar.appendChild(button(LC.s("restLater"), "btn btn-ghost btn-small", snooze));
      c.appendChild(bar);
      return;
    }

    if (phase === "resting") {
      c.appendChild(el("p", "rest-title", LC.s("restResting")));
      /* "4:32" is Latin digits inside Hebrew prose — without its own direction
       * the bidi algorithm reorders it. See spec/03-i18n-and-rtl.md. The
       * per-second update is muted for screen readers: the card announces
       * itself once, and a clock that speaks every second is unusable. */
      var clock = el("p", "rest-clock", clockText());
      clock.setAttribute("dir", "ltr");
      clock.setAttribute("aria-live", "off");
      c.appendChild(clock);
      c.appendChild(el("p", "rest-note", LC.s("restMusicNote")));
      var bar2 = el("div", "rest-actions");
      bar2.appendChild(button(LC.s("restBackNow"), "btn btn-ghost btn-small", function () {
        dismiss();
      }));
      c.appendChild(bar2);
      return;
    }

    /* done */
    c.appendChild(el("p", "rest-title", LC.s("restTitle")));
    c.appendChild(el("p", "rest-body", LC.s("restOver")));
    var bar3 = el("div", "rest-actions");
    bar3.appendChild(button(LC.s("restBackNow"), "btn btn-small", dismiss));
    c.appendChild(bar3);
  }

  /* ---- phases ---------------------------------------------------------- */

  function clearRestTimers() {
    if (restTimer) { clearInterval(restTimer); restTimer = null; }
    if (finishTimer) { clearTimeout(finishTimer); finishTimer = null; }
  }

  function offer() {
    if (phase !== "work") return;
    phase = "offered";
    render();
  }

  function snooze() {
    phase = "work";
    activeMs = Math.max(0, workMs() - SNOOZE_MS);
    hideCard();
  }

  function beginRest() {
    /* Buy the audio permission here, inside her click — the chime plays from a
     * timer minutes later, and iOS will not start audio outside a gesture. */
    if (LC.sound) LC.sound.unlock();

    phase = "resting";
    endsAt = Date.now() + restMs();
    clearRestTimers();
    /* Two timers on purpose: the interval drives the clock, and the timeout
     * fires the chime on the deadline even when a hidden tab throttles the
     * interval down to once a minute. finishRest() is idempotent. */
    restTimer = setInterval(tickRest, 1000);
    finishTimer = setTimeout(finishRest, restMs());
    render();
  }

  function tickRest() {
    if (phase !== "resting") return;
    if (Date.now() >= endsAt) { finishRest(); return; }
    var clock = card && card.querySelector(".rest-clock");
    if (clock) clock.textContent = clockText();
  }

  function finishRest() {
    if (phase !== "resting") return;
    clearRestTimers();
    phase = "done";
    activeMs = 0;
    render();
    if (LC.sound) LC.sound.chime();
    if (LC.Game && LC.Game.toast) LC.Game.toast(LC.esc(LC.s("restOver")));
  }

  /* Ending a break early is not a failure and gets no chime — she is already
   * looking at the screen. Nothing is deducted either way. */
  function dismiss() {
    clearRestTimers();
    phase = "work";
    activeMs = 0;
    hideCard();
  }

  function tickWork() {
    if (phase !== "work" || !on()) return;
    if (document.hidden) return;
    activeMs += TICK_MS;
    if (activeMs >= workMs()) offer();
  }

  /* ---- lifecycle ------------------------------------------------------- */

  var wired = false;

  function start() {
    if (!on()) return;
    if (workTimer) return;
    workTimer = setInterval(tickWork, TICK_MS);
    if (!wired) {
      wired = true;
      LC.i18n.onChange(function () { render(); });
    }
  }

  function stop() {
    if (workTimer) { clearInterval(workTimer); workTimer = null; }
    dismiss();
  }

  LC.Rest = {
    start: start,
    stop: stop,
    /** Re-read the settings after she toggles them in the hub. */
    refresh: function () { stop(); start(); },
    /** Surface the offer now, without waiting out the work interval. */
    offerNow: function () { if (phase === "work") offer(); },
    state: function () {
      return { phase: phase, activeMs: activeMs, leftMs: Math.max(0, endsAt - Date.now()) };
    }
  };
})(window.LC);
