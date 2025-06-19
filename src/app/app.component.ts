import { Component, ViewEncapsulation } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DrawerService, LoadingService } from '@swimlane/ngx-ui';
import * as Prism from 'prismjs';
import 'prismjs/plugins/custom-class/prism-custom-class';

import pkg from '../../projects/swimlane/ngx-ui/package.json';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.template.html',
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class AppComponent {
  version = pkg.version;
  searchValue = '';
  filteredNavigationTree: any[];

  navigationTree: any[] = [
    {
      name: 'Style',
      icon: 'formula',
      children: [
        {
          name: 'Typography',
          route: 'typography'
        },
        {
          name: 'Colors',
          route: 'colors'
        },
        {
          name: 'Layout',
          route: 'layout'
        },
        {
          name: 'Icons',
          route: 'icons'
        }
      ]
    },
    {
      name: 'Animations',
      route: 'animations',
      icon: 'stars'
    },
    {
      name: 'Pipes',
      route: 'pipes',
      icon: 'code'
    },
    {
      name: 'Forms',
      icon: 'application',
      children: [
        {
          name: 'Inputs',
          route: 'inputs'
        },
        {
          name: 'Buttons',
          route: 'buttons'
        },
        {
          name: 'Button Toggle',
          route: 'button-toggle'
        },
        {
          name: 'Selects',
          route: 'selects'
        },
        {
          name: 'Date/Time Pickers',
          route: 'datetime'
        },
        {
          name: 'Slider',
          route: 'slider'
        },
        {
          name: 'Toggle',
          route: 'toggle'
        },
        {
          name: 'Checkbox',
          route: 'checkbox'
        },
        {
          name: 'Radio Button',
          route: 'radio'
        },
        {
          name: 'Code Editor',
          route: 'code-editor'
        }
      ]
    },
    {
      name: 'Elements',
      icon: 'apps',
      children: [
        {
          name: 'Tables',
          route: 'table'
        },
        {
          name: 'Tags',
          route: 'tags'
        },
        {
          name: 'Lists',
          route: 'lists'
        },
        {
          name: 'Scrollbars',
          route: 'scrollbars'
        }
      ]
    },
    {
      name: 'Dialogs',
      icon: 'applet',
      children: [
        {
          name: 'Drawer',
          route: 'drawer'
        },
        {
          name: 'Nag',
          route: 'nag'
        },
        {
          name: 'Dialog',
          route: 'dialog'
        },
        {
          name: 'Dialog - Large Format',
          route: 'dialog-large-format'
        },
        {
          name: 'Dialog - Medium Format',
          route: 'dialog-medium-format'
        },
        {
          name: 'Alert/Confirm',
          route: 'alert'
        },
        {
          name: 'Tooltip',
          route: 'tooltip'
        },
        {
          name: 'Notification',
          route: 'notification'
        }
      ]
    },
    {
      name: 'Components',
      icon: 'integrations',
      children: [
        {
          name: 'Sections',
          route: 'sections'
        },
        {
          name: 'Toolbar',
          route: 'toolbar'
        },
        {
          name: 'Tabs',
          route: 'tabs'
        },
        {
          name: 'Dropdown',
          route: 'dropdown'
        },
        {
          name: 'Calendar',
          route: 'calendar'
        },
        {
          name: 'Date/Time Display',
          route: 'time-display'
        },
        {
          name: 'Filters',
          route: 'filters'
        },
        {
          name: 'Filters Button',
          route: 'filters-button'
        },
        {
          name: 'Loading',
          route: 'loading'
        },
        {
          name: 'Progress Spinner',
          route: 'progress-spinner'
        },
        {
          name: 'Plus Menu',
          route: 'plus-menu'
        },
        {
          name: 'Tree',
          route: 'tree'
        },
        {
          name: 'JSON Editor',
          route: 'json-editor'
        },
        {
          name: 'Icon',
          route: 'ngx-icon'
        },
        {
          name: 'Split',
          route: 'split'
        },
        {
          name: 'Navbar',
          route: 'navbar'
        },
        {
          name: 'Stepper',
          route: 'stepper'
        },
        {
          name: 'Overlay',
          route: 'overlay'
        },
        {
          name: 'Hotkeys',
          route: 'hotkeys'
        },
        {
          name: 'Tip',
          route: 'tip'
        },
        {
          name: 'Card',
          route: 'card'
        },
        {
          name: 'Dropzone',
          route: 'dropzone'
        },
        {
          name: 'Columns',
          route: 'columns'
        },
        {
          name: 'ButtonGroup',
          route: 'button-group'
        },
        {
          name: 'List',
          route: 'list'
        }
      ]
    }
  ];
  /* end of navigation tree */

  navExpanded = true;

  constructor(private drawerService: DrawerService, private loadingService: LoadingService, private router: Router) {
    Prism.plugins.customClass.prefix('prism--');

    // Adding loading component in router
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.start();
      } else if (event instanceof NavigationEnd) {
        this.loadingService.complete();
        this.drawerService.destroyAll();
      }
    });

    this.filteredNavigationTree = this.deepCloneTree();
  }

  updateSearchValue(updatedVal: string) {
    if (!updatedVal) {
      this.filteredNavigationTree = this.deepCloneTree();
    }

    updatedVal = updatedVal.toLowerCase();
    this.filteredNavigationTree = this.navigationTree.map(nav => {
      return {
        ...nav,
        children: nav.children?.length
          ? nav.children.filter((child: any) => child.name.toLowerCase().includes(updatedVal))
          : undefined
      };
    });
  }

  trackByName(_index: number, item: any): string {
    return item.name;
  }

  private deepCloneTree() {
    return [
      ...this.navigationTree.map(nav => {
        return {
          ...nav,
          children: nav.children ? [...nav.children] : undefined
        };
      })
    ];
  }
}
