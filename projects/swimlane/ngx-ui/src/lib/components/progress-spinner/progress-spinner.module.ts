import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressSpinnerComponent } from './progress-spinner.component';

@NgModule({
  declarations: [ProgressSpinnerComponent],
  exports: [ProgressSpinnerComponent],
  imports: [CommonModule],
})
export class ProgressSpinnerModule {}
