import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent]
})
export class CheckboxModule {}
