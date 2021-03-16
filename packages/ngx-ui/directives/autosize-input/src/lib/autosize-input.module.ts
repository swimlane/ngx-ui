import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutosizeInputDirective } from './autosize-input.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AutosizeInputDirective],
  exports: [AutosizeInputDirective],
})
export class AutosizeInputModule {}
