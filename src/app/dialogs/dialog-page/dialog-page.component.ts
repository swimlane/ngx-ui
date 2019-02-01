import { Component, ViewChild, TemplateRef } from '@angular/core';
import { DialogService } from '../../../../projects/swimlane/ngx-ui/src/public_api';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html'
})
export class DialogPageComponent {
  dialogVis: any;

  @ViewChild('dialogTmpl')
  dialogTpl: TemplateRef<any>;

  constructor(public dialogMngr: DialogService) {}

  openDialog(options) {
    this.dialogMngr.create(options);
  }

}
