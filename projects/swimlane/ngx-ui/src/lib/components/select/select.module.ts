import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';
import { TooltipModule } from '../tooltip/tooltip.module';
import { SelectDropdownComponent } from './select-dropdown.component';
import { SelectInputComponent } from './select-input.component';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';
import { SelectOptionTemplateDirective } from './select-option-template.directive';
import { SelectOptionDirective } from './select-option.directive';

import { SelectComponent } from './select.component';

@NgModule({
  declarations: [
    SelectComponent,
    SelectInputComponent,
    SelectOptionDirective,
    SelectOptionTemplateDirective,
    SelectDropdownComponent,
    SelectOptionInputTemplateDirective
  ],
  exports: [SelectComponent, SelectOptionDirective, SelectOptionTemplateDirective, SelectOptionInputTemplateDirective],
  imports: [CommonModule, InViewportModule, TooltipModule]
})
export class SelectModule {}
