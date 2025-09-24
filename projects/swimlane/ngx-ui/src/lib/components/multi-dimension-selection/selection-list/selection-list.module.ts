import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SelectionListComponent } from './selection-list.component';
import { CheckboxModule } from '../../checkbox/checkbox.module';
import { TooltipModule } from '../../tooltip/tooltip.module';

@NgModule({
  imports: [CheckboxModule, CommonModule, FormsModule, ScrollingModule, TooltipModule],
  declarations: [SelectionListComponent],
  exports: [SelectionListComponent]
})
export class SelectionListModule {}
