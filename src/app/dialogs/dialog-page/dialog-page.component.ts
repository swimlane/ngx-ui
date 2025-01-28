import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { DialogService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DialogPageComponent {
  dialogVis: any;
  canClose = true;

  @ViewChild('dialogTmpl', { static: true })
  dialogTpl: TemplateRef<any>;

  constructor(public dialogMngr: DialogService) {}

  openDialog(options) {
    this.dialogMngr.create(options);
  }

  beforeClose = (): boolean => {
    return this.canClose;
  };

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
