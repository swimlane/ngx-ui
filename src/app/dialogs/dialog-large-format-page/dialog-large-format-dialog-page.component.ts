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

      blockquote {
        background: #212631;
        padding: 1rem;
        margin-left: 0;
        border-left: 0.25rem solid;
      }

      .input-name {
        color: #ebedf2;
        display: block;
        white-space: pre-line;
      }

      .margin-left-12 {
        margin-left: 12px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogLargeFormatDialogPageComponent {
  stepIndex = 0;

  dirty$ = new BehaviorSubject(false);
  skipDirty$ = new BehaviorSubject(false);

  @ViewChild('dialogDrawerTemplate') dialogDrawerTemplate: TemplateRef<unknown>;

  private dialogRef?: ComponentRef<DialogComponent>;
  private elRef?: ElementRef<HTMLElement>;

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
    this.elRef = elementRef;
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
      template: this.dialogDrawerTemplate,
      cssClass: `${cssClass} shadow-3`,
      size: 100,
      context: { size: 100 }
    });
  }

  openInnerDrawer(context: any) {
    console.log({ context });
    this.drawerService.create({
      isRoot: false,
      parentContainer: this.elRef.nativeElement,
      direction: DrawerDirection.Bottom,
      template: this.dialogDrawerTemplate,
      cssClass: 'large-format-dialog-drawer shadow-3',
      size: context.size - 10,
      context: { size: context.size - 10 }
    });
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
