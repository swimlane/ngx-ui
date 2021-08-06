import { ChangeDetectionStrategy, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

import { DrawerDirection, DrawerService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-drawer-page',
  templateUrl: './drawer-page.component.html',
  styleUrls: ['./drawer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerPageComponent {
  @ViewChild('editTmpl', { static: true })
  editTmpl: TemplateRef<any>;

  curDate2: any = new Date('10/10/2016');

  readonly DrawerDirection = DrawerDirection;

  constructor(readonly drawerMngr: DrawerService, private readonly el: ElementRef<HTMLElement>) {}

  dateChanged(val: Date | string) {
    console.log('date changed!', val);
  }

  openDrawer(
    direction = DrawerDirection.Left,
    size?: number,
    closeOnOutsideClick = true,
    template = this.editTmpl,
    isRoot = true
  ) {
    this.drawerMngr.create({
      direction,
      template,
      size,
      context: 'Alert Everyone!',
      closeOnOutsideClick,
      parentContainer: isRoot ? undefined : this.el.nativeElement,
      isRoot
    });
  }
}
