import { EventEmitter, OnChanges, TemplateRef } from '@angular/core';
export declare class TreeNodeComponent implements OnChanges {
    label: string;
    model: any;
    children: any[];
    disabled: boolean;
    expandable: boolean;
    expanded: boolean;
    selectable: boolean;
    template: TemplateRef<any>;
    activate: EventEmitter<{}>;
    deactivate: EventEmitter<{}>;
    select: EventEmitter<{}>;
    expand: EventEmitter<{}>;
    collapse: EventEmitter<{}>;
    data: any;
    ngOnChanges(): void;
    onExpandClick(): void;
    onClick(): void;
}
