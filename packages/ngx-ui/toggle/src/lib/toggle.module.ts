import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from './toggle.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ToggleComponent],
  exports: [ToggleComponent]
})
export class ToggleModule {}
