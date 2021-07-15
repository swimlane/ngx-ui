import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressSpinnerComponent } from './progress-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProgressSpinnerComponent],
  exports: [ProgressSpinnerComponent],
})
export class ProgressSpinnerModule {}
