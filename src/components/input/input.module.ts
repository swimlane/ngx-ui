import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { InputHintDirective } from './input-hint.directive';

@NgModule({
  declarations: [InputComponent, InputHintDirective],
  exports: [InputComponent, InputHintDirective],
  imports: [CommonModule, FormsModule]
})
export class InputModule { }
