import { EventEmitter, TemplateRef } from '@angular/core';
export declare class TreeNodeComponent {
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
    readonly data: any;
    onExpandClick(): void;
    onClick(): void;
}
