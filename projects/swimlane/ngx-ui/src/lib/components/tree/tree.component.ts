import {
  Component,
  Input,
  EventEmitter,
  Output,
  ContentChild,
  ViewEncapsulation,
  ContentChildren,
  TemplateRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  AfterContentInit
} from '@angular/core';
import type { QueryList } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TreeNodeComponent } from './tree-node.component';

import type { TreeNode } from './tree-node.model';

@Component({
  selector: 'ngx-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent implements AfterContentInit, OnDestroy {
  @Input() nodes: TreeNode[];

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('template')
  _templateInput: TemplateRef<any>;

  @Input() icons = {
    collapse: 'icon-tree-collapse',
    expand: 'icon-tree-expand'
  };

  @ContentChild(TemplateRef, { static: true })
  _templateQuery: TemplateRef<any>;

  @ContentChildren(TreeNodeComponent) readonly nodeElms: QueryList<TreeNodeComponent>;

  @Output() expand = new EventEmitter();
  @Output() collapse = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() selectNode = new EventEmitter();

  get hasOneLeaf(): boolean {
    return (this.nodes && this.nodes.length === 1) || this.nodeElms.length === 1;
  }

  get template(): TemplateRef<any> {
    return this._templateInput || this._templateQuery;
  }

  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.nodeElms.changes.pipe(takeUntil(this._destroy$)).subscribe(() => this._cdr.markForCheck());
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
