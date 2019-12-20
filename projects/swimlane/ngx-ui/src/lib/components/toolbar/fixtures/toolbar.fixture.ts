import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ToolbarComponent } from '../toolbar.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'toolbar-fixture',
  templateUrl: 'toolbar.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarFixtureComponent {
  @ViewChild('toolbar1', { static: true }) toolbar1: ToolbarComponent;
  @ViewChild('toolbar2', { static: true }) toolbar2: ToolbarComponent;

  toolbarMenu = [
    {
      label: 'File',
      click: () => {
        console.log('File clicked');
      }
    },
    {
      label: 'Image'
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
}
