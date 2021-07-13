import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { ToolbarComponent } from '../toolbar.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'toolbar-fixture',
  templateUrl: 'toolbar.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarFixtureComponent {
  @ViewChild('toolbar1', { static: true })
  readonly toolbar1: ToolbarComponent;

  @ViewChild('toolbar2', { static: true })
  readonly toolbar2: ToolbarComponent;

  toolbarMenu = [
    {
      label: 'File',
      click: () => undefined
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
      dropdown: true
    }
  ];

  menuClicked(e: Event): Event {
    return e;
  }
}
