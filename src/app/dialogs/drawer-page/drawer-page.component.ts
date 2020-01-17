import { Component, ViewChild, TemplateRef, ChangeDetectionStrategy, ElementRef } from '@angular/core';

import { DrawerService, DrawerDirection } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-drawer-page',
  templateUrl: './drawer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerPageComponent {
  @ViewChild('editTmpl', { static: true })
  editTmpl: TemplateRef<any>;

  curDate2: any = new Date('10/10/2016');

  readonly DrawerDirection = DrawerDirection;

  constructor(public drawerMngr: DrawerService) {}

  dateChanged(val) {
    console.log('date changed!', val);
  }

  openDrawer(
    direction = DrawerDirection.Left,
    size?,
    closeOnOutsideClick = true,
    template = this.editTmpl,
    isRoot = true,
    parentContainer?: ElementRef
  ) {
    this.drawerMngr.create({
      direction,
      template,
      size,
      context: 'Alert Everyone!',
      closeOnOutsideClick,
      parentContainer,
      isRoot
    });
  }
}
