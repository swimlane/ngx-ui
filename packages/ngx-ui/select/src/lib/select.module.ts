import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectOptionDirective, SelectOptionInputTemplateDirective, SelectOptionTemplateDirective } from './directives';
import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SelectOptionTemplateDirective,
    SelectOptionDirective,
    SelectOptionInputTemplateDirective,
    SelectComponent,
    SelectInputComponent,
    SelectDropdownComponent
  ],
  exports: [
    SelectOptionTemplateDirective,
    SelectOptionDirective,
    SelectOptionInputTemplateDirective,
    SelectComponent,
    SelectInputComponent,
    SelectDropdownComponent
  ]
})
export class SelectModule {}
