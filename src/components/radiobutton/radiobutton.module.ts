import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RadioButtonComponent } from './radiobutton.component';
import { RadioButtonGroupComponent } from './radiobutton-group.component';

@NgModule({
  declarations: [RadioButtonComponent, RadioButtonGroupComponent],
  exports: [RadioButtonComponent, RadioButtonGroupComponent],
  imports: [CommonModule, FormsModule]
})
export class RadioButtonModule { }
