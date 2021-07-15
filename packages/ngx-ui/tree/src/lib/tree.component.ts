import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { DestroyedService } from '@swimlane/ngx-ui/common';
import { TreeNode } from '@swimlane/ngx-ui/typings';
import { takeUntil } from 'rxjs/operators';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@Component({
  selector: 'ngx-tree',
  exportAs: 'ngxTree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyedService],
})
export class TreeComponent implements AfterContentInit {
  @Input() nodes?: TreeNode[];

  @Input('template')
  _templateInput?: TemplateRef<unknown>;

  @Input() icons = {
    collapse: 'icon-tree-collapse',
    expand: 'icon-tree-expand',
  };

  @ContentChild(TemplateRef, { static: true })
  _templateQuery!: TemplateRef<unknown>;

  @ContentChildren(TreeNodeComponent)
  readonly nodeElms?: QueryList<TreeNodeComponent>;

  @Output() expand = new EventEmitter();
  @Output() collapse = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() selectNode = new EventEmitter();

  @HostBinding('class.one-leaf')
  get hasOneLeaf(): boolean {
    return (
      (this.nodes && this.nodes.length === 1) || this.nodeElms?.length === 1
    );
  }

  get template(): TemplateRef<unknown> {
    return this._templateInput || this._templateQuery;
  }

  @HostBinding('class.ngx-tree') hostClass = true;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyed: DestroyedService
  ) {}

  ngAfterContentInit() {
    if (this.nodeElms) {
      this.nodeElms.changes
        .pipe(takeUntil(this.destroyed))
        .subscribe(() => this.cdr.markForCheck());
    }
  }
}
