/**
 * Demo application for @swimlane/swim-ui
 * Registers all components, then runs demo initialization when the DOM is ready.
 *
 * Icon font is loaded via assets/lit-icons.css (@font-face for ngx-icon).
 */

// Import components (side effect: register custom elements)
import '../../src/components/button/button.component';
import '../../src/components/button-group/button-group.component';
import '../../src/components/icon/icon.component';
import '../../src/components/input/input.component';
import '../../src/components/select/select.component';
import '../../src/components/select/select-option.component';
import '../../src/components/tabs/tab.component';
import '../../src/components/tabs/tabs.component';
import '../../src/components/button-toggle/button-toggle.component';
import '../../src/components/button-toggle/button-toggle-group.component';
import '../../src/components/card/card.component';
import '../../src/components/card/card-header.component';
import '../../src/components/card/card-footer.component';
import '../../src/components/card/card-avatar.component';
import '../../src/components/card/card-placeholder.component';
import '../../src/components/card/card-body.component';
import '../../src/components/checkbox/checkbox.component';
import '../../src/components/radio/radio.component';
import '../../src/components/radio/radio-group.component';
import '../../src/components/toggle/toggle.component';
import '../../src/components/section/section.component';
import '../../src/components/section/section-header.component';
import '../../src/components/slider/slider.component';
import '../../src/components/split/split-area.component';
import '../../src/components/split/split-handle.component';
import '../../src/components/split/split.component';
import '../../src/components/progress-spinner/progress-spinner.component';
import '../../src/components/tooltip/tooltip.component';
import '../../src/components/navbar/navbar.component';
import '../../src/components/navbar/navbar-item.component';
import '../../src/components/list/list.component';
import '../../src/components/dialog/dialog.component';
import '../../src/components/dialog/large-format-dialog-content/large-format-dialog-content.component';
import '../../src/components/dialog/large-format-dialog-footer/large-format-dialog-footer.component';
import '../../src/components/date-time/date-time.component';
import '../../src/components/drawer/drawer.component';
import { scrollbarStyles } from '../../src/styles';

import { initDemos } from './demo-init';

document.addEventListener('DOMContentLoaded', () => {
  // Inject scrollbar utility styles globally so .main.swim-scroll and section demos work
  const sheet = (scrollbarStyles as { styleSheet?: CSSStyleSheet }).styleSheet;
  if (sheet) {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }

  initDemos();
});
