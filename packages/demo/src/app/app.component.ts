import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DrawerService } from '@swimlane/ngx-ui/drawer';
import 'prismjs/plugins/custom-class/prism-custom-class';
import { LoadingService } from '../../../ngx-ui/loading/src/lib/services';
import { environment } from '../environments/environment';

interface NavigationItem {
  name: string;
  expanded?: boolean;
  icon?: string;
  route?: string;
  children?: NavigationItem[];
}

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  version = environment.version;
  searchValue = '';
  filteredNavigationTree: NavigationItem[];

  navigationTree: NavigationItem[] = [
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

  navExpanded = true;

  constructor(
    private readonly drawerService: DrawerService,
    private readonly loadingService: LoadingService,
    private readonly router: Router
  ) {
    // Add loading component in router
    this.router.events.subscribe(event => {
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
          ? nav.children.filter((child: NavigationItem) => child.name.toLowerCase().includes(updatedVal))
          : undefined
      };
    });
  }

  trackByName(_index: number, item: NavigationItem): string {
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
