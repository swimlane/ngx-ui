import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { InputHintDirective } from './input-hint.directive';
import { AutosizeDirective } from './input-autosize.directive';

@NgModule({
  declarations: [InputComponent, InputHintDirective, AutosizeDirective],
  exports: [InputComponent, InputHintDirective],
  imports: [CommonModule, FormsModule]
})
export class InputModule { }
