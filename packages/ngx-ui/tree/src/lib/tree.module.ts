import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { TreeComponent } from './tree.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TreeComponent, TreeNodeComponent],
  exports: [TreeComponent, TreeNodeComponent],
})
export class TreeModule {}
