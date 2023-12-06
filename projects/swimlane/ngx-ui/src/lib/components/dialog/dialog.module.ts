import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InjectionService } from '../../services/injection/injection.service';
import { InputModule } from '../input/input.module';
import { LongPressButtonModule } from '../long-press/long-press-button.module';
import { OverlayModule } from '../overlay/overlay.module';

import { AlertComponent } from './alert/alert.component';
import { DialogComponent } from './dialog.component';
import { LargeFormatDialogFooterComponent } from './large-format/components/large-format-dialog-footer/large-format-dialog-footer.component';
import { LargeFormatDialogHeaderActionComponent } from './large-format/components/large-format-dialog-header-action/large-format-dialog-header-action.component';
import { LargeFormatDialogHeaderTitleComponent } from './large-format/components/large-format-dialog-header-title/large-format-dialog-header-title.component';
import { LargeFormatDialogStepperDirective } from './large-format/directives/large-format-dialog-stepper/large-format-dialog-stepper.directive';
import { LargeFormatDialogSubStepperDirective } from './large-format/directives/large-format-dialog-stepper/large-format-dialog-sub-stepper.directive';
import { LargeFormatDialogSubTabsDirective } from './large-format/directives/large-format-dialog-tabs/large-format-dialog-sub-tabs.directive';
import { LargeFormatDialogTabsDirective } from './large-format/directives/large-format-dialog-tabs/large-format-dialog-tabs.directive';
import { LargeFormatDialogContentComponent } from './large-format/large-format-dialog-content.component';

@NgModule({
  declarations: [
    DialogComponent,
    AlertComponent,
    LargeFormatDialogContentComponent,
    LargeFormatDialogHeaderTitleComponent,
    LargeFormatDialogHeaderActionComponent,
    LargeFormatDialogFooterComponent,
    LargeFormatDialogStepperDirective,
    LargeFormatDialogSubStepperDirective,
    LargeFormatDialogTabsDirective,
    LargeFormatDialogSubTabsDirective
  ],
  exports: [
    DialogComponent,
    AlertComponent,
    LargeFormatDialogContentComponent,
    LargeFormatDialogFooterComponent,
    LargeFormatDialogStepperDirective,
    LargeFormatDialogSubStepperDirective,
    LargeFormatDialogTabsDirective,
    LargeFormatDialogSubTabsDirective
  ],
  providers: [InjectionService],
  imports: [CommonModule, OverlayModule, InputModule, FormsModule, LongPressButtonModule]
})
export class DialogModule {}
