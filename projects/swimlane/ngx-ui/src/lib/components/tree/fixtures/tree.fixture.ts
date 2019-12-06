import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from '../tree.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tree-fixture',
  templateUrl: 'tree.fixture.html'
})
export class TreeFixtureComponent {
  @ViewChild('tree', { static: true }) treeComponent: TreeComponent;
}
