import { EventEmitter, TemplateRef, QueryList } from '@angular/core';
import { TreeNodeComponent } from './tree-node.component';
export declare class TreeComponent {
    nodes: any[];
    template: TemplateRef<any>;
    nodeElms: QueryList<TreeNodeComponent>;
    readonly hasOneLeaf: boolean;
    expand: EventEmitter<{}>;
    collapse: EventEmitter<{}>;
    activate: EventEmitter<{}>;
    deactivate: EventEmitter<{}>;
    select: EventEmitter<{}>;
}
