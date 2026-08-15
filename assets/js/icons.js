/* icons.js — a small hand-drawn SVG icon set for chrome that repeats on
 * every screen (HUD readouts, hints, locks, done-state ticks). Monster,
 * tower and flavor art stays emoji — see spec/05-visual-design.md's "no
 * binary image files" rule and CLAUDE.md's file:// constraint: these are
 * inline SVG strings, not images, so nothing can fail to load.
 *
 * Each icon is viewBox="0 0 24 24", uses currentColor, and is sized purely
 * by CSS (the .icon class in theme.css) so it inherits surrounding text
 * color and scales with font-size like the emoji it replaces.
 */
window.LC = window.LC || {};
(function (LC) {
  "use strict";

  var ICONS = {
    /* camp shield — HUD "camp holds" readout, battle camp-HP */
    shield:
      '<path d="M12 2.4 4.5 5.2v6.1c0 5 3.2 8.4 7.5 10.3 4.3-1.9 7.5-5.3 7.5-10.3V5.2L12 2.4Z" ' +
      'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M9 12.3l2 2 4-4.4" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round"/>',

    /* drachma coin — HUD drachmas, exercise rewards */
    coin:
      '<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
      '<circle cx="12" cy="12" r="5.2" fill="none" stroke="currentColor" stroke-width="1.1"/>' +
      '<path d="M12 9v6M10.1 10.4c0-.9.85-1.5 1.9-1.5s1.9.5 1.9 1.3-1.9 1.1-1.9 1.1-1.9.2-1.9 1.2.85 1.5 1.9 1.5 1.9-.6 1.9-1.5" ' +
      'fill="none" stroke="currentColor" stroke-width="1"/>',

    /* ambrosia vial — HUD ambrosia */
    vial:
      '<path d="M9.5 2.5h5M10 2.5v6.3L6.3 16a3 3 0 0 0 2.7 4.3h6a3 3 0 0 0 2.7-4.3L14 8.8V2.5" ' +
      'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M8 15.5h8" stroke="currentColor" stroke-width="1.3"/>',

    /* oil lamp — hint button */
    lamp:
      '<path d="M4 13.5c0-3.6 3-6 8-6s8 2.4 8 6c0 2.3-2 3.5-4.5 3.9L14 21h-4l-1.5-3.6C6 17 4 15.8 4 13.5Z" ' +
      'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M12 3v3.6M9 4.3l1.3 2.2M15 4.3l-1.3 2.2" fill="none" stroke="currentColor" ' +
      'stroke-width="1.4" stroke-linecap="round"/>',

    /* bronze padlock — locked exercise / lesson */
    lock:
      '<rect x="5" y="10.5" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
      '<path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
      '<circle cx="12" cy="15" r="1.4" fill="currentColor"/>',

    /* laurel tick — solved / done states */
    tick:
      '<path d="M4.5 12.5c2.4.2 4.2 1 5.6 3 2-5.4 5.6-8.6 9.4-10.4" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  };

  /** Returns an inline <svg> string for `name`, or "" if unknown. Caller
   * places it wherever an emoji glyph used to sit — it takes the "icon"
   * CSS class and inherits color/size from its context. */
  function icon(name, extraClass) {
    var body = ICONS[name];
    if (!body) return "";
    var cls = "icon" + (extraClass ? " " + extraClass : "");
    return '<svg class="' + cls + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + body + "</svg>";
  }

  LC.icon = icon;
})(window.LC);
