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

@Component({
  selector: 'ngx-tree-node',
  templateUrl: './tree-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeComponent implements OnChanges {
  @Input() label: string;
  @Input() model: any;
  @Input() children: any[];
  @Input() disabled: boolean;
  @Input() expandable: boolean;
  @Input() expanded: boolean;
  @Input() selectable: boolean;
  @Input() template: TemplateRef<any>;

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
      label: this.label,
      children: this.children,
      model: this.model
    };
  }

  onExpandClick(): void {
    if (this.disabled || !this.expandable) return;

    this.expanded = !this.expanded;

    if (this.expanded) {
      this.expand.emit(this.data);
    } else {
      this.collapse.emit(this.data);
    }
  }

  onClick(event): void {
    event.stopPropagation();
    if (!this.selectable || this.disabled) return;
    this.selectNode.emit(this.data);
  }
}
