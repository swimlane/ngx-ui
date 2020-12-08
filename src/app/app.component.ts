import { Component, ViewEncapsulation } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { DrawerService, LoadingService } from '@swimlane/ngx-ui';
import Prism from 'prismjs';
import 'prismjs/plugins/custom-class/prism-custom-class';

import { version } from '../../projects/swimlane/ngx-ui/package.json';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.template.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  version = version;
  searchValue: string = '';
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
          name: 'Calendar',
          route: 'calendar'
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
        }
      ]
    }
  ];
  /* end of naviation tree */

  navExpanded: boolean = true;

  constructor(private drawerMngr: DrawerService, private loadingService: LoadingService, private router: Router) {
    Prism.plugins.customClass.prefix('prism--');

    // Adding loading component in router
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.start();
      } else if (event instanceof NavigationEnd) {
        this.loadingService.complete();
        this.drawerMngr.destroyAll();
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
