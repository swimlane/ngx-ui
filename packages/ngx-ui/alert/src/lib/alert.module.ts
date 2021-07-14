import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { AutofocusModule } from '@swimlane/ngx-ui/autofocus';
import { InjectionService } from '@swimlane/ngx-ui/common';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { InputModule } from '@swimlane/ngx-ui/input';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { InputAutosizeModule } from '@swimlane/ngx-ui/input-autosize';
import { LongPressModule } from '@swimlane/ngx-ui/long-press';
import { LongPressButtonModule } from '@swimlane/ngx-ui/long-press-button';
import { SizeModule } from '@swimlane/ngx-ui/size';
import { TooltipModule } from '@swimlane/ngx-ui/tooltip';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    InputAttributeModule,
    AutofocusModule,
    FormsModule,
    LongPressButtonModule,
    AppearanceModule,
    SizeModule,
    InputAutosizeModule,
    TooltipModule,
    LongPressModule,
    IconModule,
  ],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  providers: [InjectionService],
})
export class AlertModule {}
