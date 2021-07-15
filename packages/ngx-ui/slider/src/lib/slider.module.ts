import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SliderComponent],
  exports: [SliderComponent],
})
export class SliderModule {}
