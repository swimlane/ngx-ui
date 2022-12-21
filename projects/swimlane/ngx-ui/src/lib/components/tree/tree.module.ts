import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MemoizeModule } from '../../pipes/memoize/memoize.module';

import { TreeComponent } from './tree.component';
import { TreeNodeComponent } from './tree-node.component';

@NgModule({
  declarations: [TreeComponent, TreeNodeComponent],
  exports: [TreeComponent, TreeNodeComponent],
  imports: [CommonModule, FormsModule, ScrollingModule, MemoizeModule]
})
export class TreeModule {}
