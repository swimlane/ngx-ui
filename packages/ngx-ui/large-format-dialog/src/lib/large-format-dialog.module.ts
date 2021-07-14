import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LargeFormatDialogStepperDirective } from './dialog-stepper/large-format-dialog-stepper.directive';
import { LargeFormatDialogSubStepperDirective } from './dialog-stepper/large-format-dialog-sub-stepper.directive';
import { LargeFormatDialogSubTabsDirective } from './dialog-tabs/large-format-dialog-sub-tabs.directive';
import { LargeFormatDialogTabsDirective } from './dialog-tabs/large-format-dialog-tabs.directive';
import { LargeFormatDialogContentComponent } from './large-format-dialog-content.component';
import { LargeFormatDialogFooterComponent } from './large-format-dialog-footer/large-format-dialog-footer.component';
import { LargeFormatDialogHeaderActionComponent } from './large-format-dialog-header-action/large-format-dialog-header-action.component';
import { LargeFormatDialogHeaderTitleComponent } from './large-format-dialog-header-title/large-format-dialog-header-title.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LargeFormatDialogContentComponent,
    LargeFormatDialogStepperDirective,
    LargeFormatDialogSubStepperDirective,
    LargeFormatDialogTabsDirective,
    LargeFormatDialogSubTabsDirective,
    LargeFormatDialogFooterComponent,
    LargeFormatDialogHeaderActionComponent,
    LargeFormatDialogHeaderTitleComponent,
  ],
  exports: [
    LargeFormatDialogContentComponent,
    LargeFormatDialogStepperDirective,
    LargeFormatDialogSubStepperDirective,
    LargeFormatDialogTabsDirective,
    LargeFormatDialogSubTabsDirective,
    LargeFormatDialogFooterComponent,
    LargeFormatDialogHeaderActionComponent,
    LargeFormatDialogHeaderTitleComponent,
  ],
})
export class LargeFormatDialogModule {}
