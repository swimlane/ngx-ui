import { css as h, LitElement as g, nothing as d, html as l } from "lit";
import { property as s, state as u, customElement as b, query as T } from "lit/decorators.js";
import { live as lt } from "lit/directives/live.js";
import { ifDefined as le } from "lit/directives/if-defined.js";
import { repeat as Mt } from "lit/directives/repeat.js";
import { unsafeHTML as Vt } from "lit/directives/unsafe-html.js";
const m = h`
  :host {
    /* Colors - Blue */
    --blue-100: rgb(224, 239, 255);
    --blue-200: rgb(173, 212, 255);
    --blue-300: rgb(122, 185, 255);
    --blue-400: rgb(71, 158, 255);
    --blue-500: rgb(20, 131, 255);
    --blue-600: rgb(0, 106, 224);
    --blue-700: rgb(0, 82, 173);
    --blue-800: rgb(0, 58, 122);
    --blue-900: rgb(0, 34, 71);

    /* Colors - Light Blue */
    --lightblue-100: rgb(234, 249, 255);
    --lightblue-200: rgb(184, 234, 254);
    --lightblue-300: rgb(134, 219, 253);
    --lightblue-400: rgb(84, 205, 252);
    --lightblue-500: rgb(34, 190, 251);
    --lightblue-600: rgb(4, 166, 230);
    --lightblue-700: rgb(3, 130, 180);
    --lightblue-800: rgb(2, 94, 130);
    --lightblue-900: rgb(1, 58, 80);

    /* Colors - Green */
    --green-100: rgb(206, 249, 240);
    --green-200: rgb(161, 243, 226);
    --green-300: rgb(116, 237, 212);
    --green-400: rgb(71, 231, 198);
    --green-500: rgb(29, 222, 182);
    --green-600: rgb(23, 177, 145);
    --green-700: rgb(17, 132, 108);
    --green-800: rgb(11, 87, 71);
    --green-900: rgb(5, 42, 34);

    /* Colors - Orange */
    --orange-100: rgb(255, 244, 224);
    --orange-200: rgb(255, 225, 173);
    --orange-300: rgb(255, 206, 122);
    --orange-400: rgb(255, 187, 71);
    --orange-500: rgb(255, 168, 20);
    --orange-600: rgb(224, 141, 0);
    --orange-700: rgb(173, 109, 0);
    --orange-800: rgb(122, 77, 0);
    --orange-900: rgb(71, 45, 0);

    /* Colors - Red */
    --red-100: rgb(255, 230, 224);
    --red-200: rgb(255, 190, 173);
    --red-300: rgb(255, 150, 122);
    --red-400: rgb(255, 109, 71);
    --red-500: rgb(255, 69, 20);
    --red-600: rgb(224, 47, 0);
    --red-700: rgb(173, 36, 0);
    --red-800: rgb(122, 25, 0);
    --red-900: rgb(71, 15, 0);

    /* Colors - Purple */
    --purple-100: rgb(255, 255, 255);
    --purple-200: rgb(239, 234, 252);
    --purple-300: rgb(205, 190, 245);
    --purple-400: rgb(172, 145, 239);
    --purple-500: rgb(138, 101, 232);
    --purple-600: rgb(104, 57, 225);
    --purple-700: rgb(78, 30, 201);
    --purple-800: rgb(61, 23, 157);
    --purple-900: rgb(44, 17, 112);

    /* Colors - Grey */
    --grey-050: rgb(235, 237, 242);
    --grey-100: rgb(205, 210, 221);
    --grey-150: rgb(190, 197, 211);
    --grey-200: rgb(175, 183, 200);
    --grey-250: rgb(160, 170, 190);
    --grey-300: rgb(144, 156, 180);
    --grey-350: rgb(129, 143, 169);
    --grey-400: rgb(114, 129, 159);
    --grey-450: rgb(100, 116, 147);
    --grey-500: rgb(90, 104, 132);
    --grey-550: rgb(80, 92, 117);
    --grey-550-rgb: 80, 92, 117;
    --grey-600: rgb(69, 80, 102);
    --grey-650: rgb(59, 68, 87);
    --grey-700: rgb(49, 56, 71);
    --grey-725: rgb(43, 50, 64);
    --grey-750: rgb(38, 44, 56);
    --grey-775: rgb(33, 38, 49);
    --grey-800: rgb(28, 32, 41);
    --grey-825: rgb(23, 26, 33);
    --grey-850: rgb(18, 20, 26);
    --grey-875: rgb(12, 14, 18);
    --grey-900: rgb(7, 8, 11);

    /* Colors - Base */
    --white: rgb(255, 255, 255);
    --black: rgb(0, 0, 0);

    /* Typography - Font Sizes */
    --font-size-base: 16px;
    --font-size-xxs: 0.625rem;
    --font-size-xs: 0.75rem;
    --font-size-s: 0.875rem;
    --font-size-m: 1rem;
    --font-size-l: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.75rem;
    --font-size-4xl: 2rem;
    --font-size-5xl: 2.25rem;
    --font-size-6xl: 3rem;

    /* Typography - Line Heights */
    --font-line-height-100: 1.1;
    --font-line-height-200: 1.42;
    --font-line-height-300: 20px;
    --font-line-height-400: 40px;

    /* Typography - Font Weights */
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;

    /* Spacing */
    --spacing-0: 0;
    --spacing-2: 2px;
    --spacing-4: 4px;
    --spacing-8: 8px;
    --spacing-10: 10px;
    --spacing-12: 12px;
    --spacing-16: 16px;
    --spacing-20: 20px;
    --spacing-24: 24px;
    --spacing-32: 32px;

    /* Border Radius */
    --radius-0: 0;
    --radius-2: 2px;
    --radius-4: 4px;
    --radius-6: 6px;
    --radius-8: 8px;
    --radius-16: 16px;
    --radius-64: 64px;

    /* Semantic colors */
    --color-error: var(--red-500);

    /* Shadows */
    --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-2: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    --shadow-3: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12);
  }
`, Bn = h`
  * {
    box-sizing: border-box;
  }
`, jt = h`
  :host {
    display: inline-block;
    cursor: pointer;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  button {
    box-sizing: border-box;
    color: var(--button-text, var(--white));
    display: inline-block;
    padding: 0.35em 0.55em;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    font: inherit;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-bold);
    outline: none;
    line-height: var(--font-line-height-100);
    outline-offset: 2px;
    cursor: inherit;
    width: 100%;

    background: var(--button-bg, var(--grey-600));
    border: solid 1px transparent;
    border-color: var(--button-border, transparent);
    border-radius: var(--radius-4);
    box-shadow: var(--button-shadow, var(--shadow-1));
    transition: background-color 200ms, box-shadow 200ms;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.07);
  }

  button:focus,
  button:focus-within {
    outline: none;
  }

  button:focus-visible {
    outline: 2px solid var(--grey-600);
  }

  /* Hover states (--button-hover set by swim-button-group when used inside a group) */
  :host(:not([disabled])) button:hover {
    cursor: pointer;
    background: var(--button-hover, var(--grey-700));
    outline-color: var(--button-hover, var(--grey-700));
  }

  /* Size variants */
  :host([size='small']) button {
    font-size: var(--font-size-xxs);
  }

  :host([size='large']) button {
    font-size: 1.3em;
  }

  /* Variant: Primary (--button-* overrides when inside swim-button-group) */
  :host([variant='primary']) button {
    background-color: var(--button-bg, var(--blue-400));
    border-color: var(--button-border, var(--blue-400));
    color: var(--button-text, var(--white));
    outline-color: var(--button-border, var(--blue-500));
  }

  :host([variant='primary']) button:focus-visible {
    outline-color: var(--button-border, var(--blue-500));
  }

  :host([variant='primary']:not([disabled])) button:hover {
    background-color: var(--button-hover, var(--blue-500));
    border-color: var(--button-hover, var(--blue-500));
  }

  /* Variant: Warning */
  :host([variant='warning']) button {
    background-color: var(--orange-400);
    color: var(--grey-900);
    outline-color: var(--orange-500);
  }

  :host([variant='warning']) button:focus-visible {
    outline-color: var(--orange-500);
  }

  :host([variant='warning']:not([disabled])) button:hover {
    background-color: var(--orange-500);
  }

  /* Variant: Danger */
  :host([variant='danger']) button {
    background-color: var(--red-400);
    outline-color: var(--red-400);
  }

  :host([variant='danger']) button:focus-visible {
    outline-color: var(--red-400);
  }

  :host([variant='danger']:not([disabled])) button:hover {
    background-color: var(--red-500);
  }

  /* Variant: Link */
  :host([variant='link']) button {
    background-color: transparent;
    box-shadow: none;
  }

  :host([variant='link']:not([disabled])) button:hover {
    background-color: transparent;
  }

  /* Variant: Bordered */
  :host([variant='bordered']) button,
  :host([variant='primary'][bordered]) button {
    border: 1px solid var(--blue-400);
    color: var(--blue-400);
    background-color: transparent;
    box-shadow: none;
    outline-color: var(--blue-400);
  }

  :host([variant='bordered']) button:focus-visible,
  :host([variant='primary'][bordered]) button:focus-visible {
    outline-color: var(--blue-400);
  }

  :host([variant='bordered']:not([disabled])) button:hover,
  :host([variant='primary'][bordered]:not([disabled])) button:hover {
    border-color: var(--blue-200);
    color: var(--blue-200);
  }

  /* Button content and state icon container */
  .content {
    text-overflow: ellipsis;
    overflow-x: clip;
    overflow-y: visible;
    width: 100%;
    display: block;
    white-space: nowrap;
    transition: opacity 0.25s ease-out;
  }

  .state-icon {
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    pointer-events: none;
  }

  /* State: In Progress */
  :host([state='in-progress']) {
    cursor: wait !important;
    position: relative;
    opacity: 1 !important;
  }

  :host([state='in-progress']) button {
    opacity: 1;
    pointer-events: none;
  }

  :host([state='in-progress']) .content {
    opacity: 0;
  }

  :host([state='in-progress']) .state-icon {
    opacity: 1;
  }

  /* State: Success */
  :host([state='success']) {
    cursor: wait !important;
  }

  :host([state='success']) button {
    color: black !important;
    background-color: var(--green-500) !important;
    background: var(--green-500) !important;
    border: 1px solid var(--green-500) !important;
    pointer-events: none;
  }

  :host([state='success']) .content {
    opacity: 0;
  }

  :host([state='success']) .state-icon {
    opacity: 1;
    color: var(--white);
  }

  /* State: Fail */
  :host([state='fail']) {
    cursor: wait !important;
  }

  :host([state='fail']) button {
    color: black !important;
    background-color: var(--red-500) !important;
    background: var(--red-500) !important;
    border: 1px solid var(--red-500) !important;
    pointer-events: none;
  }

  :host([state='fail']) .content {
    opacity: 0;
  }

  :host([state='fail']) .state-icon {
    opacity: 1;
    color: var(--white);
  }

  /* Icon styles */
  .icon {
    height: 1em;
    width: 1em;
    font-weight: var(--font-weight-bold);
    color: var(--white);
    overflow: hidden;
    font-size: var(--font-size-m);
    display: inline-block;
  }

  /* Spinner animation */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  /* State icons (swim-icon): loading spinner animation */
  .state-icon[font-icon='loading'] {
    display: inline-block;
    animation: spin 1s linear infinite;
  }
`;
var L = /* @__PURE__ */ ((e) => (e.Active = "active", e.InProgress = "in-progress", e.Success = "success", e.Fail = "fail", e))(L || {});
function c(e) {
  return e != null && `${e}` != "false";
}
function x(e, t = null) {
  return isNaN(parseFloat(e)) || isNaN(Number(e)) ? t : Number(e);
}
const qt = h`
  .ngx-icon.ngx-3d-rotate::before {
    content: '\\ea01';
  }
  .ngx-icon.ngx-action::before {
    content: '\\ea02';
  }
  .ngx-icon.ngx-action-close::before {
    content: '\\ea03';
  }
  .ngx-icon.ngx-action-maximize::before {
    content: '\\ea04';
  }
  .ngx-icon.ngx-action-maximize-inverse::before {
    content: '\\ea05';
  }
  .ngx-icon.ngx-action-minimize::before {
    content: '\\ea06';
  }
  .ngx-icon.ngx-action-outline::before {
    content: '\\ea07';
  }
  .ngx-icon.ngx-action-outline-small::before {
    content: '\\ea08';
  }
  .ngx-icon.ngx-add-circle::before {
    content: '\\ea09';
  }
  .ngx-icon.ngx-add-circle-filled::before {
    content: '\\ea0a';
  }
  .ngx-icon.ngx-add-circle-medium::before {
    content: '\\ea0b';
  }
  .ngx-icon.ngx-add-circle-thin::before {
    content: '\\ea0c';
  }
  .ngx-icon.ngx-add-edge::before {
    content: '\\ea0d';
  }
  .ngx-icon.ngx-add-new::before {
    content: '\\ea0e';
  }
  .ngx-icon.ngx-add-node::before {
    content: '\\ea0f';
  }
  .ngx-icon.ngx-advanced-pie::before {
    content: '\\ea10';
  }
  .ngx-icon.ngx-alert::before {
    content: '\\ea11';
  }
  .ngx-icon.ngx-app-store::before {
    content: '\\ea12';
  }
  .ngx-icon.ngx-app-workspaces::before {
    content: '\\ea13';
  }
  .ngx-icon.ngx-applet::before {
    content: '\\ea14';
  }
  .ngx-icon.ngx-applets::before {
    content: '\\ea15';
  }
  .ngx-icon.ngx-application::before {
    content: '\\ea16';
  }
  .ngx-icon.ngx-apps::before {
    content: '\\ea17';
  }
  .ngx-icon.ngx-area-chart::before {
    content: '\\ea18';
  }
  .ngx-icon.ngx-arrow-bold-circle-left::before {
    content: '\\ea19';
  }
  .ngx-icon.ngx-arrow-bold-circle-right::before {
    content: '\\ea1a';
  }
  .ngx-icon.ngx-arrow-bold-down::before {
    content: '\\ea1b';
  }
  .ngx-icon.ngx-arrow-bold-left::before {
    content: '\\ea1c';
  }
  .ngx-icon.ngx-arrow-bold-right::before {
    content: '\\ea1d';
  }
  .ngx-icon.ngx-arrow-bold-up::before {
    content: '\\ea1e';
  }
  .ngx-icon.ngx-arrow-down::before {
    content: '\\ea1f';
  }
  .ngx-icon.ngx-arrow-input::before {
    content: '\\ea20';
  }
  .ngx-icon.ngx-arrow-left::before {
    content: '\\ea21';
  }
  .ngx-icon.ngx-arrow-output::before {
    content: '\\ea22';
  }
  .ngx-icon.ngx-arrow-right::before {
    content: '\\ea23';
  }
  .ngx-icon.ngx-arrow-right-down-medium::before {
    content: '\\ea24';
  }
  .ngx-icon.ngx-arrow-right-medium::before {
    content: '\\ea25';
  }
  .ngx-icon.ngx-arrow-tail-left::before {
    content: '\\ea26';
  }
  .ngx-icon.ngx-arrow-tail-right::before {
    content: '\\ea27';
  }
  .ngx-icon.ngx-arrow-tail-solid-left::before {
    content: '\\ea28';
  }
  .ngx-icon.ngx-arrow-tail-solid-right::before {
    content: '\\ea29';
  }
  .ngx-icon.ngx-arrow-tail-subright::before {
    content: '\\ea2a';
  }
  .ngx-icon.ngx-arrow-up::before {
    content: '\\ea2b';
  }
  .ngx-icon.ngx-asset-outline::before {
    content: '\\ea2c';
  }
  .ngx-icon.ngx-asset-outline-small::before {
    content: '\\ea2d';
  }
  .ngx-icon.ngx-assets::before {
    content: '\\ea2e';
  }
  .ngx-icon.ngx-attachment::before {
    content: '\\ea2f';
  }
  .ngx-icon.ngx-automation::before {
    content: '\\ea30';
  }
  .ngx-icon.ngx-automation-alternate::before {
    content: '\\ea31';
  }
  .ngx-icon.ngx-back-arrow::before {
    content: '\\ea32';
  }
  .ngx-icon.ngx-back-arrow-filled::before {
    content: '\\ea33';
  }
  .ngx-icon.ngx-bars::before {
    content: '\\ea34';
  }
  .ngx-icon.ngx-bell::before {
    content: '\\ea35';
  }
  .ngx-icon.ngx-bell-alarm::before {
    content: '\\ea36';
  }
  .ngx-icon.ngx-bold::before {
    content: '\\ea37';
  }
  .ngx-icon.ngx-bolt::before {
    content: '\\ea38';
  }
  .ngx-icon.ngx-branch-node::before {
    content: '\\ea39';
  }
  .ngx-icon.ngx-branch-node-vert::before {
    content: '\\ea3a';
  }
  .ngx-icon.ngx-broom::before {
    content: '\\ea3b';
  }
  .ngx-icon.ngx-browser-size::before {
    content: '\\ea3c';
  }
  .ngx-icon.ngx-bug::before {
    content: '\\ea3d';
  }
  .ngx-icon.ngx-builder::before {
    content: '\\ea3e';
  }
  .ngx-icon.ngx-builder-outline::before {
    content: '\\ea3f';
  }
  .ngx-icon.ngx-button-push-outline::before {
    content: '\\ea40';
  }
  .ngx-icon.ngx-button-push-outline-large::before {
    content: '\\ea41';
  }
  .ngx-icon.ngx-button-push-outline-small::before {
    content: '\\ea42';
  }
  .ngx-icon.ngx-calendar::before {
    content: '\\ea43';
  }
  .ngx-icon.ngx-calendar-clock::before {
    content: '\\ea44';
  }
  .ngx-icon.ngx-calender-clock::before {
    content: '\\ea45';
  }
  .ngx-icon.ngx-cards::before {
    content: '\\ea46';
  }
  .ngx-icon.ngx-center-align::before {
    content: '\\ea47';
  }
  .ngx-icon.ngx-chart-area::before {
    content: '\\ea48';
  }
  .ngx-icon.ngx-chart-bar-bar::before {
    content: '\\ea49';
  }
  .ngx-icon.ngx-chart-bubble::before {
    content: '\\ea4a';
  }
  .ngx-icon.ngx-chart-donut::before {
    content: '\\ea4b';
  }
  .ngx-icon.ngx-chart-full-stacked-area::before {
    content: '\\ea4c';
  }
  .ngx-icon.ngx-chart-heat::before {
    content: '\\ea4d';
  }
  .ngx-icon.ngx-chart-horz-full-stack-bar::before {
    content: '\\ea4e';
  }
  .ngx-icon.ngx-chart-number-card::before {
    content: '\\ea4f';
  }
  .ngx-icon.ngx-chart-pie::before {
    content: '\\ea50';
  }
  .ngx-icon.ngx-chart-pie-grid::before {
    content: '\\ea51';
  }
  .ngx-icon.ngx-chart-scatter::before {
    content: '\\ea52';
  }
  .ngx-icon.ngx-chart-spider::before {
    content: '\\ea53';
  }
  .ngx-icon.ngx-chart-stacked-area::before {
    content: '\\ea54';
  }
  .ngx-icon.ngx-chart-vert-bar::before {
    content: '\\ea55';
  }
  .ngx-icon.ngx-chart-vert-bar2::before {
    content: '\\ea56';
  }
  .ngx-icon.ngx-chart-vert-stacked-bar::before {
    content: '\\ea57';
  }
  .ngx-icon.ngx-check::before {
    content: '\\ea58';
  }
  .ngx-icon.ngx-check-filled::before {
    content: '\\ea59';
  }
  .ngx-icon.ngx-check-filled-sm::before {
    content: '\\ea5a';
  }
  .ngx-icon.ngx-check-square-filled::before {
    content: '\\ea5b';
  }
  .ngx-icon.ngx-checklist::before {
    content: '\\ea5c';
  }
  .ngx-icon.ngx-chevron-bold-down::before {
    content: '\\ea5d';
  }
  .ngx-icon.ngx-chevron-bold-left::before {
    content: '\\ea5e';
  }
  .ngx-icon.ngx-chevron-bold-right::before {
    content: '\\ea5f';
  }
  .ngx-icon.ngx-chevron-bold-up::before {
    content: '\\ea60';
  }
  .ngx-icon.ngx-circle::before {
    content: '\\ea61';
  }
  .ngx-icon.ngx-circle-filled::before {
    content: '\\ea62';
  }
  .ngx-icon.ngx-circles::before {
    content: '\\ea63';
  }
  .ngx-icon.ngx-circuit-board::before {
    content: '\\ea64';
  }
  .ngx-icon.ngx-clipboard::before {
    content: '\\ea65';
  }
  .ngx-icon.ngx-clock::before {
    content: '\\ea66';
  }
  .ngx-icon.ngx-cloud-download::before {
    content: '\\ea67';
  }
  .ngx-icon.ngx-cloud-upload::before {
    content: '\\ea68';
  }
  .ngx-icon.ngx-code::before {
    content: '\\ea69';
  }
  .ngx-icon.ngx-cog::before {
    content: '\\ea6a';
  }
  .ngx-icon.ngx-collapse::before {
    content: '\\ea6b';
  }
  .ngx-icon.ngx-commandline::before {
    content: '\\ea6c';
  }
  .ngx-icon.ngx-comments::before {
    content: '\\ea6d';
  }
  .ngx-icon.ngx-component::before {
    content: '\\ea6e';
  }
  .ngx-icon.ngx-component-create::before {
    content: '\\ea6f';
  }
  .ngx-icon.ngx-condition::before {
    content: '\\ea70';
  }
  .ngx-icon.ngx-copy::before {
    content: '\\ea71';
  }
  .ngx-icon.ngx-copy-app::before {
    content: '\\ea72';
  }
  .ngx-icon.ngx-copy-filled::before {
    content: '\\ea73';
  }
  .ngx-icon.ngx-credit-card::before {
    content: '\\ea74';
  }
  .ngx-icon.ngx-dashboard::before {
    content: '\\ea75';
  }
  .ngx-icon.ngx-dashboard-outline::before {
    content: '\\ea76';
  }
  .ngx-icon.ngx-database::before {
    content: '\\ea77';
  }
  .ngx-icon.ngx-debug::before {
    content: '\\ea78';
  }
  .ngx-icon.ngx-devil::before {
    content: '\\ea79';
  }
  .ngx-icon.ngx-disable::before {
    content: '\\ea7a';
  }
  .ngx-icon.ngx-document::before {
    content: '\\ea7b';
  }
  .ngx-icon.ngx-documentation::before {
    content: '\\ea7c';
  }
  .ngx-icon.ngx-domain::before {
    content: '\\ea7d';
  }
  .ngx-icon.ngx-dots-horz::before {
    content: '\\ea7e';
  }
  .ngx-icon.ngx-dots-vert::before {
    content: '\\ea7f';
  }
  .ngx-icon.ngx-dots-vert-round::before {
    content: '\\ea80';
  }
  .ngx-icon.ngx-double-down::before {
    content: '\\ea81';
  }
  .ngx-icon.ngx-double-left::before {
    content: '\\ea82';
  }
  .ngx-icon.ngx-double-right::before {
    content: '\\ea83';
  }
  .ngx-icon.ngx-double-up::before {
    content: '\\ea84';
  }
  .ngx-icon.ngx-downgrade::before {
    content: '\\ea85';
  }
  .ngx-icon.ngx-downgrade-horizontal::before {
    content: '\\ea86';
  }
  .ngx-icon.ngx-download-outline::before {
    content: '\\ea87';
  }
  .ngx-icon.ngx-download-outline-large::before {
    content: '\\ea88';
  }
  .ngx-icon.ngx-download-outline-small::before {
    content: '\\ea89';
  }
  .ngx-icon.ngx-drag::before {
    content: '\\ea8a';
  }
  .ngx-icon.ngx-edit::before {
    content: '\\ea8b';
  }
  .ngx-icon.ngx-edit-app::before {
    content: '\\ea8c';
  }
  .ngx-icon.ngx-edit-outline::before {
    content: '\\ea8d';
  }
  .ngx-icon.ngx-edit-outline-large::before {
    content: '\\ea8e';
  }
  .ngx-icon.ngx-edit-outline-small::before {
    content: '\\ea8f';
  }
  .ngx-icon.ngx-email::before {
    content: '\\ea90';
  }
  .ngx-icon.ngx-enrich-small::before {
    content: '\\ea91';
  }
  .ngx-icon.ngx-escalate::before {
    content: '\\ea92';
  }
  .ngx-icon.ngx-events-outline::before {
    content: '\\ea93';
  }
  .ngx-icon.ngx-events-outline-small::before {
    content: '\\ea94';
  }
  .ngx-icon.ngx-expand::before {
    content: '\\ea95';
  }
  .ngx-icon.ngx-explore::before {
    content: '\\ea96';
  }
  .ngx-icon.ngx-export::before {
    content: '\\ea97';
  }
  .ngx-icon.ngx-export-filled::before {
    content: '\\ea98';
  }
  .ngx-icon.ngx-export-outline::before {
    content: '\\ea99';
  }
  .ngx-icon.ngx-export-outline-large::before {
    content: '\\ea9a';
  }
  .ngx-icon.ngx-export-outline-small::before {
    content: '\\ea9b';
  }
  .ngx-icon.ngx-eye::before {
    content: '\\ea9c';
  }
  .ngx-icon.ngx-eye-disabled::before {
    content: '\\ea9d';
  }
  .ngx-icon.ngx-eye-hidden::before {
    content: '\\ea9e';
  }
  .ngx-icon.ngx-field-created-by::before {
    content: '\\ea9f';
  }
  .ngx-icon.ngx-field-created-date::before {
    content: '\\eaa0';
  }
  .ngx-icon.ngx-field-date::before {
    content: '\\eaa1';
  }
  .ngx-icon.ngx-field-double-select::before {
    content: '\\eaa2';
  }
  .ngx-icon.ngx-field-dynamic::before {
    content: '\\eaa3';
  }
  .ngx-icon.ngx-field-edited-by::before {
    content: '\\eaa4';
  }
  .ngx-icon.ngx-field-edited-date::before {
    content: '\\eaa5';
  }
  .ngx-icon.ngx-field-grid::before {
    content: '\\eaa6';
  }
  .ngx-icon.ngx-field-html::before {
    content: '\\eaa7';
  }
  .ngx-icon.ngx-field-json::before {
    content: '\\eaa8';
  }
  .ngx-icon.ngx-field-list::before {
    content: '\\eaa9';
  }
  .ngx-icon.ngx-field-list-small::before {
    content: '\\eaaa';
  }
  .ngx-icon.ngx-field-lists::before {
    content: '\\eaab';
  }
  .ngx-icon.ngx-field-multiselect::before {
    content: '\\eaac';
  }
  .ngx-icon.ngx-field-number::before {
    content: '\\eaad';
  }
  .ngx-icon.ngx-field-numeric::before {
    content: '\\eaae';
  }
  .ngx-icon.ngx-field-richtext::before {
    content: '\\eaaf';
  }
  .ngx-icon.ngx-field-single-select::before {
    content: '\\eab0';
  }
  .ngx-icon.ngx-field-singleline::before {
    content: '\\eab1';
  }
  .ngx-icon.ngx-field-text::before {
    content: '\\eab2';
  }
  .ngx-icon.ngx-field-textarea::before {
    content: '\\eab3';
  }
  .ngx-icon.ngx-field-textual::before {
    content: '\\eab4';
  }
  .ngx-icon.ngx-field-users::before {
    content: '\\eab5';
  }
  .ngx-icon.ngx-filter::before {
    content: '\\eab6';
  }
  .ngx-icon.ngx-filter-bar::before {
    content: '\\eab7';
  }
  .ngx-icon.ngx-find-page::before {
    content: '\\eab8';
  }
  .ngx-icon.ngx-flame::before {
    content: '\\eab9';
  }
  .ngx-icon.ngx-folder::before {
    content: '\\eaba';
  }
  .ngx-icon.ngx-folder-closed-small::before {
    content: '\\eabb';
  }
  .ngx-icon.ngx-folder-open-small::before {
    content: '\\eabc';
  }
  .ngx-icon.ngx-folders::before {
    content: '\\eabd';
  }
  .ngx-icon.ngx-font::before {
    content: '\\eabe';
  }
  .ngx-icon.ngx-format-indent-decrease::before {
    content: '\\eabf';
  }
  .ngx-icon.ngx-format-indent-increase::before {
    content: '\\eac0';
  }
  .ngx-icon.ngx-formula::before {
    content: '\\eac1';
  }
  .ngx-icon.ngx-forward-arrow::before {
    content: '\\eac2';
  }
  .ngx-icon.ngx-forward-arrow-filled::before {
    content: '\\eac3';
  }
  .ngx-icon.ngx-full-align::before {
    content: '\\eac4';
  }
  .ngx-icon.ngx-gauge::before {
    content: '\\eac5';
  }
  .ngx-icon.ngx-gear::before {
    content: '\\eac6';
  }
  .ngx-icon.ngx-gear-small::before {
    content: '\\eac7';
  }
  .ngx-icon.ngx-gear-square::before {
    content: '\\eac8';
  }
  .ngx-icon.ngx-globe::before {
    content: '\\eac9';
  }
  .ngx-icon.ngx-graph::before {
    content: '\\eaca';
  }
  .ngx-icon.ngx-graph-alt1::before {
    content: '\\eacb';
  }
  .ngx-icon.ngx-grid-view::before {
    content: '\\eacc';
  }
  .ngx-icon.ngx-hand::before {
    content: '\\eacd';
  }
  .ngx-icon.ngx-handle::before {
    content: '\\eace';
  }
  .ngx-icon.ngx-heat::before {
    content: '\\eacf';
  }
  .ngx-icon.ngx-helper::before {
    content: '\\ead0';
  }
  .ngx-icon.ngx-history::before {
    content: '\\ead1';
  }
  .ngx-icon.ngx-horz-bar-graph-grouped::before {
    content: '\\ead2';
  }
  .ngx-icon.ngx-horz-stacked-bar::before {
    content: '\\ead3';
  }
  .ngx-icon.ngx-html-code::before {
    content: '\\ead4';
  }
  .ngx-icon.ngx-icon-chart-bar-horizontal::before {
    content: '\\ead5';
  }
  .ngx-icon.ngx-icon-chart-horz-bar::before {
    content: '\\ead6';
  }
  .ngx-icon.ngx-import-outline::before {
    content: '\\ead7';
  }
  .ngx-icon.ngx-import-outline-large::before {
    content: '\\ead8';
  }
  .ngx-icon.ngx-import-outline-small::before {
    content: '\\ead9';
  }
  .ngx-icon.ngx-info-filled::before {
    content: '\\eada';
  }
  .ngx-icon.ngx-info-filled-2::before {
    content: '\\eadb';
  }
  .ngx-icon.ngx-info-filled-small::before {
    content: '\\eadc';
  }
  .ngx-icon.ngx-ingest-small::before {
    content: '\\eadd';
  }
  .ngx-icon.ngx-inspect::before {
    content: '\\eade';
  }
  .ngx-icon.ngx-integration::before {
    content: '\\eadf';
  }
  .ngx-icon.ngx-integrations::before {
    content: '\\eae0';
  }
  .ngx-icon.ngx-ip::before {
    content: '\\eae1';
  }
  .ngx-icon.ngx-italic::before {
    content: '\\eae2';
  }
  .ngx-icon.ngx-key::before {
    content: '\\eae3';
  }
  .ngx-icon.ngx-key-outline::before {
    content: '\\eae4';
  }
  .ngx-icon.ngx-key-outline-small::before {
    content: '\\eae5';
  }
  .ngx-icon.ngx-keyboard::before {
    content: '\\eae6';
  }
  .ngx-icon.ngx-keyboard-return::before {
    content: '\\eae7';
  }
  .ngx-icon.ngx-layer::before {
    content: '\\eae8';
  }
  .ngx-icon.ngx-left-align::before {
    content: '\\eae9';
  }
  .ngx-icon.ngx-library::before {
    content: '\\eaea';
  }
  .ngx-icon.ngx-line-chart::before {
    content: '\\eaeb';
  }
  .ngx-icon.ngx-line-graph::before {
    content: '\\eaec';
  }
  .ngx-icon.ngx-linear-gauge::before {
    content: '\\eaed';
  }
  .ngx-icon.ngx-link::before {
    content: '\\eaee';
  }
  .ngx-icon.ngx-list::before {
    content: '\\eaef';
  }
  .ngx-icon.ngx-list-1::before {
    content: '\\eaf0';
  }
  .ngx-icon.ngx-list-view::before {
    content: '\\eaf1';
  }
  .ngx-icon.ngx-loading::before {
    content: '\\eaf2';
  }
  .ngx-icon.ngx-locate-filled::before {
    content: '\\eaf3';
  }
  .ngx-icon.ngx-locate-outline::before {
    content: '\\eaf4';
  }
  .ngx-icon.ngx-locate-outline-large::before {
    content: '\\eaf5';
  }
  .ngx-icon.ngx-location::before {
    content: '\\eaf6';
  }
  .ngx-icon.ngx-lock::before {
    content: '\\eaf7';
  }
  .ngx-icon.ngx-lock-sm::before {
    content: '\\eaf8';
  }
  .ngx-icon.ngx-mail::before {
    content: '\\eaf9';
  }
  .ngx-icon.ngx-mail-1::before {
    content: '\\eafa';
  }
  .ngx-icon.ngx-map::before {
    content: '\\eafb';
  }
  .ngx-icon.ngx-marketplace::before {
    content: '\\eafc';
  }
  .ngx-icon.ngx-menu::before {
    content: '\\eafd';
  }
  .ngx-icon.ngx-mfa::before {
    content: '\\eafe';
  }
  .ngx-icon.ngx-mic::before {
    content: '\\eaff';
  }
  .ngx-icon.ngx-minus::before {
    content: '\\eb00';
  }
  .ngx-icon.ngx-money::before {
    content: '\\eb01';
  }
  .ngx-icon.ngx-mouse-hold::before {
    content: '\\eb02';
  }
  .ngx-icon.ngx-multi-line::before {
    content: '\\eb03';
  }
  .ngx-icon.ngx-new-app::before {
    content: '\\eb04';
  }
  .ngx-icon.ngx-notation-arrow-down-left::before {
    content: '\\eb05';
  }
  .ngx-icon.ngx-notation-arrow-up::before {
    content: '\\eb06';
  }
  .ngx-icon.ngx-numbered-list::before {
    content: '\\eb07';
  }
  .ngx-icon.ngx-open::before {
    content: '\\eb08';
  }
  .ngx-icon.ngx-orchestration::before {
    content: '\\eb09';
  }
  .ngx-icon.ngx-paragraph::before {
    content: '\\eb0a';
  }
  .ngx-icon.ngx-pause::before {
    content: '\\eb0b';
  }
  .ngx-icon.ngx-pause-circle::before {
    content: '\\eb0c';
  }
  .ngx-icon.ngx-percent-gauge::before {
    content: '\\eb0d';
  }
  .ngx-icon.ngx-phone::before {
    content: '\\eb0e';
  }
  .ngx-icon.ngx-photo::before {
    content: '\\eb0f';
  }
  .ngx-icon.ngx-pie-chart::before {
    content: '\\eb10';
  }
  .ngx-icon.ngx-pin::before {
    content: '\\eb11';
  }
  .ngx-icon.ngx-plane::before {
    content: '\\eb12';
  }
  .ngx-icon.ngx-play::before {
    content: '\\eb13';
  }
  .ngx-icon.ngx-play-circle::before {
    content: '\\eb14';
  }
  .ngx-icon.ngx-playbook-outline::before {
    content: '\\eb15';
  }
  .ngx-icon.ngx-playbook-outline-small::before {
    content: '\\eb16';
  }
  .ngx-icon.ngx-plugin::before {
    content: '\\eb17';
  }
  .ngx-icon.ngx-plugin-outline::before {
    content: '\\eb18';
  }
  .ngx-icon.ngx-plugin-outline-small::before {
    content: '\\eb19';
  }
  .ngx-icon.ngx-plus::before {
    content: '\\eb1a';
  }
  .ngx-icon.ngx-plus-bold::before {
    content: '\\eb1b';
  }
  .ngx-icon.ngx-prev::before {
    content: '\\eb1c';
  }
  .ngx-icon.ngx-printer::before {
    content: '\\eb1d';
  }
  .ngx-icon.ngx-profile::before {
    content: '\\eb1e';
  }
  .ngx-icon.ngx-profile-filled::before {
    content: '\\eb1f';
  }
  .ngx-icon.ngx-promote::before {
    content: '\\eb20';
  }
  .ngx-icon.ngx-promote-horizontal::before {
    content: '\\eb21';
  }
  .ngx-icon.ngx-question::before {
    content: '\\eb22';
  }
  .ngx-icon.ngx-question-filled::before {
    content: '\\eb23';
  }
  .ngx-icon.ngx-question-filled-sm::before {
    content: '\\eb24';
  }
  .ngx-icon.ngx-radio-button::before {
    content: '\\eb25';
  }
  .ngx-icon.ngx-redo::before {
    content: '\\eb26';
  }
  .ngx-icon.ngx-redo-all::before {
    content: '\\eb27';
  }
  .ngx-icon.ngx-reference::before {
    content: '\\eb28';
  }
  .ngx-icon.ngx-reference-grid::before {
    content: '\\eb29';
  }
  .ngx-icon.ngx-reference-multi::before {
    content: '\\eb2a';
  }
  .ngx-icon.ngx-reference-single::before {
    content: '\\eb2b';
  }
  .ngx-icon.ngx-reference-tree::before {
    content: '\\eb2c';
  }
  .ngx-icon.ngx-refresh::before {
    content: '\\eb2d';
  }
  .ngx-icon.ngx-refresh-circle::before {
    content: '\\eb2e';
  }
  .ngx-icon.ngx-refresh-small::before {
    content: '\\eb2f';
  }
  .ngx-icon.ngx-remove::before {
    content: '\\eb30';
  }
  .ngx-icon.ngx-remove-edge::before {
    content: '\\eb31';
  }
  .ngx-icon.ngx-remove-node::before {
    content: '\\eb32';
  }
  .ngx-icon.ngx-remove-users::before {
    content: '\\eb33';
  }
  .ngx-icon.ngx-repeat::before {
    content: '\\eb34';
  }
  .ngx-icon.ngx-replace::before {
    content: '\\eb35';
  }
  .ngx-icon.ngx-reports::before {
    content: '\\eb36';
  }
  .ngx-icon.ngx-reports-outline::before {
    content: '\\eb37';
  }
  .ngx-icon.ngx-resize::before {
    content: '\\eb38';
  }
  .ngx-icon.ngx-right-align::before {
    content: '\\eb39';
  }
  .ngx-icon.ngx-rocket::before {
    content: '\\eb3a';
  }
  .ngx-icon.ngx-rotate::before {
    content: '\\eb3b';
  }
  .ngx-icon.ngx-rule-outline::before {
    content: '\\eb3c';
  }
  .ngx-icon.ngx-runner::before {
    content: '\\eb3d';
  }
  .ngx-icon.ngx-runs-outline::before {
    content: '\\eb3e';
  }
  .ngx-icon.ngx-runs-outline-small::before {
    content: '\\eb3f';
  }
  .ngx-icon.ngx-sankey::before {
    content: '\\eb40';
  }
  .ngx-icon.ngx-save::before {
    content: '\\eb41';
  }
  .ngx-icon.ngx-save-outline::before {
    content: '\\eb42';
  }
  .ngx-icon.ngx-save-outline-large::before {
    content: '\\eb43';
  }
  .ngx-icon.ngx-save-outline-small::before {
    content: '\\eb44';
  }
  .ngx-icon.ngx-screen::before {
    content: '\\eb45';
  }
  .ngx-icon.ngx-screen-1::before {
    content: '\\eb46';
  }
  .ngx-icon.ngx-search::before {
    content: '\\eb47';
  }
  .ngx-icon.ngx-section::before {
    content: '\\eb48';
  }
  .ngx-icon.ngx-select-all::before {
    content: '\\eb49';
  }
  .ngx-icon.ngx-select-user::before {
    content: '\\eb4a';
  }
  .ngx-icon.ngx-select-users::before {
    content: '\\eb4b';
  }
  .ngx-icon.ngx-sensor-outline::before {
    content: '\\eb4c';
  }
  .ngx-icon.ngx-sensor-outline-small::before {
    content: '\\eb4d';
  }
  .ngx-icon.ngx-server::before {
    content: '\\eb4e';
  }
  .ngx-icon.ngx-shield::before {
    content: '\\eb4f';
  }
  .ngx-icon.ngx-shrink::before {
    content: '\\eb50';
  }
  .ngx-icon.ngx-skip::before {
    content: '\\eb51';
  }
  .ngx-icon.ngx-slide-left::before {
    content: '\\eb52';
  }
  .ngx-icon.ngx-slide-right::before {
    content: '\\eb53';
  }
  .ngx-icon.ngx-sliders::before {
    content: '\\eb54';
  }
  .ngx-icon.ngx-smartphone::before {
    content: '\\eb55';
  }
  .ngx-icon.ngx-smiley-frown::before {
    content: '\\eb56';
  }
  .ngx-icon.ngx-snapshot::before {
    content: '\\eb57';
  }
  .ngx-icon.ngx-solution::before {
    content: '\\eb58';
  }
  .ngx-icon.ngx-sort-ascending::before {
    content: '\\eb59';
  }
  .ngx-icon.ngx-sort-descending::before {
    content: '\\eb5a';
  }
  .ngx-icon.ngx-spaces::before {
    content: '\\eb5b';
  }
  .ngx-icon.ngx-spaces-list::before {
    content: '\\eb5c';
  }
  .ngx-icon.ngx-spaces-outline::before {
    content: '\\eb5d';
  }
  .ngx-icon.ngx-spaces-outline-large::before {
    content: '\\eb5e';
  }
  .ngx-icon.ngx-speedometer::before {
    content: '\\eb5f';
  }
  .ngx-icon.ngx-split-handle::before {
    content: '\\eb60';
  }
  .ngx-icon.ngx-square::before {
    content: '\\eb61';
  }
  .ngx-icon.ngx-square-filled::before {
    content: '\\eb62';
  }
  .ngx-icon.ngx-star::before {
    content: '\\eb63';
  }
  .ngx-icon.ngx-star-filled::before {
    content: '\\eb64';
  }
  .ngx-icon.ngx-stars::before {
    content: '\\eb65';
  }
  .ngx-icon.ngx-stopwatch::before {
    content: '\\eb66';
  }
  .ngx-icon.ngx-superscript::before {
    content: '\\eb67';
  }
  .ngx-icon.ngx-swap::before {
    content: '\\eb68';
  }
  .ngx-icon.ngx-switch::before {
    content: '\\eb69';
  }
  .ngx-icon.ngx-system-diagnostics::before {
    content: '\\eb6a';
  }
  .ngx-icon.ngx-system-diagnostics-2::before {
    content: '\\eb6b';
  }
  .ngx-icon.ngx-table::before {
    content: '\\eb6c';
  }
  .ngx-icon.ngx-tabs::before {
    content: '\\eb6d';
  }
  .ngx-icon.ngx-tag-filled::before {
    content: '\\eb6e';
  }
  .ngx-icon.ngx-tags-outline::before {
    content: '\\eb6f';
  }
  .ngx-icon.ngx-target::before {
    content: '\\eb70';
  }
  .ngx-icon.ngx-task-outline::before {
    content: '\\eb71';
  }
  .ngx-icon.ngx-thumb-down-filled::before {
    content: '\\eb72';
  }
  .ngx-icon.ngx-thumb-down-outline::before {
    content: '\\eb73';
  }
  .ngx-icon.ngx-thumb-down-outline-large::before {
    content: '\\eb74';
  }
  .ngx-icon.ngx-thumb-up-filled::before {
    content: '\\eb75';
  }
  .ngx-icon.ngx-thumb-up-outline::before {
    content: '\\eb76';
  }
  .ngx-icon.ngx-thumb-up-outline-large::before {
    content: '\\eb77';
  }
  .ngx-icon.ngx-tracking-id::before {
    content: '\\eb78';
  }
  .ngx-icon.ngx-transfer::before {
    content: '\\eb79';
  }
  .ngx-icon.ngx-trash::before {
    content: '\\eb7a';
  }
  .ngx-icon.ngx-tree::before {
    content: '\\eb7b';
  }
  .ngx-icon.ngx-tree-collapse::before {
    content: '\\eb7c';
  }
  .ngx-icon.ngx-tree-expand::before {
    content: '\\eb7d';
  }
  .ngx-icon.ngx-trend-down::before {
    content: '\\eb7e';
  }
  .ngx-icon.ngx-trend-level::before {
    content: '\\eb7f';
  }
  .ngx-icon.ngx-trend-up::before {
    content: '\\eb80';
  }
  .ngx-icon.ngx-trending::before {
    content: '\\eb81';
  }
  .ngx-icon.ngx-underline::before {
    content: '\\eb82';
  }
  .ngx-icon.ngx-undo::before {
    content: '\\eb83';
  }
  .ngx-icon.ngx-undo-all::before {
    content: '\\eb84';
  }
  .ngx-icon.ngx-unlink::before {
    content: '\\eb85';
  }
  .ngx-icon.ngx-upload-outline::before {
    content: '\\eb86';
  }
  .ngx-icon.ngx-upload-outline-large::before {
    content: '\\eb87';
  }
  .ngx-icon.ngx-upload-outline-small::before {
    content: '\\eb88';
  }
  .ngx-icon.ngx-user::before {
    content: '\\eb89';
  }
  .ngx-icon.ngx-user-add::before {
    content: '\\eb8a';
  }
  .ngx-icon.ngx-user-circle::before {
    content: '\\eb8b';
  }
  .ngx-icon.ngx-user-groups::before {
    content: '\\eb8c';
  }
  .ngx-icon.ngx-users::before {
    content: '\\eb8d';
  }
  .ngx-icon.ngx-version::before {
    content: '\\eb8e';
  }
  .ngx-icon.ngx-vert-bar-graph-grouped::before {
    content: '\\eb8f';
  }
  .ngx-icon.ngx-vert-full-stack-bar::before {
    content: '\\eb90';
  }
  .ngx-icon.ngx-view-code::before {
    content: '\\eb91';
  }
  .ngx-icon.ngx-view-designer::before {
    content: '\\eb92';
  }
  .ngx-icon.ngx-view-split::before {
    content: '\\eb93';
  }
  .ngx-icon.ngx-wand::before {
    content: '\\eb94';
  }
  .ngx-icon.ngx-warning-filled::before {
    content: '\\eb95';
  }
  .ngx-icon.ngx-warning-filled-sm::before {
    content: '\\eb96';
  }
  .ngx-icon.ngx-warning-thin::before {
    content: '\\eb97';
  }
  .ngx-icon.ngx-web-api::before {
    content: '\\eb98';
  }
  .ngx-icon.ngx-webhook-outline::before {
    content: '\\eb99';
  }
  .ngx-icon.ngx-webhook-outline-large::before {
    content: '\\eb9a';
  }
  .ngx-icon.ngx-webhook-outline-small::before {
    content: '\\eb9b';
  }
  .ngx-icon.ngx-widget::before {
    content: '\\eb9c';
  }
  .ngx-icon.ngx-worker::before {
    content: '\\eb9d';
  }
  .ngx-icon.ngx-workflow::before {
    content: '\\eb9e';
  }
  .ngx-icon.ngx-workflow-alternate::before {
    content: '\\eb9f';
  }
  .ngx-icon.ngx-workflow-alternate-large::before {
    content: '\\eba0';
  }
  .ngx-icon.ngx-workflow-alternate-small::before {
    content: '\\eba1';
  }
  .ngx-icon.ngx-workspaces::before {
    content: '\\eba2';
  }
  .ngx-icon.ngx-workstation::before {
    content: '\\eba3';
  }
  .ngx-icon.ngx-wrench::before {
    content: '\\eba4';
  }
  .ngx-icon.ngx-x::before {
    content: '\\eba5';
  }
  .ngx-icon.ngx-x-filled::before {
    content: '\\eba6';
  }
  .ngx-icon.ngx-x-small::before {
    content: '\\eba7';
  }
`, Rt = h`
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
    text-align: center;
    font-size: inherit;
    line-height: 1em;
    display: block;
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

  /* Modifier: badge overlay (small icon at top-right), match ngx-ui icons-effects.scss */
  .icon-fx-badge {
    font-size: 0.25em !important;
    position: relative;
    top: -0.5em;
    left: 0.5em;
    width: auto;
    height: auto;
  }

  /* Modifier: red color for overlay icon (match ngx-ui) */
  .text-red {
    color: var(--red-500, rgb(255, 69, 20));
  }

  /* Font icon base (glyphs in icon-font-glyphs.ts) */
  .ngx-icon {
    display: inline-block;
    font: normal normal normal 1em/1 'ngx-icon';
    flex-shrink: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ${qt}
`, Nt = (e) => `ngx-icon ${e.trim().split(" ").map((i) => {
  const [n, o] = i.split(":");
  return n.length ? `${n} ${n}-${o}` : o;
}).join(" ")}`;
class Ut {
  constructor() {
    this._defaultFontSetClass = "ngx", this._iconMap = /* @__PURE__ */ new Map();
  }
  setDefaultFontSetClass(t) {
    return this._defaultFontSetClass = t, this._defaultFontSetClass;
  }
  get(t, i) {
    return this.lookup(t, i).map((n) => Nt(n));
  }
  lookup(t, i) {
    const n = i ?? this._defaultFontSetClass;
    return (Array.isArray(t) ? t : [t]).reduce((o, r) => {
      const a = this._expandKeys(r, n).map((y) => {
        const P = this._iconMap.get(y);
        return P && P.length === 1 ? P[0] : y;
      }).join(" ");
      return o.concat(this._iconMap.get(a) || [a]);
    }, []);
  }
  add(t, i) {
    const n = this._expandKeys(t, this._defaultFontSetClass).join(" "), o = this.lookup(i);
    this._iconMap.set(n, o);
  }
  _expandKeys(t, i) {
    return t.split(" ").map((n) => n.includes(":") ? n : `${i}:${n}`);
  }
}
const Wt = new Ut();
var Gt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, Ce = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Kt(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Gt(t, i, o), o;
};
let ce = class extends g {
  constructor() {
    super(...arguments), this.fontIcon = "", this.alt = "", this.fontSet = "ngx", this.iconClass = "", this._cssClasses = [], this._iconClassTokensOnHost = [];
  }
  connectedCallback() {
    super.connectedCallback(), this._updateFontIcon();
  }
  updated(e) {
    super.updated(e), (e.has("fontIcon") || e.has("fontSet")) && this._updateFontIcon(), e.has("iconClass") && this._syncIconClassToHost();
  }
  _syncIconClassToHost() {
    var t;
    const e = (((t = this.iconClass) == null ? void 0 : t.trim()) ?? "").split(/\s+/).filter(Boolean);
    this._iconClassTokensOnHost.forEach((i) => this.classList.remove(i)), e.forEach((i) => this.classList.add(i)), this._iconClassTokensOnHost = e;
  }
  _parseFontIcon(e) {
    if (Array.isArray(e)) return e.filter(Boolean);
    if (typeof e != "string" || !e) return [];
    const t = e.trim();
    if (t.startsWith("["))
      try {
        const i = JSON.parse(t);
        return Array.isArray(i) ? i : [t];
      } catch {
        return [t];
      }
    return [t];
  }
  _updateFontIcon() {
    const e = this._parseFontIcon(this.fontIcon);
    if (e.length === 0) {
      this._cssClasses = [];
      return;
    }
    this._cssClasses = Wt.get(e, this.fontSet);
  }
  render() {
    var o;
    const e = this._cssClasses, t = !!this.alt, i = ((o = this.iconClass) == null ? void 0 : o.trim()) ?? "", n = i ? ` ${i}` : "";
    return !e || e.length === 0 ? l`
        <span
          part="icon"
          class="${i}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : d}"
          aria-hidden="${t ? "false" : "true"}"
        >
          <slot></slot>
        </span>
      ` : e.length === 1 ? l`
        <i
          part="icon"
          class="swim-icon__i ${e[0]}${n}"
          role="${t ? "img" : "presentation"}"
          aria-label="${t ? this.alt : d}"
          aria-hidden="${t ? "false" : "true"}"
        ></i>
      ` : l`
      <span
        class="swim-icon__stack"
        role="${t ? "img" : "presentation"}"
        aria-label="${t ? this.alt : d}"
        aria-hidden="${t ? "false" : "true"}"
      >
        ${e.map(
      (r, a) => l`<i part="icon icon-${a}" class="swim-icon__i swim-icon__i--${a} ${r}${n}"></i>`
    )}
      </span>
    `;
  }
};
ce.styles = [m, Rt];
Ce([
  s({ type: String, attribute: "font-icon" })
], ce.prototype, "fontIcon", 2);
Ce([
  s({ type: String })
], ce.prototype, "alt", 2);
Ce([
  s({ type: String, attribute: "font-set" })
], ce.prototype, "fontSet", 2);
Ce([
  s({ type: String, attribute: "icon-class" })
], ce.prototype, "iconClass", 2);
Ce([
  u()
], ce.prototype, "_cssClasses", 2);
ce = Ce([
  b("swim-icon")
], ce);
var Xt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, R = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Qt(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Xt(t, i, o), o;
};
let B = class extends g {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "medium", this._disabled = !1, this._state = L.Active, this.type = "button", this._inProgress = !1, this._success = !1, this._fail = !1;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  get state() {
    return this._state;
  }
  set state(e) {
    this._state = e, this._updateStateFlags();
  }
  get timeout() {
    return this._timeout === void 0 ? 3e3 : this._timeout;
  }
  set timeout(e) {
    this._timeout = x(e);
  }
  get promise() {
    return this._promise;
  }
  set promise(e) {
    this._promise = e, this._handlePromise();
  }
  connectedCallback() {
    super.connectedCallback(), this._updateState();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearTimer();
  }
  render() {
    return l`
      <button part="button" type="${this.type}" ?disabled="${this.disabled}" @click="${this._handleClick}">
        <span class="content">
          <slot></slot>
        </span>
        <span class="state-icon"> ${this._renderStateIcon()} </span>
      </button>
    `;
  }
  _renderStateIcon() {
    return this._inProgress ? l`<swim-icon class="state-icon" font-icon="loading"></swim-icon>` : this._success ? l`<swim-icon class="state-icon" font-icon="check"></swim-icon>` : this._fail ? l`<swim-icon class="state-icon" font-icon="x"></swim-icon>` : d;
  }
  _handleClick(e) {
    if (this.disabled) {
      e.stopPropagation(), e.preventDefault();
      return;
    }
  }
  _updateStateFlags() {
    this._inProgress = this._state === L.InProgress, this._success = this._state === L.Success, this._fail = this._state === L.Fail;
  }
  _updateState() {
    this._state || (this.state = L.Active), this.timeout && (this._state === L.Success || this._state === L.Fail || this._state === L.InProgress) && (this._clearTimer(), this._timer = window.setTimeout(() => {
      this.state = L.Active, this._updateState();
    }, this.timeout));
  }
  _handlePromise() {
    this._promise && (this.state = L.InProgress, this._promise.then(() => {
      this.state = L.Success, this._updateState();
    }).catch(() => {
      this.state = L.Fail, this._updateState();
    }));
  }
  _clearTimer() {
    this._timer !== void 0 && (clearTimeout(this._timer), this._timer = void 0);
  }
};
B.styles = [m, jt];
R([
  s({ type: String, reflect: !0 })
], B.prototype, "variant", 2);
R([
  s({ type: String, reflect: !0 })
], B.prototype, "size", 2);
R([
  s({ type: Boolean, reflect: !0 })
], B.prototype, "disabled", 1);
R([
  s({ type: String, reflect: !0 })
], B.prototype, "state", 1);
R([
  s({ type: String })
], B.prototype, "type", 2);
R([
  s({ type: Number })
], B.prototype, "timeout", 1);
R([
  s({ attribute: !1 })
], B.prototype, "promise", 1);
R([
  u()
], B.prototype, "_inProgress", 2);
R([
  u()
], B.prototype, "_success", 2);
R([
  u()
], B.prototype, "_fail", 2);
B = R([
  b("swim-button")
], B);
const Yt = h`
  :host {
    display: inline-flex;
    position: relative;
    box-sizing: border-box;

    /* Default colors - slotted buttons inherit via --button-* (swim-button uses these with fallbacks) */
    --button-bg: var(--grey-600);
    --button-border: var(--grey-600);
    --button-text: var(--white);
    --button-hover: var(--grey-700);
  }

  :host([button-group-style='primary']) {
    --button-bg: var(--blue-400);
    --button-border: var(--blue-400);
    --button-text: var(--white);
    --button-hover: var(--blue-500);
  }

  /* Contained group: slotted buttons use group colors and no individual shadow */
  :host([variant='contained']) {
    --button-shadow: none;
  }

  /* Horizontal: align items */
  :host([orientation='horizontal']) {
    align-items: center;
  }

  /* Vertical: column layout */
  :host([orientation='vertical']) {
    flex-direction: column;
    align-items: stretch;
  }

  /* Contained variant: unify slotted button appearance and remove radius between items */
  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button) {
    max-height: 30px;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:first-child),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:first-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:last-child),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:last-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:not(:first-child):not(:last-child)),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:not(:first-child)),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:not(:first-child)) {
    border-left: 0;
  }

  :host([variant='contained'][orientation='horizontal']) ::slotted(swim-button:not(:last-child)),
  :host([variant='contained'][orientation='horizontal']) ::slotted(button:not(:last-child)) {
    margin-right: 1px;
  }

  /* Vertical contained */
  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:first-child),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:first-child) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:last-child),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:last-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:not(:first-child):not(:last-child)),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:not(:first-child):not(:last-child)) {
    border-radius: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:not(:first-child)),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:not(:first-child)) {
    border-top: 0;
  }

  :host([variant='contained'][orientation='vertical']) ::slotted(swim-button:not(:last-child)),
  :host([variant='contained'][orientation='vertical']) ::slotted(button:not(:last-child)) {
    margin-bottom: 1px;
  }

  /* Text variant: divider between items */
  :host([variant='text'][orientation='horizontal']) ::slotted(swim-button:not(:last-child)),
  :host([variant='text'][orientation='horizontal']) ::slotted(button:not(:last-child)) {
    border-right: 1px solid var(--white);
  }

  :host([variant='text'][orientation='vertical']) ::slotted(swim-button:not(:last-child)),
  :host([variant='text'][orientation='vertical']) ::slotted(button:not(:last-child)) {
    border-bottom: 1px solid var(--white);
  }
`;
var wt = /* @__PURE__ */ ((e) => (e.Horizontal = "horizontal", e.Vertical = "vertical", e))(wt || {}), yt = /* @__PURE__ */ ((e) => (e.Contained = "contained", e.Text = "text", e))(yt || {}), kt = /* @__PURE__ */ ((e) => (e.Default = "default", e.Primary = "primary", e))(kt || {}), Zt = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, Ue = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Jt(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Zt(t, i, o), o;
};
let ye = class extends g {
  constructor() {
    super(...arguments), this.orientation = wt.Horizontal, this.variant = yt.Contained, this.buttonGroupStyle = kt.Default;
  }
  render() {
    return l`<slot></slot>`;
  }
};
ye.styles = [m, Yt];
Ue([
  s({ type: String, reflect: !0 })
], ye.prototype, "orientation", 2);
Ue([
  s({ type: String, reflect: !0 })
], ye.prototype, "variant", 2);
Ue([
  s({ attribute: "button-group-style", type: String, reflect: !0 })
], ye.prototype, "buttonGroupStyle", 2);
ye = Ue([
  b("swim-button-group")
], ye);
const ei = h`
  :host {
    display: inline-block;
    cursor: pointer;
  }

  :host([disabled]) {
    pointer-events: none;
    cursor: default;
  }

  .swim-button-toggle {
    position: relative;
    z-index: 3;
    padding: 1px 10px;
    border-radius: var(--radius-4);
    color: var(--grey-350);
    white-space: nowrap;
    transition: background-color 0.25s cubic-bezier(0.35, 0, 0.25, 1), font-weight 0.25s ease-in;
    font: inherit;
    font-size: var(--font-size-m);
    cursor: inherit;
    border: none;
    background: transparent;
    width: 100%;
    text-align: inherit;
  }

  .swim-button-toggle.swim-button-toggle--checked {
    font-weight: var(--font-weight-semibold);
    color: var(--grey-050);
    background-color: var(--grey-700);
  }

  :host(:not([disabled])) .swim-button-toggle:hover:not(.swim-button-toggle--checked) {
    background: rgba(59, 68, 87, 0.1);
  }

  .swim-button-toggle:focus {
    outline: none;
  }

  .swim-button-toggle:focus-visible {
    outline: 2px solid var(--grey-500);
  }

  .swim-button-toggle__content {
    display: block;
  }
`;
var ti = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, me = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ii(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && ti(t, i, o), o;
};
let oi = 0, re = class extends g {
  constructor() {
    super(...arguments), this._uniqueId = `swim-button-toggle-${++oi}`, this.name = this._uniqueId, this.value = !1, this._checked = !1, this._disabled = !1;
  }
  get id() {
    return this._id ?? this._uniqueId;
  }
  set id(e) {
    this._id = e;
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = c(e);
    this._checked !== t && (this._checked = t, this.requestUpdate("checked"));
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  render() {
    return l`
      <button
        type="button"
        class="swim-button-toggle ${this._checked ? "swim-button-toggle--checked" : ""}"
        id="${this.id}"
        ?disabled="${this.disabled}"
        aria-pressed="${this._checked}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        @click="${this._handleClick}"
      >
        <span class="swim-button-toggle__content">
          <slot></slot>
        </span>
      </button>
    `;
  }
  _handleClick(e) {
    e.preventDefault(), e.stopPropagation(), !(this.disabled || this.checked) && (this._checked = !0, this.dispatchEvent(
      new CustomEvent("value-change", {
        detail: this.value,
        bubbles: !0,
        composed: !0
      })
    ));
  }
};
re.styles = [m, ei];
me([
  s({ type: String })
], re.prototype, "id", 1);
me([
  s({ type: String })
], re.prototype, "name", 2);
me([
  s()
], re.prototype, "value", 2);
me([
  s({ type: Boolean, reflect: !0 })
], re.prototype, "checked", 1);
me([
  u()
], re.prototype, "_checked", 2);
me([
  s({ type: Boolean, reflect: !0 })
], re.prototype, "disabled", 1);
re = me([
  b("swim-button-toggle")
], re);
const ni = h`
  :host {
    display: inline-flex;
    transition: all 0.25s ease;
  }

  :host([role='group']) {
    /* Expose group semantics */
  }

  .swim-button-toggle-group__container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .swim-button-toggle-group__container__label {
    font-weight: var(--font-weight-semibold);
    font-size: 12px;
    line-height: 12px;
    color: var(--grey-350);
  }

  .swim-button-toggle-group__container__toggle-buttons {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    border: 1px solid var(--grey-600);
    border-radius: var(--radius-4);
    padding: var(--spacing-2);
    gap: var(--spacing-2);
  }

  .swim-button-toggle-group__container__toggle-buttons__animation-holder {
    position: absolute;
    top: 0;
    margin: var(--spacing-2);
    height: calc(100% - 4px);
    border-radius: var(--radius-2);
    background-color: var(--grey-700);
    transition: all 0.25s cubic-bezier(0.35, 0, 0.25, 1);
    pointer-events: none;
  }

  :host([disabled]) .swim-button-toggle-group__container__toggle-buttons__animation-holder {
    display: none;
  }
`;
var ri = Object.defineProperty, si = Object.getOwnPropertyDescriptor, de = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? si(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && ri(t, i, o), o;
};
let ai = 0, q = class extends g {
  constructor() {
    var e;
    super(), this._uniqueId = `swim-button-toggle-group-${++ai}`, this._animationHolderLeft = 0, this._animationHolderWidth = 0, this.label = "", this._value = void 0, this._disabled = !1, this._slotChangeBound = () => this._onSlotChange(), this._slotForCleanup = null, this._internals = ((e = this.attachInternals) == null ? void 0 : e.call(this)) ?? {}, this.setAttribute("role", "group"), this._boundValueChange = this._onValueChangeEvent.bind(this);
  }
  get id() {
    return this._id ?? this._uniqueId;
  }
  set id(e) {
    this._id = e;
  }
  get value() {
    return this._value;
  }
  set value(e) {
    this._value !== e && (this._value = e, this._internals.setFormValue(e != null ? String(e) : ""), this._syncSelection());
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e), this._syncDisabled();
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("value-change", this._boundValueChange), this._internals.setFormValue && this._internals.setFormValue(this._value != null ? String(this._value) : "");
  }
  disconnectedCallback() {
    this._slotForCleanup && (this._slotForCleanup.removeEventListener("slotchange", this._slotChangeBound), this._slotForCleanup = null), this.removeEventListener("value-change", this._boundValueChange), super.disconnectedCallback();
  }
  firstUpdated(e) {
    super.firstUpdated(e);
    const t = this._slot;
    t && (this._slotForCleanup = t, t.addEventListener("slotchange", this._slotChangeBound)), this._onSlotChange();
  }
  updated(e) {
    super.updated(e), (e.has("value") || e.has("disabled")) && (this._syncSelection(), this._syncDisabled());
  }
  _getToggles() {
    const e = this._slot;
    return e ? e.assignedElements({ flatten: !0 }).filter(
      (i) => i instanceof HTMLElement && i.tagName === "SWIM-BUTTON-TOGGLE"
    ) : [];
  }
  _onSlotChange() {
    this._syncSelection(), this._syncDisabled(), requestAnimationFrame(() => this._calcAnimationDimensions());
  }
  _syncSelection() {
    const e = this._getToggles(), t = this._value;
    e.forEach((i) => {
      i.checked = i.value !== void 0 && i.value === t;
    }), requestAnimationFrame(() => this._calcAnimationDimensions());
  }
  _syncDisabled() {
    this._getToggles().forEach((t) => {
      t.disabled = this._disabled;
    });
  }
  _calcAnimationDimensions() {
    const e = this._getToggles();
    if (!e.length || this._disabled) {
      this._animationHolderLeft = 0, this._animationHolderWidth = 0;
      return;
    }
    const t = e.findIndex((a) => a.value !== void 0 && a.value === this._value);
    if (t < 0) {
      this._animationHolderLeft = 0, this._animationHolderWidth = 0;
      return;
    }
    let i = 0;
    for (let a = 0; a < t; a++)
      i += e[a].offsetWidth ?? 0;
    i += t * 2 + 2;
    const o = e[t], r = Math.max(0, ((o == null ? void 0 : o.offsetWidth) ?? 0) - 4);
    this._animationHolderLeft = i, this._animationHolderWidth = r;
  }
  _onValueChangeEvent(e) {
    const i = e.detail;
    this._value !== i && (this._value = i, this._internals.setFormValue(i != null ? String(i) : ""), this._syncSelection(), this.dispatchEvent(
      new CustomEvent("value-change", {
        detail: i,
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    return l`
      <div class="swim-button-toggle-group__container" id="${this.id}">
        ${this.label ? l`<label class="swim-button-toggle-group__container__label" for="${this.id}-toggles"
              >${this.label}</label
            >` : ""}
        <div
          class="swim-button-toggle-group__container__toggle-buttons"
          id="${this.id}-toggles"
          role="group"
          aria-label="${this.label || "Toggle group"}"
        >
          <div
            class="swim-button-toggle-group__container__toggle-buttons__animation-holder"
            style="left: ${this._animationHolderLeft}px; width: ${this._animationHolderWidth}px;"
          ></div>
          <slot></slot>
        </div>
      </div>
    `;
  }
};
q.styles = [m, ni];
q.formAssociated = !0;
de([
  T("slot")
], q.prototype, "_slot", 2);
de([
  u()
], q.prototype, "_animationHolderLeft", 2);
de([
  u()
], q.prototype, "_animationHolderWidth", 2);
de([
  s({ type: String })
], q.prototype, "id", 1);
de([
  s({ type: String })
], q.prototype, "label", 2);
de([
  s()
], q.prototype, "value", 1);
de([
  s({ type: Boolean, reflect: !0 })
], q.prototype, "disabled", 1);
q = de([
  b("swim-button-toggle-group")
], q);
const Ve = 4, Qe = 3, ct = 25, li = 30, ci = 15, dt = 27, di = h`
  @keyframes cardSlideIn {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :host {
    display: flex;
    background: var(--grey-800);
    border-radius: var(--radius-6);
    box-sizing: border-box;
  }

  :host([disabled]) {
    cursor: default;
    pointer-events: none;
  }

  :host([appearance='flat']) {
    background: none;
    box-shadow: none;
  }

  /* Status dot */
  .swim-card__status {
    display: block;
    background-color: var(--grey-550);
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .swim-card__status--success {
    background-color: var(--green-500);
  }

  .swim-card__status--error {
    background-color: var(--color-error);
  }

  .swim-card__accent {
    display: block;
    background: linear-gradient(180deg, var(--grey-100) 0%, var(--grey-200) 100%);
  }

  .swim-card__dot {
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: var(--grey-400);
    margin: 3px var(--spacing-4);
  }

  /* Outline (selected or error) */
  .swim-card__outline {
    pointer-events: none;
    position: absolute;
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
    border: ${Qe}px solid var(--blue-400);
    border-radius: var(--radius-6);
  }

  .swim-card__outline--error {
    border-color: var(--color-error);
  }

  .swim-card__outline-text {
    pointer-events: none;
    color: var(--blue-400);
    white-space: nowrap;
    position: absolute;
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
    border: ${Qe}px solid var(--blue-400);
    border-bottom: 0;
    border-radius: var(--radius-6);
  }

  .swim-card__outline-text--error {
    color: var(--color-error);
    border-color: var(--color-error);
  }

  .swim-card__outline-text-inner {
    font-size: var(--font-size-s);
    width: 100%;
    text-align: center;
    position: absolute;
    display: flex;
    align-items: center;
    bottom: -8px;
    pointer-events: auto;
    cursor: pointer;
  }

  .swim-card__outline-text-inner::before,
  .swim-card__outline-text-inner::after {
    content: '';
    height: ${Qe}px;
    background: var(--blue-400);
  }

  .swim-card__outline-text-inner::before {
    margin-right: var(--spacing-16);
    border-radius: var(--radius-0) var(--radius-0) var(--radius-0) var(--radius-2);
    flex: 1;
  }

  .swim-card__outline-text-inner::after {
    margin-left: var(--spacing-16);
    border-radius: var(--radius-0) var(--radius-0) var(--radius-2) var(--radius-0);
    width: var(--spacing-20);
  }

  .swim-card__outline-text--error .swim-card__outline-text-inner::before,
  .swim-card__outline-text--error .swim-card__outline-text-inner::after {
    background: var(--color-error);
  }

  /* Select checkbox */
  .swim-card__select {
    display: flex;
    align-items: center;
  }

  .swim-card__select input[type='checkbox'] {
    width: 1rem;
    height: 1rem;
    margin: 0;
    cursor: pointer;
    accent-color: var(--blue-400);
  }
`, hi = h`
  :host([orientation='horizontal']) {
    position: relative;
    width: 100%;
    min-width: 500px;
    min-height: 80px;
    height: 80px;
    transition: all 0.2s ease-in-out;
    animation: 0.2s ease-in-out cardSlideIn;
  }

  :host([orientation='horizontal']) .swim-card__status {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  :host([orientation='horizontal']) .swim-card__select {
    margin-left: ${ct}px;
  }

  :host([orientation='horizontal']) .swim-card__accent {
    position: absolute;
    width: ${Ve}px;
    min-width: ${Ve}px;
    right: 0;
    height: 100%;
    border-radius: var(--radius-0) var(--radius-2) var(--radius-2) var(--radius-0);
  }

  :host([orientation='horizontal']) ::slotted(swim-card-header) {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${ct}px;
    flex-grow: 1;
    overflow: hidden;
    cursor: pointer;
  }

  :host([orientation='horizontal']) ::slotted(swim-card-header.no-click) {
    cursor: default;
  }

  :host([orientation='horizontal']) ::slotted(swim-card-section) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: var(--spacing-0) ${li}px;
  }

  :host([orientation='horizontal']) .swim-card__outline,
  :host([orientation='horizontal']) .swim-card__outline-text {
    top: -5px;
    right: -5px;
    left: -5px;
    bottom: -5px;
  }
`, pi = h`
  :host([orientation='vertical']) {
    position: relative;
    flex-direction: column;
    min-width: 347px;
    max-width: 850px;
    height: 418px;
    color: var(--grey-350);
    overflow: hidden;
  }

  :host([orientation='vertical']) .swim-card__status {
    margin: ${ci}px auto var(--spacing-0) auto;
  }

  :host([orientation='vertical']) .swim-card__accent {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${Ve}px;
    border-radius: var(--radius-0) var(--radius-0) var(--radius-6) var(--radius-6);
  }

  :host([orientation='vertical']) ::slotted(swim-card-header) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-shrink: 0;
    border-bottom: 2px solid var(--grey-700);
  }

  :host([orientation='vertical']) ::slotted(swim-card-body) {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding: var(--spacing-20) var(--spacing-0);
    padding-left: ${dt}px;
    padding-right: ${dt}px;
  }

  :host([orientation='vertical']) ::slotted(swim-card-footer) {
    position: relative;
    width: 100%;
    flex-shrink: 0;
    border-bottom: 2px solid var(--grey-700);
    height: 50px;
    padding: var(--spacing-20) var(--spacing-0);
    margin-bottom: ${Ve}px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`, ui = [m, di, hi, pi];
var Pe = /* @__PURE__ */ ((e) => (e.Success = "success", e.Error = "error", e.Disabled = "disabled", e))(Pe || {}), $t = /* @__PURE__ */ ((e) => (e.Horizontal = "horizontal", e.Vertical = "vertical", e))($t || {}), Ct = /* @__PURE__ */ ((e) => (e.Normal = "normal", e.Flat = "flat", e))(Ct || {}), gi = Object.defineProperty, bi = Object.getOwnPropertyDescriptor, N = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? bi(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && gi(t, i, o), o;
};
let F = class extends g {
  constructor() {
    super(...arguments), this._disabled = !1, this.orientation = $t.Horizontal, this.statusTooltip = "", this._selectable = !1, this._selected = !1, this._error = !1, this.outlineText = "", this.appearance = Ct.Normal, this._hideAccent = !1;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  get selectable() {
    return this._selectable;
  }
  set selectable(e) {
    this._selectable = c(e);
  }
  get selected() {
    return this._selected;
  }
  set selected(e) {
    this._selected = c(e);
  }
  get error() {
    return this._error;
  }
  set error(e) {
    this._error = c(e);
  }
  get hideAccent() {
    return this._hideAccent;
  }
  set hideAccent(e) {
    this._hideAccent = c(e);
  }
  _onOutlineClick(e) {
    e.stopPropagation(), this.dispatchEvent(new CustomEvent("outline-click", { bubbles: !0, composed: !0 }));
  }
  _onSelectChange(e) {
    e.stopPropagation();
    const t = e.target;
    this.selected = t.checked, this.dispatchEvent(
      new CustomEvent("select", {
        detail: this.selected,
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onCheckboxClick(e) {
    e.stopPropagation();
  }
  render() {
    const e = this.selected && !this.outlineText && !this.error, t = this.error && !this.outlineText, i = !!this.outlineText, n = !!this.status, o = this.status === Pe.Success ? "swim-card__status--success" : this.status === Pe.Error ? "swim-card__status--error" : "";
    return l`
      ${e ? l`<div class="swim-card__outline" aria-hidden="true"></div>` : d}
      ${t ? l`<div class="swim-card__outline swim-card__outline--error" aria-hidden="true"></div>` : d}
      ${i ? l`
            <div
              class="swim-card__outline-text ${this.error ? "swim-card__outline-text--error" : ""}"
              aria-hidden="true"
            >
              <div
                part="outline-text"
                class="swim-card__outline-text-inner"
                role="button"
                tabindex="${this.disabled ? -1 : 0}"
                aria-label="${this.outlineText}"
                @click="${this._onOutlineClick}"
                @keydown="${(r) => {
      (r.key === "Enter" || r.key === " ") && (r.preventDefault(), this._onOutlineClick(r));
    }}"
              >
                ${this.outlineText}
              </div>
            </div>
          ` : d}
      ${n ? l`
            <div
              class="swim-card__status ${o}"
              title="${this.statusTooltip}"
              role="status"
              aria-label="${this.statusTooltip || this.status || ""}"
            ></div>
          ` : d}
      ${this.selectable ? l`
            <div class="swim-card__select" @click="${this._onCheckboxClick}">
              <input
                type="checkbox"
                .checked="${this.selected}"
                ?disabled="${this.disabled}"
                aria-label="Select card"
                @change="${this._onSelectChange}"
              />
            </div>
          ` : d}

      <slot></slot>

      ${this.hideAccent ? d : l`<div class="swim-card__accent" aria-hidden="true"></div>`}
    `;
  }
};
F.styles = ui;
N([
  s({ type: Boolean, reflect: !0 })
], F.prototype, "disabled", 1);
N([
  s({ type: String, reflect: !0 })
], F.prototype, "orientation", 2);
N([
  s({ type: String, reflect: !0 })
], F.prototype, "status", 2);
N([
  s({ type: String, attribute: "status-tooltip" })
], F.prototype, "statusTooltip", 2);
N([
  s({ type: Boolean, reflect: !0 })
], F.prototype, "selectable", 1);
N([
  s({ type: Boolean, reflect: !0 })
], F.prototype, "selected", 1);
N([
  s({ type: Boolean, reflect: !0 })
], F.prototype, "error", 1);
N([
  s({ type: String, attribute: "outline-text" })
], F.prototype, "outlineText", 2);
N([
  s({ type: String, reflect: !0 })
], F.prototype, "appearance", 2);
N([
  s({ type: Boolean, attribute: "hide-accent" })
], F.prototype, "hideAccent", 1);
F = N([
  b("swim-card")
], F);
var St = /* @__PURE__ */ ((e) => (e.Small = "small", e.Medium = "medium", e.Large = "large", e))(St || {});
const ht = 25, mi = h`
  :host {
    display: flex;
    align-items: center;
    padding: var(--spacing-0) ${ht}px;
    flex-grow: 1;
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
  }

  :host(.no-click) {
    cursor: default;
  }

  :host([orientation='vertical']) {
    flex-direction: column;
    padding: var(--spacing-0);
    border-bottom: 2px solid var(--grey-700);
    width: 100%;
    box-sizing: border-box;
  }

  :host([orientation='vertical']) ::slotted(swim-card-avatar) {
    margin: 15px var(--spacing-0) var(--spacing-20) var(--spacing-0);
    flex-shrink: 0;
  }

  .swim-card-header__title-group {
    margin-left: ${ht}px;
    display: flex;
    flex-direction: column;
    width: calc(100% - 79px);
  }

  :host([orientation='vertical']) .swim-card-header__title-group {
    margin-left: 0;
    width: 100%;
    padding: 0 var(--spacing-16);
    text-align: center;
  }

  :host([orientation='vertical']) ::slotted([slot='title']) {
    text-align: center;
  }

  :host([orientation='vertical']) ::slotted([slot='subtitle']) {
    text-align: center;
  }

  .swim-card-header__tag,
  .swim-card-header__title,
  .swim-card-header__subtitle {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  ::slotted([slot='tag']) {
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xxs);
    line-height: 12px;
  }

  ::slotted([slot='title']) {
    font-weight: var(--font-weight-semibold);
    font-size: 22px;
    color: var(--grey-050);
  }

  ::slotted([slot='subtitle']) {
    display: inline-block;
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-s);
    color: var(--grey-300);
  }

  .swim-card-header__label {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-xs);
    border-bottom: 0;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    position: absolute;
    display: flex;
    align-items: center;
    bottom: -15px;
    left: 0;
  }

  .swim-card-header__label::before,
  .swim-card-header__label::after {
    content: '';
    height: 2px;
    background: var(--grey-700);
    width: 100%;
  }

  .swim-card-header__label::before {
    margin-right: var(--spacing-20);
  }

  .swim-card-header__label::after {
    margin-left: var(--spacing-20);
  }
`, fi = [m, mi];
var _i = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, et = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? vi(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && _i(t, i, o), o;
};
let Te = class extends g {
  constructor() {
    super(...arguments), this.label = "", this.orientation = "horizontal";
  }
  render() {
    return l`
      <slot name="avatar"></slot>
      <div class="swim-card-header__title-group">
        <slot></slot>
        <slot name="tag"></slot>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </div>
      ${this.label ? l`<div class="swim-card-header__label">${this.label}</div>` : d}
    `;
  }
};
Te.styles = fi;
et([
  s({ type: String })
], Te.prototype, "label", 2);
et([
  s({ type: String, reflect: !0 })
], Te.prototype, "orientation", 2);
Te = et([
  b("swim-card-header")
], Te);
const xi = 4, wi = h`
  :host {
    position: relative;
    border-bottom: 2px solid var(--grey-700);
    height: 50px;
    padding: var(--spacing-20) var(--spacing-0);
    margin-bottom: ${xi}px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .swim-card-footer__label {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-xs);
    border-bottom: 0;
    white-space: nowrap;
    width: 100%;
    text-align: center;
    position: absolute;
    display: flex;
    align-items: center;
    top: -15px;
    left: 0;
  }

  .swim-card-footer__label::before,
  .swim-card-footer__label::after {
    content: '';
    height: 2px;
    background: var(--grey-700);
    width: 100%;
  }

  .swim-card-footer__label::before {
    margin-right: var(--spacing-20);
  }

  .swim-card-footer__label::after {
    margin-left: var(--spacing-20);
  }
`, yi = [m, wi];
var ki = Object.defineProperty, $i = Object.getOwnPropertyDescriptor, zt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? $i(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && ki(t, i, o), o;
};
let je = class extends g {
  constructor() {
    super(...arguments), this.label = "";
  }
  render() {
    return l`
      ${this.label ? l`<div class="swim-card-footer__label">${this.label}</div>` : d}
      <slot></slot>
    `;
  }
};
je.styles = yi;
zt([
  s({ type: String })
], je.prototype, "label", 2);
je = zt([
  b("swim-card-footer")
], je);
const pt = 3, Ci = h`
  :host {
    width: 54px;
    height: 54px;
    min-width: 54px;
    min-height: 54px;
    display: inline-block;
    box-sizing: border-box;
  }

  .swim-card-avatar__img:not(.swim-card-avatar__img--no-bg) {
    background-color: var(--white);
  }

  .swim-card-avatar__avatar {
    border: 2px solid var(--grey-100);
    border-radius: 100%;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    display: flex;
    box-sizing: border-box;
  }

  .swim-card-avatar__inner {
    display: flex;
    height: 100%;
    width: 100%;
    border: ${pt}px solid transparent;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
  }

  .swim-card-avatar__status {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    padding: var(--spacing-4);
    border-radius: 50%;
    border: ${pt}px solid var(--grey-750);
    background-color: var(--white);
    z-index: 1;
  }

  .swim-card-avatar__status--success {
    background-color: var(--green-500);
  }

  .swim-card-avatar__status--error {
    background-color: var(--color-error);
  }

  .swim-card-avatar__avatar.has-status .swim-card-avatar__status {
    box-shadow: none;
  }

  .swim-card-avatar__img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }

  .swim-card-avatar__img--no-bg {
    background-color: transparent;
  }

  .swim-card-avatar__content {
    margin: auto;
    font-size: var(--font-size-m);
    color: var(--grey-100);
    font-weight: var(--font-weight-bold);
  }
`, Si = [m, Ci];
var zi = Object.defineProperty, Ei = Object.getOwnPropertyDescriptor, We = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ei(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && zi(t, i, o), o;
};
let ke = class extends g {
  constructor() {
    super(...arguments), this.src = "", this.removeImageBackground = !1;
  }
  render() {
    const e = !!this.status, t = this.status === Pe.Success ? "swim-card-avatar__status--success" : this.status === Pe.Error ? "swim-card-avatar__status--error" : "";
    return l`
      <div class="swim-card-avatar__avatar ${e ? "has-status" : ""}">
        <div class="swim-card-avatar__inner">
          ${e ? l`<div
                class="swim-card-avatar__status ${t}"
                role="status"
                aria-label="${this.status || ""}"
              ></div>` : d}
          ${this.src ? l`
                <img
                  class="swim-card-avatar__img ${this.removeImageBackground ? "swim-card-avatar__img--no-bg" : ""}"
                  src="${this.src}"
                  alt=""
                  draggable="false"
                  loading="lazy"
                />
              ` : l`<span class="swim-card-avatar__content"><slot></slot></span>`}
        </div>
      </div>
    `;
  }
};
ke.styles = Si;
We([
  s({ type: String })
], ke.prototype, "src", 2);
We([
  s({ type: String, reflect: !0 })
], ke.prototype, "status", 2);
We([
  s({ type: Boolean, attribute: "remove-image-background" })
], ke.prototype, "removeImageBackground", 2);
ke = We([
  b("swim-card-avatar")
], ke);
const Ii = h`
  :host {
    display: inline-block;
    background-color: var(--grey-700);
    border-radius: 11px;
    box-sizing: border-box;
  }

  :host([size='small']) {
    height: 10px;
    width: 35%;
  }

  :host([size='medium']) {
    height: 12px;
    width: 30%;
  }

  :host([size='large']) {
    height: 16px;
    width: 50%;
  }
`, Pi = [m, Ii];
var Ti = Object.defineProperty, Oi = Object.getOwnPropertyDescriptor, Et = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Oi(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Ti(t, i, o), o;
};
let qe = class extends g {
  constructor() {
    super(...arguments), this.size = St.Medium;
  }
  render() {
    return l``;
  }
};
qe.styles = Pi;
Et([
  s({ type: String, reflect: !0 })
], qe.prototype, "size", 2);
qe = Et([
  b("swim-card-placeholder")
], qe);
const ut = 27, Li = h`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding: var(--spacing-20) var(--spacing-0);
    padding-left: ${ut}px;
    padding-right: ${ut}px;
    box-sizing: border-box;
  }

  ::slotted(*) {
    font-weight: var(--font-weight-semibold);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
`, Bi = [m, Li];
var Fi = Object.getOwnPropertyDescriptor, Ai = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Fi(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = a(o) || o);
  return o;
};
let Ye = class extends g {
  render() {
    return l`<slot></slot>`;
  }
};
Ye.styles = Bi;
Ye = Ai([
  b("swim-card-body")
], Ye);
const Di = h`
  :host {
    display: inline-flex;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .swim-checkbox__label {
    cursor: not-allowed;
  }

  :host([round]) .swim-checkbox__box {
    border-radius: 100%;
  }

  .swim-checkbox__label {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 0;
    outline: none;
  }

  .swim-checkbox__label:focus-visible {
    outline: none;
  }

  .swim-checkbox__label:focus-visible .swim-checkbox__box {
    outline: 2px solid var(--blue-200);
    outline-offset: 1px;
  }

  .swim-checkbox__box {
    position: relative;
    flex-shrink: 0;
    border-radius: var(--radius-2);
    background-color: transparent;
    border: 2px solid var(--grey-600);
    transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
    user-select: none;
    margin: auto var(--spacing-10) auto 0;
    outline: 0 none transparent;
    outline-offset: 1px;
  }

  .swim-checkbox__box::after {
    position: absolute;
    top: calc(50% - 7px);
    left: calc(50% - 3px);
    width: 6px;
    height: 12px;
    content: '';
    border: solid var(--white);
    border-width: 0 2px 2px 0;
    transform: rotate(0deg) scale(0);
    transition: all 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
  }

  .swim-checkbox__box--indeterminate {
    background-color: var(--blue-400);
    border-radius: var(--radius-2);
    opacity: 1;
    border: 2px solid var(--blue-400);
    transform: rotate(0deg) scale(1);
  }

  .swim-checkbox__box--indeterminate::after {
    width: 12px;
    height: 2px;
    top: calc(50% - 1px);
    left: calc(50% - 6px);
    border: none;
    transform: rotate(0deg) scale(1);
    background-color: var(--white);
  }

  .swim-checkbox__box--checked {
    background-color: var(--blue-400);
    border-radius: var(--radius-2);
    opacity: 1;
    border: 2px solid var(--blue-400);
    transform: rotate(0deg) scale(1);
  }

  .swim-checkbox__box--checked::after {
    transform: rotate(45deg) scale(1);
    background-color: transparent;
  }

  .swim-checkbox__content {
    margin: auto 0;
    color: var(--grey-100);
    font-size: var(--font-size-m);
    line-height: var(--font-line-height-200);
  }
`;
var Hi = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, J = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Mi(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Hi(t, i, o), o;
};
let Vi = 0, A = class extends g {
  constructor() {
    super(), this.id = `swim-checkbox-${++Vi}`, this.name = "", this.diameter = "18px", this._checked = !1, this._indeterminate = !1, this._tabindex = 0, this._disabled = !1, this._round = !1, this._internals = this.attachInternals();
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = c(e);
    this._checked !== t && (this._checked = t, this._syncFormValue(), this.dispatchEvent(new CustomEvent("checked-change", { detail: this._checked, bubbles: !0, composed: !0 })));
  }
  get indeterminate() {
    return this._indeterminate;
  }
  set indeterminate(e) {
    const t = c(e);
    this._indeterminate !== t && (this._indeterminate = t, this.dispatchEvent(
      new CustomEvent("indeterminate-change", {
        detail: this._indeterminate,
        bubbles: !0,
        composed: !0
      })
    ));
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = x(e, 0);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  get round() {
    return this._round;
  }
  set round(e) {
    this._round = c(e);
  }
  connectedCallback() {
    super.connectedCallback(), this._syncFormValue();
  }
  updated(e) {
    super.updated(e), (e.has("checked") || e.has("_checked")) && this._syncFormValue();
  }
  /** Delegate focus to the focusable checkbox for form validation and accessibility */
  focus(e) {
    var t;
    (t = this._roving) == null || t.focus(e);
  }
  _syncFormValue() {
    this._internals.setFormValue(this._checked ? "on" : "");
  }
  _onClick(e) {
    e.preventDefault(), !this.disabled && this._toggle();
  }
  _onKeydown(e) {
    e.key !== " " || this.disabled || (e.stopPropagation(), e.preventDefault(), this._toggle());
  }
  _toggle() {
    this.checked = !this.checked, this._emitChange();
  }
  _emitChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          stopPropagation: () => {
          },
          timeStamp: Date.now(),
          target: { checked: this._checked }
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onFocus(e) {
    this.dispatchEvent(new FocusEvent("focus", { ...e, bubbles: !0, composed: !0 }));
  }
  _onBlur(e) {
    this.dispatchEvent(new FocusEvent("blur", { ...e, bubbles: !0, composed: !0 }));
  }
  render() {
    const e = `${this.id}-content`;
    return l`
      <div
        class="swim-checkbox__roving swim-checkbox__label"
        role="checkbox"
        tabindex="${this.disabled ? -1 : this.tabindex}"
        aria-checked="${this.indeterminate ? "mixed" : this.checked}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        aria-labelledby="${e}"
        @click="${this._onClick}"
        @keydown="${this._onKeydown}"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
      >
        <div
          part="box"
          class="swim-checkbox__box ${this.checked && !this.indeterminate ? "swim-checkbox__box--checked" : ""} ${this.indeterminate ? "swim-checkbox__box--indeterminate" : ""}"
          style="width: ${this.diameter}; height: ${this.diameter}; min-width: ${this.diameter}; min-height: ${this.diameter};"
        ></div>
        <div part="content" class="swim-checkbox__content" id="${e}">
          <slot></slot>
        </div>
      </div>
    `;
  }
};
A.styles = [m, Di];
A.formAssociated = !0;
J([
  T(".swim-checkbox__roving")
], A.prototype, "_roving", 2);
J([
  s({ type: String })
], A.prototype, "id", 2);
J([
  s({ type: String })
], A.prototype, "name", 2);
J([
  s({ type: String })
], A.prototype, "diameter", 2);
J([
  s({ type: Boolean, reflect: !0, attribute: "checked" })
], A.prototype, "checked", 1);
J([
  s({ type: Boolean, reflect: !0 })
], A.prototype, "indeterminate", 1);
J([
  s({ type: Number })
], A.prototype, "tabindex", 1);
J([
  s({ type: Boolean, reflect: !0 })
], A.prototype, "disabled", 1);
J([
  s({ type: Boolean, reflect: !0 })
], A.prototype, "round", 1);
A = J([
  b("swim-checkbox")
], A);
const It = h`
  /* Only set standard scrollbar props in browsers that don't support -webkit-scrollbar.
   * Chrome 121+ disables ::-webkit-scrollbar (and thumb :hover) when scrollbar-color/width are set. */
  @supports not selector(::-webkit-scrollbar) {
    .swim-scroll,
    .swim-scroll-overlay,
    .swim-scroll-muted,
    .swim-scroll * {
      scrollbar-width: thin;
      scrollbar-color: rgb(80, 92, 117) transparent;
    }
  }

  /* Base: make element scrollable so scrollbar styling applies (matches overlay/muted) */
  .swim-scroll {
    overflow: auto;
    overflow: overlay;
  }

  .swim-scroll::-webkit-scrollbar,
  .swim-scroll-overlay::-webkit-scrollbar,
  .swim-scroll-muted::-webkit-scrollbar,
  .swim-scroll *::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }

  /* Track: transparent (matches ngx-ui scrollbars.scss) */
  .swim-scroll::-webkit-scrollbar-track,
  .swim-scroll-overlay::-webkit-scrollbar-track,
  .swim-scroll-muted::-webkit-scrollbar-track,
  .swim-scroll *::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
    margin: 0;
  }

  .swim-scroll::-webkit-scrollbar-corner,
  .swim-scroll-overlay::-webkit-scrollbar-corner,
  .swim-scroll-muted::-webkit-scrollbar-corner,
  .swim-scroll *::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  .swim-scroll::-webkit-scrollbar-thumb,
  .swim-scroll-overlay::-webkit-scrollbar-thumb,
  .swim-scroll-muted::-webkit-scrollbar-thumb,
  .swim-scroll *::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }

  .swim-scroll::-webkit-scrollbar-button,
  .swim-scroll::-webkit-scrollbar-track-piece,
  .swim-scroll::-webkit-scrollbar-corner,
  .swim-scroll::-webkit-resizer,
  .swim-scroll-overlay::-webkit-scrollbar-button,
  .swim-scroll-overlay::-webkit-scrollbar-track-piece,
  .swim-scroll-overlay::-webkit-scrollbar-corner,
  .swim-scroll-overlay::-webkit-resizer,
  .swim-scroll-muted::-webkit-scrollbar-button,
  .swim-scroll-muted::-webkit-scrollbar-track-piece,
  .swim-scroll-muted::-webkit-scrollbar-corner,
  .swim-scroll-muted::-webkit-resizer,
  .swim-scroll *::-webkit-scrollbar-button,
  .swim-scroll *::-webkit-scrollbar-track-piece,
  .swim-scroll *::-webkit-scrollbar-corner,
  .swim-scroll *::-webkit-resizer {
    display: none;
  }

  /* Default & overlay: thumb 50% opacity (rest), full opacity on hover (matches ngx-ui). */
  /* Use literal rgba for default so scrollbar pseudo-elements always get a distinct rest state. */
  .swim-scroll::-webkit-scrollbar-thumb,
  .swim-scroll *::-webkit-scrollbar-thumb,
  .swim-scroll-overlay::-webkit-scrollbar-thumb {
    background-color: rgba(80, 92, 117, 0.5);
  }

  .swim-scroll::-webkit-scrollbar-thumb:hover,
  .swim-scroll *::-webkit-scrollbar-thumb:hover,
  .swim-scroll-overlay::-webkit-scrollbar-thumb:hover {
    background-color: rgb(80, 92, 117);
  }

  /* Overlay: scrollbars hidden until hover */
  .swim-scroll-overlay {
    overflow: auto;
    overflow: overlay;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  .swim-scroll-overlay::-webkit-scrollbar {
    display: none;
  }

  .swim-scroll-overlay:hover::-webkit-scrollbar {
    display: initial;
  }

  /* Muted: thumb 30% → 50% on container hover → 100% on thumb hover (matches ngx-ui). Literal rgba for reliability. */
  .swim-scroll-muted {
    overflow: auto;
    overflow: overlay;
  }

  .swim-scroll-muted::-webkit-scrollbar-thumb {
    background-color: rgba(80, 92, 117, 0.3);
  }

  .swim-scroll-muted:hover::-webkit-scrollbar-thumb {
    background-color: rgba(80, 92, 117, 0.5);
  }

  .swim-scroll-muted:hover::-webkit-scrollbar-thumb:hover {
    background-color: rgb(80, 92, 117);
  }
`, ji = [
  m,
  It,
  h`
    :host {
      --swim-dialog-bg: var(--grey-800);
      --swim-dialog-header-color: var(--grey-100);
      --swim-dialog-body-color: var(--grey-200);
    }

    .swim-dialog {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      width: 100%;
      height: 100vh;
      pointer-events: none;
      z-index: var(--swim-dialog-z, 991);
    }

    /* Matches ngx-overlay: black at 80% opacity when active */
    .swim-dialog__backdrop {
      position: absolute;
      inset: 0;
      background-color: var(--black);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.1s ease-in;
    }

    .swim-dialog.swim-dialog--open .swim-dialog__backdrop {
      opacity: 0.8;
    }

    .swim-dialog__content {
      pointer-events: auto;
      position: relative;
      border-radius: var(--radius-8);
      box-shadow: var(--shadow-3);
      background: var(--swim-dialog-bg);
      padding: 1.4rem;
      min-width: 250px;
      font-size: var(--font-size-m);
      color: var(--swim-dialog-body-color);
      animation-fill-mode: forwards;
      opacity: 0;
      transform: scale3d(1.2, 1.2, 1);
      transition: opacity 0.2s ease-out, transform 0.2s ease-out;
      z-index: calc(var(--swim-dialog-z, 991) + 1);
    }

    .swim-dialog.swim-dialog--open .swim-dialog__content {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }

    .swim-dialog__content--large,
    .swim-dialog__content--medium {
      padding: var(--spacing-0);
      width: calc(100vw - 120px);
      background-color: transparent;
    }

    .swim-dialog__content--large {
      height: calc(100vh - 120px);
      max-height: calc(100vh - 120px);
      border-radius: var(--radius-64);
      display: flex;
      flex-direction: column;
    }

    .swim-dialog__content--large .swim-dialog__body {
      flex: 1 1 auto;
      min-height: 0;
      max-height: none;
    }

    .swim-dialog__content--medium {
      height: auto;
      min-height: 340px;
      max-height: 75vh;
      max-width: 900px;
      border-radius: var(--radius-64);
      display: flex;
      flex-direction: column;
    }

    .swim-dialog__content--medium .swim-dialog__body {
      flex: 1 1 auto;
      min-height: 0;
      max-height: none;
    }

    .swim-dialog__close {
      position: absolute;
      font-size: var(--font-size-s);
      color: var(--grey-400);
      right: 1rem;
      top: 1rem;
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      line-height: 1;
      border-radius: var(--radius-4);
    }

    .swim-dialog__close:hover,
    .swim-dialog__close:active {
      color: var(--white);
    }

    .swim-dialog__close:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }

    .swim-dialog__header {
      margin: 0 0 1.4rem 0;
    }

    .swim-dialog__title,
    .swim-dialog__header h1,
    .swim-dialog__header h2 {
      font-size: 1.8rem;
      font-weight: 400;
      margin: 0 0 1.4rem 0;
      color: var(--swim-dialog-header-color);
    }

    .swim-dialog__content--medium .swim-dialog__header,
    .swim-dialog__content--large .swim-dialog__header {
      border-top-left-radius: var(--radius-64);
      border-top-right-radius: var(--radius-64);
    }

    .swim-dialog__body {
      margin: 0;
      max-height: calc(100vh - 12rem);
      min-height: 0;
    }

    .swim-dialog__footer {
      text-align: right;
      margin-top: 1.4rem;
    }

    .swim-dialog__footer .btn,
    .swim-dialog__footer swim-button {
      margin-left: var(--spacing-4);
    }

    /* Full screen variant (class="swim-dialog--full-screen" on host or wrapper) */
    :host(.swim-dialog--full-screen) .swim-dialog,
    .swim-dialog.swim-dialog--full-screen {
      width: 100vw;
      height: 100%;
      overflow-y: auto;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__content,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__content {
      box-shadow: none;
      width: 100%;
      min-height: 100vh;
    }

    :host(.swim-dialog--full-screen) .swim-dialog__close,
    .swim-dialog.swim-dialog--full-screen .swim-dialog__close {
      right: 1rem;
      top: 2rem;
    }

    /* Wizard / custom header-footer variant (class="wizard" on root) - style slotted header/footer */
    .swim-dialog.wizard .swim-dialog__content {
      padding: var(--spacing-0);
      background: var(--grey-725);
    }

    .swim-dialog.wizard .swim-dialog__body slot::slotted(.swim-dialog__header) {
      padding: 1.4rem;
      background: var(--grey-750);
      border-top-left-radius: var(--radius-16);
      border-top-right-radius: var(--radius-16);
      margin: 0;
      display: block;
    }

    .swim-dialog.wizard .swim-dialog__body slot::slotted(.swim-dialog__footer) {
      padding: 1.4rem;
      margin-top: 0;
      display: block;
    }
  `
];
var Ee = /* @__PURE__ */ ((e) => (e.Regular = "regular", e.Medium = "medium", e.Large = "large", e))(Ee || {}), qi = Object.defineProperty, Ri = Object.getOwnPropertyDescriptor, E = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ri(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && qi(t, i, o), o;
};
let S = class extends g {
  constructor() {
    super(...arguments), this.dialogTitle = "", this.content = "", this.class = "", this.cssClass = "", this.format = Ee.Regular, this.showBackdrop = !0, this._closeButton = !0, this._visible = !1, this._zIndex = 991, this._contentId = `swim-dialog-content-${Math.random().toString(36).slice(2, 11)}`, this._titleId = `swim-dialog-title-${Math.random().toString(36).slice(2, 11)}`, this._previousActiveElement = null;
  }
  get title() {
    return this.dialogTitle;
  }
  set title(e) {
    e && (this.dialogTitle = e);
  }
  get closeButton() {
    return this._closeButton;
  }
  set closeButton(e) {
    this._closeButton = c(e);
  }
  get visible() {
    return this._visible;
  }
  set visible(e) {
    const t = c(e);
    this._visible !== t && (this._visible = t, t ? (this._previousActiveElement = typeof document < "u" ? document.activeElement : null, this.dispatchEvent(new CustomEvent("open", { bubbles: !0 }))) : (this._restoreFocus(), this.dispatchEvent(new CustomEvent("close", { detail: void 0, bubbles: !0 }))));
  }
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(e) {
    this._zIndex = x(e, 991);
  }
  get _contentzIndex() {
    return this.zIndex + 1;
  }
  get _canClose() {
    return this.beforeClose ? this.beforeClose() : !0;
  }
  _restoreFocus() {
    this._previousActiveElement && typeof this._previousActiveElement.focus == "function" && this._previousActiveElement.focus(), this._previousActiveElement = null;
  }
  /** Show the dialog */
  show() {
    this.visible = !0;
  }
  /** Hide the dialog (respects beforeClose) */
  hide() {
    this._canClose && (this.visible = !1);
  }
  firstUpdated() {
    this.visible && this._contentEl && this._contentEl.focus({ preventScroll: !0 });
  }
  updated(e) {
    e.has("visible") && this.visible && this._contentEl && requestAnimationFrame(() => {
      var t;
      (t = this._contentEl) == null || t.focus({ preventScroll: !0 });
    });
  }
  render() {
    if (!this.visible) return d;
    const e = this.format === Ee.Regular || this.format === "regular", t = this.format === Ee.Large || this.format === "large", i = this.format === Ee.Medium || this.format === "medium", n = [
      "swim-dialog__content",
      this.cssClass,
      t ? "swim-dialog__content--large" : "",
      i ? "swim-dialog__content--medium" : ""
    ].filter(Boolean).join(" "), o = this.class.includes("swim-dialog--full-screen"), r = ["swim-dialog", "swim-dialog--open", this.class, o ? "swim-scroll" : ""].filter(Boolean).join(" ");
    return l`
      <div class="${r}" style="--swim-dialog-z: ${this.zIndex}" role="presentation">
        ${this.showBackdrop ? l`<div class="swim-dialog__backdrop" aria-hidden="true"></div>` : d}
        <div
          part="content"
          class="${n}"
          style="z-index: ${this._contentzIndex}"
          tabindex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="${this.dialogTitle ? this._titleId : d}"
          id="${this._contentId}"
        >
          ${e ? l`
                ${this.closeButton ? l`
                      <button
                        part="close-button"
                        type="button"
                        class="swim-dialog__close"
                        aria-label="Close dialog"
                        @click="${this.hide}"
                      >
                        <swim-icon font-icon="x"></swim-icon>
                      </button>
                    ` : d}
                ${this.dialogTitle ? l`
                      <div class="swim-dialog__header">
                        <h2 id="${this._titleId}" class="swim-dialog__title">${this.dialogTitle}</h2>
                      </div>
                    ` : d}
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? l`<div>${this.content}</div>` : d}
                </div>
              ` : l`
                <div class="swim-dialog__body swim-scroll">
                  <slot></slot>
                  ${this.content ? l`<div>${this.content}</div>` : d}
                </div>
              `}
        </div>
      </div>
    `;
  }
};
S.styles = ji;
E([
  s({ type: String, attribute: "dialog-title" })
], S.prototype, "dialogTitle", 2);
E([
  s({ type: String })
], S.prototype, "title", 1);
E([
  s({ type: String })
], S.prototype, "content", 2);
E([
  s({ type: String })
], S.prototype, "class", 2);
E([
  s({ type: String, attribute: "css-class" })
], S.prototype, "cssClass", 2);
E([
  s({ type: String, reflect: !0 })
], S.prototype, "format", 2);
E([
  s({
    type: Boolean,
    attribute: "show-backdrop",
    reflect: !0,
    converter: {
      fromAttribute: (e) => e === null ? !0 : e !== "false" && e !== "0",
      toAttribute: (e) => e ? "" : "false"
    }
  })
], S.prototype, "showBackdrop", 2);
E([
  s({ type: Boolean, attribute: "close-button" })
], S.prototype, "closeButton", 1);
E([
  s({ type: Boolean, reflect: !0 })
], S.prototype, "visible", 1);
E([
  s({ type: Number })
], S.prototype, "zIndex", 1);
E([
  s({ attribute: !1 })
], S.prototype, "beforeClose", 2);
E([
  u()
], S.prototype, "_contentId", 2);
E([
  u()
], S.prototype, "_titleId", 2);
E([
  T(".swim-dialog__content")
], S.prototype, "_contentEl", 2);
S = E([
  b("swim-dialog")
], S);
const Ni = [
  m,
  h`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      --swim-format-dialog-bg: var(--grey-800);
      --swim-format-header-height-large: 90px;
      --swim-format-header-height-medium: 60px;
      --swim-format-footer-height: 4rem;
      --swim-format-body-padding: 2rem;
      --swim-format-border: 2px solid var(--grey-700);
    }

    .format-dialog-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: var(--swim-format-max-height, 75vh);
      background: var(--swim-format-dialog-bg);
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.25);
      border-radius: var(--radius-16);
      overflow: hidden;
    }

    :host([format='large']) .format-dialog-container {
      --swim-format-max-height: calc(100vh - 7.25rem);
      --swim-format-header-height: var(--swim-format-header-height-large);
    }

    :host([format='medium']) .format-dialog-container {
      --swim-format-max-height: 75vh;
      --swim-format-header-height: var(--swim-format-header-height-medium);
      --swim-format-body-max-height: calc(var(--swim-format-max-height) - var(--swim-format-header-height));
    }

    .format-dialog-container__header {
      flex: 0 0 var(--swim-format-header-height, 90px);
      height: var(--swim-format-header-height, 90px);
      min-height: var(--swim-format-header-height, 90px);
      border-bottom: var(--swim-format-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--swim-format-body-padding);
      padding-right: 2.5rem;
      gap: 1.5rem;
      overflow: visible;
    }

    /* Match ngx-large-format-dialog-header-title__wrapper: flex 0 0 20%, height 100%, justify-content center */
    .format-dialog-container__header-title {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 0 0 20%;
      height: 100%;
      min-width: 0;
      max-width: 50%;
      justify-content: center;
    }

    .format-dialog-container__header-title--with-subtitle {
      align-items: flex-start;
    }

    .format-dialog-container__header-title h1 {
      margin: 0;
      color: var(--white);
      font-size: var(--swim-format-title-size, 1.75rem);
      font-weight: 400;
      line-height: var(--swim-format-title-line, 2rem);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .format-dialog-container__header-title h4 {
      margin: 0;
      color: var(--grey-250);
      font-size: var(--font-size-m);
      line-height: 1.5;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    :host([format='medium']) .format-dialog-container__header-title h1 {
      --swim-format-title-size: 1.375rem;
      --swim-format-title-line: 1.625rem;
    }

    .format-dialog-container__header-action {
      flex: 0 0 auto;
      max-width: 50%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .format-dialog-container__header-action__button {
      background: none;
      border: none;
      color: var(--grey-400);
      font-size: 0.8125rem;
      line-height: 1;
      padding: 0.25rem 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .format-dialog-container__header-action__button swim-icon {
      flex-shrink: 0;
      font-size: 1em;
      line-height: 0;
    }

    .format-dialog-container__header-action__button:hover {
      color: var(--white);
    }

    .format-dialog-container__header-action__button:focus-visible {
      outline: 2px solid var(--blue-500);
      outline-offset: 2px;
    }

    .format-dialog-container__body {
      flex: 1 1 auto;
      min-height: 215px;
      padding: 0 var(--swim-format-body-padding);
      color: var(--grey-200);
    }

    :host([format='medium']) .format-dialog-container__body {
      max-height: var(--swim-format-body-max-height, auto);
    }

    .format-dialog-container__footer {
      flex: 0 0 var(--swim-format-footer-height);
      height: var(--swim-format-footer-height);
      min-height: var(--swim-format-footer-height);
      border-top: var(--swim-format-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--swim-format-footer-gap, 0.5rem);
      padding: 0.75rem 2rem;
      box-sizing: border-box;
    }
  `
];
var Ui = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, fe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Wi(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Ui(t, i, o), o;
};
let se = class extends g {
  constructor() {
    super(...arguments), this.format = "large", this.dialogTitle = "", this.dialogSubtitle = "", this.dialogActionTitle = "Close", this.dialogDirtyActionTitle = "Cancel", this.dirty = !1;
  }
  _onCloseOrCancel() {
    this.dispatchEvent(new CustomEvent("close-or-cancel", { detail: this.dirty, bubbles: !0, composed: !0 }));
  }
  render() {
    const e = [
      "format-dialog-container__header-title",
      "format-dialog-container__header-title--with-subtitle"
    ].join(" ");
    return l`
      <main class="format-dialog-container">
        <header class="format-dialog-container__header">
          <div class="format-dialog-container__header-title ${e}">
            <h1>${this.dialogTitle}</h1>
            ${this.dialogSubtitle ? l`<h4>${this.dialogSubtitle}</h4>` : d}
          </div>
          <div class="format-dialog-container__header-action">
            <button
              type="button"
              class="format-dialog-container__header-action__button"
              aria-label="${this.dirty ? this.dialogDirtyActionTitle : this.dialogActionTitle}"
              @click="${this._onCloseOrCancel}"
            >
              <swim-icon font-icon="x"></swim-icon>
              ${this.dirty ? this.dialogDirtyActionTitle : this.dialogActionTitle}
            </button>
          </div>
        </header>
        <section class="format-dialog-container__body swim-scroll">
          <slot></slot>
        </section>
        <footer class="format-dialog-container__footer">
          <slot name="footer"></slot>
        </footer>
      </main>
    `;
  }
};
se.styles = [It, Ni];
fe([
  s({ type: String, reflect: !0 })
], se.prototype, "format", 2);
fe([
  s({ type: String, attribute: "dialog-title" })
], se.prototype, "dialogTitle", 2);
fe([
  s({ type: String, attribute: "dialog-subtitle" })
], se.prototype, "dialogSubtitle", 2);
fe([
  s({ type: String, attribute: "dialog-action-title" })
], se.prototype, "dialogActionTitle", 2);
fe([
  s({ type: String, attribute: "dialog-dirty-action-title" })
], se.prototype, "dialogDirtyActionTitle", 2);
fe([
  s({ type: Boolean, reflect: !0 })
], se.prototype, "dirty", 2);
se = fe([
  b("swim-large-format-dialog-content")
], se);
const Gi = [
  m,
  h`
    :host {
      --swim-format-footer-gap: 0.5rem;
    }

    .format-dialog-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--swim-format-footer-gap);
      width: 100%;
      height: 100%;
    }
  `
];
var Ki = Object.defineProperty, Xi = Object.getOwnPropertyDescriptor, Pt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Xi(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Ki(t, i, o), o;
};
let Re = class extends g {
  constructor() {
    super(...arguments), this.format = "large";
  }
  render() {
    return l` <div class="format-dialog-footer"><slot></slot></div> `;
  }
};
Re.styles = Gi;
Pt([
  s({ type: String, reflect: !0 })
], Re.prototype, "format", 2);
Re = Pt([
  b("swim-large-format-dialog-footer")
], Re);
const Qi = h`
  :host {
    display: block;
    max-width: 100%;
    margin-top: var(--spacing-16);
    margin-bottom: var(--spacing-8);
    line-height: calc(1em + 0.75em);
    padding-top: calc(0.75rem + 8px);
    padding-bottom: 0;
  }

  :host([marginless]) {
    margin-top: 0;
    margin-bottom: 0;
  }

  :host([no-label]) {
    padding-top: 0;
  }

  :host([size='md']) .input-box,
  :host([size='md']) .input-textarea {
    font-size: var(--font-size-l) !important;
  }

  :host([size='lg']) .input-box,
  :host([size='lg']) .input-textarea {
    font-size: var(--font-size-xl) !important;
  }

  :host([focused]:not([invalid])) .input-label {
    color: var(--blue-500) !important;
  }

  :host([invalid][touched]) .input-underline,
  :host([invalid][dirty]) .input-underline {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]) .underline-fill,
  :host([invalid][dirty]) .underline-fill {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]) .input-label,
  :host([invalid][dirty]) .input-label {
    color: var(--red-500);
  }

  :host([invalid][touched]) .input-hint,
  :host([invalid][dirty]) .input-hint {
    color: var(--red-500);
  }

  :host([invalid][touched]) .input-box,
  :host([invalid][dirty]) .input-box,
  :host([invalid][touched]) .input-textarea,
  :host([invalid][dirty]) .input-textarea {
    caret-color: var(--red-500) !important;
  }

  :host([autosize]) {
    display: inline-block;
  }

  /* Chrome autofill override */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: var(--grey-100) !important;
  }

  .input-flex-wrap {
    display: flex;
  }

  .input-flex-wrap-inner {
    display: flex;
    flex: 1;
    max-width: 100%;
  }

  ::slotted([slot='prefix']),
  ::slotted([slot='suffix']) {
    flex: none;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ::slotted([slot='prefix']) {
    margin-right: var(--spacing-8);
  }

  ::slotted([slot='suffix']) {
    margin-left: var(--spacing-8);
  }

  .input-wrap {
    position: relative;
    display: block;
    margin-bottom: var(--spacing-0);
    width: 100%;
  }

  .input-box-wrap {
    position: relative;
    width: 100%;
    display: flex;
    min-height: 1.75em;
  }

  .input-box-wrap:focus {
    outline: none;
  }

  .input-box,
  .input-textarea {
    flex: auto;
    display: block;
    background: transparent;
    border: none;
    margin-bottom: var(--spacing-0);
    padding-left: var(--spacing-0);
    width: 100%;
    max-width: 100%;
    color: var(--grey-050);
    font-size: var(--font-size-m);
    line-height: 1.25em;
    min-height: var(--input-height, 33px);
    font-family: inherit;
    caret-color: var(--blue-500);
  }

  .input-box::placeholder,
  .input-textarea::placeholder {
    color: var(--grey-350);
  }

  .input-box:focus,
  .input-textarea:focus {
    box-shadow: none;
    outline: none;
  }

  .input-box:disabled,
  .input-textarea:disabled {
    color: var(--grey-400);
    user-select: none;
  }

  .input-box {
    margin: 3px 0;
  }

  .input-box[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .input-textarea {
    resize: none;
  }

  .input-label {
    position: absolute;
    top: 0.5em;
    line-height: var(--font-line-height-100);
    pointer-events: none;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-semibold);
    color: var(--grey-350);
    white-space: nowrap;
    overflow-x: clip;
    max-width: 100%;
    text-overflow: ellipsis;
    transition: color 0.2s ease-out, font-size 150ms ease-out, top 150ms ease-out;
  }

  :host([active]) .input-label,
  :host([has-placeholder]) .input-label {
    font-size: 0.75rem;
    top: -1.4em;
  }

  .input-underline {
    width: 100%;
    height: 1px;
    background-color: var(--grey-600);
  }

  .input-underline.visibility-hidden {
    visibility: hidden;
  }

  .underline-fill {
    background-color: var(--blue-500);
    transition: width 250ms ease-out;
    width: 0;
    height: 2px;
    margin: 0 auto;
  }

  :host([focused]) .underline-fill {
    width: 100%;
  }

  .input-hint {
    font-size: var(--font-size-xs);
    color: var(--grey-350);
    margin-top: var(--spacing-8);
    min-height: 1em;
    line-height: 14px;
    transition: color 0.2s ease-in-out;
  }

  .input-hint.hidden {
    display: none;
  }

  .password-toggle,
  .lock-toggle {
    line-height: 25px;
    top: 0;
    bottom: 0;
    right: 10px;
    cursor: pointer;
    font-size: 0.8rem;
    color: var(--grey-300);
    transition: color 100ms;
    padding: 0;
    z-index: 1;
    background: transparent;
    border: none;
    position: absolute;
  }

  .password-toggle:hover,
  .lock-toggle:hover {
    color: var(--grey-050);
  }

  .numeric-spinner {
    display: flex;
    z-index: 2;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
    transition: all 0.1s ease-out;
  }

  :host(:not([disabled])) .input-box-wrap:hover .numeric-spinner,
  .input-box:focus + .numeric-spinner {
    opacity: 1;
  }

  .spinner-btn {
    font-size: var(--font-size-xxs);
    color: var(--grey-300);
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    line-height: 1;
  }

  .spinner-btn:hover {
    color: var(--grey-100);
  }

  .spinner-btn:active {
    transform: scale(1.4);
  }

  /* Fill appearance */
  :host([appearance='fill']:not([readonly])) .input-flex-wrap {
    position: relative;
  }

  :host([appearance='fill']:not([readonly])) .input-flex-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--grey-875);
    mix-blend-mode: exclusion;
    pointer-events: none;
    border-top-left-radius: var(--radius-4);
    border-top-right-radius: var(--radius-4);
  }

  :host([appearance='fill']) .input-label {
    left: 0;
  }

  :host([appearance='fill']) .input-box-wrap .password-toggle,
  :host([appearance='fill']) .input-box-wrap .lock-toggle {
    line-height: 33.33px;
    z-index: 2;
  }

  :host([appearance='fill']) .input-box,
  :host([appearance='fill']) .input-textarea {
    margin: 0;
    padding: var(--spacing-4) 10px;
    position: relative;
    z-index: 1;
  }

  :host([appearance='fill']) .input-box + .numeric-spinner {
    right: 10px;
  }

  :host([appearance='fill']) ::slotted([slot='prefix']),
  :host([appearance='fill']) ::slotted([slot='suffix']) {
    color: var(--grey-350);
  }

  :host([appearance='fill']) ::slotted([slot='prefix']) {
    padding-left: var(--spacing-10);
  }

  :host([appearance='fill']) ::slotted([slot='suffix']) {
    padding-right: var(--spacing-10);
  }

  /* swim-icon in spinner and password toggle */
  .spinner-btn swim-icon,
  .password-toggle swim-icon {
    display: inline-block;
    font-size: 1em;
  }
`;
var ie = /* @__PURE__ */ ((e) => (e.text = "text", e.password = "password", e.email = "email", e.number = "number", e.tel = "tel", e.url = "url", e.textarea = "textarea", e))(ie || {}), tt = /* @__PURE__ */ ((e) => (e.legacy = "legacy", e.fill = "fill", e))(tt || {}), it = /* @__PURE__ */ ((e) => (e.sm = "sm", e.md = "md", e.lg = "lg", e))(it || {}), Yi = Object.defineProperty, Zi = Object.getOwnPropertyDescriptor, _ = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Zi(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Yi(t, i, o), o;
};
let p = class extends g {
  constructor() {
    super(), this.type = ie.text, this.label = "", this.placeholder = "", this.hint = "", this._value = "", this.name = "", this.id = `swim-input-${Math.random().toString(36).substr(2, 9)}`, this._disabled = !1, this._readonly = !1, this._required = !1, this._autofocus = !1, this.autocomplete = "off", this.appearance = tt.legacy, this.size = it.sm, this._withMargin = !0, this._withHint = !0, this._passwordToggleEnabled = !1, this.textareaRows = 3, this.requiredIndicator = "*", this._focused = !1, this._passwordVisible = !1, this._touched = !1, this._dirty = !1, this._invalid = !1, this._internals = this.attachInternals();
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = this._value;
    this._value = e, this._internals.setFormValue(e), this.requestUpdate("value", t), this._updateActiveState();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  get readonly() {
    return this._readonly;
  }
  set readonly(e) {
    this._readonly = c(e);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    this._required = c(e);
  }
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(e) {
    this._autofocus = c(e);
  }
  get marginless() {
    return !this._withMargin;
  }
  set marginless(e) {
    this._withMargin = !c(e);
  }
  get withHint() {
    return this._withHint;
  }
  set withHint(e) {
    this._withHint = c(e);
  }
  get passwordToggleEnabled() {
    return this._passwordToggleEnabled;
  }
  set passwordToggleEnabled(e) {
    this._passwordToggleEnabled = c(e);
  }
  connectedCallback() {
    super.connectedCallback(), this._updateActiveState();
  }
  firstUpdated() {
    this.autofocus && this.inputElement && setTimeout(() => {
      this.inputElement.focus();
    });
  }
  /** Delegate focus to the internal input so form validation can focus invalid controls. */
  focus(e) {
    var t;
    (t = this.inputElement) == null || t.focus(e);
  }
  updated(e) {
    super.updated(e), e.has("value") && this._updateActiveState(), (e.has("required") || e.has("min") || e.has("max")) && this._validate();
  }
  render() {
    const e = this.type === ie.textarea, t = this.type === ie.password && this.passwordToggleEnabled && !this.disabled, i = this.type === ie.number && !this.disabled, n = this._passwordVisible ? ie.text : this.type;
    return l`
      <div class="input-wrap">
        <div class="input-flex-wrap">
          <slot name="prefix"></slot>
          <div class="input-flex-wrap-inner">
            <div class="input-box-wrap">
              ${e ? this._renderTextarea() : this._renderInput(n)}
              ${i ? l`
                    <div class="numeric-spinner">
                      <button
                        type="button"
                        class="spinner-btn"
                        @mousedown="${this._incrementValue}"
                        @mouseup="${this._stopSpinner}"
                        @mouseleave="${this._stopSpinner}"
                        aria-label="Increment"
                      >
                        <swim-icon font-icon="chevron-bold-up"></swim-icon>
                      </button>
                      <button
                        type="button"
                        class="spinner-btn"
                        @mousedown="${this._decrementValue}"
                        @mouseup="${this._stopSpinner}"
                        @mouseleave="${this._stopSpinner}"
                        aria-label="Decrement"
                      >
                        <swim-icon font-icon="chevron-bold-down"></swim-icon>
                      </button>
                    </div>
                  ` : d}
              ${t ? l`
                    <button
                      type="button"
                      class="password-toggle"
                      @click="${this._togglePassword}"
                      aria-label="Toggle password visibility"
                    >
                      <swim-icon font-icon="${this._passwordVisible ? "eye-disabled" : "eye"}"></swim-icon>
                    </button>
                  ` : d}
            </div>
            <label class="input-label" part="label" for="${this.id}">
              ${this.label} ${this.required ? l`<span>${this.requiredIndicator}</span>` : d}
            </label>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="input-underline ${this.readonly ? "visibility-hidden" : ""}">
          <div class="underline-fill"></div>
        </div>
        <div class="input-hint ${this.withHint ? "" : "hidden"}">
          <slot name="hint">${this.hint}</slot>
        </div>
      </div>
    `;
  }
  _renderInput(e) {
    return l`
      <input
        part="input"
        class="input-box"
        type="${e}"
        id="${this.id}"
        name="${this.name}"
        .value="${lt(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        min="${le(this.min)}"
        max="${le(this.max)}"
        minlength="${le(this.minlength)}"
        maxlength="${le(this.maxlength)}"
        tabindex="${le(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      />
    `;
  }
  _renderTextarea() {
    return l`
      <textarea
        part="input"
        class="input-textarea"
        id="${this.id}"
        name="${this.name}"
        .value="${lt(this.value)}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        rows="${this.textareaRows}"
        minlength="${le(this.minlength)}"
        maxlength="${le(this.maxlength)}"
        tabindex="${le(this.tabindex)}"
        autocomplete="${this.autocomplete}"
        @input="${this._handleInput}"
        @change="${this._handleChange}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      ></textarea>
    `;
  }
  _handleInput(e) {
    const t = e.target;
    this.value = t.value, this._dirty || (this._dirty = !0, this.setAttribute("dirty", "")), this.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 }));
  }
  _handleChange(e) {
    this._validate(), this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
  }
  _handleFocus(e) {
    this._focused = !0, this.setAttribute("focused", ""), this.dispatchEvent(new FocusEvent("focus", { bubbles: !0, composed: !0 }));
  }
  _handleBlur(e) {
    this._focused = !1, this.removeAttribute("focused"), this._touched || (this._touched = !0, this.setAttribute("touched", "")), this._validate(), this.dispatchEvent(new FocusEvent("blur", { bubbles: !0, composed: !0 }));
  }
  _togglePassword() {
    var e;
    this._passwordVisible = !this._passwordVisible, (e = this.inputElement) == null || e.focus();
  }
  _incrementValue(e) {
    e.preventDefault(), !this.disabled && (this._increment(), this._spinnerTimeout = window.setTimeout(() => {
      this._spinnerInterval = window.setInterval(() => this._increment(), 50);
    }, 500));
  }
  _decrementValue(e) {
    e.preventDefault(), !this.disabled && (this._decrement(), this._spinnerTimeout = window.setTimeout(() => {
      this._spinnerInterval = window.setInterval(() => this._decrement(), 50);
    }, 500));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopSpinner();
  }
  _stopSpinner() {
    this._spinnerTimeout !== void 0 && (clearTimeout(this._spinnerTimeout), this._spinnerTimeout = void 0), this._spinnerInterval !== void 0 && (clearInterval(this._spinnerInterval), this._spinnerInterval = void 0);
  }
  _increment() {
    if (this.inputElement && this.type === ie.number) {
      const e = this.inputElement, t = parseFloat(e.value) || 0;
      if (this.max !== void 0 && t >= this.max) return;
      const i = t + 1;
      this.value = i.toString(), this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
    }
  }
  _decrement() {
    if (this.inputElement && this.type === ie.number) {
      const e = this.inputElement, t = parseFloat(e.value) || 0;
      if (this.min !== void 0 && t <= this.min) return;
      const i = t - 1;
      this.value = i.toString(), this.dispatchEvent(new Event("change", { bubbles: !0, composed: !0 }));
    }
  }
  _validate() {
    let e = !0;
    if (this.required && !this.value && (e = !1), this.type === ie.number && this.value) {
      const t = parseFloat(this.value);
      this.min !== void 0 && t < this.min && (e = !1), this.max !== void 0 && t > this.max && (e = !1);
    }
    return this.minlength && this.value.length < this.minlength && (e = !1), this.maxlength && this.value.length > this.maxlength && (e = !1), this.inputElement && (this.inputElement.validity.valid || (e = !1)), this._invalid = !e, this._invalid ? (this.setAttribute("invalid", ""), this._internals.setValidity({ customError: !0 }, "Invalid input")) : (this.removeAttribute("invalid"), this._internals.setValidity({})), e;
  }
  _updateActiveState() {
    const e = this.value && this.value.length > 0, t = !!this.placeholder;
    this._focused || e ? this.setAttribute("active", "") : this.removeAttribute("active"), t ? this.setAttribute("has-placeholder", "") : this.removeAttribute("has-placeholder"), this.label ? this.removeAttribute("no-label") : this.setAttribute("no-label", "");
  }
  // Form API
  formResetCallback() {
    this.value = "", this._touched = !1, this._dirty = !1, this.removeAttribute("touched"), this.removeAttribute("dirty");
  }
  formDisabledCallback(e) {
    this.disabled = e;
  }
};
p.styles = [m, Qi];
p.formAssociated = !0;
_([
  T(".input-box, .input-textarea")
], p.prototype, "inputElement", 2);
_([
  s({ type: String })
], p.prototype, "type", 2);
_([
  s({ type: String })
], p.prototype, "label", 2);
_([
  s({ type: String })
], p.prototype, "placeholder", 2);
_([
  s({ type: String })
], p.prototype, "hint", 2);
_([
  s({ type: String })
], p.prototype, "value", 1);
_([
  s({ type: String })
], p.prototype, "name", 2);
_([
  s({ type: String })
], p.prototype, "id", 2);
_([
  s({ type: Boolean, reflect: !0 })
], p.prototype, "disabled", 1);
_([
  s({ type: Boolean, reflect: !0 })
], p.prototype, "readonly", 1);
_([
  s({ type: Boolean, reflect: !0 })
], p.prototype, "required", 1);
_([
  s({ type: Boolean })
], p.prototype, "autofocus", 1);
_([
  s({ type: String })
], p.prototype, "autocomplete", 2);
_([
  s({ type: String, reflect: !0 })
], p.prototype, "appearance", 2);
_([
  s({ type: String, reflect: !0 })
], p.prototype, "size", 2);
_([
  s({ type: Boolean, reflect: !0, attribute: "marginless" })
], p.prototype, "marginless", 1);
_([
  s({ type: Boolean })
], p.prototype, "withHint", 1);
_([
  s({ type: Boolean, attribute: "password-toggle-enabled" })
], p.prototype, "passwordToggleEnabled", 1);
_([
  s({ type: Number })
], p.prototype, "min", 2);
_([
  s({ type: Number })
], p.prototype, "max", 2);
_([
  s({ type: Number })
], p.prototype, "minlength", 2);
_([
  s({ type: Number })
], p.prototype, "maxlength", 2);
_([
  s({ type: Number, attribute: "textarea-rows" })
], p.prototype, "textareaRows", 2);
_([
  s({ type: String, attribute: "required-indicator" })
], p.prototype, "requiredIndicator", 2);
_([
  s({ type: Number })
], p.prototype, "tabindex", 2);
_([
  u()
], p.prototype, "_focused", 2);
_([
  u()
], p.prototype, "_passwordVisible", 2);
_([
  u()
], p.prototype, "_touched", 2);
_([
  u()
], p.prototype, "_dirty", 2);
_([
  u()
], p.prototype, "_invalid", 2);
p = _([
  b("swim-input")
], p);
const Ji = h`
  :host {
    display: block;
    width: 100%;
    margin-bottom: 2em;
    background: var(--grey-825);
    border-radius: var(--radius-8);
    box-sizing: border-box;
  }

  .swim-section__inner {
    display: block;
    width: 100%;
  }

  .swim-section__header {
    background: var(--grey-775);
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
    min-height: 44px;
    height: auto;
    line-height: 1.25;
    padding: var(--spacing-8) var(--spacing-10);
    color: var(--grey-100);
    position: relative;
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
    box-sizing: border-box;
    overflow: hidden;
  }

  .swim-section__header-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    gap: var(--spacing-16);
  }

  /* When toggle is shown (left), reserve space so title isn’t cut off */
  .swim-section__header--collapsible:not(.swim-section__header--toggle-right) .swim-section__header-content {
    padding-left: 28px;
  }

  .swim-section__header-content slot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    min-width: 0;
    gap: var(--spacing-16);
  }

  /* Custom header (e.g. swim-section-header): full-width row so title and link sit at start/end */
  .swim-section__header-content ::slotted(swim-section-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-width: 0;
    gap: var(--spacing-16);
  }

  /* Slotted headings match section title: same size/weight, no extra margin */
  .swim-section__header-content ::slotted(h1),
  .swim-section__header-content ::slotted(h2),
  .swim-section__header-content ::slotted(h3),
  .swim-section__header-content ::slotted(h4) {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25;
  }

  .swim-section__header-content ::slotted(a) {
    flex-shrink: 0;
  }

  .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  .swim-section__toggle {
    position: absolute;
    left: 0;
    top: 0;
    width: 28px;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    box-shadow: none;
    cursor: pointer;
    color: var(--grey-100);
    overflow: hidden; /* avoid chevron glyph artifacts */
  }

  .swim-section__toggle:focus-visible {
    outline: 2px solid var(--blue-200);
    outline-offset: -2px;
    border-radius: var(--radius-2);
    z-index: 1;
  }

  .swim-section__toggle-icon {
    font-size: 0.75rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swim-section__toggle swim-icon {
    display: block;
    font-size: 0.75rem;
  }

  .swim-section__header a {
    color: var(--grey-100);
    text-decoration: none;
  }

  .swim-section__header a:hover,
  .swim-section__header a:focus {
    text-decoration: underline;
  }

  .swim-section__header a:visited {
    color: var(--grey-100);
  }

  .swim-section__header-title {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25;
    padding: var(--spacing-0);
    margin: var(--spacing-0);
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .swim-section__header.swim-section__header--collapsible:not(.swim-section__header--toggle-right) {
    padding-left: 0; /* space for toggle is from header-content padding-left */
  }

  .swim-section__header.swim-section__header--header-toggle {
    cursor: pointer;
  }

  .swim-section__header.swim-section__header--header-toggle:focus-visible {
    outline: 2px solid var(--blue-200);
    border-radius: var(--radius-2);
    outline-offset: 1px;
  }

  .swim-section__header.swim-section__header--toggle-right.swim-section__header--collapsible {
    padding: var(--spacing-0) var(--spacing-20) var(--spacing-0) var(--spacing-16);
  }

  .swim-section__header.swim-section__header--toggle-right .swim-section__toggle {
    left: auto;
    right: 0;
    width: 28px;
  }

  .swim-section__header--empty {
    height: 0;
    min-height: 0;
    padding: 0;
    overflow: hidden;
    border: none;
    border-radius: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  .swim-section__content {
    display: block;
    box-sizing: border-box;
  }

  /* Appearance: minimal */
  :host([appearance='minimal']) {
    background: transparent;
  }

  :host([appearance='minimal']) .swim-section__header {
    background: transparent;
  }

  /* Appearance: outline */
  :host([appearance='outline']) .swim-section__header,
  :host([appearance='outline']) .swim-section__content {
    background: none;
    border: 1px solid var(--grey-600);
  }

  :host([appearance='outline']) .swim-section__header {
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
  }

  :host([appearance='outline']) .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  :host([appearance='outline']) .swim-section__content {
    border-top: 0;
    border-radius: var(--radius-0) var(--radius-0) var(--radius-8) var(--radius-8);
  }

  /* Appearance: light */
  :host([appearance='light']) .swim-section__header,
  :host([appearance='light']) .swim-section__content {
    border: 2px solid var(--grey-700);
  }

  :host([appearance='light']) .swim-section__header {
    background: var(--grey-700);
    border-radius: var(--radius-8) var(--radius-8) var(--radius-0) var(--radius-0);
  }

  :host([appearance='light']) .swim-section__header.swim-section__header--collapsed {
    border-radius: var(--radius-8);
  }

  :host([appearance='light']) .swim-section__content {
    background: var(--grey-775);
    border-radius: var(--radius-0) var(--radius-0) var(--radius-8) var(--radius-8);
  }
`, eo = [m, Ji];
var Tt = /* @__PURE__ */ ((e) => (e.Legacy = "legacy", e.Outline = "outline", e.Light = "light", e.Minimal = "minimal", e))(Tt || {}), He = /* @__PURE__ */ ((e) => (e.Left = "left", e.Right = "right", e.None = "none", e))(He || {}), to = Object.defineProperty, io = Object.getOwnPropertyDescriptor, U = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? io(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && to(t, i, o), o;
};
const oo = {
  fromAttribute: (e) => e !== "false" && e !== "",
  toAttribute: (e) => e ? "true" : "false"
}, Ot = {
  fromAttribute: (e) => e !== null && e !== "false",
  toAttribute: (e) => e ? "true" : "false"
};
let gt = 0, D = class extends g {
  constructor() {
    super(...arguments), this._id = `section-${++gt}`, this._sectionCollapsed = !1, this._sectionCollapsible = !0, this._headerToggle = !1, this.sectionTitle = "", this.padding = "1.8em", this.appearance = Tt.Legacy, this.togglePosition = He.Left, this._hasHeaderSlot = !1, this._headerSlotChangeBound = () => this._checkHeaderSlot();
  }
  get id() {
    return this._id;
  }
  set id(e) {
    this._id = e || `section-${++gt}`;
  }
  get sectionCollapsed() {
    return this._sectionCollapsed;
  }
  set sectionCollapsed(e) {
    const t = e != null ? c(e) : !1;
    this._sectionCollapsed !== t && (this._sectionCollapsed = t);
  }
  get sectionCollapsible() {
    return this._sectionCollapsible;
  }
  set sectionCollapsible(e) {
    const t = e != null ? c(e) : !0;
    this._sectionCollapsible !== t && (this._sectionCollapsible = t);
  }
  get headerToggle() {
    return this._headerToggle;
  }
  set headerToggle(e) {
    const t = e != null ? c(e) : !1;
    this._headerToggle !== t && (this._headerToggle = t);
  }
  get _contentId() {
    return `${this.id}-content`;
  }
  firstUpdated() {
    var t, i;
    this._checkHeaderSlot();
    const e = ((i = (t = this.renderRoot) == null ? void 0 : t.querySelector) == null ? void 0 : i.call(t, 'slot[name="header"]')) ?? this._headerSlot;
    e && (this._headerSlotForCleanup = e, e.addEventListener("slotchange", this._headerSlotChangeBound));
  }
  disconnectedCallback() {
    this._headerSlotForCleanup && (this._headerSlotForCleanup.removeEventListener("slotchange", this._headerSlotChangeBound), this._headerSlotForCleanup = void 0), super.disconnectedCallback();
  }
  _checkHeaderSlot() {
    var t, i;
    const e = ((i = (t = this.renderRoot) == null ? void 0 : t.querySelector) == null ? void 0 : i.call(t, 'slot[name="header"]')) ?? this._headerSlot;
    if (e) {
      const o = e.assignedNodes({ flatten: !0 }).some(
        (r) => {
          var a;
          return r.nodeType === Node.ELEMENT_NODE || r.nodeType === Node.TEXT_NODE && (((a = r.textContent) == null ? void 0 : a.trim()) ?? "").length > 0;
        }
      );
      this._hasHeaderSlot !== o && (this._hasHeaderSlot = o);
    }
  }
  _headerIsEmpty() {
    var e;
    return !((e = this.sectionTitle) != null && e.trim()) && !this._hasHeaderSlot;
  }
  _onToggle(e) {
    if (e == null || e.stopPropagation(), !this.sectionCollapsible) return;
    const t = !this.sectionCollapsed;
    this.sectionCollapsed = t, this.dispatchEvent(
      new CustomEvent("toggle", {
        detail: t,
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onHeaderKeydown(e) {
    e.key !== " " && e.key !== "Enter" || !this.headerToggle || !this.sectionCollapsible || (e.preventDefault(), this._onToggle(e));
  }
  _onHeaderClick() {
    this.headerToggle && this.sectionCollapsible && this._onToggle();
  }
  render() {
    var r;
    const e = this.sectionCollapsible, t = e && this.togglePosition !== He.None && this.togglePosition !== "none", i = this.togglePosition === He.Right || this.togglePosition === "right", n = [
      "swim-section__header",
      this.sectionCollapsed ? "swim-section__header--collapsed" : "",
      e ? "swim-section__header--collapsible" : "",
      this.headerToggle ? "swim-section__header--header-toggle" : "",
      i ? "swim-section__header--toggle-right" : ""
    ].filter(Boolean).join(" "), o = this._headerIsEmpty();
    return l`
      <div class="swim-section__inner">
        <header
          class="${n}${o ? " swim-section__header--empty" : ""}"
          role="${this.headerToggle && e && !o ? "button" : "presentation"}"
          tabindex="${this.headerToggle && e && !o ? 0 : -1}"
          aria-expanded="${o ? void 0 : this.sectionCollapsed ? "false" : "true"}"
          aria-controls="${this._contentId}"
          @click="${this._onHeaderClick}"
          @keydown="${this._onHeaderKeydown}"
        >
          ${t && !o ? l`
                <button
                  type="button"
                  class="swim-section__toggle"
                  title="Toggle Content Visibility"
                  aria-controls="${this._contentId}"
                  aria-expanded="${this.sectionCollapsed ? "false" : "true"}"
                  @click="${this._onToggle}"
                  @keydown="${(a) => {
      (a.key === " " || a.key === "Enter") && (a.preventDefault(), this._onToggle(a));
    }}"
                >
                  <swim-icon
                    class="swim-section__toggle-icon"
                    font-icon="${this.sectionCollapsed ? "chevron-bold-right" : "chevron-bold-down"}"
                    aria-hidden="true"
                  ></swim-icon>
                </button>
              ` : d}
          <div class="swim-section__header-content">
            ${(r = this.sectionTitle) != null && r.trim() ? l`<h1 class="swim-section__header-title">${this.sectionTitle}</h1>` : d}
            <slot name="header"></slot>
          </div>
        </header>
        ${this.sectionCollapsed ? d : l`
              <div
                id="${this._contentId}"
                class="swim-section__content"
                style="padding: ${this.padding}"
                role="region"
                aria-labelledby="${o ? "" : void 0}"
              >
                <slot></slot>
              </div>
            `}
      </div>
    `;
  }
};
D.styles = eo;
U([
  s({ type: String, reflect: !0 })
], D.prototype, "id", 1);
U([
  s({
    reflect: !0,
    attribute: "section-collapsed",
    converter: Ot
  })
], D.prototype, "sectionCollapsed", 1);
U([
  s({
    reflect: !0,
    attribute: "section-collapsible",
    converter: oo
  })
], D.prototype, "sectionCollapsible", 1);
U([
  s({
    reflect: !0,
    attribute: "header-toggle",
    converter: Ot
  })
], D.prototype, "headerToggle", 1);
U([
  s({ type: String, reflect: !0, attribute: "section-title" })
], D.prototype, "sectionTitle", 2);
U([
  s({ type: String })
], D.prototype, "padding", 2);
U([
  s({ type: String, reflect: !0 })
], D.prototype, "appearance", 2);
U([
  s({ type: String, reflect: !0, attribute: "toggle-position" })
], D.prototype, "togglePosition", 2);
U([
  u()
], D.prototype, "_hasHeaderSlot", 2);
U([
  T('slot[name="header"]')
], D.prototype, "_headerSlot", 2);
D = U([
  b("swim-section")
], D);
const no = h`
  :host {
    display: contents;
  }
`;
var ro = Object.getOwnPropertyDescriptor, so = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ro(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = a(o) || o);
  return o;
};
let Ze = class extends g {
  render() {
    return l`<slot></slot>`;
  }
};
Ze.styles = no;
Ze = so([
  b("swim-section-header")
], Ze);
const ao = h`
  :host {
    display: block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .swim-radio__label {
    display: flex;
    align-items: center;
    position: relative;
    min-height: 1.5em;
    padding-left: 1.5em;
    margin: 0 0.8rem 0 0;
    cursor: pointer;
    user-select: none;
    outline: none;
  }

  :host([disabled]) .swim-radio__label {
    cursor: not-allowed;
  }

  .swim-radio__label:focus-visible {
    outline: none;
  }

  .swim-radio__label:focus-visible .swim-radio__checkmark {
    outline: 2px solid var(--blue-200);
    outline-offset: 1px;
  }

  .swim-radio__content {
    color: var(--grey-100);
    font-size: var(--font-size-m);
    line-height: var(--font-line-height-200);
  }

  /* Hide native radio visually but keep for semantics/accessibility */
  .swim-radio__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    pointer-events: none;
  }

  .swim-radio__checkmark {
    position: absolute;
    top: 0.25em;
    left: 0;
    height: 1em;
    width: 1em;
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid var(--grey-600);
    opacity: 1;
    transition: background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
    outline: 0 none transparent;
    outline-offset: 1px;
  }

  .swim-radio__checkmark::after {
    content: '';
    position: absolute;
    display: block;
    opacity: 0;
    top: 0;
    left: 0;
    width: 0.25em;
    height: 0.25em;
    /* Center dot in 1em circle: (1em - 0.25em) / 2 = 0.375em */
    transform: translate(0.375em, 0.375em);
    border-radius: 50%;
    background: var(--white);
    box-shadow: var(--shadow-1);
    transition: opacity 0.3s ease;
  }

  /* Hover */
  .swim-radio__label:hover .swim-radio__checkmark {
    background-color: var(--blue-400);
    border-color: var(--blue-400);
    opacity: 0.3;
  }

  .swim-radio__label:hover .swim-radio__checkmark::after {
    opacity: 0;
  }

  /* Checked */
  .swim-radio__label .swim-radio__input:checked ~ .swim-radio__checkmark,
  .swim-radio__checkmark--checked {
    background-color: var(--blue-400);
    border-color: var(--blue-400);
    opacity: 1;
  }

  .swim-radio__label .swim-radio__input:checked ~ .swim-radio__checkmark::after,
  .swim-radio__label:hover .swim-radio__checkmark::after,
  .swim-radio__checkmark--checked::after {
    opacity: 1;
  }

  /* Disabled: no hover effect */
  :host([disabled]) .swim-radio__label:hover .swim-radio__checkmark {
    background-color: transparent;
    border-color: var(--grey-600);
    opacity: 1;
  }

  :host([disabled]) .swim-radio__label:hover .swim-radio__checkmark::after {
    opacity: 0;
  }

  :host([disabled]) .swim-radio__label .swim-radio__input:checked ~ .swim-radio__checkmark::after,
  :host([disabled]) .swim-radio__checkmark--checked::after {
    opacity: 1;
  }
`, lo = h`
  :host {
    display: block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .swim-radio-group__slot {
    display: block;
    outline: none;
  }

  .swim-radio-group__slot:focus {
    outline: none;
  }
`;
var co = Object.defineProperty, ho = Object.getOwnPropertyDescriptor, W = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ho(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && co(t, i, o), o;
};
let po = 0, H = class extends g {
  constructor() {
    super(...arguments), this.id = `swim-radio-${++po}`, this.name = "", this.radioId = "", this._tabindex = 0, this._checked = !1, this.value = "", this._disabled = !1, this.groupDisabled = !1, this.isInGroup = !1;
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = x(e, 0);
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = c(e);
    this._checked !== t && (this._checked = t);
  }
  get disabled() {
    return this._disabled || this.groupDisabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  get _effectiveTabindex() {
    return this.disabled || this.isInGroup ? -1 : this._tabindex;
  }
  get _inputId() {
    return this.radioId || `${this.id}-radio`;
  }
  focus(e) {
    var t;
    (t = this._roving) == null || t.focus(e);
  }
  _onClick(e) {
    e.preventDefault(), !this.disabled && this._select();
  }
  _onKeydown(e) {
    e.key !== " " || this.disabled || (e.stopPropagation(), e.preventDefault(), this._select());
  }
  /** Select this radio. In a group only "select" (set checked); standalone can toggle. */
  _select() {
    if (this.isInGroup) {
      if (this._checked) return;
      this.checked = !0;
    } else
      this.checked = !this._checked;
    this._checked && this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.value,
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onInputChange(e) {
    this.checked = !0, this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.value,
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onFocus(e) {
    this.dispatchEvent(new FocusEvent("focus", { ...e, bubbles: !0, composed: !0 }));
  }
  _onBlur(e) {
    this.dispatchEvent(new FocusEvent("blur", { ...e, bubbles: !0, composed: !0 }));
  }
  render() {
    const e = `${this.id}-content`;
    return l`
      <label
        class="swim-radio__label swim-radio__roving"
        for="${this._inputId}"
        tabindex="${this._effectiveTabindex}"
        role="radio"
        aria-checked="${this._checked}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        aria-labelledby="${e}"
        @click="${this._onClick}"
        @keydown="${this._onKeydown}"
        @focus="${this._onFocus}"
        @blur="${this._onBlur}"
      >
        <input
          type="radio"
          class="swim-radio__input"
          id="${this._inputId}"
          tabindex="-1"
          .checked="${this._checked}"
          ?disabled="${this.disabled}"
          name="${this.name || this.id}"
          aria-checked="${this._checked}"
          @change="${this._onInputChange}"
          @focus="${this._onFocus}"
          @blur="${this._onBlur}"
        />
        <span
          part="checkmark"
          class="swim-radio__checkmark ${this._checked ? "swim-radio__checkmark--checked" : ""}"
        ></span>
        <div part="content" class="swim-radio__content" id="${e}">
          <slot></slot>
        </div>
      </label>
    `;
  }
};
H.styles = [m, ao];
W([
  T(".swim-radio__roving")
], H.prototype, "_roving", 2);
W([
  s({ type: String })
], H.prototype, "id", 2);
W([
  s({ type: String })
], H.prototype, "name", 2);
W([
  s({ type: String, attribute: "radio-id" })
], H.prototype, "radioId", 2);
W([
  s({ type: Number })
], H.prototype, "tabindex", 1);
W([
  s({ type: Boolean, reflect: !0 })
], H.prototype, "checked", 1);
W([
  s({ type: String })
], H.prototype, "value", 2);
W([
  s({ type: Boolean, reflect: !0 })
], H.prototype, "disabled", 1);
W([
  s({ type: Boolean, attribute: !1 })
], H.prototype, "groupDisabled", 2);
W([
  s({ type: Boolean, attribute: !1 })
], H.prototype, "isInGroup", 2);
H = W([
  b("swim-radio")
], H);
var uo = Object.defineProperty, go = Object.getOwnPropertyDescriptor, ae = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? go(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && uo(t, i, o), o;
};
let bo = 0;
function mo(e, t) {
  return (e % t + t) % t;
}
let V = class extends g {
  constructor() {
    super(), this.id = `swim-radio-group-${++bo}`, this._disabled = !1, this._value = "", this.name = "", this._focusIndex = -1, this._tabindex = 0, this._radios = [], this._changeHandler = (e) => this._onRadioChange(e), this._slotChangeBound = () => this._syncRadios(), this._onGroupFocus = (e) => {
      if (e.target !== this._slotWrapper) return;
      const t = this._radios.find((i) => i.checked);
      t ? (this._focusIndex = this._radios.indexOf(t), this._focusOn(this._focusIndex)) : this._focusFirst();
    }, this._onGroupBlur = () => {
      this.dispatchEvent(new FocusEvent("blur", { bubbles: !0, composed: !0 }));
    }, this._internals = this.attachInternals();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e), this._updateRadioDisabledState();
  }
  get value() {
    return this._value;
  }
  set value(e) {
    var t;
    this._value !== e && (this._value = e, this._updateSelectedFromValue(), (t = this._internals) == null || t.setFormValue(String(this._value)));
  }
  get focusIndex() {
    return this._focusIndex;
  }
  set focusIndex(e) {
    this._focusIndex = x(e, -1), this._focusOn(this._focusIndex);
  }
  get tabindex() {
    return this.disabled ? -1 : this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = x(e, 0);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("change", this._changeHandler), this.addEventListener("focus", this._onGroupFocus), this.addEventListener("blur", this._onGroupBlur);
  }
  disconnectedCallback() {
    var e;
    (e = this._slot) == null || e.removeEventListener("slotchange", this._slotChangeBound), this.removeEventListener("change", this._changeHandler), this.removeEventListener("focus", this._onGroupFocus), this.removeEventListener("blur", this._onGroupBlur), super.disconnectedCallback();
  }
  firstUpdated() {
    var e;
    (e = this._slot) == null || e.addEventListener("slotchange", this._slotChangeBound), this._syncRadios();
  }
  updated(e) {
    super.updated(e), (e.has("value") || e.has("name") || e.has("disabled")) && (this._updateSelectedFromValue(), this._updateRadioDisabledState(), this._updateRadioNames());
  }
  _syncRadios() {
    var i;
    const e = this._slot, t = ((i = e == null ? void 0 : e.assignedElements) == null ? void 0 : i.call(e)) ?? [];
    this._radios = t.filter(
      (n) => {
        var o;
        return n instanceof HTMLElement && ((o = n.tagName) == null ? void 0 : o.toLowerCase()) === "swim-radio";
      }
    ), this._updateRadioNames(), this._updateRadioDisabledState(), this._updateSelectedFromValue();
  }
  _updateRadioNames() {
    const e = this.name || this.id;
    this._radios.forEach((t) => {
      t.name = e, t.isInGroup = !0;
    });
  }
  _updateRadioDisabledState() {
    this._radios.forEach((e) => {
      e.groupDisabled = this._disabled;
    });
  }
  _updateSelectedFromValue() {
    this._radios.forEach((e) => {
      e.checked = this._value === e.value;
    });
  }
  _onRadioChange(e) {
    var n;
    const t = e.target;
    if (!t || ((n = t.tagName) == null ? void 0 : n.toLowerCase()) !== "swim-radio") return;
    const i = e.detail;
    this._value !== i && (this._value = i, this._updateSelectedFromValue(), this._internals.setFormValue(String(this._value)), this.dispatchEvent(
      new CustomEvent("change", {
        detail: this._value,
        bubbles: !0,
        composed: !0
      })
    ));
  }
  _focusFirst() {
    if (!(this.disabled || !this._radios.length)) {
      for (let e = 0; e < this._radios.length; e++)
        if (!this._radios[e].disabled) {
          this._focusIndex = e, this._focusOn(e);
          return;
        }
    }
  }
  _focusOn(e) {
    this.disabled || e < 0 || e >= this._radios.length || this._radios[e].focus();
  }
  _selectIndex(e) {
    if (this.disabled || e < 0 || e >= this._radios.length) return;
    const t = this._radios[e];
    t.disabled || (this.value = t.value);
  }
  _focusIn(e) {
    if (this.disabled || !this._radios.length) return;
    const t = this._radios.length;
    for (let i = 1; i <= t; i++) {
      const n = mo(this._focusIndex + e * i, t);
      if (!this._radios[n].disabled) {
        this._focusIndex = n, this._focusOn(n);
        return;
      }
    }
  }
  _onKeydown(e) {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault(), e.stopPropagation(), this._focusIn(-1), this._selectIndex(this._focusIndex);
        break;
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault(), e.stopPropagation(), this._focusIn(1), this._selectIndex(this._focusIndex);
        break;
    }
  }
  render() {
    return l`
      <div
        class="swim-radio-group__slot"
        role="radiogroup"
        tabindex="${this.tabindex}"
        aria-disabled="${this.disabled ? "true" : "false"}"
        @keydown="${this._onKeydown}"
      >
        <slot></slot>
      </div>
    `;
  }
};
V.styles = [m, lo];
V.formAssociated = !0;
ae([
  T("slot")
], V.prototype, "_slot", 2);
ae([
  T(".swim-radio-group__slot")
], V.prototype, "_slotWrapper", 2);
ae([
  s({ type: String })
], V.prototype, "id", 2);
ae([
  s({ type: Boolean, reflect: !0 })
], V.prototype, "disabled", 1);
ae([
  s({ type: String })
], V.prototype, "value", 1);
ae([
  s({ type: String })
], V.prototype, "name", 2);
ae([
  s({ type: Number })
], V.prototype, "focusIndex", 1);
ae([
  s({ type: Number })
], V.prototype, "tabindex", 1);
V = ae([
  b("swim-radio-group")
], V);
const fo = h`
  :host {
    display: block;
    max-width: 100%;
    margin-top: var(--spacing-16);
    margin-bottom: var(--spacing-8);
    line-height: calc(1em + 0.75em);
    padding-top: calc(0.75rem + 8px);
    padding-bottom: 0;
    position: relative;
    min-width: 300px;
  }

  :host([marginless]) {
    margin-top: 0;
    margin-bottom: 0;
  }

  :host([no-label]) {
    padding-top: 0;
  }

  :host([size='md']) .select-input {
    font-size: var(--font-size-l) !important;
  }

  :host([size='lg']) .select-input {
    font-size: var(--font-size-xl) !important;
  }

  :host([focused]:not([invalid])) .select-label {
    color: var(--blue-500) !important;
  }

  :host([invalid][touched]) .select-underline {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]) .underline-fill {
    background-color: var(--red-500) !important;
  }

  :host([invalid][touched]) .select-label,
  :host([invalid][touched]) .select-hint {
    color: var(--red-500);
  }

  .select-wrap {
    position: relative;
    display: block;
    margin-bottom: 0;
    width: 100%;
  }

  .select-flex-wrap {
    display: flex;
    flex-direction: row;
  }

  .select-flex-wrap-inner {
    display: flex;
    flex: 100%;
    width: 100%;
    position: relative;
  }

  .select-input-wrap {
    width: 100%;
    position: relative;
  }

  .select-input {
    align-items: center;
    position: relative;
    background: transparent;
    outline: none;
    margin-bottom: 0;
    padding-left: 0;
    width: 100%;
    min-height: var(--input-height, 33px);
    min-width: 60px;
    cursor: pointer;
    display: flex;
    border: none;
    color: var(--grey-050);
    font-size: var(--font-size-m);
    font-family: inherit;
  }

  .select-input:focus {
    outline: none;
  }

  .select-input[disabled] {
    cursor: not-allowed;
    color: var(--grey-400);
  }

  .select-value {
    flex: 1;
    padding: 3px 0;
    min-height: 1.4em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .select-placeholder {
    color: var(--grey-350);
  }

  .select-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    padding-right: var(--spacing-4);
    color: var(--grey-350);
  }

  .select-clear,
  .select-caret {
    background: none;
    border: none;
    padding: var(--spacing-2);
    cursor: pointer;
    color: inherit;
    font-size: var(--font-size-xxs);
    display: flex;
    align-items: center;
    transition: color 100ms;
  }

  .select-clear:hover,
  .select-caret:hover {
    color: var(--blue-400);
  }

  .select-caret {
    transition: transform 200ms ease-in-out;
    transform: rotate(0deg);
  }

  :host([open]) .select-caret {
    transform: rotate(180deg);
  }

  .select-label {
    position: absolute;
    top: 0.5em;
    line-height: var(--font-line-height-100);
    pointer-events: none;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-semibold);
    color: var(--grey-350);
    white-space: nowrap;
    overflow-x: clip;
    max-width: 100%;
    text-overflow: ellipsis;
    transition: color 0.2s ease-out, font-size 150ms ease-out, top 150ms ease-out;
  }

  :host([active]) .select-label,
  :host([has-placeholder]) .select-label {
    font-size: 0.75rem;
    top: -1.4em;
  }

  .select-underline {
    width: 100%;
    height: 1px;
    background-color: var(--grey-600);
  }

  .underline-fill {
    background-color: var(--blue-500);
    transition: width 250ms ease-out;
    width: 0;
    height: 2px;
    margin: 0 auto;
  }

  :host([focused]) .underline-fill,
  :host([open]) .underline-fill {
    width: 100%;
  }

  .select-hint {
    font-size: var(--font-size-xs);
    color: var(--grey-350);
    margin-top: var(--spacing-8);
    min-height: 1em;
    line-height: 14px;
    transition: color 0.2s ease-in-out;
  }

  .select-hint.hidden {
    display: none;
  }

  /* Dropdown */
  .select-dropdown {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1000;
    background: var(--grey-700);
    border: 1px solid transparent;
    border-radius: var(--radius-4);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: var(--spacing-8);
    max-height: 300px;
    overflow-y: auto;
    display: none;
  }

  :host([open]) .select-dropdown {
    display: block;
    animation: slideDown 0.25s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .select-filter {
    padding: var(--spacing-10);
    background: var(--grey-600);
    position: sticky;
    top: 0;
    z-index: 1;
    border-top-left-radius: var(--radius-4);
    border-top-right-radius: var(--radius-4);
  }

  .select-filter-input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: var(--grey-050);
    font-size: var(--font-size-m);
    font-family: inherit;
    padding: var(--spacing-4);
  }

  .select-filter-input::placeholder {
    color: var(--grey-350);
  }

  .select-options {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .select-option {
    padding: 7px 15px;
    font-size: var(--font-size-m);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--grey-050);
    transition: background-color 100ms;
  }

  .select-option:not(:last-child) {
    border-bottom: 1px solid var(--grey-650);
  }

  .select-option:hover:not([disabled]) {
    background: var(--grey-750);
  }

  .select-option[selected] {
    background: var(--blue-600);
    color: var(--white);
  }

  .select-option[disabled] {
    color: var(--grey-450);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .select-option[focused]:not([disabled]) {
    background: var(--grey-725);
  }

  .select-empty {
    padding: 7px 15px;
    font-size: var(--font-size-m);
    color: var(--grey-300);
    font-style: italic;
  }

  /* Multiple selection */
  :host([multiple]) .select-value {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
  }

  .select-chip {
    background: var(--grey-600);
    color: var(--white);
    border-radius: var(--radius-2);
    padding: 0 0.5em;
    font-size: var(--font-size-m);
    line-height: 1.4em;
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-4);
    white-space: nowrap;
    max-width: 200px;
  }

  .select-chip-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .select-chip-remove {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--grey-350);
    font-size: 0.5em;
    line-height: 1;
    transition: color 100ms;
  }

  .select-chip-remove:hover {
    color: var(--white);
  }

  /* Fill appearance */
  :host([appearance='fill']) .select-flex-wrap {
    position: relative;
  }

  :host([appearance='fill']) .select-flex-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--grey-875);
    mix-blend-mode: exclusion;
    pointer-events: none;
    border-top-left-radius: var(--radius-4);
    border-top-right-radius: var(--radius-4);
  }

  :host([appearance='fill']) .select-input {
    padding: var(--spacing-4) 10px;
    position: relative;
    z-index: 1;
  }

  :host([appearance='fill']) .select-label {
    left: 0;
  }

  /* swim-icon in clear and caret buttons */
  .select-clear swim-icon,
  .select-caret swim-icon {
    display: block;
    font-size: inherit;
  }
`;
var _o = Object.defineProperty, vo = Object.getOwnPropertyDescriptor, v = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? vo(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && _o(t, i, o), o;
};
let f = class extends g {
  constructor() {
    super(), this.label = "", this.placeholder = "Select...", this.hint = "", this.emptyPlaceholder = "No options available", this.filterPlaceholder = "Filter options...", this.options = [], this._value = [], this.name = "", this.id = `swim-select-${Math.random().toString(36).substr(2, 9)}`, this._disabled = !1, this._required = !1, this.appearance = tt.legacy, this.size = it.sm, this._withMargin = !0, this._withHint = !0, this._filterable = !0, this._multiple = !1, this._allowClear = !0, this.requiredIndicator = "*", this._open = !1, this._focused = !1, this._touched = !1, this._invalid = !1, this._filterQuery = "", this._focusedIndex = -1, this._internals = this.attachInternals();
  }
  get value() {
    return this.multiple ? this._value : this._value[0] ?? null;
  }
  set value(e) {
    const t = this._value;
    this.multiple ? this._value = Array.isArray(e) ? e : e ? [e] : [] : this._value = e ? [e] : [], this._internals.setFormValue(this.multiple ? JSON.stringify(this._value) : this._value[0] ?? ""), this.requestUpdate("value", t), this._updateActiveState();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    this._required = c(e);
  }
  get marginless() {
    return !this._withMargin;
  }
  set marginless(e) {
    this._withMargin = !c(e);
  }
  get withHint() {
    return this._withHint;
  }
  set withHint(e) {
    this._withHint = c(e);
  }
  get filterable() {
    return this._filterable;
  }
  set filterable(e) {
    this._filterable = c(e);
  }
  get multiple() {
    return this._multiple;
  }
  set multiple(e) {
    this._multiple = c(e);
  }
  get allowClear() {
    return this._allowClear;
  }
  set allowClear(e) {
    this._allowClear = c(e);
  }
  connectedCallback() {
    super.connectedCallback(), this._updateActiveState();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._removeClickOutsideListener();
  }
  updated(e) {
    super.updated(e), e.has("value") && (this._updateActiveState(), this._validate()), e.has("_open") && (this._open ? (this.setAttribute("open", ""), this._addClickOutsideListener(), setTimeout(() => {
      this.filterable && this.filterInput && this.filterInput.focus();
    }, 100)) : (this.removeAttribute("open"), this._removeClickOutsideListener(), this._filterQuery = "", this._focusedIndex = -1));
  }
  render() {
    const e = this._value.length > 0, t = this._getFilteredOptions(), i = this.allowClear && e && !this.disabled;
    return l`
      <div class="select-wrap">
        <div class="select-flex-wrap">
          <div class="select-flex-wrap-inner">
            <div class="select-input-wrap">
              <div
                class="select-input"
                part="select"
                role="combobox"
                aria-expanded="${this._open}"
                aria-haspopup="listbox"
                aria-controls="${this.id}-listbox"
                tabindex="${this.disabled ? -1 : 0}"
                @click="${this._handleInputClick}"
                @keydown="${this._handleKeyDown}"
                @focus="${this._handleFocus}"
                @blur="${this._handleBlur}"
              >
                <div class="select-value">${this._renderValue()}</div>
                <div class="select-controls">
                  ${i ? l`
                        <button
                          type="button"
                          class="select-clear"
                          aria-label="Clear selection"
                          @click="${this._handleClear}"
                        >
                          <swim-icon font-icon="x"></swim-icon>
                        </button>
                      ` : d}
                  <button
                    type="button"
                    class="select-caret"
                    aria-label="Toggle dropdown"
                    @click="${this._handleToggle}"
                  >
                    <swim-icon font-icon="chevron-bold-down"></swim-icon>
                  </button>
                </div>
              </div>
              <label class="select-label" for="${this.id}">
                ${this.label} ${this.required ? l`<span>${this.requiredIndicator}</span>` : d}
              </label>
            </div>
          </div>
        </div>
        <div class="select-underline">
          <div class="underline-fill"></div>
        </div>
        <div class="select-hint ${this.withHint ? "" : "hidden"}">
          <slot name="hint">${this.hint}</slot>
        </div>

        ${this._open ? l`
              <div class="select-dropdown" part="dropdown" role="listbox" id="${this.id}-listbox">
                ${this.filterable ? l`
                      <div class="select-filter">
                        <input
                          type="text"
                          class="select-filter-input"
                          placeholder="${this.filterPlaceholder}"
                          .value="${this._filterQuery}"
                          @input="${this._handleFilterInput}"
                          @keydown="${this._handleFilterKeyDown}"
                        />
                      </div>
                    ` : d}
                ${t.length > 0 ? l`
                      <ul class="select-options">
                        ${Mt(
      t,
      (n) => this._getOptionValue(n),
      (n, o) => this._renderOption(n, o)
    )}
                      </ul>
                    ` : l` <div class="select-empty">${this.emptyPlaceholder}</div> `}
              </div>
            ` : d}
      </div>
    `;
  }
  _renderValue() {
    if (this._value.length === 0)
      return l`<span class="select-placeholder">${this.placeholder}</span>`;
    if (this.multiple)
      return l`
        ${this._value.map((e) => {
        const t = this.options.find((i) => this._getOptionValue(i) === e);
        return this._renderChip(t || { name: e, value: e });
      })}
      `;
    {
      const e = this.options.find((t) => this._getOptionValue(t) === this._value[0]);
      return l`${(e == null ? void 0 : e.name) || this._value[0]}`;
    }
  }
  _renderChip(e) {
    return l`
      <div class="select-chip">
        <span class="select-chip-label">${e.name}</span>
        ${this.disabled ? d : l`
              <button
                type="button"
                class="select-chip-remove"
                aria-label="Remove ${e.name}"
                @click="${(t) => this._removeChip(t, e)}"
              >
                <span class="icon-x"></span>
              </button>
            `}
      </div>
    `;
  }
  _renderOption(e, t) {
    const i = this._getOptionValue(e), n = this._isSelected(i), o = t === this._focusedIndex;
    return l`
      <li
        class="select-option"
        role="option"
        ?selected="${n}"
        ?focused="${o}"
        ?disabled="${e.disabled}"
        aria-selected="${n}"
        @click="${() => this._handleOptionClick(e)}"
        @mouseenter="${() => this._focusedIndex = t}"
      >
        ${e.name}
      </li>
    `;
  }
  _handleInputClick(e) {
    this.disabled || this._toggleDropdown();
  }
  _handleToggle(e) {
    e.stopPropagation(), this.disabled || this._toggleDropdown();
  }
  _handleClear(e) {
    e.stopPropagation(), this.value = this.multiple ? [] : null, this._dispatchChange(), this._validate();
  }
  _handleFocus() {
    this._focused = !0, this.setAttribute("focused", "");
  }
  _handleBlur() {
    this._focused = !1, this.removeAttribute("focused"), this._touched || (this._touched = !0, this.setAttribute("touched", "")), this._validate();
  }
  _handleKeyDown(e) {
    switch (e.key) {
      case "Enter":
      case " ":
        this._open || (e.preventDefault(), this._toggleDropdown());
        break;
      case "Escape":
        this._open && (e.preventDefault(), this._closeDropdown());
        break;
      case "ArrowDown":
        e.preventDefault(), this._open ? this._moveFocus(1) : this._openDropdown();
        break;
      case "ArrowUp":
        e.preventDefault(), this._open && this._moveFocus(-1);
        break;
    }
  }
  _handleFilterInput(e) {
    const t = e.target;
    this._filterQuery = t.value, this._focusedIndex = 0;
  }
  _handleFilterKeyDown(e) {
    var t;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(), this._moveFocus(1);
        break;
      case "ArrowUp":
        e.preventDefault(), this._moveFocus(-1);
        break;
      case "Enter":
        e.preventDefault();
        const i = this._getFilteredOptions();
        i[this._focusedIndex] && this._handleOptionClick(i[this._focusedIndex]);
        break;
      case "Escape":
        e.preventDefault(), this._closeDropdown(), (t = this.selectInput) == null || t.focus();
        break;
    }
  }
  _handleOptionClick(e) {
    if (e.disabled) return;
    const t = this._getOptionValue(e);
    if (this.multiple) {
      const i = [...this._value], n = i.indexOf(t);
      n > -1 ? i.splice(n, 1) : i.push(t), this.value = i;
    } else
      this.value = t, this._closeDropdown();
    this._dispatchChange(), this._validate();
  }
  _removeChip(e, t) {
    e.stopPropagation();
    const i = this._getOptionValue(t), n = this._value.filter((o) => o !== i);
    this.value = n, this._dispatchChange(), this._validate();
  }
  _toggleDropdown() {
    this._open ? this._closeDropdown() : this._openDropdown();
  }
  _openDropdown() {
    this.disabled || (this._open = !0, this._focusedIndex = 0, this.dispatchEvent(new Event("open", { bubbles: !0, composed: !0 })));
  }
  _closeDropdown() {
    this._open = !1, this.dispatchEvent(new Event("close", { bubbles: !0, composed: !0 }));
  }
  _moveFocus(e) {
    const i = this._getFilteredOptions().length - 1;
    let n = this._focusedIndex + e;
    n < 0 ? n = i : n > i && (n = 0), this._focusedIndex = n;
  }
  _getFilteredOptions() {
    if (!this._filterQuery)
      return this.options;
    const e = this._filterQuery.toLowerCase();
    return this.options.filter((t) => t.name.toLowerCase().includes(e));
  }
  _getOptionValue(e) {
    return e.value !== void 0 ? e.value : e.name;
  }
  _isSelected(e) {
    return this._value.includes(e);
  }
  _dispatchChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _validate() {
    let e = !0;
    return this.required && this._value.length === 0 && (e = !1), this._invalid = !e, this._invalid ? (this.setAttribute("invalid", ""), this._internals.setValidity({ valueMissing: !0 }, "Please select an option")) : (this.removeAttribute("invalid"), this._internals.setValidity({})), e;
  }
  _updateActiveState() {
    const e = this._value.length > 0, t = !!this.placeholder;
    this._focused || e || this._open ? this.setAttribute("active", "") : this.removeAttribute("active"), t ? this.setAttribute("has-placeholder", "") : this.removeAttribute("has-placeholder"), this.label ? this.removeAttribute("no-label") : this.setAttribute("no-label", "");
  }
  _addClickOutsideListener() {
    this._clickOutsideListener = (e) => {
      this.contains(e.target) || this._closeDropdown();
    }, setTimeout(() => {
      document.addEventListener("click", this._clickOutsideListener);
    }, 0);
  }
  _removeClickOutsideListener() {
    this._clickOutsideListener && (document.removeEventListener("click", this._clickOutsideListener), this._clickOutsideListener = void 0);
  }
  // Form API
  formResetCallback() {
    this.value = this.multiple ? [] : null, this._touched = !1, this.removeAttribute("touched");
  }
  formDisabledCallback(e) {
    this.disabled = e;
  }
};
f.styles = [m, fo];
f.formAssociated = !0;
v([
  T(".select-input")
], f.prototype, "selectInput", 2);
v([
  T(".select-filter-input")
], f.prototype, "filterInput", 2);
v([
  s({ type: String })
], f.prototype, "label", 2);
v([
  s({ type: String })
], f.prototype, "placeholder", 2);
v([
  s({ type: String })
], f.prototype, "hint", 2);
v([
  s({ type: String, attribute: "empty-placeholder" })
], f.prototype, "emptyPlaceholder", 2);
v([
  s({ type: String, attribute: "filter-placeholder" })
], f.prototype, "filterPlaceholder", 2);
v([
  s({ type: Array })
], f.prototype, "options", 2);
v([
  s()
], f.prototype, "value", 1);
v([
  s({ type: String })
], f.prototype, "name", 2);
v([
  s({ type: String })
], f.prototype, "id", 2);
v([
  s({ type: Boolean, reflect: !0 })
], f.prototype, "disabled", 1);
v([
  s({ type: Boolean, reflect: !0 })
], f.prototype, "required", 1);
v([
  s({ type: String, reflect: !0 })
], f.prototype, "appearance", 2);
v([
  s({ type: String, reflect: !0 })
], f.prototype, "size", 2);
v([
  s({ type: Boolean, reflect: !0, attribute: "marginless" })
], f.prototype, "marginless", 1);
v([
  s({ type: Boolean })
], f.prototype, "withHint", 1);
v([
  s({ type: Boolean })
], f.prototype, "filterable", 1);
v([
  s({ type: Boolean, reflect: !0 })
], f.prototype, "multiple", 1);
v([
  s({ type: Boolean, attribute: "allow-clear" })
], f.prototype, "allowClear", 1);
v([
  s({ type: String, attribute: "required-indicator" })
], f.prototype, "requiredIndicator", 2);
v([
  u()
], f.prototype, "_open", 2);
v([
  u()
], f.prototype, "_focused", 2);
v([
  u()
], f.prototype, "_touched", 2);
v([
  u()
], f.prototype, "_invalid", 2);
v([
  u()
], f.prototype, "_filterQuery", 2);
v([
  u()
], f.prototype, "_focusedIndex", 2);
f = v([
  b("swim-select")
], f);
const xo = 2, wo = 4, yo = 16, ko = h`
  :host {
    --slider-track-height: ${xo}px;
    --slider-fill-height: ${wo}px;
    --slider-thumb-size: ${yo}px;
    display: inline-block;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.6;
  }

  .swim-slider__inner {
    margin: 1em auto;
    position: relative;
    display: inline-block;
  }

  .swim-slider__inputs {
    position: relative;
    min-width: 12.5em;
    height: var(--slider-thumb-size);
  }

  .swim-slider__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    appearance: none;
    background-color: transparent;
    margin: 0;
    cursor: pointer;
  }

  .swim-slider__input:focus {
    outline: none;
  }

  .swim-slider__input:focus-visible {
    outline: 2px solid var(--blue-200);
    outline-offset: 2px;
  }

  .swim-slider__input::-webkit-slider-runnable-track {
    cursor: pointer;
    color: transparent;
    background: transparent;
    border-color: transparent;
    appearance: none;
  }

  .swim-slider__input::-moz-range-track {
    cursor: pointer;
    color: transparent;
    background: transparent;
    border-color: transparent;
    appearance: none;
  }

  .swim-slider__input::-ms-track {
    cursor: pointer;
    color: transparent;
    background: transparent;
    border-color: transparent;
    appearance: none;
  }

  .swim-slider__input::-webkit-slider-thumb {
    border: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    appearance: none;
    position: relative;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 301;
    color: transparent;
  }

  .swim-slider__input::-moz-range-thumb {
    border: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    appearance: none;
    position: relative;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 302;
    transform: scale(1);
  }

  .swim-slider__input::-ms-thumb {
    border: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    appearance: none;
    position: relative;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    z-index: 302;
    transform: scale(1);
  }

  .swim-slider__track {
    position: absolute;
    background-color: var(--blue-400);
    width: 100%;
    height: var(--slider-track-height);
    top: calc(var(--slider-thumb-size) * 0.5 - var(--slider-track-height) * 0.5);
    pointer-events: none;
    opacity: 0.3;
  }

  .swim-slider__thumb {
    position: absolute;
    background-color: var(--blue-400);
    height: var(--slider-thumb-size);
    width: var(--slider-thumb-size);
    border-radius: calc(var(--slider-thumb-size) * 0.5);
    pointer-events: none;
    z-index: 100;
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--blue-400) 30%, transparent);
    transition: box-shadow 0.3s ease-in-out;
    top: 0;
  }

  .swim-slider__thumb--active {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--blue-400) 30%, transparent);
  }

  .swim-slider__ticks {
    position: absolute;
    display: block;
    top: 0;
    width: 100%;
    height: 3px;
    opacity: 0.3;
  }

  .swim-slider__tick {
    position: absolute;
    border: none;
    height: 100%;
    width: 2px;
    background-color: var(--blue-400);
  }

  .swim-slider--filled .swim-slider__fill {
    background-repeat: no-repeat;
    background-image: linear-gradient(var(--blue-400), var(--blue-400));
    position: absolute;
    border-radius: 0;
    z-index: 99;
    pointer-events: none;
    height: var(--slider-fill-height);
    left: 0;
    top: calc(50% - var(--slider-fill-height) * 0.5);
    width: 100%;
  }

  .swim-slider--vertical {
    display: inline-block;
    height: initial;
    min-height: 12.5em;
    width: var(--slider-thumb-size);
  }

  .swim-slider--vertical .swim-slider__inner {
    transform: translate(0%, -100%) rotate(-90deg) translate(-100%, 0);
    transform-origin: top left;
  }
`;
var $o = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, I = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Co(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && $o(t, i, o), o;
};
let So = 0, C = class extends g {
  constructor() {
    super(), this.id = `swim-slider-${++So}`, this._min = 0, this._max = 100, this._step = 1, this.orientation = "horizontal", this._filled = !1, this._multiple = !1, this._disabled = !1, this._showTicks = !1, this.ariaLabel = "", this._values = [0], this._active = [], this._internals = this.attachInternals();
  }
  get min() {
    return this._min;
  }
  set min(e) {
    this._min = x(e, 0);
  }
  get max() {
    return this._max;
  }
  set max(e) {
    this._max = x(e, 100);
  }
  get step() {
    return this._step;
  }
  set step(e) {
    this._step = x(e, 1);
  }
  get filled() {
    return this._filled;
  }
  set filled(e) {
    this._filled = c(e);
  }
  get multiple() {
    return this._multiple;
  }
  set multiple(e) {
    this._multiple = c(e);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  get showTicks() {
    return this._showTicks;
  }
  set showTicks(e) {
    this._showTicks = c(e);
  }
  get tickStep() {
    return this._tickStep ?? this._step;
  }
  set tickStep(e) {
    this._tickStep = e != null ? x(e, this._step) : void 0;
  }
  get value() {
    return this._values.length ? this.multiple ? [...this._values].sort((e, t) => e - t).join(",") : String(this._values[0]) : String(this._min);
  }
  set value(e) {
    const t = e != null ? String(e) : "", n = (t ? t.split(",").map((r) => x(r.trim(), this._min)) : [this._min]).map((r) => Math.max(this._min, Math.min(this._max, r)));
    let o;
    this.multiple ? o = n.length >= 2 ? n : n.length === 1 ? [n[0], this._max] : [this._min, this._max] : o = n.slice(0, 1), (o.length !== this._values.length || o.some((r, a) => r !== this._values[a])) && (this._values = o, this._syncFormValue());
  }
  connectedCallback() {
    super.connectedCallback(), (this._values.length === 0 || this._values.length === 1 && this._values[0] === 0 && this._min !== 0) && (this._values = this.multiple ? [this._min, this._max] : [this._min], this._syncFormValue());
  }
  updated(e) {
    super.updated(e), (e.has("value") || e.has("min") || e.has("max")) && this._syncFormValue();
  }
  _syncFormValue() {
    this._internals.setFormValue(this.value);
  }
  get _percents() {
    const e = this._max - this._min || 1;
    return this._values.map((t) => Math.round(100 * (Math.max(this._min, Math.min(this._max, t)) - this._min) / e));
  }
  get _thumbs() {
    return this._percents.map((e) => ({
      left: `calc(${e}% - ${e / 100}em)`
    }));
  }
  get _fill() {
    if (!this.filled) return null;
    const e = this._percents, t = this.multiple ? Math.min(...e) : 0, n = (this.multiple ? Math.max(...e) : e[0]) - t;
    return {
      left: `${t}%`,
      width: `${n}%`
    };
  }
  get _tickStepValue() {
    return this._tickStep ?? this._step;
  }
  get _ticks() {
    if (!this.showTicks) return [];
    const e = this._tickStepValue, t = [];
    let i = this._min;
    for (; i <= this._max; )
      t.push(i), i += e;
    const n = this._max - this._min || 1;
    return t.map((o) => {
      const r = 100 * (o - this._min) / n;
      return { left: `calc(${r}% - ${r / 100 - 0.5}em)` };
    });
  }
  _setValue(e, t) {
    const i = x(e, this._min), n = Math.max(this._min, Math.min(this._max, i));
    if (this._values[t] !== n) {
      const o = [...this._values];
      o[t] = n, this._values = o, this._syncFormValue(), this._emitChange();
    }
  }
  _onInput(e) {
    this._emitChange();
  }
  _onChange(e) {
    this._emitChange();
  }
  _emitChange() {
    const e = this.value, t = this.multiple ? this._percents.join(",") : String(this._percents[0]);
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.multiple ? e : Number(e), percent: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _setActive(e, t) {
    const i = [...this._active];
    i[e] = t, this._active = i;
  }
  _ensureValuesLength() {
    this.multiple && this._values.length < 2 ? this._values = [this._min, this._max] : !this.multiple && this._values.length > 1 && (this._values = [this._values[0]]);
  }
  willUpdate(e) {
    this._ensureValuesLength();
  }
  firstUpdated() {
    this._ensureValuesLength();
  }
  _onRangeInput(e, t) {
    const i = e.target.value;
    this._setValue(Number(i), t);
  }
  render() {
    const e = this.orientation === "vertical";
    return l`
      <div
        class="swim-slider ${e ? "swim-slider--vertical" : ""} ${this.filled ? "swim-slider--filled" : ""} ${this.multiple ? "swim-slider--multiple" : ""}"
        role="group"
        aria-label="${this.ariaLabel || void 0}"
      >
        <div class="swim-slider__inner">
          ${this.showTicks ? l`
                <div class="swim-slider__ticks" aria-hidden="true">
                  ${this._ticks.map((t) => l`<div class="swim-slider__tick" style="left: ${t.left}"></div>`)}
                </div>
              ` : ""}
          <div class="swim-slider__inputs">
            <div class="swim-slider__track" part="track" aria-hidden="true"></div>
            ${this._fill ? l`
                  <span
                    class="swim-slider__fill"
                    part="fill"
                    style="left: ${this._fill.left}; width: ${this._fill.width}"
                    aria-hidden="true"
                  ></span>
                ` : ""}
            ${this._values.map((t, i) => {
      const n = this._thumbs[i], o = this._active[i], r = `${this.id}-${i}`, a = this.ariaLabel ? `${this.ariaLabel}${this.multiple ? ` (thumb ${i + 1})` : ""}` : void 0;
      return l`
                <input
                  type="range"
                  class="swim-slider__input ${i % 2 === 1 ? "swim-slider__input--odd" : ""} ${o ? "swim-slider__input--active" : ""}"
                  id="${r}"
                  aria-valuemin="${this._min}"
                  aria-valuemax="${this._max}"
                  aria-valuenow="${t}"
                  aria-label="${a || void 0}"
                  .value="${String(t)}"
                  min="${this._min}"
                  max="${this._max}"
                  step="${this._step}"
                  ?disabled="${this.disabled}"
                  @input="${(y) => this._onRangeInput(y, i)}"
                  @change="${this._onChange}"
                  @mouseenter="${() => this._setActive(i, !0)}"
                  @mouseleave="${() => this._setActive(i, !1)}"
                  @focus="${() => this._setActive(i, !0)}"
                  @blur="${() => this._setActive(i, !1)}"
                />
                <div
                  class="swim-slider__thumb ${o ? "swim-slider__thumb--active" : ""}"
                  style="${n ? `left: ${n.left}` : ""}"
                  aria-hidden="true"
                  part="thumb"
                ></div>
              `;
    })}
          </div>
        </div>
      </div>
    `;
  }
};
C.styles = [m, ko];
C.formAssociated = !0;
I([
  s({ type: String })
], C.prototype, "id", 2);
I([
  s({ type: Number })
], C.prototype, "min", 1);
I([
  s({ type: Number })
], C.prototype, "max", 1);
I([
  s({ type: Number })
], C.prototype, "step", 1);
I([
  s({ type: String, reflect: !0 })
], C.prototype, "orientation", 2);
I([
  s({ type: Boolean, reflect: !0 })
], C.prototype, "filled", 1);
I([
  s({ type: Boolean, reflect: !0 })
], C.prototype, "multiple", 1);
I([
  s({ type: Boolean, reflect: !0 })
], C.prototype, "disabled", 1);
I([
  s({ type: Boolean, attribute: "show-ticks" })
], C.prototype, "showTicks", 1);
I([
  s({ type: Number, attribute: "tick-step" })
], C.prototype, "tickStep", 1);
I([
  s({ type: String, attribute: "aria-label" })
], C.prototype, "ariaLabel", 2);
I([
  s({ type: String })
], C.prototype, "value", 1);
I([
  u()
], C.prototype, "_values", 2);
I([
  u()
], C.prototype, "_active", 2);
C = I([
  b("swim-slider")
], C);
const zo = h`
  :host {
    display: flex;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  :host([direction='row']) {
    flex-direction: row;
  }

  :host([direction='column']) {
    flex-direction: column;
  }

  slot {
    display: contents;
  }
`, Eo = [m, zo];
var xe = /* @__PURE__ */ ((e) => (e.Row = "row", e.Column = "column", e))(xe || {});
function $e(e) {
  const t = String(e).indexOf("calc") > -1;
  return String(e).indexOf("%") > -1 && !t;
}
function X(e) {
  return typeof e == "string" ? Number(e.replace(/%/g, "").replace(/px/g, "").trim()) : e;
}
function Lt(e, t, i, n, o, r) {
  let a = e ? $e(e) ? X(e) : X(e) / r : 0, y = t ? $e(t) ? X(t) : X(t) / r : 100;
  return a = Math.max(a, n === "0" ? o : 0), y = Math.min(y, i === "0" ? o : 100), [a, y];
}
function bt(e, t, i) {
  const [n, o, r] = e.currentFlexParts, a = $e(r), y = X(r), P = e.initialFlexParts[2], he = $e(P) ? X(P) : X(P) / i, Se = a ? y * i : y;
  let G = Se + t, K = G / i;
  const [Ke, Xe] = Lt(e.minBasis, e.maxBasis, n, o, he, i);
  return K = Math.max(K, Ke), K = Math.min(K, Xe), G = K * i, e.updateBasis(a ? K + "%" : G + "px"), G - Se;
}
var Io = Object.defineProperty, Po = Object.getOwnPropertyDescriptor, ot = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Po(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Io(t, i, o), o;
};
let Oe = class extends g {
  constructor() {
    super(...arguments), this.direction = xe.Row, this._areas = [], this._handles = [], this._handleListeners = /* @__PURE__ */ new Map(), this._onSlotChange = () => {
      this._collectAreasAndHandles(), this._removeHandleListeners(), this._attachHandleListeners();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("slotchange", this._onSlotChange);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("slotchange", this._onSlotChange), this._removeHandleListeners();
  }
  updated(e) {
    e.has("direction") && this._handles.forEach((t) => {
      t.direction = this.direction;
    });
  }
  firstUpdated() {
    requestAnimationFrame(() => {
      this._collectAreasAndHandles(), this._attachHandleListeners();
    });
  }
  _collectAreasAndHandles() {
    if (!this.slotEl) return;
    const e = this.slotEl.assignedElements({ flatten: !0 });
    this._areas = e.filter((t) => {
      var i;
      return ((i = t.tagName) == null ? void 0 : i.toLowerCase()) === "swim-split-area";
    }), this._handles = e.filter((t) => {
      var i;
      return ((i = t.tagName) == null ? void 0 : i.toLowerCase()) === "swim-split-handle";
    }), this._handles.forEach((t) => {
      t.direction = this.direction;
    });
  }
  _attachHandleListeners() {
    this._handles.forEach((e) => {
      const t = (n) => {
        const o = n.detail;
        o && this._onDrag(o);
      }, i = () => this._onDblClick();
      this._handleListeners.set(e, { drag: t, dblclick: i }), e.addEventListener("drag", t), e.addEventListener("dblclick", i);
    });
  }
  _removeHandleListeners() {
    this._handles.forEach((e) => {
      const t = this._handleListeners.get(e);
      t && (e.removeEventListener("drag", t.drag), e.removeEventListener("dblclick", t.dblclick), this._handleListeners.delete(e));
    });
  }
  _resize(e) {
    const n = (this.direction === xe.Row ? this.clientWidth : this.clientHeight) / 100, o = this._areas;
    if (o.length === 0) return;
    const [r, ...a] = o;
    let y = e;
    y = bt(r, y, n), a.forEach((P) => {
      y += bt(P, -y, n);
    });
  }
  _onDrag(e) {
    const t = this.direction === xe.Row ? e.movementX : e.movementY;
    this._resize(t);
  }
  _onDblClick() {
    const i = (this.direction === xe.Row ? this.clientWidth : this.clientHeight) / 100, o = this._areas[0];
    if (!o) return;
    const [r, a, y] = o.currentFlexParts, P = $e(y), he = X(y), G = (P ? he * i : he) / i, K = o.initialFlexParts[2], Ke = $e(K) ? X(K) : X(K) / i, [Xe, Dt] = Lt(
      o.minBasis,
      o.maxBasis,
      r,
      a,
      Ke,
      i
    ), st = G - Xe, at = Dt - G, Ht = (st < at ? at : -st) * i;
    this._resize(Ht);
  }
  render() {
    return l`<slot></slot>`;
  }
};
Oe.styles = Eo;
ot([
  s({ type: String, reflect: !0 })
], Oe.prototype, "direction", 2);
ot([
  T("slot")
], Oe.prototype, "slotEl", 2);
Oe = ot([
  b("swim-split")
], Oe);
const To = h`
  :host {
    overflow: hidden;
    box-sizing: border-box;
    min-height: 0;
  }
`, Oo = [m, To];
function Bt(e) {
  const [t, i, n] = e;
  return `${t} ${i} ${n}`;
}
function we(e, t, i) {
  const n = i.split(" ");
  return n.length === 3 ? n : [e, t, i];
}
var Lo = Object.defineProperty, Bo = Object.getOwnPropertyDescriptor, Be = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Bo(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Lo(t, i, o), o;
};
const ze = "1 1 1e-9px";
let pe = class extends g {
  constructor() {
    super(...arguments), this._areaBasis = ze, this.shouldAdjustMaxMin = !1, this.initialFlexParts = we("1", "1", ze), this.currentFlexParts = we("1", "1", ze);
  }
  get areaBasis() {
    return this._areaBasis;
  }
  set areaBasis(e) {
    this._areaBasis !== e && (this._areaBasis = e || ze, this._applyBasis());
  }
  connectedCallback() {
    super.connectedCallback(), this._applyBasis();
  }
  updated() {
    this.style.flex = Bt(this.currentFlexParts), this.shouldAdjustMaxMin && this.currentFlexParts[2] ? (this.style.minWidth = this.currentFlexParts[2], this.style.maxWidth = this.currentFlexParts[2]) : (this.style.minWidth = "", this.style.maxWidth = "");
  }
  updateBasis(e) {
    this.currentFlexParts[2] = e, this.requestUpdate();
  }
  _applyBasis() {
    const e = this._areaBasis || ze, [t, i, n] = we("1", "1", e);
    this.currentFlexParts = [t, i, n], this.initialFlexParts = [t, i, n], !this.minBasis && i === "0" && (this.minBasis = n), !this.maxBasis && t === "0" && (this.maxBasis = n), this.requestUpdate();
  }
  render() {
    return l`<slot></slot>`;
  }
};
pe.styles = Oo;
Be([
  s({ type: String, attribute: "area-basis" })
], pe.prototype, "areaBasis", 1);
Be([
  s({ type: String, attribute: "min-basis" })
], pe.prototype, "minBasis", 2);
Be([
  s({ type: String, attribute: "max-basis" })
], pe.prototype, "maxBasis", 2);
Be([
  s({ type: Boolean, attribute: "should-adjust-max-min" })
], pe.prototype, "shouldAdjustMaxMin", 2);
pe = Be([
  b("swim-split-area")
], pe);
const Fo = h`
  :host {
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .swim-split-handle__grip {
    line-height: 0;
    font-size: 32px;
    position: absolute;
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    color: var(--grey-400);
    cursor: inherit;
  }

  .swim-split-handle__grip:hover {
    color: var(--grey-200);
  }

  .swim-split-handle__grip:focus {
    outline: none;
  }

  .swim-split-handle__grip:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
  }

  :host([direction='row']) .swim-split-handle__grip {
    top: 50%;
    left: 50%;
    cursor: col-resize;
    transform: translate(-50%, -50%);
  }

  :host([direction='column']) .swim-split-handle__grip {
    left: 50%;
    cursor: row-resize;
    top: -3px;
    transform: translateX(-50%) rotate(270deg);
  }
`, Ao = [m, Fo];
var Do = Object.defineProperty, Ho = Object.getOwnPropertyDescriptor, nt = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ho(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Do(t, i, o), o;
};
const De = "0 0 15px";
let Le = class extends g {
  constructor() {
    super(...arguments), this._handleBasis = De, this.direction = xe.Row, this.currentFlexParts = we("0", "0", De), this._boundMouseUp = this._onMouseUp.bind(this), this._boundMouseMove = this._onMouseMove.bind(this);
  }
  get handleBasis() {
    return this._handleBasis;
  }
  set handleBasis(e) {
    this._handleBasis !== e && (this._handleBasis = e || De, this.currentFlexParts = we("0", "0", this._handleBasis), this.requestUpdate());
  }
  connectedCallback() {
    super.connectedCallback(), this.currentFlexParts = we("0", "0", this._handleBasis || De);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("mouseup", this._boundMouseUp, !0), document.removeEventListener("mousemove", this._boundMouseMove, !0);
  }
  updated() {
    this.style.flex = Bt(this.currentFlexParts);
  }
  _onMouseDown(e) {
    e.preventDefault(), document.addEventListener("mouseup", this._boundMouseUp, !0), document.addEventListener("mousemove", this._boundMouseMove, !0), this.dispatchEvent(new CustomEvent("dragstart", { detail: e, bubbles: !0, composed: !0 }));
  }
  _onMouseMove(e) {
    this.dispatchEvent(new CustomEvent("drag", { detail: e, bubbles: !0, composed: !0 }));
  }
  _onMouseUp(e) {
    document.removeEventListener("mouseup", this._boundMouseUp, !0), document.removeEventListener("mousemove", this._boundMouseMove, !0), this.dispatchEvent(new CustomEvent("dragend", { detail: e, bubbles: !0, composed: !0 }));
  }
  _onDblClick(e) {
    this.dispatchEvent(new CustomEvent("dblclick", { detail: e, bubbles: !0, composed: !0 }));
  }
  render() {
    return l`
      <button
        type="button"
        class="swim-split-handle__grip"
        aria-label="Resize split"
        @mousedown="${this._onMouseDown}"
        @dblclick="${this._onDblClick}"
      >
        <swim-icon font-icon="split-handle"></swim-icon>
      </button>
    `;
  }
};
Le.styles = Ao;
nt([
  s({ type: String, attribute: "handle-basis" })
], Le.prototype, "handleBasis", 1);
nt([
  s({ type: String, reflect: !0 })
], Le.prototype, "direction", 2);
Le = nt([
  b("swim-split-handle")
], Le);
const Mo = h`
  ${m}

  @keyframes swim-progress-spinner--rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .swim-progress-spinner__container {
    display: inline-flex;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 10px 0 var(--spinner-color);
    position: relative;
  }

  .swim-progress-spinner__svg {
    display: block;
  }

  .swim-progress-spinner__circle {
    fill: transparent;
    transition: 0.1s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke: var(--spinner-color);
  }

  .swim-progress-spinner__icon-in-progress,
  .swim-progress-spinner__icon-complete,
  .swim-progress-spinner__icon-failure {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* Size and color for slotted or property-driven swim-icon in center */
  .swim-progress-spinner__icon-in-progress swim-icon,
  .swim-progress-spinner__icon-complete swim-icon,
  .swim-progress-spinner__icon-failure swim-icon {
    font-size: 40px;
    color: var(--spinner-color);
  }

  .swim-progress-spinner__icon-failure swim-icon {
    color: var(--color-error, var(--red-500));
  }

  .swim-progress-spinner__label {
    margin-top: var(--spacing-24, 24px);
  }

  .swim-progress-spinner__label h4 {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-2xl);
    line-height: 30px;
    text-align: center;
    color: var(--white);
    margin: 0;
  }

  /* Indeterminate: rotating circle */
  :host([mode='indeterminate']) .swim-progress-spinner__circle {
    animation: swim-progress-spinner--rotate 1s linear infinite;
  }
`;
var ve = /* @__PURE__ */ ((e) => (e.Indeterminate = "indeterminate", e.Determinate = "determinate", e))(ve || {}), oe = /* @__PURE__ */ ((e) => (e.Default = "default", e.Icon = "icon", e))(oe || {}), Vo = Object.defineProperty, jo = Object.getOwnPropertyDescriptor, O = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? jo(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Vo(t, i, o), o;
};
const qo = 50, Ro = 100, Je = 100, Me = Je / 2, No = Me * 2 * Math.PI, Uo = "cloud-upload", Wo = "check", Go = "x";
let z = class extends g {
  constructor() {
    super(...arguments), this.mode = ve.Indeterminate, this.color = "var(--blue-500)", this.failStatusColor = "var(--red-500)", this.appearance = oe.Default, this.inProgressIconName = "", this.completeIconName = "", this.failIconName = "", this._isFailure = !1, this._value = 0, this._total = 100, this._diameter = 100, this._strokeWidth = 3, this._boundSlotChange = () => this.requestUpdate();
  }
  get isFailure() {
    return this._isFailure;
  }
  set isFailure(e) {
    this._isFailure = c(e);
  }
  get value() {
    return this._value;
  }
  set value(e) {
    const t = x(e, 0);
    this._value !== t && (this._value = t);
  }
  get total() {
    return this._total;
  }
  set total(e) {
    const t = x(e, 100);
    this._total !== t && (this._total = t);
  }
  get diameter() {
    return this._diameter;
  }
  set diameter(e) {
    const t = x(e, 100);
    this._diameter !== t && (this._diameter = t);
  }
  get strokeWidth() {
    return this._strokeWidth;
  }
  set strokeWidth(e) {
    const t = x(e, 3);
    this._strokeWidth !== t && (this._strokeWidth = t);
  }
  /** Circumference in viewBox units for stroke-dasharray/offset (fixed viewBox 0 0 100 100). */
  get circumference() {
    return No;
  }
  get modeValue() {
    return this.mode === ve.Determinate || this.isComplete ? this.value : qo;
  }
  get modeTotal() {
    return this.mode === ve.Determinate || this.isComplete ? this.total : Ro;
  }
  get percentage() {
    return 100 / this.modeTotal * this.modeValue;
  }
  get isComplete() {
    return this.value >= this.total && this.total > 0;
  }
  get spinnerColor() {
    return this.isComplete && this.isFailure ? this.failStatusColor : this.color;
  }
  get strokeDasharray() {
    return `${this.circumference} ${this.circumference}`;
  }
  get strokeDashoffset() {
    return this.circumference - this.percentage / 100 * this.circumference;
  }
  hasSlotContent(e) {
    var i;
    const t = (i = this.shadowRoot) == null ? void 0 : i.querySelector(`slot[name="${e}"]`);
    return !!(t != null && t.assignedNodes().length);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("slotchange", this._boundSlotChange);
  }
  disconnectedCallback() {
    this.removeEventListener("slotchange", this._boundSlotChange), super.disconnectedCallback();
  }
  /** Resolved icon name for in-progress: slot/prop or default. */
  get effectiveInProgressIcon() {
    return this.hasSlotContent("in-progress-icon") ? "" : this.inProgressIconName || (this.appearance === oe.Icon ? Uo : "");
  }
  /** Resolved icon name for complete: slot/prop or default. */
  get effectiveCompleteIcon() {
    return this.hasSlotContent("complete-icon") ? "" : this.completeIconName || (this.appearance === oe.Icon ? Wo : "");
  }
  /** Resolved icon name for failure: slot/prop or default. */
  get effectiveFailIcon() {
    return this.hasSlotContent("fail-icon") ? "" : this.failIconName || (this.appearance === oe.Icon ? Go : "");
  }
  render() {
    const e = this.appearance === oe.Icon && !this.isComplete && (this.effectiveInProgressIcon || this.hasSlotContent("in-progress-icon")), t = this.appearance === oe.Icon && this.isComplete && !this.isFailure && (this.effectiveCompleteIcon || this.hasSlotContent("complete-icon")), i = this.appearance === oe.Icon && this.isComplete && this.isFailure && (this.effectiveFailIcon || this.hasSlotContent("fail-icon"));
    return l`
      <div
        class="swim-progress-spinner__container ${this.appearance === oe.Icon ? "swim-progress-spinner__container--icon" : ""}"
        part="container"
        style="--spinner-color: ${this.spinnerColor}"
        role="progressbar"
        aria-valuenow="${this.mode === ve.Determinate ? this.value : d}"
        aria-valuemin="0"
        aria-valuemax="${this.mode === ve.Determinate ? this.total : d}"
        aria-label="Progress"
      >
        <svg
          class="swim-progress-spinner__svg"
          viewBox="0 0 ${Je} ${Je}"
          width="${this.diameter}"
          height="${this.diameter}"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            class="swim-progress-spinner__circle"
            stroke-width="${this.strokeWidth}"
            stroke-dasharray="${this.strokeDasharray}"
            stroke-dashoffset="${this.strokeDashoffset}"
            r="${Me}"
            cx="${Me}"
            cy="${Me}"
          ></circle>
        </svg>

        ${e ? l`
              <div class="swim-progress-spinner__icon-in-progress">
                ${this.hasSlotContent("in-progress-icon") ? l`<slot name="in-progress-icon"></slot>` : l`<swim-icon font-icon="${this.effectiveInProgressIcon}"></swim-icon>`}
              </div>
            ` : t ? l`
              <div class="swim-progress-spinner__icon-complete">
                ${this.hasSlotContent("complete-icon") ? l`<slot name="complete-icon"></slot>` : l`<swim-icon font-icon="${this.effectiveCompleteIcon}"></swim-icon>`}
              </div>
            ` : i ? l`
              <div class="swim-progress-spinner__icon-failure">
                ${this.hasSlotContent("fail-icon") ? l`<slot name="fail-icon"></slot>` : l`<swim-icon font-icon="${this.effectiveFailIcon}"></swim-icon>`}
              </div>
            ` : d}
      </div>

      ${this.spinnerLabel ? l`
            <div class="swim-progress-spinner__label" part="label">
              ${!this.isComplete && this.spinnerLabel.inProgressLabel ? l`<h4>${this.spinnerLabel.inProgressLabel}</h4>` : this.isComplete && !this.isFailure && this.spinnerLabel.completeLabel ? l`<h4>${this.spinnerLabel.completeLabel}</h4>` : this.isComplete && this.isFailure && this.spinnerLabel.failLabel ? l`<h4>${this.spinnerLabel.failLabel}</h4>` : d}
            </div>
          ` : d}
    `;
  }
};
z.styles = Mo;
O([
  s({ type: String, reflect: !0 })
], z.prototype, "mode", 2);
O([
  s({ type: String })
], z.prototype, "color", 2);
O([
  s({ attribute: "fail-status-color", type: String })
], z.prototype, "failStatusColor", 2);
O([
  s({ type: String, reflect: !0 })
], z.prototype, "appearance", 2);
O([
  s({ type: String, attribute: "in-progress-icon-name" })
], z.prototype, "inProgressIconName", 2);
O([
  s({ type: String, attribute: "complete-icon-name" })
], z.prototype, "completeIconName", 2);
O([
  s({ type: String, attribute: "fail-icon-name" })
], z.prototype, "failIconName", 2);
O([
  s({ type: Boolean, reflect: !0, attribute: "is-failure" })
], z.prototype, "isFailure", 1);
O([
  s({ attribute: !1 })
], z.prototype, "spinnerLabel", 2);
O([
  s({ type: Number })
], z.prototype, "value", 1);
O([
  s({ type: Number })
], z.prototype, "total", 1);
O([
  s({ type: Number })
], z.prototype, "diameter", 1);
O([
  s({ attribute: "stroke-width", type: Number })
], z.prototype, "strokeWidth", 1);
z = O([
  b("swim-progress-spinner")
], z);
const Ko = h`
  :host {
    display: block;
  }

  .swim-tab__panel {
    display: block;
  }

  .swim-tab__panel[hidden] {
    display: none;
  }
`;
var Xo = Object.defineProperty, Qo = Object.getOwnPropertyDescriptor, _e = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Qo(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Xo(t, i, o), o;
};
let Yo = 0, Q = class extends g {
  constructor() {
    super(...arguments), this._instanceId = ++Yo, this._generatedPanelId = `tab-panel-${this._instanceId}`, this._generatedTabId = `tab-${this._instanceId}`, this.tabId = this._generatedTabId, this.label = "", this._active = !1, this._disabled = !1;
  }
  get id() {
    return this._id ?? this._generatedPanelId;
  }
  set id(e) {
    this._id = e || this._generatedPanelId;
  }
  get title() {
    return this.label;
  }
  set title(e) {
    this.label = e;
  }
  get active() {
    return this._active;
  }
  set active(e) {
    const t = c(e);
    if (this._active !== t) {
      const i = this._active;
      this._active = t, this.requestUpdate("active", i), this.dispatchEvent(new CustomEvent("swim-tab-active-change", { bubbles: !0, composed: !0 }));
    }
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tab-id") || (this.tabId = this._generatedTabId);
  }
  render() {
    return l`
      <div
        class="swim-tab__panel"
        role="tabpanel"
        id="${this.id}"
        aria-labelledby="${this.tabId}"
        ?hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `;
  }
};
Q.styles = [m, Ko];
_e([
  s({ type: String })
], Q.prototype, "id", 1);
_e([
  s({ type: String, attribute: "tab-id" })
], Q.prototype, "tabId", 2);
_e([
  s({ type: String })
], Q.prototype, "label", 2);
_e([
  s({ type: String })
], Q.prototype, "title", 1);
_e([
  s({ type: Boolean, reflect: !0 })
], Q.prototype, "active", 1);
_e([
  s({ type: Boolean, reflect: !0 })
], Q.prototype, "disabled", 1);
Q = _e([
  b("swim-tab")
], Q);
const Zo = h`
  :host {
    display: block;
    margin-bottom: 2em;
  }

  .swim-tabs {
    display: block;
  }

  /* Tab list – horizontal by default */
  .swim-tabs__list {
    display: block;
    border-bottom: solid 2px var(--grey-700);
  }

  .swim-tabs__tab {
    display: inline-block;
    border: none;
    color: var(--grey-250);
    background: transparent;
    box-shadow: none;
    font-size: var(--font-size-m);
    box-sizing: border-box;
    margin: 0;
    padding: 0.35em 0.75em;
    position: relative;
    text-align: center;
    user-select: none;
    font: inherit;
    font-weight: var(--font-weight-bold);
    bottom: -1px;
    cursor: pointer;
  }

  .swim-tabs__tab::after {
    content: '';
    height: 2px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -1px;
    transition: transform 250ms ease;
    transform: scale(0);
    background: var(--blue-500);
    color: var(--white);
  }

  .swim-tabs__tab:not([disabled]):hover {
    border: none;
    color: var(--white);
    background: transparent;
    opacity: 1;
  }

  .swim-tabs__tab:not([disabled]):hover::after,
  .swim-tabs__tab--active::after {
    transform: scale(1);
  }

  .swim-tabs__tab--active,
  .swim-tabs__tab--active:focus,
  .swim-tabs__tab--active:hover {
    color: var(--white);
    border-width: 0;
  }

  .swim-tabs__tab:focus-visible {
    outline: 2px solid var(--blue-200);
    border-radius: var(--radius-2);
    outline-offset: 1px;
  }

  .swim-tabs__tab--disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  /* Tab content area */
  .swim-tabs__content {
    padding: var(--spacing-10);
  }

  /* Light appearance */
  :host([appearance='light']) .swim-tabs {
    border: 2px solid var(--grey-700);
    box-shadow: var(--shadow-2);
  }

  :host([appearance='light']) .swim-tabs__list {
    background-color: var(--grey-700);
    border-bottom: 2px solid var(--grey-700);
    font-size: 13px;
    line-height: 15px;
    font-weight: var(--font-weight-semibold);
    margin-left: -2px;
  }

  :host([appearance='light']) .swim-tabs__tab {
    height: 36px;
    padding: var(--spacing-8) 1.25em;
  }

  :host([appearance='light']) .swim-tabs__content {
    background-color: var(--grey-850);
  }

  /* Vertical layout */
  :host([vertical]) .swim-tabs {
    display: flex;
  }

  :host([vertical]) .swim-tabs__list {
    flex: 0 0 160px;
    border: none;
  }

  :host([vertical]) .swim-tabs__tab {
    height: 53px;
    width: 100%;
    text-align: left;
    font-size: 13px;
    line-height: 45px;
    border: none !important;
    border-bottom: 1px solid var(--grey-700) !important;
    padding-left: 19px;
    font-weight: var(--font-weight-semibold);
  }

  :host([vertical]) .swim-tabs__tab::after {
    display: none;
  }

  :host([vertical]) .swim-tabs__content {
    flex: 1 1 100%;
  }

  /* Vertical + light */
  :host([vertical][appearance='light']) .swim-tabs__list {
    background-color: var(--grey-750);
    border-right: 2px solid var(--grey-700);
    border-left: 2px solid var(--grey-700);
  }

  :host([vertical][appearance='light']) .swim-tabs__tab {
    line-height: 38px;
  }

  :host([vertical][appearance='light']) .swim-tabs__tab:last-child {
    border: none !important;
    border-bottom: none !important;
  }

  :host([vertical][appearance='light']) .swim-tabs__content {
    background-color: var(--grey-750);
  }
`;
var Ft = /* @__PURE__ */ ((e) => (e.Legacy = "legacy", e.Light = "light", e))(Ft || {}), Jo = Object.defineProperty, en = Object.getOwnPropertyDescriptor, Fe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? en(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Jo(t, i, o), o;
};
let ue = class extends g {
  constructor() {
    super(...arguments), this._vertical = !1, this.appearance = Ft.Legacy, this._tabs = [], this._slotChangeBound = () => this._syncTabs(), this._tabActiveChangeBound = () => this.requestUpdate();
  }
  get vertical() {
    return this._vertical;
  }
  set vertical(e) {
    this._vertical = c(e);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    this._syncTabs(), this._listenToTabChanges();
    const e = this.slotEl;
    e && e.addEventListener("slotchange", this._slotChangeBound);
  }
  disconnectedCallback() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("slot");
    e && e.removeEventListener("slotchange", this._slotChangeBound), this._tabs.forEach((i) => i.removeEventListener("swim-tab-active-change", this._tabActiveChangeBound)), super.disconnectedCallback();
  }
  _listenToTabChanges() {
    this._tabs.forEach((e) => e.addEventListener("swim-tab-active-change", this._tabActiveChangeBound));
  }
  _syncTabs() {
    var o;
    const e = (o = this.shadowRoot) == null ? void 0 : o.querySelector("slot"), i = ((e == null ? void 0 : e.assignedElements({ flatten: !0 })) ?? []).filter((r) => r instanceof Q);
    this._tabs.forEach((r) => r.removeEventListener("swim-tab-active-change", this._tabActiveChangeBound)), this._tabs = i, this._listenToTabChanges();
    const n = i.filter((r) => r.active);
    n.length > 1 ? console.error('swim-tabs: Multiple active tabs set "active".') : n.length === 0 && i.length > 0 && (i[0].active = !0);
  }
  _tabClicked(e) {
    e.disabled || (this._tabs.forEach((t) => t.active = t === e), e.active = !0, this.dispatchEvent(
      new CustomEvent("select-tab", {
        detail: { tab: e },
        bubbles: !0,
        composed: !0
      })
    ), this.dispatchEvent(
      new CustomEvent("select", {
        detail: { tab: e },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  _move(e) {
    const t = this._tabs, i = t.findIndex((n) => n.active);
    for (let n = i + e; n >= 0 && n < t.length; n += e) {
      const o = t[n];
      if (o && !o.disabled) {
        this._tabClicked(o);
        return;
      }
    }
  }
  /** Go to the previous tab. */
  prev() {
    this._move(-1);
  }
  /** Go to the next tab. */
  next() {
    this._move(1);
  }
  _handleKeyDown(e) {
    const t = this.vertical, i = e.key;
    t && (i === "ArrowUp" || i === "ArrowDown") ? (e.preventDefault(), this._move(i === "ArrowDown" ? 1 : -1)) : !t && (i === "ArrowLeft" || i === "ArrowRight") && (e.preventDefault(), this._move(i === "ArrowRight" ? 1 : -1));
  }
  render() {
    const e = this._tabs;
    return l`
      <section class="swim-tabs">
        <div class="swim-tabs__list" part="tablist" role="tablist" @keydown="${this._handleKeyDown}">
          ${e.map(
      (t) => l`
              <button
                type="button"
                role="tab"
                id="${t.tabId}"
                aria-controls="${t.id}"
                aria-selected="${t.active}"
                class="swim-tabs__tab ${t.active ? "swim-tabs__tab--active" : ""} ${t.disabled ? "swim-tabs__tab--disabled" : ""}"
                ?disabled="${t.disabled}"
                @click="${() => this._tabClicked(t)}"
              >
                ${t.label}
              </button>
            `
    )}
        </div>
        <div class="swim-tabs__content" part="tab-content">
          <slot></slot>
        </div>
      </section>
    `;
  }
};
ue.styles = [m, Zo];
Fe([
  T("slot")
], ue.prototype, "slotEl", 2);
Fe([
  s({ type: Boolean, reflect: !0 })
], ue.prototype, "vertical", 1);
Fe([
  s({ type: String, reflect: !0 })
], ue.prototype, "appearance", 2);
Fe([
  u()
], ue.prototype, "_tabs", 2);
ue = Fe([
  b("swim-tabs")
], ue);
const tn = h`
  :host {
    display: inline-block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .swim-toggle__track,
  :host([disabled]) .swim-toggle__text {
    cursor: not-allowed;
  }

  .swim-toggle {
    display: inline-flex;
    align-items: center;
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-16);
  }

  .swim-toggle__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    pointer-events: none;
  }

  .swim-toggle__roving {
    outline: none;
  }

  .swim-toggle__roving:focus-visible {
    outline: 2px solid var(--blue-200);
    outline-offset: 2px;
  }

  .swim-toggle__track {
    position: relative;
    display: inline-block;
    height: 14px;
    width: 36px;
    background: var(--grey-900);
    border-radius: 100px;
    cursor: pointer;
    transition: background 0.3s ease;
    vertical-align: middle;
    margin-bottom: 3px;
    user-select: none;
  }

  .swim-toggle__track[aria-checked='true'] {
    background: var(--blue-700);
  }

  .swim-toggle__thumb {
    position: absolute;
    left: 0;
    top: -3px;
    display: block;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    background: var(--grey-400);
    box-shadow: 0 3px 3px var(--grey-900);
    content: '';
    transition: left 0.3s ease, background 0.3s ease;
  }

  .swim-toggle__track[aria-checked='true'] .swim-toggle__thumb {
    left: 16px;
    background: var(--blue-500);
  }

  .swim-toggle__icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  /* Check icon when on: nudge tick to the left (thumb is on right) */
  .swim-toggle__icon--on {
    justify-content: flex-start;
    padding-left: 2px;
  }

  /* X icon when off: nudge cross to the right (thumb is on left) */
  .swim-toggle__icon--off {
    justify-content: flex-end;
    padding-right: 2px;
  }

  /* Constrain swim-icon so it centers vertically in the 14px track; override inline-block/baseline */
  .swim-toggle__icon swim-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    vertical-align: middle;
    block-size: 14px;
    min-inline-size: 14px;
    box-sizing: border-box;
  }

  .swim-toggle__icon--on swim-icon {
    opacity: 0.5;
    color: var(--white);
    font-size: 9px;
    padding: 2.5px 3.5px;
  }

  .swim-toggle__icon--off swim-icon {
    opacity: 0.7;
    color: var(--grey-400);
    font-size: 7px;
    font-weight: 900;
    padding: 3.5px 4.5px;
  }

  .swim-toggle__text {
    cursor: pointer;
    padding-left: 5px;
    color: var(--grey-100);
    font-size: var(--font-size-m);
    line-height: var(--font-line-height-200);
    margin: 0;
  }
`;
var on = Object.defineProperty, nn = Object.getOwnPropertyDescriptor, ee = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? nn(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && on(t, i, o), o;
};
const rn = {
  fromAttribute: (e) => e !== "false" && e !== "",
  toAttribute: (e) => e ? "true" : "false"
};
let sn = 0, M = class extends g {
  constructor() {
    super(), this.id = `swim-toggle-${++sn}`, this.name = "", this.label = "", this._checked = !1, this._disabled = !1, this._required = !1, this._showIcons = !0, this._tabindex = 0, this._internals = this.attachInternals();
  }
  get checked() {
    return this._checked;
  }
  set checked(e) {
    const t = c(e);
    this._checked !== t && (this._checked = t, this._syncFormValue());
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  get required() {
    return this._required;
  }
  set required(e) {
    this._required = c(e);
  }
  get showIcons() {
    return this._showIcons;
  }
  set showIcons(e) {
    this._showIcons = e != null ? c(e) : !0;
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(e) {
    this._tabindex = x(e, 0);
  }
  connectedCallback() {
    super.connectedCallback(), this._syncFormValue();
  }
  updated(e) {
    super.updated(e), (e.has("checked") || e.has("_checked")) && this._syncFormValue();
  }
  focus(e) {
    var t;
    (t = this._roving) == null || t.focus(e);
  }
  _syncFormValue() {
    var t;
    this._internals.setFormValue(this._checked ? "on" : ""), this.required && !this._checked ? this._internals.setValidity({ valueMissing: !0 }, "This field is required") : this._internals.setValidity({});
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".swim-toggle__input");
    e && (e.checked = this._checked, e.required = this.required);
  }
  _onClick(e) {
    e.preventDefault(), !this.disabled && this._toggle();
  }
  _onKeydown(e) {
    e.key !== " " && e.key !== "Enter" || (e.preventDefault(), !this.disabled && this._toggle());
  }
  _toggle() {
    this.checked = !this.checked, this._emitChange();
  }
  _emitChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          stopPropagation: () => {
          },
          timeStamp: Date.now(),
          target: { checked: this._checked }
        },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onFocus(e) {
    this.dispatchEvent(new FocusEvent("focus", { ...e, bubbles: !0, composed: !0 }));
  }
  _onBlur(e) {
    this.dispatchEvent(new FocusEvent("blur", { ...e, bubbles: !0, composed: !0 }));
  }
  _onInputChange(e) {
    const t = e.target;
    this._checked !== t.checked && (this._checked = t.checked, this.requestUpdate(), this._syncFormValue(), this._emitChange());
  }
  render() {
    const e = `${this.id}-text`;
    return l`
      <div class="swim-toggle">
        <input
          class="swim-toggle__input"
          type="checkbox"
          id="${this.id}"
          name="${this.name || void 0}"
          ?checked="${this._checked}"
          ?required="${this.required}"
          ?disabled="${this.disabled}"
          tabindex="-1"
          aria-hidden="true"
          @change="${this._onInputChange}"
        />
        <div
          class="swim-toggle__roving swim-toggle__track"
          part="track"
          role="switch"
          tabindex="${this.disabled ? -1 : this.tabindex}"
          aria-checked="${this._checked}"
          aria-disabled="${this.disabled ? "true" : "false"}"
          aria-labelledby="${e}"
          @click="${this._onClick}"
          @keydown="${this._onKeydown}"
          @focus="${this._onFocus}"
          @blur="${this._onBlur}"
        >
          <span class="swim-toggle__thumb" part="thumb"></span>
          ${this.showIcons ? this._checked ? l`<span class="swim-toggle__icon swim-toggle__icon--on" aria-hidden="true"
                  ><swim-icon font-icon="check"></swim-icon
                ></span>` : l`<span class="swim-toggle__icon swim-toggle__icon--off" aria-hidden="true"
                  ><swim-icon font-icon="x"></swim-icon
                ></span>` : ""}
        </div>
        <label class="swim-toggle__text" part="text" id="${e}" for="${this.id}">
          ${this.label ? l`<span>${this.label}</span>` : ""}
          <slot></slot>
        </label>
      </div>
    `;
  }
};
M.styles = [m, tn];
M.formAssociated = !0;
ee([
  T(".swim-toggle__roving")
], M.prototype, "_roving", 2);
ee([
  s({ type: String })
], M.prototype, "id", 2);
ee([
  s({ type: String })
], M.prototype, "name", 2);
ee([
  s({ type: String })
], M.prototype, "label", 2);
ee([
  s({ type: Boolean, reflect: !0, attribute: "checked" })
], M.prototype, "checked", 1);
ee([
  s({ type: Boolean, reflect: !0 })
], M.prototype, "disabled", 1);
ee([
  s({ type: Boolean, reflect: !0 })
], M.prototype, "required", 1);
ee([
  s({ type: Boolean, attribute: "show-icons", converter: rn })
], M.prototype, "showIcons", 1);
ee([
  s({ type: Number })
], M.prototype, "tabindex", 1);
M = ee([
  b("swim-toggle")
], M);
const an = h`
  :host {
    display: inline-block;
  }

  .swim-tooltip__trigger {
    display: inline-block;
    cursor: inherit;
  }

  .swim-tooltip__panel {
    position: fixed;
    z-index: 5000;
    display: block;
    font-weight: normal;
    opacity: 0;
    max-width: 600px;
    overflow-wrap: anywhere;
    border-radius: var(--radius-4);
    pointer-events: auto;
  }

  .swim-tooltip__panel--animate {
    opacity: 1;
    transition: opacity 0.3s, transform 0.3s;
    transform: translate3d(0, 0, 0);
  }

  .swim-tooltip__panel--narrow {
    max-width: 300px;
    text-align: center;
  }

  /* Placement transform (initial offset before animate) */
  .swim-tooltip__panel--position-right {
    transform: translate3d(10px, 0, 0);
  }

  .swim-tooltip__panel--position-left {
    transform: translate3d(-10px, 0, 0);
  }

  .swim-tooltip__panel--position-top {
    transform: translate3d(0, -10px, 0);
  }

  .swim-tooltip__panel--position-bottom {
    transform: translate3d(0, 10px, 0);
  }

  .swim-tooltip__panel--animate.swim-tooltip__panel--position-right,
  .swim-tooltip__panel--animate.swim-tooltip__panel--position-left,
  .swim-tooltip__panel--animate.swim-tooltip__panel--position-top,
  .swim-tooltip__panel--animate.swim-tooltip__panel--position-bottom {
    transform: translate3d(0, 0, 0);
  }

  /* Caret */
  .swim-tooltip__caret {
    position: absolute;
    z-index: 5001;
    width: 0;
    height: 0;
  }

  .swim-tooltip__caret--position-left {
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 7px solid var(--swim-tooltip-caret-bg, var(--grey-200));
  }

  .swim-tooltip__caret--position-top {
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid var(--swim-tooltip-caret-bg, var(--grey-200));
  }

  .swim-tooltip__caret--position-right {
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 7px solid var(--swim-tooltip-caret-bg, var(--grey-200));
  }

  .swim-tooltip__caret--position-bottom {
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid var(--swim-tooltip-caret-bg, var(--grey-200));
  }

  /* Type: tooltip (compact) */
  .swim-tooltip__panel--type-tooltip {
    color: var(--grey-700);
    background: var(--grey-200);
    font-size: var(--font-size-xs, 12px);
    padding: var(--spacing-4, 4px);
    text-align: center;
  }

  /* Type: popover */
  .swim-tooltip__panel--type-popover {
    background: var(--grey-200);
    color: var(--grey-700);
    box-shadow: var(--shadow-2);
    font-size: 13px;
    padding: var(--spacing-10, 10px);
  }

  .swim-tooltip__content {
    display: block;
  }
`, ln = [m, an];
var $ = /* @__PURE__ */ ((e) => (e.top = "top", e.bottom = "bottom", e.left = "left", e.right = "right", e))($ || {}), Y = /* @__PURE__ */ ((e) => (e.top = "top", e.bottom = "bottom", e.left = "left", e.right = "right", e.center = "center", e))(Y || {}), At = /* @__PURE__ */ ((e) => (e.popover = "popover", e.tooltip = "tooltip", e))(At || {}), ne = /* @__PURE__ */ ((e) => (e.all = "all", e.focus = "focus", e.click = "click", e.mouseover = "mouseover", e))(ne || {});
const Z = 7;
function Ne(e, t, i) {
  return i === Y.left ? (e.left ?? 0) - Z : i === Y.right ? (e.left ?? 0) + (e.width ?? 0) - (t.width ?? 0) + Z : (e.left ?? 0) + (e.width ?? 0) / 2 - (t.width ?? 0) / 2;
}
function rt(e, t, i) {
  return i === Y.top ? (e.top ?? 0) - Z : i === Y.bottom ? (e.top ?? 0) + (e.height ?? 0) - (t.height ?? 0) + Z : (e.top ?? 0) + (e.height ?? 0) / 2 - (t.height ?? 0) / 2;
}
function mt(e, t, i) {
  let n = Ne(e, t, i);
  return n + (t.width ?? 0) > window.innerWidth && (n = window.innerWidth - (t.width ?? 0)), n;
}
function ft(e, t, i) {
  let n = rt(e, t, i);
  return n + (t.height ?? 0) > window.innerHeight && (n = window.innerHeight - (t.height ?? 0)), n;
}
function cn(e, t, i, n, o) {
  return i === $.right ? Ne(e, t, n) + (t.width ?? 0) + o > window.innerWidth : i === $.left ? Ne(e, t, n) - o < 0 : i === $.top ? (e.top ?? 0) - (t.height ?? 0) - o < 0 : i === $.bottom ? rt(e, t, n) + (t.height ?? 0) + o > window.innerHeight : !1;
}
function dn(e, t, i, n, o) {
  return cn(i, t, e, o, n) ? e === $.right ? $.left : e === $.left ? $.right : e === $.top ? $.bottom : $.top : e;
}
function hn(e, t, i, n, o) {
  let r = 0, a = 0;
  return e === $.right ? (a = (i.left ?? 0) + (i.width ?? 0) + n, r = ft(i, t, o)) : e === $.left ? (a = (i.left ?? 0) - (t.width ?? 0) - n, r = ft(i, t, o)) : e === $.top ? (r = (i.top ?? 0) - (t.height ?? 0) - n, a = mt(i, t, o)) : (r = (i.top ?? 0) + (i.height ?? 0) + n, a = mt(i, t, o)), { top: r, left: a };
}
function _t(e, t, i, n) {
  let o;
  n === Y.left ? o = (e.width ?? 0) / 2 - (i.width ?? 0) / 2 + Z : n === Y.right ? o = (t.width ?? 0) - (e.width ?? 0) / 2 - (i.width ?? 0) / 2 - Z : o = (t.width ?? 0) / 2 - (i.width ?? 0) / 2;
  const r = Ne(e, t, n);
  return r + (t.width ?? 0) > window.innerWidth && (o += r + (t.width ?? 0) - window.innerWidth), o;
}
function vt(e, t, i, n) {
  let o;
  n === Y.top ? o = (e.height ?? 0) / 2 - (i.height ?? 0) / 2 + Z : n === Y.bottom ? o = (t.height ?? 0) - (e.height ?? 0) / 2 - (i.height ?? 0) / 2 - Z : o = (t.height ?? 0) / 2 - (i.height ?? 0) / 2;
  const r = rt(e, t, n);
  return r + (t.height ?? 0) > window.innerHeight && (o += r + (t.height ?? 0) - window.innerHeight), o;
}
function pn(e, t, i, n, o) {
  let r = 0, a = 0;
  return e === $.right ? (a = -Z, r = vt(i, t, n, o)) : e === $.left ? (a = t.width ?? 0, r = vt(i, t, n, o)) : e === $.top ? (r = t.height ?? 0, a = _t(i, t, n, o)) : (r = -Z, a = _t(i, t, n, o)), { top: r, left: a };
}
var un = Object.defineProperty, gn = Object.getOwnPropertyDescriptor, k = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? gn(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && un(t, i, o), o;
};
let w = class extends g {
  constructor() {
    super(...arguments), this.content = "", this.placement = $.top, this.alignment = Y.center, this.type = At.popover, this.showEvent = ne.all, this._spacing = 10, this._showCaret = !0, this._disabled = !1, this._closeOnClickOutside = !0, this._closeOnMouseLeave = !0, this._hideTimeout = 300, this._showTimeout = 100, this.cssClass = "", this._open = !1, this._panelTop = 0, this._panelLeft = 0, this._effectivePlacement = $.top, this._caretTop = 0, this._caretLeft = 0, this._animate = !1, this._triggerRef = null, this._panelRef = null, this._caretRef = null, this._boundDocumentClick = null, this._openFromClick = !1, this._tooltipId = `swim-tooltip-${Math.random().toString(36).slice(2, 11)}`, this._throttledPosition = () => {
      this._throttleTimeout == null && (this._throttleTimeout = window.setTimeout(() => {
        this._throttleTimeout = void 0, this._open && this._position();
      }, 100));
    }, this._panelForHideListeners = null, this._panelMouseEnterBound = () => this._clearHideTimer(), this._panelMouseLeaveBound = (e) => {
      var i;
      const t = e.relatedTarget;
      t && ((i = this._triggerRef) != null && i.contains(t)) || this.hide();
    }, this._onTriggerFocus = () => {
      this._listensFocus && this.show();
    }, this._onTriggerBlur = () => {
      this._listensFocus && this.hide(!0);
    }, this._onTriggerMouseEnter = () => {
      this._listensHover && this.show();
    }, this._onTriggerMouseLeave = (e) => {
      var n;
      const t = e.relatedTarget, i = this._panelRef ?? ((n = this.shadowRoot) == null ? void 0 : n.querySelector(".swim-tooltip__panel"));
      i != null && i.contains(t) || (this._listensHover && this.closeOnMouseLeave && this.hide(), this._listensClick && this.hide());
    }, this._onPanelMouseLeave = () => {
      this.closeOnMouseLeave && this.hide();
    }, this._onTriggerClick = () => {
      if (this.showEvent === ne.mouseover) {
        this.hide(!0);
        return;
      }
      this._listensClick && (this._openFromClick ? this.hide(!0) : (this._openFromClick = !0, this.show(!0)));
    };
  }
  get spacing() {
    return this._spacing;
  }
  set spacing(e) {
    this._spacing = x(e, 10);
  }
  get showCaret() {
    return this._showCaret;
  }
  set showCaret(e) {
    this._showCaret = c(e);
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(e) {
    this._disabled = c(e);
  }
  get closeOnClickOutside() {
    return this._closeOnClickOutside;
  }
  set closeOnClickOutside(e) {
    this._closeOnClickOutside = c(e);
  }
  get closeOnMouseLeave() {
    return this._closeOnMouseLeave;
  }
  set closeOnMouseLeave(e) {
    this._closeOnMouseLeave = c(e);
  }
  get hideTimeout() {
    return this._hideTimeout;
  }
  set hideTimeout(e) {
    this._hideTimeout = x(e, 300);
  }
  get showTimeout() {
    return this._showTimeout;
  }
  set showTimeout(e) {
    this._showTimeout = x(e, 100);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("resize", this._throttledPosition);
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this._throttledPosition), this._throttleTimeout != null && (window.clearTimeout(this._throttleTimeout), this._throttleTimeout = void 0), this._clearShowTimer(), this._clearHideTimer(), this._removeDocumentClick(), this._removePanelHideListeners(), super.disconnectedCallback();
  }
  /** Whether the host has a child with slot="content" (detected from light DOM so we can open before panel is rendered). */
  _hasContentSlot() {
    return !!this.querySelector('[slot="content"]');
  }
  get _listensFocus() {
    return this.showEvent === ne.all || this.showEvent === ne.focus;
  }
  get _listensHover() {
    return this.showEvent === ne.all || this.showEvent === ne.mouseover;
  }
  get _listensClick() {
    return this.showEvent === ne.all || this.showEvent === ne.click;
  }
  /** Opens the tooltip (optionally immediately, without show timeout). */
  show(e = !1) {
    if (this._open || this.disabled) return;
    this._clearShowTimer(), this._clearHideTimer();
    const t = () => {
      this._open || this.disabled || !(this._hasContentSlot || this.content != null && this.content !== "") || (this._open = !0, this._effectivePlacement = this.placement, requestAnimationFrame(() => {
        this._position(), requestAnimationFrame(() => {
          this._animate = !0, this._addHideListeners();
        });
      }), this.dispatchEvent(new CustomEvent("show", { detail: !0, bubbles: !0 })));
    };
    e ? t() : this._showTimer = window.setTimeout(t, this.showTimeout);
  }
  /** Hides the tooltip (optionally immediately). */
  hide(e = !1) {
    if (!this._open) return;
    this._clearShowTimer(), this._clearHideTimer();
    const t = () => {
      this._open && (this._open = !1, this._animate = !1, this._openFromClick = !1, this._removeDocumentClick(), this._removePanelHideListeners(), this.dispatchEvent(new CustomEvent("hide", { detail: !0, bubbles: !0 })));
    };
    e ? t() : this._hideTimer = window.setTimeout(t, this.hideTimeout);
  }
  _clearShowTimer() {
    this._showTimer != null && (window.clearTimeout(this._showTimer), this._showTimer = void 0);
  }
  _clearHideTimer() {
    this._hideTimer != null && (window.clearTimeout(this._hideTimer), this._hideTimer = void 0);
  }
  _removeDocumentClick() {
    this._boundDocumentClick && (document.removeEventListener("click", this._boundDocumentClick, !0), this._boundDocumentClick = null);
  }
  _position() {
    var y, P, he;
    const e = this._triggerRef ?? ((y = this.shadowRoot) == null ? void 0 : y.querySelector(".swim-tooltip__trigger")), t = this._panelRef ?? ((P = this.shadowRoot) == null ? void 0 : P.querySelector(".swim-tooltip__panel")), i = this._caretRef ?? ((he = this.shadowRoot) == null ? void 0 : he.querySelector(".swim-tooltip__caret"));
    if (!e || !t) return;
    const n = e.getBoundingClientRect();
    if (!n.height && !n.width) return;
    const o = t.getBoundingClientRect();
    this._effectivePlacement = dn(this.placement, o, n, this.spacing, this.alignment);
    const { top: r, left: a } = hn(this._effectivePlacement, o, n, this.spacing, this.alignment);
    if (this._panelTop = r, this._panelLeft = a, this.showCaret && i) {
      const Se = i.getBoundingClientRect(), G = pn(this._effectivePlacement, o, n, Se, this.alignment);
      this._caretTop = G.top, this._caretLeft = G.left;
    }
  }
  _removePanelHideListeners() {
    this._panelForHideListeners && (this._panelForHideListeners.removeEventListener("mouseenter", this._panelMouseEnterBound), this._panelForHideListeners.removeEventListener("mouseleave", this._panelMouseLeaveBound), this._panelForHideListeners = null);
  }
  _addHideListeners() {
    var t;
    const e = this._panelRef ?? ((t = this.shadowRoot) == null ? void 0 : t.querySelector(".swim-tooltip__panel"));
    e && (this._removePanelHideListeners(), this._panelForHideListeners = e, e.addEventListener("mouseenter", this._panelMouseEnterBound), this.closeOnMouseLeave && e.addEventListener("mouseleave", this._panelMouseLeaveBound), this.closeOnClickOutside && (this._boundDocumentClick = (i) => {
      var o;
      const n = i.target;
      e.contains(n) || (o = this._triggerRef) != null && o.contains(n) || this.hide(!0);
    }, setTimeout(() => document.addEventListener("click", this._boundDocumentClick, !0), 0)));
  }
  firstUpdated() {
    var e, t, i;
    this._triggerRef = (e = this.shadowRoot) == null ? void 0 : e.querySelector(".swim-tooltip__trigger"), this._panelRef = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".swim-tooltip__panel"), this._caretRef = (i = this.shadowRoot) == null ? void 0 : i.querySelector(".swim-tooltip__caret");
  }
  updated(e) {
    this._open && (e.has("placement") || e.has("alignment") || e.has("spacing")) && this._position();
  }
  render() {
    const e = this._hasContentSlot(), t = e || this.content != null && this.content !== "", i = [
      "swim-tooltip__panel",
      `swim-tooltip__panel--type-${this.type}`,
      `swim-tooltip__panel--position-${this._effectivePlacement}`,
      this._animate ? "swim-tooltip__panel--animate" : "",
      this.cssClass.includes("narrow") ? "swim-tooltip__panel--narrow" : ""
    ].filter(Boolean).join(" ");
    return l`
      <div
        part="trigger"
        class="swim-tooltip__trigger"
        aria-describedby="${this._open && t ? this._tooltipId : d}"
        aria-expanded="${this._listensClick ? this._open ? "true" : "false" : d}"
        @focusin="${this._onTriggerFocus}"
        @focusout="${this._onTriggerBlur}"
        @mouseenter="${this._onTriggerMouseEnter}"
        @mouseleave="${this._onTriggerMouseLeave}"
        @click="${this._onTriggerClick}"
      >
        <slot></slot>
      </div>

      ${this._open && t ? l`
            <div
              part="panel"
              id="${this._tooltipId}"
              class="${i}"
              style="top: ${this._panelTop}px; left: ${this._panelLeft}px;"
              role="tooltip"
              aria-hidden="false"
              @mouseenter="${() => this._clearHideTimer()}"
              @mouseleave="${this._onPanelMouseLeave}"
            >
              ${this.showCaret ? l`
                    <span
                      part="caret"
                      class="swim-tooltip__caret swim-tooltip__caret--position-${this._effectivePlacement}"
                      style="top: ${this._caretTop}px; left: ${this._caretLeft}px;"
                    ></span>
                  ` : ""}
              <div part="content" class="swim-tooltip__content">
                ${e ? l`<slot name="content"></slot>` : l`${Vt(this.content)}`}
              </div>
            </div>
          ` : ""}
    `;
  }
};
w.styles = ln;
k([
  s({ type: String })
], w.prototype, "content", 2);
k([
  s({ type: String, reflect: !0, attribute: "placement" })
], w.prototype, "placement", 2);
k([
  s({ type: String, reflect: !0, attribute: "alignment" })
], w.prototype, "alignment", 2);
k([
  s({ type: String, reflect: !0, attribute: "type" })
], w.prototype, "type", 2);
k([
  s({ type: String, attribute: "show-event" })
], w.prototype, "showEvent", 2);
k([
  s({ type: Number, attribute: "spacing" })
], w.prototype, "spacing", 1);
k([
  s({
    type: Boolean,
    attribute: "show-caret",
    converter: {
      fromAttribute: (e) => e !== "false",
      toAttribute: (e) => e ? "" : "false"
    }
  })
], w.prototype, "showCaret", 1);
k([
  s({ type: Boolean, reflect: !0 })
], w.prototype, "disabled", 1);
k([
  s({ type: Boolean, attribute: "close-on-click-outside" })
], w.prototype, "closeOnClickOutside", 1);
k([
  s({ type: Boolean, attribute: "close-on-mouse-leave" })
], w.prototype, "closeOnMouseLeave", 1);
k([
  s({ type: Number, attribute: "hide-timeout" })
], w.prototype, "hideTimeout", 1);
k([
  s({ type: Number, attribute: "show-timeout" })
], w.prototype, "showTimeout", 1);
k([
  s({ type: String, attribute: "css-class" })
], w.prototype, "cssClass", 2);
k([
  u()
], w.prototype, "_open", 2);
k([
  u()
], w.prototype, "_panelTop", 2);
k([
  u()
], w.prototype, "_panelLeft", 2);
k([
  u()
], w.prototype, "_effectivePlacement", 2);
k([
  u()
], w.prototype, "_caretTop", 2);
k([
  u()
], w.prototype, "_caretLeft", 2);
k([
  u()
], w.prototype, "_animate", 2);
w = k([
  b("swim-tooltip")
], w);
const bn = 40, mn = 2, fn = h`
  :host {
    --swim-navbar-bar-size: ${bn}px;
    --swim-navbar-bar-thickness: ${mn}px;
    display: inline-flex;
    align-items: center;
    min-height: 50px;
    position: relative;
    background-color: var(--grey-825);
    box-sizing: border-box;
  }

  .swim-navbar__nav-items {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .swim-navbar__bar-track {
    min-height: var(--swim-navbar-bar-thickness);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .swim-navbar__bar {
    position: absolute;
    width: var(--swim-navbar-bar-size);
    height: var(--swim-navbar-bar-thickness);
    background-color: var(--blue-500);
    transition: transform 300ms cubic-bezier(0.35, 0, 0.25, 1);
  }

  .swim-navbar__bar--bottom {
    bottom: 0;
  }

  .swim-navbar__bar--top {
    top: 0;
  }

  :host([bar-at-top]) .swim-navbar__bar-track {
    top: 0;
    bottom: auto;
  }
`, _n = h`
  :host {
    display: flex;
    font-size: 15pt;
    color: var(--grey-400);
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    padding: var(--spacing-8) 10px var(--spacing-0) 10px;
    box-sizing: border-box;
  }

  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    outline: 2px solid var(--blue-400);
    outline-offset: 2px;
    border-radius: var(--radius-2);
  }

  :host(:hover),
  :host(.swim-navbar-item--active) {
    color: var(--blue-400);
  }
`;
var vn = Object.defineProperty, xn = Object.getOwnPropertyDescriptor, Ge = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? xn(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && vn(t, i, o), o;
};
let ge = class extends g {
  constructor() {
    super(...arguments), this._active = 0, this._total = 0, this._index = 0, this._clickBound = () => this._handleClick();
  }
  get active() {
    return this._active;
  }
  set active(e) {
    const t = x(e, 0);
    if (this._active !== t) {
      const i = this._active;
      this._active = t, this.requestUpdate("active", i);
    }
  }
  get total() {
    return this._total;
  }
  set total(e) {
    this._total = x(e, 0);
  }
  get index() {
    return this._index;
  }
  set index(e) {
    const t = x(e, 0);
    if (this._index !== t) {
      const i = this._index;
      this._index = t, this.requestUpdate("index", i);
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this._clickBound);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this._clickBound), super.disconnectedCallback();
  }
  render() {
    const e = this._active === this._index;
    return l`
      <div
        class="swim-navbar-item ${e ? "swim-navbar-item--active" : ""}"
        role="tab"
        aria-selected="${e}"
        tabindex="${e ? 0 : -1}"
        @keydown="${this._handleKeyDown}"
      >
        <slot></slot>
      </div>
    `;
  }
  /**
   * Activate this item (sets active to index and dispatches active-change).
   * Called by parent navbar or programmatically.
   */
  setActive() {
    this._active !== this._index && (this._active = this._index, this.requestUpdate(), this.dispatchEvent(
      new CustomEvent("active-change", {
        detail: this._index,
        bubbles: !0,
        composed: !0
      })
    ));
  }
  _handleClick() {
    this.setActive();
  }
  _handleKeyDown(e) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.setActive());
  }
};
ge.styles = [m, _n];
Ge([
  s({ type: Number })
], ge.prototype, "active", 1);
Ge([
  s({ type: Number })
], ge.prototype, "total", 1);
Ge([
  s({ type: Number })
], ge.prototype, "index", 1);
ge = Ge([
  b("swim-navbar-item")
], ge);
var wn = Object.defineProperty, yn = Object.getOwnPropertyDescriptor, Ae = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? yn(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && wn(t, i, o), o;
};
const kn = 40;
let be = class extends g {
  constructor() {
    super(...arguments), this._barAtTop = !1, this._active = 0, this._navItems = [], this._slotChangeBound = () => this._syncFromSlot(), this._activeChangeBound = (e) => this._onItemActiveChange(e);
  }
  get barAtTop() {
    return this._barAtTop;
  }
  set barAtTop(e) {
    this._barAtTop = c(e);
  }
  get active() {
    return this._active;
  }
  set active(e) {
    const t = x(e, 0);
    t !== this._active && !isNaN(t) && t >= 0 && (!this._navItems.length || t < this._navItems.length) && (this._active = t, this._syncItems(), this.dispatchEvent(
      new CustomEvent("active-change", {
        detail: this._active,
        bubbles: !0,
        composed: !0
      })
    ));
  }
  connectedCallback() {
    super.connectedCallback(), requestAnimationFrame(() => this._syncFromSlot());
  }
  firstUpdated() {
    var t;
    this._syncFromSlot();
    const e = this._slotEl ?? ((t = this.shadowRoot) == null ? void 0 : t.querySelector("slot"));
    e && e.addEventListener("slotchange", this._slotChangeBound);
  }
  disconnectedCallback() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("slot");
    e && e.removeEventListener("slotchange", this._slotChangeBound), this._navItems.forEach((i) => {
      i.removeEventListener("active-change", this._activeChangeBound);
    }), super.disconnectedCallback();
  }
  /**
   * Activate the item at the given index (zero-based). No-op if index is out of range or already active.
   */
  goTo(e) {
    const t = x(e, -1);
    if (t >= 0 && t < this._navItems.length && t !== this._active) {
      const i = this._navItems[t];
      i && i.setActive();
    }
  }
  _syncFromSlot() {
    var n;
    const e = this._slotEl ?? ((n = this.shadowRoot) == null ? void 0 : n.querySelector("slot"));
    let t = (e == null ? void 0 : e.assignedElements({ flatten: !0 })) ?? [];
    t.length === 0 && (t = Array.from(this.children));
    const i = t.filter((o) => o instanceof ge);
    this._navItems.forEach((o) => {
      o.removeEventListener("active-change", this._activeChangeBound);
    }), this._navItems = i, i.forEach((o) => {
      o.addEventListener("active-change", this._activeChangeBound);
    }), this._syncItems();
  }
  _syncItems() {
    const e = this._active, t = this._navItems.length;
    this._navItems.forEach((i, n) => {
      i.index = n, i.total = t, i.active = e;
    });
  }
  _onItemActiveChange(e) {
    const t = e.detail;
    typeof t != "number" || t === this._active || t >= 0 && t < this._navItems.length && (this._active = t, this._syncItems(), this.requestUpdate(), this.dispatchEvent(
      new CustomEvent("active-change", {
        detail: this._active,
        bubbles: !0,
        composed: !0
      })
    ));
  }
  _getBarTransform() {
    const e = this._navItems.filter((t, i) => i < this._active).length;
    return `translateX(${kn * e}px)`;
  }
  render() {
    const e = this._barAtTop;
    return l`
      <div class="swim-navbar__nav-items" part="nav-items" role="tablist">
        <slot></slot>
      </div>
      <div class="swim-navbar__bar-track" part="bar-track">
        <div
          class="swim-navbar__bar ${e ? "swim-navbar__bar--top" : "swim-navbar__bar--bottom"}"
          part="bar"
          style="transform: ${this._getBarTransform()}"
        ></div>
      </div>
    `;
  }
};
be.styles = [m, fn];
Ae([
  T("slot")
], be.prototype, "_slotEl", 2);
Ae([
  s({ type: Boolean, reflect: !0, attribute: "bar-at-top" })
], be.prototype, "barAtTop", 1);
Ae([
  s({ type: Number })
], be.prototype, "active", 1);
Ae([
  u()
], be.prototype, "_navItems", 2);
be = Ae([
  b("swim-navbar")
], be);
const $n = [
  m,
  h`
    :host {
      display: block;
    }

    .swim-list__headers-container {
      padding-inline: var(--spacing-16);
      margin-inline: var(--spacing-16);
      display: grid;
      gap: var(--spacing-16);
      align-items: center;
    }

    .swim-list__headers-container--scrollable {
      margin-right: 1.75rem;
    }

    .swim-list__header-cell {
      color: var(--white);
      font-size: 14px;
      font-weight: var(--font-weight-bold);
      line-height: 22px;
    }

    .swim-list__divider {
      border-top: 1px solid var(--grey-600);
      border-bottom: 1px solid var(--grey-600);
      opacity: 0.75;
      margin: 0.75rem 0 0.5rem 0;
    }

    .swim-list__rows-container {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .swim-list__row {
      background-color: var(--grey-800);
      border: 1px solid var(--grey-600);
      border-radius: var(--radius-4);
      display: grid;
      align-items: center;
      height: 40px;
      margin: 0.25rem 1rem 0 1rem;
      padding-inline: var(--spacing-16);
      position: relative;
      gap: var(--spacing-16);
      box-sizing: border-box;
    }

    .swim-list__row::before {
      content: '';
      width: 3px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-top-left-radius: var(--radius-4);
      border-bottom-left-radius: var(--radius-4);
    }

    .swim-list__row--error::before {
      background-color: var(--red-500);
    }

    .swim-list__row--success::before {
      background-color: var(--green-500);
    }

    .swim-list__row--warning::before {
      background-color: var(--orange-400);
    }

    .swim-list__cell {
      color: var(--grey-050);
      font-size: var(--font-size-m);
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  `
];
var Ie = /* @__PURE__ */ ((e) => (e.Error = "error", e.Success = "success", e.Warning = "warning", e))(Ie || {}), Cn = Object.defineProperty, Sn = Object.getOwnPropertyDescriptor, te = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Sn(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Cn(t, i, o), o;
};
const xt = 44;
let j = class extends g {
  constructor() {
    super(...arguments), this.columnLayout = "", this.dataSource = [], this.defaultRowStatus = Ie.Error, this.headerLabels = [], this.columns = [], this._hasScrollbar = !1, this._page = 1, this._rowsContainer = null, this._scrollBound = (e) => this._emitScrollChanges(e);
  }
  get height() {
    return this._height;
  }
  set height(e) {
    this._height = e === void 0 ? void 0 : x(e);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    var e;
    this._rowsContainer = ((e = this.renderRoot) == null ? void 0 : e.querySelector(".swim-list__rows-container")) ?? null, this._rowsContainer && (this._rowsContainer.addEventListener("scroll", this._scrollBound), requestAnimationFrame(() => {
      var t;
      if (this._updateScrollbarState(), (t = this.paginationConfig) != null && t.index && this.paginationConfig.index > 1 && this.paginationConfig.pageSize > 0) {
        this._page = this.paginationConfig.index;
        const i = xt * (this.paginationConfig.pageSize * (this._page - 1));
        this._rowsContainer.scrollTo({ top: i });
      }
    }));
  }
  disconnectedCallback() {
    this._rowsContainer && (this._rowsContainer.removeEventListener("scroll", this._scrollBound), this._rowsContainer = null), super.disconnectedCallback();
  }
  updated(e) {
    (e.has("dataSource") || e.has("height")) && this._updateScrollbarState();
  }
  _updateScrollbarState() {
    this._rowsContainer && (this._hasScrollbar = this._rowsContainer.scrollHeight > this._rowsContainer.clientHeight);
  }
  _emitScrollChanges(e) {
    var o;
    const i = e.target.scrollTop;
    this.dispatchEvent(new CustomEvent("scroll", { detail: i, bubbles: !0 }));
    const n = (o = this.paginationConfig) == null ? void 0 : o.pageSize;
    if (n) {
      const r = Math.floor(i / xt), a = Math.floor(r / n) + 1;
      a !== this._page && (this._page = a, this.dispatchEvent(new CustomEvent("page-change", { detail: a, bubbles: !0 })));
    }
  }
  _getGridStyle() {
    const e = Math.max(this.headerLabels.length, this.columns.length, 1);
    return this.columnLayout && this.columnLayout.trim() ? this.columnLayout.trim() : `repeat(${e}, 1fr)`;
  }
  _getRowStatus(e) {
    const t = e.status;
    return t === Ie.Error || t === Ie.Success || t === Ie.Warning ? t : this.defaultRowStatus;
  }
  _getCellValue(e, t, i) {
    if (t === "$index")
      return `${i + 1}.`;
    const n = e[t];
    return n == null ? "" : String(n);
  }
  render() {
    const e = this._getGridStyle(), t = Math.max(this.headerLabels.length, this.columns.length, 1), i = this.headerLabels.length >= t ? this.headerLabels.slice(0, t) : [...this.headerLabels, ...Array(t - this.headerLabels.length).fill("")];
    return l`
      <div
        class="swim-list__headers-container ${this._hasScrollbar ? "swim-list__headers-container--scrollable" : ""}"
        style="grid-template-columns: ${e}"
      >
        ${i.map((n) => l`<span class="swim-list__header-cell">${n}</span>`)}
      </div>
      <hr class="swim-list__divider" />
      <div class="swim-list__rows-container" style=${this._height !== void 0 ? `height: ${this._height}px` : ""}>
        ${this.dataSource.map((n, o) => {
      const r = this._getRowStatus(n);
      return l`
            <div class="swim-list__row swim-list__row--${r}" style="grid-template-columns: ${e}">
              ${this.columns.map(
        (a) => l` <span class="swim-list__cell">${this._getCellValue(n, a, o)}</span> `
      )}
            </div>
          `;
    })}
      </div>
    `;
  }
};
j.styles = $n;
te([
  s({ type: String, attribute: "column-layout" })
], j.prototype, "columnLayout", 2);
te([
  s({ type: Array, attribute: !1 })
], j.prototype, "dataSource", 2);
te([
  s({ type: Number })
], j.prototype, "height", 1);
te([
  s({ attribute: !1 })
], j.prototype, "paginationConfig", 2);
te([
  s({ type: String, attribute: "default-row-status", reflect: !0 })
], j.prototype, "defaultRowStatus", 2);
te([
  s({ type: Array, attribute: !1 })
], j.prototype, "headerLabels", 2);
te([
  s({ type: Array, attribute: !1 })
], j.prototype, "columns", 2);
te([
  u()
], j.prototype, "_hasScrollbar", 2);
te([
  u()
], j.prototype, "_page", 2);
j = te([
  b("swim-list")
], j);
const Fn = {
  // Blue
  blue100: "rgb(224, 239, 255)",
  blue200: "rgb(173, 212, 255)",
  blue300: "rgb(122, 185, 255)",
  blue400: "rgb(71, 158, 255)",
  blue500: "rgb(20, 131, 255)",
  blue600: "rgb(0, 106, 224)",
  blue700: "rgb(0, 82, 173)",
  blue800: "rgb(0, 58, 122)",
  blue900: "rgb(0, 34, 71)",
  // Light Blue
  lightblue100: "rgb(234, 249, 255)",
  lightblue200: "rgb(184, 234, 254)",
  lightblue300: "rgb(134, 219, 253)",
  lightblue400: "rgb(84, 205, 252)",
  lightblue500: "rgb(34, 190, 251)",
  lightblue600: "rgb(4, 166, 230)",
  lightblue700: "rgb(3, 130, 180)",
  lightblue800: "rgb(2, 94, 130)",
  lightblue900: "rgb(1, 58, 80)",
  // Green
  green100: "rgb(206, 249, 240)",
  green200: "rgb(161, 243, 226)",
  green300: "rgb(116, 237, 212)",
  green400: "rgb(71, 231, 198)",
  green500: "rgb(29, 222, 182)",
  green600: "rgb(23, 177, 145)",
  green700: "rgb(17, 132, 108)",
  green800: "rgb(11, 87, 71)",
  green900: "rgb(5, 42, 34)",
  // Orange
  orange100: "rgb(255, 244, 224)",
  orange200: "rgb(255, 225, 173)",
  orange300: "rgb(255, 206, 122)",
  orange400: "rgb(255, 187, 71)",
  orange500: "rgb(255, 168, 20)",
  orange600: "rgb(224, 141, 0)",
  orange700: "rgb(173, 109, 0)",
  orange800: "rgb(122, 77, 0)",
  orange900: "rgb(71, 45, 0)",
  // Red
  red100: "rgb(255, 230, 224)",
  red200: "rgb(255, 190, 173)",
  red300: "rgb(255, 150, 122)",
  red400: "rgb(255, 109, 71)",
  red500: "rgb(255, 69, 20)",
  red600: "rgb(224, 47, 0)",
  red700: "rgb(173, 36, 0)",
  red800: "rgb(122, 25, 0)",
  red900: "rgb(71, 15, 0)",
  // Purple
  purple100: "rgb(255, 255, 255)",
  purple200: "rgb(239, 234, 252)",
  purple300: "rgb(205, 190, 245)",
  purple400: "rgb(172, 145, 239)",
  purple500: "rgb(138, 101, 232)",
  purple600: "rgb(104, 57, 225)",
  purple700: "rgb(78, 30, 201)",
  purple800: "rgb(61, 23, 157)",
  purple900: "rgb(44, 17, 112)",
  // Grey
  grey050: "rgb(235, 237, 242)",
  grey100: "rgb(205, 210, 221)",
  grey150: "rgb(190, 197, 211)",
  grey200: "rgb(175, 183, 200)",
  grey250: "rgb(160, 170, 190)",
  grey300: "rgb(144, 156, 180)",
  grey350: "rgb(129, 143, 169)",
  grey400: "rgb(114, 129, 159)",
  grey450: "rgb(100, 116, 147)",
  grey500: "rgb(90, 104, 132)",
  grey550: "rgb(80, 92, 117)",
  grey600: "rgb(69, 80, 102)",
  grey650: "rgb(59, 68, 87)",
  grey700: "rgb(49, 56, 71)",
  grey725: "rgb(43, 50, 64)",
  grey750: "rgb(38, 44, 56)",
  grey775: "rgb(33, 38, 49)",
  grey800: "rgb(28, 32, 41)",
  grey825: "rgb(23, 26, 33)",
  grey850: "rgb(18, 20, 26)",
  grey875: "rgb(12, 14, 18)",
  grey900: "rgb(7, 8, 11)",
  // Base
  white: "rgb(255, 255, 255)",
  black: "rgb(0, 0, 0)"
}, An = {
  // Font sizes
  fontSizeBase: "16px",
  fontSizeXXS: "0.625rem",
  // 10px
  fontSizeXS: "0.75rem",
  // 12px
  fontSizeS: "0.875rem",
  // 14px
  fontSizeM: "1rem",
  // 16px
  fontSizeL: "1.125rem",
  // 18px
  fontSizeXL: "1.25rem",
  // 20px
  fontSize2XL: "1.5rem",
  // 24px
  fontSize3XL: "1.75rem",
  // 28px
  fontSize4XL: "2rem",
  // 32px
  fontSize5XL: "2.25rem",
  // 36px
  fontSize6XL: "3rem",
  // 48px
  // Line heights
  fontLineHeight100: "1.1",
  fontLineHeight200: "1.42",
  fontLineHeight300: "20px",
  fontLineHeight400: "40px",
  // Font weights
  fontWeightLight: "300",
  fontWeightRegular: "400",
  fontWeightSemibold: "600",
  fontWeightBold: "700"
}, Dn = {
  spacing0: "0",
  spacing2: "2px",
  spacing4: "4px",
  spacing8: "8px",
  spacing10: "10px",
  spacing16: "16px",
  spacing24: "24px",
  spacing32: "32px"
}, Hn = {
  radius2: "2px",
  radius4: "4px",
  radius8: "8px"
};
export {
  Y as AlignmentType,
  wt as ButtonGroupOrientation,
  kt as ButtonGroupStyle,
  yt as ButtonGroupVariant,
  L as ButtonState,
  Ct as CardAppearance,
  $t as CardOrientation,
  St as CardPlaceholderSize,
  Pe as CardStatus,
  Ee as DialogFormat,
  tt as InputAppearance,
  it as InputSize,
  ie as InputTypes,
  Ie as ListRowStatus,
  $ as PlacementType,
  ve as ProgressSpinnerMode,
  Tt as SectionAppearance,
  ne as ShowType,
  oe as SpinnerAppearance,
  xe as SplitDirection,
  At as StyleType,
  B as SwimButton,
  ye as SwimButtonGroup,
  re as SwimButtonToggle,
  q as SwimButtonToggleGroup,
  F as SwimCard,
  ke as SwimCardAvatar,
  Ye as SwimCardBody,
  je as SwimCardFooter,
  Te as SwimCardHeader,
  qe as SwimCardPlaceholder,
  A as SwimCheckbox,
  S as SwimDialog,
  ce as SwimIcon,
  p as SwimInput,
  se as SwimLargeFormatDialogContent,
  Re as SwimLargeFormatDialogFooter,
  j as SwimList,
  be as SwimNavbar,
  ge as SwimNavbarItem,
  z as SwimProgressSpinner,
  H as SwimRadio,
  V as SwimRadioGroup,
  D as SwimSection,
  Ze as SwimSectionHeader,
  f as SwimSelect,
  C as SwimSlider,
  Oe as SwimSplit,
  pe as SwimSplitArea,
  Le as SwimSplitHandle,
  Q as SwimTab,
  ue as SwimTabs,
  M as SwimToggle,
  w as SwimTooltip,
  Ft as TabsAppearance,
  He as TogglePosition,
  m as baseStyles,
  ui as cardComponentStyles,
  hi as cardHorizontalStyles,
  di as cardStyles,
  pi as cardVerticalStyles,
  c as coerceBooleanProperty,
  x as coerceNumberProperty,
  Fn as colors,
  Nt as convertClass,
  Bn as globalStyles,
  Wt as iconRegistry,
  Hn as radius,
  It as scrollbarStyles,
  Dn as spacing,
  An as typography
};
