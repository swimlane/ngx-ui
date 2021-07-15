import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { TreeNode } from '@swimlane/ngx-ui/typings';

interface TreeNodeContext {
  $implicit?: TreeNode;
  label?: string;
  children?: TreeNode[];
  model?: Record<string, unknown>;
}

@Component({
  selector: 'ngx-tree-node',
  exportAs: 'ngxTreeNode',
  templateUrl: './tree-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeNodeComponent implements OnChanges {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_expandable: BooleanInput;
  static ngAcceptInputType_expanded: BooleanInput;
  static ngAcceptInputType_selectable: BooleanInput;

  @Input() label?: string;
  @Input() model?: Record<string, unknown>;
  @Input() node?: TreeNode;
  @Input() children?: TreeNode[];

  @NgxBooleanInput()
  @Input()
  disabled?: boolean;

  @NgxBooleanInput()
  @Input()
  expandable?: boolean;

  @NgxBooleanInput()
  @Input()
  expanded?: boolean;

  @NgxBooleanInput()
  @Input()
  selectable?: boolean;

  @Input() template?: TemplateRef<unknown>;
  @Input() icons = {
    collapse: 'icon-tree-collapse',
    expand: 'icon-tree-expand',
  };

  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() selectNode = new EventEmitter();
  @Output() expand = new EventEmitter();
  @Output() collapse = new EventEmitter();

  data: TreeNodeContext = {};

  ngOnChanges() {
    this.data = {
      $implicit: this.node,
      label: this.label,
      children: this.children,
      model: this.model,
    };
  }

  onExpandClick(event: MouseEvent): void {
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
