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
  AfterContentInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import type { QueryList } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TreeNodeComponent } from './tree-node.component';
import { TreeNode } from './tree-node.model';

@Component({
  selector: 'ngx-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent implements AfterContentInit, OnDestroy, OnChanges {
  @Input() virtualScrolling = false;
  @Input() nodes: TreeNode[];
  @Input() virtualScrollHeight = 500;

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
  @ContentChildren(TreeNodeComponent, { descendants: true }) readonly allNodeElms: QueryList<TreeNodeComponent>;

  @Output() expand = new EventEmitter();
  @Output() collapse = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() selectNode = new EventEmitter();

  get hasOneLeaf(): boolean {
    return this.nodes?.length === 1 || this.nodeElms?.length === 1;
  }

  get template(): TemplateRef<any> {
    return this._templateInput || this._templateQuery;
  }

  treeStructure: TreeNode[] = null;
  filteredTree: TreeNode[] = null;
  depthPadding = 20;
  nodeHeight = 26;

  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.nodeElms.changes.pipe(takeUntil(this._destroy$)).subscribe(() => this._cdr.markForCheck());
    if (this.allNodeElms) {
      this.allNodeElms.forEach(node => node.depth++);
    }
    if (this.virtualScrolling && !this.nodes?.length && this.allNodeElms) {
      const tmpTree = this.elementsToNodes(this.allNodeElms);
      this.treeStructure = tmpTree;
      this.filteredTree = tmpTree.filter(node => node.display);
      this._cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nodes) {
      const newTree = this.generateTreeStructure(changes.nodes.currentValue);
      this.treeStructure = newTree;
      this.filteredTree = newTree.filter(node => node.display);
      this._cdr.detectChanges();
    }
  }

  onExpand(event: any): void {
    const currentTreeStructure = [...this.treeStructure];
    currentTreeStructure.find(node => node.id === event.$implicit.id).expanded = true;
    const tmpTree = this.applyExpandChange(currentTreeStructure);
    this.treeStructure = tmpTree;
    this.filteredTree = tmpTree.filter(node => node.display);
    this._cdr.detectChanges();
    this.expand.emit(event);
  }

  onCollapse(event: any): void {
    const currentTreeStructure = [...this.treeStructure];
    currentTreeStructure.find(node => node.id === event.$implicit.id).expanded = false;
    const tmpTree = this.applyExpandChange(currentTreeStructure);
    this.treeStructure = tmpTree;
    this.filteredTree = tmpTree.filter(node => node.display);
    this._cdr.detectChanges();
    this.collapse.emit(event);
  }

  generateTreeStructure(nodes: TreeNode[]): TreeNode[] {
    const finalStructure: TreeNode[] = [];
    let id = 1;
    const processNodes = (currentNodes: TreeNode[], depth: number, display: boolean) => {
      currentNodes.forEach(node => {
        finalStructure.push({
          id: id++,
          label: node.label,
          model: node.model,
          disabled: node.disabled,
          expandable: node.expandable,
          expanded: node.expanded,
          selectable: node.selectable,
          depth: node.depth ?? depth,
          display
        });
        if (node.children) {
          processNodes(node.children, node.depth ?? depth + 1, display && node.expanded);
        }
      });
    };
    processNodes(nodes, 1, true);
    return finalStructure;
  }

  applyExpandChange(nodes: TreeNode[]): TreeNode[] {
    const depthReference = {
      0: {
        displayChild: true
      }
    };
    return nodes.map(node => {
      const result = {
        id: node.id,
        label: node.label,
        model: node.model,
        disabled: node.disabled,
        expandable: node.expandable,
        expanded: node.expanded,
        selectable: node.selectable,
        depth: node.depth,
        display: depthReference[node.depth - 1].displayChild
      };
      depthReference[node.depth] = {
        displayChild: node.expanded && depthReference[node.depth - 1].displayChild
      };
      return result;
    });
  }

  elementsToNodes(nodes: QueryList<TreeNodeComponent>): TreeNode[] {
    let id = 1;
    const tmpTree = nodes.map(
      node =>
        ({
          id: id++,
          label: node.label,
          children: node.children,
          model: node.model,
          disabled: node.disabled,
          expandable: node.expandable,
          expanded: node.expanded,
          selectable: node.selectable,
          depth: node.depth
        } as TreeNode)
    );
    return this.applyExpandChange(tmpTree);
  }

  trackBy(_index: number, node: any): number {
    return node.id;
  }
}
