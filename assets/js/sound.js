/* sound.js — the only place in this codebase allowed to make a noise.
 *
 * She learns with music on. A break reminder that silences her music is a
 * punishment mechanic wearing a helpful face, so the rules below are not
 * style preferences — they are the whole point of this file:
 *
 *   1. Never create an <audio> or <video> element. A media element claims the
 *      media session and stops whatever else is playing on the device.
 *   2. Never touch navigator.mediaSession, and never pause, mute or change the
 *      volume of anything — on this page or off it.
 *   3. Synthesize with WebAudio. No asset to fetch keeps file:// network-free
 *      (CLAUDE.md hard rule 1) and keeps a binary out of sw.js.
 *   4. Declare the audio session "ambient" where the browser supports it.
 *      Ambient mixes with other audio; the default "playback" interrupts it.
 *      This is the single line that answers "my music gets stopped".
 *   5. Keep the context suspended between chimes. A *running* context holds the
 *      hardware and keeps other apps ducked even while it is silent. Suspend
 *      rather than close, because closing would throw away the iOS gesture
 *      unlock and the chime would never sound at all.
 *   6. Fail silent. No AudioContext, or any throw, is a no-op — a missing
 *      chime is a small loss; a broken lesson is not.
 *
 * See spec/01-architecture.md.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  var ctx = null;

  function Ctor() {
    return window.AudioContext || window.webkitAudioContext || null;
  }

  /* Ask for the mixing category BEFORE the context exists — Safari reads it
   * when the session is first activated. Feature-detected: this is Safari
   * 16.4+ only, and everywhere else desktop mixing is already the default. */
  function goAmbient() {
    try {
      if (navigator.audioSession && "type" in navigator.audioSession) {
        navigator.audioSession.type = "ambient";
      }
    } catch (e) { /* rule 6 */ }
  }

  function context() {
    if (ctx) return ctx;
    var C = Ctor();
    if (!C) return null;
    goAmbient();
    try { ctx = new C(); } catch (e) { ctx = null; }
    return ctx;
  }

  function enabled() {
    try {
      var r = LC.store.get().rest;
      return !r || r.sfx !== false;
    } catch (e) {
      return true;
    }
  }

  /* iOS only lets audio start from inside a user gesture, and the chime plays
   * minutes later from a timer. Calling this from the click that starts a
   * break buys the permission now and banks it: resume inside the gesture,
   * then suspend straight back so nothing is held while she rests. */
  function unlock() {
    if (!enabled()) return;
    var c = context();
    if (!c) return;
    try {
      var resumed = c.resume();
      if (resumed && resumed.then) {
        resumed.then(function () { try { c.suspend(); } catch (e) {} }, function () {});
      } else {
        c.suspend();
      }
    } catch (e) { /* rule 6 */ }
  }

  var NOTES = [
    { hz: 659.25, at: 0,    dur: 0.28 }, // E5
    { hz: 880.00, at: 0.16, dur: 0.42 }  // A5
  ];

  /** Two soft notes. Plays over her music, never instead of it. */
  function chime() {
    if (!enabled()) return;
    var c = context();
    if (!c) return;
    try {
      c.resume();
      var t0 = c.currentTime + 0.02;
      var tail = 0;

      NOTES.forEach(function (n) {
        var osc = c.createOscillator();
        var gain = c.createGain();
        osc.type = "sine";
        osc.frequency.value = n.hz;

        /* Ramp both edges. A gain that jumps from 0 to full is a click, and a
         * click is the one sound that carries over music unpleasantly. */
        var start = t0 + n.at;
        var end = start + n.dur;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, end);

        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(start);
        osc.stop(end + 0.02);
        if (end > tail) tail = end;
      });

      /* Release the hardware once the tail has rung out — rule 5. */
      setTimeout(function () {
        try { c.suspend(); } catch (e) {}
      }, Math.ceil((tail - c.currentTime + 0.15) * 1000));
    } catch (e) { /* rule 6 */ }
  }

  LC.sound = {
    enabled: enabled,
    unlock: unlock,
    chime: chime
  };
})(window.LC);
