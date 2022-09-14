import { ChangeDetectionStrategy, Component, ComponentRef } from '@angular/core';
import { DialogComponent, DialogOptions, DialogService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-dialog-medium-format-dialog-page',
  templateUrl: './dialog-medium-format-dialog-page.component.html',
  styleUrls: ['./dialog-medium-format-dialog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogMediumFormatDialogPageComponent {
  private dialogRef?: ComponentRef<DialogComponent>;

  constructor(public dialogService: DialogService) // private drawerService: DrawerService
  {}

  openDialog(options: DialogOptions) {
    this.dialogRef = this.dialogService.create(options);
  }

  onCloseOrCancel() {
    this.dialogRef?.destroy();
  }
}
