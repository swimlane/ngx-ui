import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonGroupComponent } from './radio-button-group/radio-button-group.component';
import { RadioButtonComponent } from './radio-button.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [RadioButtonComponent, RadioButtonGroupComponent],
  exports: [RadioButtonComponent, RadioButtonGroupComponent],
})
export class RadioButtonModule {}
