import { Component, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPageComponent {
  dialogVis: any;

  @ViewChild('dialogTmpl', { static: true })
  dialogTpl: TemplateRef<any>;

  constructor(public dialogMngr: DialogService) {}

  openDialog(options) {
    this.dialogMngr.create(options);
  }
}
