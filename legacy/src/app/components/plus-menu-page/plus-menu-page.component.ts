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
    title: 'Upload a plugin',
    subtitle: 'ctrl+alt+u',
    icon: 'upload-outline-small'
  };

  uploadCustomColor = {
    title: 'Upload a plugin',
    subtitle: 'ctrl+alt+u',
    icon: 'upload-outline-small',
    color: '#CDD2DD'
  };

  create = {
    title: 'Create',
    subtitle: 'ctrl+alt+n',
    icon: 'add-circle-medium'
  };

  createCustomColor = {
    title: 'Create',
    subtitle: 'ctrl+alt+n',
    icon: 'add-circle-medium',
    color: '#01E1B9'
  };

  search = {
    title: 'Search',
    icon: 'search'
  };

  searchCustomColor = {
    title: 'Search',
    subtitle: 'ctrl+alt+f',
    icon: 'search',
    color: '#E200B6'
  };

  onClick($event) {
    console.log($event);
  }
}
