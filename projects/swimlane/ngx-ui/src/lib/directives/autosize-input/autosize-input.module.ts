import { NgModule } from '@angular/core';
import { AutoSizeInputDirective } from './autosize-input.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [AutoSizeInputDirective],
  exports: [AutoSizeInputDirective]
})
export class AutoSizeInputModule {}
