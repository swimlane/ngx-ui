import { Component } from '@angular/core';
import { DocMenuItem } from '@swimlane/ngx-doc';
import { environment } from '../environments/environment';

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styles: [
    // language=scss
    `
      :host ::ng-deep {
        display: block;

        & .logo-container {
          display: flex;
          gap: 4rem;
          align-items: center;

          &[data-collapsed='true'] {
            justify-content: center;
          }

          & .swimlane-logo {
            height: 2rem;
            width: 2rem;

            & svg {
              height: 2rem;
              width: 2rem;
            }
          }

          & .library-name {
            & svg {
              height: 2rem;
              width: 6rem;
            }
          }
        }
      }
    `,
  ],
})
export class AppComponent {
  version = environment.version;

  navigationItems: DocMenuItem[] = [
    {
      name: 'Style',
      icon: 'formula',
      children: [
        {
          name: 'Typography',
          route: 'typography',
        },
        {
          name: 'Colors',
          route: 'colors',
        },
        {
          name: 'Layout',
          route: 'layout',
        },
        {
          name: 'Icons',
          route: 'icons',
        },
      ],
    },
    {
      name: 'Animations',
      route: 'animations',
      icon: 'stars',
    },
    {
      name: 'Pipes',
      route: 'pipes',
      icon: 'code',
    },
    {
      name: 'Controllers',
      route: 'controllers',
      icon:'condition',
      children: [
        {
          name: 'Introduction',
          route: 'controllers',
        },
        {
          name: 'Forms',
          route: 'controller-forms',
        },
      ],
    },
    {
      name: 'Forms',
      icon: 'application',
      children: [
        {
          name: 'Inputs',
          route: 'inputs',
        },
        {
          name: 'Buttons',
          route: 'buttons',
        },
        {
          name: 'Selects',
          route: 'selects',
        },
        {
          name: 'Date/Time Pickers',
          route: 'datetime',
        },
        {
          name: 'Slider',
          route: 'slider',
        },
        {
          name: 'Toggle',
          route: 'toggle',
        },
        {
          name: 'Checkbox',
          route: 'checkbox',
        },
        {
          name: 'Radio Button',
          route: 'radio',
        },
        {
          name: 'Calendar',
          route: 'calendar',
        },
        {
          name: 'Code Editor',
          route: 'code-editor',
        },
      ],
    },
    {
      name: 'Elements',
      icon: 'apps',
      children: [
        {
          name: 'Tables',
          route: 'table',
        },
        {
          name: 'Tags',
          route: 'tags',
        },
        {
          name: 'Lists',
          route: 'lists',
        },
        {
          name: 'Scrollbars',
          route: 'scrollbars',
        },
      ],
    },
    {
      name: 'Dialogs',
      icon: 'applet',
      children: [
        {
          name: 'Drawer',
          route: 'drawer',
        },
        {
          name: 'Nag',
          route: 'nag',
        },
        {
          name: 'Dialog',
          route: 'dialog',
        },
        {
          name: 'Alert/Confirm',
          route: 'alert',
        },
        {
          name: 'Tooltip',
          route: 'tooltip',
        },
        {
          name: 'Notification',
          route: 'notification',
        },
      ],
    },
    {
      name: 'Components',
      icon: 'integrations',
      children: [
        {
          name: 'Sections',
          route: 'sections',
        },
        {
          name: 'Toolbar',
          route: 'toolbar',
        },
        {
          name: 'Tabs',
          route: 'tabs',
        },
        {
          name: 'Dropdown',
          route: 'dropdown',
        },
        {
          name: 'Loading',
          route: 'loading',
        },
        {
          name: 'Progress Spinner',
          route: 'progress-spinner',
        },
        {
          name: 'Plus Menu',
          route: 'plus-menu',
        },
        {
          name: 'Tree',
          route: 'tree',
        },
        {
          name: 'JSON Editor',
          route: 'json-editor',
        },
        {
          name: 'Icon',
          route: 'ngx-icon',
        },
        {
          name: 'Split',
          route: 'split',
        },
        {
          name: 'Navbar',
          route: 'navbar',
        },
        {
          name: 'Stepper',
          route: 'stepper',
        },
        {
          name: 'Overlay',
          route: 'overlay',
        },
        {
          name: 'Hotkeys',
          route: 'hotkeys',
        },
        {
          name: 'Tip',
          route: 'tip',
        },
        {
          name: 'Card',
          route: 'card',
        },
      ],
    },
  ];
}
