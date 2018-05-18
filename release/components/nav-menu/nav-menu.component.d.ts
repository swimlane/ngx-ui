import { EventEmitter } from '@angular/core';
export declare class NavMenuComponent {
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    setExpanded(value: boolean): void;
}
