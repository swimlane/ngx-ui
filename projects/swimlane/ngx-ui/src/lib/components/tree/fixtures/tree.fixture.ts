import { Component, ViewChild } from '@angular/core';
import { TreeComponent } from '../tree.component';
import { TreeNode } from '../tree-node.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tree-fixture',
  templateUrl: 'tree.fixture.html',
  standalone: false
})
export class TreeFixtureComponent {
  @ViewChild('tree1', { static: true }) treeComponent1: TreeComponent;
  @ViewChild('tree2', { static: true }) treeComponent2: TreeComponent;

  nodes: TreeNode[] = [
    {
      label: 'Node1',
      model: { type: 'Array', count: 1 }
    },
    {
      label: 'Node2',
      expandable: true,
      model: { type: 'Object' },
      children: [
        {
          label: 'Node1',
          model: { type: 'Array', count: 1 }
        }
      ]
    },
    {
      label: 'Node3',
      model: { type: 'Array', count: 1 }
    }
  ];
}
