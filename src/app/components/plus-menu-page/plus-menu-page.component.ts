import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-plus-menu-page',
  templateUrl: './plus-menu-page.component.html',
  styleUrls: ['./plus-menu-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlusMenuPageComponent {
  upload = {
    title: 'Upload a plugin',
    subtitle: 'ctrl+alt+u',
    icon: 'upload-outline-small'
  };

  create = {
    title: 'Create',
    subtitle: 'ctrl+alt+n',
    icon: 'add-circle-medium'
  };

  search = {
    title: 'Search',
    icon: 'search'
  };

  onClick($event) {
    console.log($event);
  }
}
