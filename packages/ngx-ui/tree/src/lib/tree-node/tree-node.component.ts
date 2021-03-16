import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import type { TreeNode } from '@swimlane/ngx-ui/types';

@Component({
  selector: 'ngx-tree-node',
  exportAs: 'ngxTreeNode',
  templateUrl: './tree-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
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

  @InputBoolean()
  @Input()
  disabled?: boolean;

  @InputBoolean()
  @Input()
  expandable?: boolean;

  @InputBoolean()
  @Input()
  expanded?: boolean;

  @InputBoolean()
  @Input()
  selectable?: boolean;

  @Input() template?: TemplateRef<unknown>;
  @Input() icons = {
    collapse: 'icon-tree-collapse',
    expand: 'icon-tree-expand'
  };

  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() selectNode = new EventEmitter();
  // backwards compatibility. Use selectNode
  @Output() select = this.selectNode;
  @Output() expand = new EventEmitter();
  @Output() collapse = new EventEmitter();

  data: any;

  ngOnChanges() {
    this.data = {
      $implicit: this.node,
      label: this.label,
      children: this.children,
      model: this.model
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
