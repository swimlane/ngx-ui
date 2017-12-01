import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon';
import { LongPressButtonComponent } from './long-press-button.component';
import { DirectivesModule } from '../../directives';

@NgModule({
  declarations: [LongPressButtonComponent],
  exports: [LongPressButtonComponent],
  imports: [CommonModule, IconModule, DirectivesModule]
})
export class LongPressButtonModule {}
