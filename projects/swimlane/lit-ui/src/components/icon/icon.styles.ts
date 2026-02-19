import { css } from 'lit';
import { iconFontGlyphs } from './icon-font-glyphs';

/**
 * Icon styles matching @swimlane/ngx-ui design system.
 * BEM: swim-icon (block), swim-icon__i, swim-icon__stack (elements).
 *
 * Font icon rules are included here because the component uses Shadow DOM;
 * document-level icon font CSS does not pierce the shadow boundary, so the
 * .swim-icon and .swim-icon.lit-*::before rules must live in the component.
 *
 * The host must load the icon font with font-family 'swim-lit-icon'
 * (SWIM_ICON_FONT_FAMILY) so that glyphs render; no font payload is bundled.
 */
export const iconStyles = css`
  :host {
    display: inline-block;
    vertical-align: baseline;
  }

  :host svg {
    fill: currentColor;
    display: block;
    width: 1em;
    height: 1em;
  }

  .swim-icon__stack {
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
    line-height: 1em;
    vertical-align: baseline;
  }

  .swim-icon__stack .swim-icon__i {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: inherit;
    line-height: 1em;
  }

  /* Later icons paint on top (e.g. x over square-filled) */
  .swim-icon__stack .swim-icon__i--1 {
    z-index: 1;
  }
  .swim-icon__stack .swim-icon__i--2 {
    z-index: 2;
  }
  .swim-icon__stack .swim-icon__i--3 {
    z-index: 3;
  }

  .swim-icon__stack .swim-icon__i::before {
    line-height: 1em;
  }

  /* Modifier: badge overlay (small icon at top-right), match lit-ui icons-effects */
  .icon-fx-badge {
    font-size: 0.25em !important;
    position: relative;
    top: -0.5em;
    left: 0.5em;
    width: auto;
    height: auto;
  }

  /* Modifier: red color for overlay icon (match lit-ui) */
  .text-red {
    color: var(--red-500);
  }

  /* Font icon base (glyphs in icon-font-glyphs.ts); family must match SWIM_ICON_FONT_FAMILY.
   * Explicit font-family so host/global 'ngx-icon' does not override via inheritance. */
  .swim-icon,
  .swim-icon__i.swim-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    font: normal normal normal 1em/1 'swim-lit-icon';
    font-family: 'swim-lit-icon', sans-serif;
    flex-shrink: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Center the glyph regardless of font metrics (fixes vertical misalignment) */
  .swim-icon::before,
  .swim-icon__i.swim-icon::before {
    display: block;
    line-height: 1;
  }

  /* Loading spinner: animate only the inner glyph inside this shadow root */
  @keyframes swim-icon-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  :host([font-icon='loading']) .swim-icon__i {
    animation: swim-icon-spin 1s linear infinite;
  }

  :host([font-icon='loading']) span[part='icon'] {
    animation: swim-icon-spin 1s linear infinite;
  }

  ${iconFontGlyphs}
`;
