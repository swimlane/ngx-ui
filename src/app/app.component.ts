import { Component, ViewEncapsulation } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { DrawerService, LoadingService } from '@swimlane/ngx-ui';
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
      name: 'Colors',
      route: 'colors',
      icon: 'formula'
    },
    {
      name: 'Typography',
      route: 'typography',
      icon: 'field-text'
    },
    {
      name: 'Icons',
      route: 'icons',
      icon: 'field-grid'
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
          name: 'Datatable',
          route: 'datatable'
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
          name: 'Overlay',
          route: 'overlay'
        },
        {
          name: 'Hotkeys',
          route: 'hotkeys'
        }
      ]
    }
  ];
  /* end of naviation tree */

  navExpanded: boolean = true;

  constructor(private drawerMngr: DrawerService, private loadingService: LoadingService, private router: Router) {
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
    const tree = this.deepCloneTree();

    if (!updatedVal) {
      this.filteredNavigationTree = tree;
    }

    updatedVal = updatedVal.toLowerCase();
    this.filteredNavigationTree = tree.map(nav => {
      if (nav.children) {
        nav.children = nav.children.filter(child => child.name.toLowerCase().includes(updatedVal));
      }

      return nav;
    });
  }

  private deepCloneTree() {
    return JSON.parse(JSON.stringify(this.navigationTree));
  }
}
