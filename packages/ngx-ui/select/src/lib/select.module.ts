import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { AutofocusModule } from '@swimlane/ngx-ui/autofocus';
import { AutosizeModule } from '@swimlane/ngx-ui/autosize';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { SizeModule } from '@swimlane/ngx-ui/size';
import {
  SelectOptionDirective,
  SelectOptionInputTemplateDirective,
  SelectOptionTemplateDirective,
} from './directives';
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    CommonModule,
    AutofocusModule,
    AutosizeModule,
    InputAttributeModule,
    AppearanceModule,
    SizeModule,
  ],
  declarations: [
    SelectOptionTemplateDirective,
    SelectOptionDirective,
    SelectOptionInputTemplateDirective,
    SelectComponent,
    SelectInputComponent,
    SelectDropdownComponent,
  ],
  exports: [
    SelectOptionTemplateDirective,
    SelectOptionDirective,
    SelectOptionInputTemplateDirective,
    SelectComponent,
    SelectInputComponent,
    SelectDropdownComponent,
  ],
})
export class SelectModule {}
