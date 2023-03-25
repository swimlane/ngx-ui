import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent } from './button-toggle.component';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';

@NgModule({
  declarations: [ButtonToggleGroupComponent, ButtonToggleComponent],
  exports: [ButtonToggleGroupComponent, ButtonToggleComponent],
  imports: [CommonModule]
})
export class ButtonToggleModule {}
