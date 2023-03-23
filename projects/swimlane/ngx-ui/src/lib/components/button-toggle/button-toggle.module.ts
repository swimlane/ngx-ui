import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent } from './button-toggle.component';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';

@NgModule({
  declarations: [ButtonToggleComponent, ButtonToggleGroupComponent],
  exports: [ButtonToggleComponent, ButtonToggleGroupComponent],
  imports: [CommonModule]
})
export class ButtonToggleModule {}
