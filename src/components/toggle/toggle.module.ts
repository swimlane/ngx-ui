import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToggleComponent } from './toggle.component';
import { ToggleLabelDirective } from './toggle-label.directive';

@NgModule({
  declarations: [ToggleComponent, ToggleLabelDirective],
  exports: [ToggleComponent, ToggleLabelDirective],
  imports: [CommonModule, FormsModule]
})
export class ToggleModule { }
