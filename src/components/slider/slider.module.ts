import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderComponent } from './slider.component';

@NgModule({
  declarations: [SliderComponent],
  exports: [SliderComponent],
  imports: [CommonModule, FormsModule]
})
export class SliderModule { }
