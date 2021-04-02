import { ChangeDetectionStrategy, Component, ComponentRef, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { DialogComponent, DialogService, DrawerDirection, DrawerService } from '@swimlane/ngx-ui';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dialog-large-format-dialog-page',
  templateUrl: './dialog-large-format-dialog-page.component.html',
  styles: [
    `
      code {
        display: inline-block;
        color: #479eff;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogLargeFormatDialogPageComponent {
  stepIndex = 0;

  dirty$ = new BehaviorSubject(false);

  @ViewChild('drawerTemplate') drawerTemplate: TemplateRef<unknown>;

  private dialogRef?: ComponentRef<DialogComponent>;

  constructor(public dialogMngr: DialogService, private drawerService: DrawerService) {}

  openDialog(options) {
    this.dialogRef = this.dialogMngr.create(options);
  }

  onCloseOrCancel() {
    this.dialogRef?.destroy();
  }

  onCloseOrCancel2(isDirty: boolean) {
    alert('isDirty: ' + isDirty);
    this.dialogRef?.destroy();
  }

  openDrawer(elementRef: ElementRef<HTMLElement>, size: 'full' | 'half' | 'third' = 'full') {
    let cssClass = 'large-format-dialog-drawer';

    if (size === 'half') {
      cssClass = cssClass.concat(' large-format-dialog-drawer--1/2');
    } else if (size === 'third') {
      cssClass = cssClass.concat(' large-format-dialog-drawer--1/3');
    }

    this.drawerService.create({
      isRoot: false,
      parentContainer: elementRef.nativeElement,
      direction: DrawerDirection.Bottom,
      template: this.drawerTemplate,
      cssClass: `${cssClass} shadow-3`,
      size: 100
    });
  }
}
