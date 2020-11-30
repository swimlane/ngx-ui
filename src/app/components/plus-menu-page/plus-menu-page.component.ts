import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-plus-menu-page',
  templateUrl: './plus-menu-page.component.html',
  styleUrls: ['./plus-menu-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlusMenuPageComponent {
  upload = {
    description: 'Upload a plugin',
    hotkey: 'ctrl+alt+u',
    icon: 'upload-outline'
  };

  create = {
    description: 'Create',
    hotkey: 'ctrl+alt+n',
    icon: 'add-circle-thin'
  };

  search = {
    description: 'Search',
    icon: 'search'
  };
}
