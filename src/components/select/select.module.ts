import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './select.component';
import { SelectInputComponent } from './select-input.component';
import { SelectDropdownComponent } from './select-dropdown.component';
import { SelectOptionDirective } from './select-option.directive';
import { SelectOptionTemplateDirective } from './select-option-template.directive';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';

@NgModule({
  declarations: [ 
    SelectComponent, 
    SelectInputComponent,
    SelectOptionDirective, 
    SelectOptionTemplateDirective, 
    SelectDropdownComponent,
    SelectOptionInputTemplateDirective
  ],
  exports: [ 
    SelectComponent, 
    SelectOptionDirective, 
    SelectOptionTemplateDirective ,
    SelectOptionInputTemplateDirective
  ],
  imports: [CommonModule]
})
export class SelectModule { }
