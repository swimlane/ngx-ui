/**
 * Font family name used by swim-ui `swim-icon` (distinct from ngx-ui’s `ngx-icon`).
 * Same glyph file is copied at build time; a separate family lets each browsing context
 * (e.g. an iframe) load its own @font-face without depending on the parent shell’s font.
 */
export const SWIM_ICON_FONT_FAMILY = 'swim-ui-icon';
