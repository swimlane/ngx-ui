import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonGroupComponent } from './radiobutton-group/radiobutton-group.component';
import { RadioButtonComponent } from './radiobutton.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [RadioButtonComponent, RadioButtonGroupComponent],
  exports: [RadioButtonComponent, RadioButtonGroupComponent],
})
export class RadiobuttonModule {}
