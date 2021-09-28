import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DocExampleModule,
  DocMarkdownModule,
  DocPageModule,
  generateRoutes,
} from '@swimlane/ngx-doc';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { AutosizeModule } from '@swimlane/ngx-ui/autosize';
import { DateTimeModule } from '@swimlane/ngx-ui/date-time';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { DateInputComponent } from './date-input/date-input.component';
import { BasicDateInputComponent } from './date-input/examples/basic-date-input/basic-date-input.component';
import { DisabledDateInputComponent } from './date-input/examples/disabled-date-input/disabled-date-input.component';
import { DateTimeAppearancesComponent } from './date-time-appearances/date-time-appearances.component';
import { DateTimeInputComponent } from './date-time-input/date-time-input.component';
import { DateTimePageComponent } from './date-time-page.component';
import { InvalidDateInputComponent } from './date-input/examples/invalid-date-input/invalid-date-input.component';
import { CustomFormatDateInputComponent } from './date-input/examples/custom-format-date-input/custom-format-date-input.component';
import { MinMaxDateInputComponent } from './date-input/examples/min-max-date-input/min-max-date-input.component';
import { BasicDateTimeComponent } from './date-time-input/examples/basic-date-time/basic-date-time.component';
import { TimeInputComponent } from './time-input/time-input.component';
import { BasicTimeInputComponent } from './time-input/examples/basic-time-input/basic-time-input.component';
import { PrecisionDateTimeComponent } from './date-time-input/examples/precision-date-time/precision-date-time.component';
import { PrecisionTimeInputComponent } from './time-input/examples/precision-time-input/precision-time-input.component';
import { PrecisionDateInputComponent } from './date-input/examples/precision-date-input/precision-date-input.component';
import { FillDateTimeInputAppearancesComponent } from './date-time-appearances/examples/fill-date-time-input-appearances/fill-date-time-input-appearances.component';
import { LegacyDateTimeInputAppearancesComponent } from './date-time-appearances/examples/legacy-date-time-input-appearances/legacy-date-time-input-appearances.component';
import { AutosizeDateTimeInputComponent } from './date-time-appearances/examples/autosize-date-time-input/autosize-date-time-input.component';

@NgModule({
  declarations: [
    DateTimePageComponent,
    DateInputComponent,
    BasicDateInputComponent,
    DisabledDateInputComponent,
    InvalidDateInputComponent,
    CustomFormatDateInputComponent,
    MinMaxDateInputComponent,
    DateTimeInputComponent,
    BasicDateTimeComponent,
    TimeInputComponent,
    BasicTimeInputComponent,
    PrecisionDateTimeComponent,
    PrecisionTimeInputComponent,
    PrecisionDateInputComponent,
    DateTimeAppearancesComponent,
    FillDateTimeInputAppearancesComponent,
    LegacyDateTimeInputAppearancesComponent,
    AutosizeDateTimeInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(generateRoutes(DateTimePageComponent)),
    DocPageModule,
    DocExampleModule,
    DocMarkdownModule,
    DateTimeModule,
    InputAttributeModule,
    ReactiveFormsModule,
    AppearanceModule,
    AutosizeModule
  ],
})
export class DateTimePageModule {}
