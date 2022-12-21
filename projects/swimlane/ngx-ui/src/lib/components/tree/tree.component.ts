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
      let tmpTree = this.elementsToNodes(this.allNodeElms);
      this.treeStructure = tmpTree;
      tmpTree = tmpTree.filter(node => node.display);
      this.generateAditionalTreeInfo(tmpTree);
      this.filteredTree = tmpTree;
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.nodes && this.virtualScrolling) || changes.virtualScrolling?.currentValue) {
      if (changes.nodes?.currentValue || this.nodes) {
        let tmpTree = this.generateTreeStructure(changes.nodes?.currentValue || this.nodes);
        this.treeStructure = tmpTree;
        tmpTree = tmpTree.filter(node => node.display);
        this.generateAditionalTreeInfo(tmpTree);
        this.filteredTree = tmpTree;
      }
    }
  }

  onExpand(event: any): void {
    if (this.virtualScrolling) {
      const currentTreeStructure = [...this.treeStructure];
      currentTreeStructure.find(node => node.id === event.$implicit.id).expanded = true;
      let tmpTree = this.applyExpandChange(currentTreeStructure);
      this.treeStructure = tmpTree;
      tmpTree = tmpTree.filter(node => node.display);
      this.generateAditionalTreeInfo(tmpTree);
      this.filteredTree = tmpTree;
    }
    this._cdr.detectChanges();
    this.expand.emit(event);
  }

  onCollapse(event: any): void {
    if (this.virtualScrolling) {
      const currentTreeStructure = [...this.treeStructure];
      currentTreeStructure.find(node => node.id === event.$implicit.id).expanded = false;
      let tmpTree = this.applyExpandChange(currentTreeStructure);
      this.treeStructure = tmpTree;
      tmpTree = tmpTree.filter(node => node.display);
      this.generateAditionalTreeInfo(tmpTree);
      this.filteredTree = tmpTree;
    }
    this._cdr.detectChanges();
    this.collapse.emit(event);
  }

  generateTreeStructure(nodes: TreeNode[]): TreeNode[] {
    const finalStructure: TreeNode[] = [];
    let id = 0;
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

  generateAditionalTreeInfo(nodes: TreeNode[]): void {
    const depthReference = {};
    nodes.forEach((node, index) => {
      node.childNodesCount = 0;
      // update the children count of the current node parents
      Object.keys(depthReference).forEach(key => {
        const depth = parseInt(key);
        const parent = nodes.find(n => n.id === depthReference[key].id);
        if (depth === node.depth) {
          delete depthReference[key];
        }
        if (depth < node.depth) {
          if (!parent.childNodesCount) parent.childNodesCount = 0;
          parent.childNodesCount++;
        }
      });
      depthReference[node.depth] = { id: node.id };
      if (node.depth - 1 > 0) {
        node.parentId = depthReference[node.depth - 1].id;
      }
      node.index = index;
    });
  }

  elementsToNodes(nodes: QueryList<TreeNodeComponent>): TreeNode[] {
    let id = 0;
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

  filled(node: TreeNode, filteredTree: TreeNode[]) {
    if (node.parentId === undefined) return false; // always avoid first element
    let isFirst = false;
    let isLast = false;
    const parent = filteredTree.find(n => n.id === node.parentId);
    isFirst = parent.index + 1 < filteredTree.length && filteredTree[parent.index + 1].id === node.id;
    isLast = filteredTree[parent.id + parent.childNodesCount].id === node.id;
    return isFirst && isLast ? 1 : isLast ? 2 : false; // 1: single element - 2: last of several items
  }

  empty(node: TreeNode, filteredTree: TreeNode[]) {
    if (node.parentId === undefined) {
      if (node.childNodesCount) return true; // always return true when the first element has childs
      return false; // ignore when the first element doen't has childs
    }
    let isFirst = false;
    let isLast = false;
    const parent = filteredTree.find(n => n.id === node.parentId);
    isFirst = parent.index + 1 < filteredTree.length && filteredTree[parent.index + 1].id === node.id;
    isLast = filteredTree[parent.id + parent.childNodesCount].id === node.id;
    return isFirst && !isLast; // is only true when there is more than one element and this is the first one
  }

  dots(node: TreeNode, filteredTree: TreeNode[]) {
    if (node.index + 1 === filteredTree.length || node.index === 0) return false;
    return !this.filled(node, filteredTree) && !this.empty(node, filteredTree);
  }
}
