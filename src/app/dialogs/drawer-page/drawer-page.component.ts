import { Component, ViewChild, TemplateRef } from '@angular/core';
import { DrawerService } from '../../../../projects/swimlane/ngx-ui/src/public_api';

@Component({
  selector: 'app-drawer-page',
  templateUrl: './drawer-page.component.html'
})
export class DrawerPageComponent {
  @ViewChild('editTmpl', { static: true })
  editTmpl: TemplateRef<any>;

  curDate2: any = new Date('10/10/2016');

  constructor(public drawerMngr: DrawerService) {}

  dateChanged(val) {
    console.log('date changed!', val);
  }

  openDrawer(direction = 'left', size?, closeOnOutsideClick = true, template = this.editTmpl) {
    this.drawerMngr.create({
      direction,
      template,
      size,
      context: 'Alert Everyone!',
      closeOnOutsideClick
    });
  }
}
