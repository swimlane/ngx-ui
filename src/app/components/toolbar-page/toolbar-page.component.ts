/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-toolbar-page',
  templateUrl: './toolbar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ToolbarPageComponent {
  toolbarMenu = [
    {
      label: 'File',
      click: () => {
        console.log('File clicked');
      }
    },
    {
      label: 'Run',
      disabled: true
    },
    {
      label: 'Edit',
      dropdown: true,
      click: () => {
        console.log('Edit clicked');
      }
    }
  ];

  menuClicked(event) {
    console.log('Menu clicked', event);
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
