import { QueryList, EventEmitter, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component';
export declare class TabsComponent implements AfterContentInit {
    vertical: boolean;
    select: EventEmitter<{}>;
    tabs: QueryList<TabComponent>;
    readonly index: number;
    ngAfterContentInit(): void;
    tabClicked(activeTab: any): void;
    move(offset: number): void;
    next(): void;
    prev(): void;
}
