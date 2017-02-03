import { 
  Component, Input, EventEmitter, Output, ContentChild,
  ViewEncapsulation, ContentChildren, TemplateRef, QueryList
} from '@angular/core';
import { TreeNodeComponent } from './tree-node.component';

@Component({
  selector: 'ngx-tree',
  template: `
    <div class="ngx-tree" [class.one-leaf]="hasOneLeaf">
      <ul class="vertical-list">
        <ngx-tree-node 
          *ngFor="let node of nodes"
          [expandable]="node.expandable"
          [expanded]="node.expanded"
          [label]="node.label"
          [model]="node.model"
          [children]="node.children"
          [template]="template"
          (expand)="expand.emit($event)"
          (collapse)="collapse.emit($event)"
          (activate)="activate.emit($event)" 
          (deactivate)="deactivate.emit($event)"
          (select)="select.emit($event)">
        </ngx-tree-node>
        <ng-content *ngIf="!nodes"></ng-content>
      </ul>
      <div 
        class="ngx-tree-vr" 
        *ngIf="nodes?.length || nodeElms?.length">
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent {

  @Input() 
  nodes: any[];

  @Input()
  @ContentChild(TemplateRef) 
  template: TemplateRef<any>;

  @ContentChildren(TreeNodeComponent) 
  nodeElms: QueryList<TreeNodeComponent>;

  get hasOneLeaf(): boolean {
    return (this.nodes && this.nodes.length === 1) ||
      (this.nodeElms.length === 1); 
  }

  @Output() expand = new EventEmitter();
  @Output() collapse = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() select = new EventEmitter();

}
