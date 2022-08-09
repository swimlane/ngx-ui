import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  ViewEncapsulation,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';

import type { TreeNode } from './tree-node.model';

@Component({
  exportAs: 'ngxTreeNode',
  selector: 'ngx-tree-node',
  templateUrl: './tree-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeComponent implements OnChanges {
  @Input() label: string;
  @Input() model: any;
  @Input() node: TreeNode;
  @Input() children: any[];
  @Input() disabled: boolean;
  @Input() expandable: boolean;
  @Input() expanded: boolean;
  @Input() selectable: boolean;
  @Input() template: TemplateRef<any>;
  @Input() icons = {
    collapse: 'icon-tree-collapse',
    expand: 'icon-tree-expand'
  };

  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() selectNode = new EventEmitter();
  // backwards compatibility. Use selectNode
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select = this.selectNode;
  @Output() expand = new EventEmitter();
  @Output() collapse = new EventEmitter();

  data: any;

  ngOnChanges(): void {
    this.data = {
      $implicit: this.node,
      label: this.label,
      children: this.children,
      model: this.model
    };
  }

  onExpandClick(event: Event): void {
    if (this.disabled || !this.expandable) return;

    event.stopPropagation();

    this.expanded = !this.expanded;

    if (this.expanded) {
      this.expand.emit(this.data);
    } else {
      this.collapse.emit(this.data);
    }
  }

  onClick(): void {
    if (!this.selectable || this.disabled) return;
    this.selectNode.emit(this.data);
  }
}
