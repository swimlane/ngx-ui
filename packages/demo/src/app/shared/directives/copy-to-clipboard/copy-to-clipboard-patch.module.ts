import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationModule } from '@swimlane/ngx-ui/notification';
import { CopyToClipboardPatchDirective } from './copy-to-clipboard-patch.directive';

@NgModule({
  declarations: [CopyToClipboardPatchDirective],
  imports: [CommonModule, NotificationModule],
  exports: [CopyToClipboardPatchDirective]
})
export class CopyToClipboardPatchModule {}
