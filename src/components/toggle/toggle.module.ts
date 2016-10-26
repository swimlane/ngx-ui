import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToggleComponent } from './toggle.component';

@NgModule({
  declarations: [ToggleComponent],
  exports: [ToggleComponent],
  imports: [CommonModule, FormsModule]
})
export class ToggleModule { }
