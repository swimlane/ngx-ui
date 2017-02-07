import { QueryList, EventEmitter, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component';
export declare class TabsComponent implements AfterContentInit {
    vertical: boolean;
    select: EventEmitter<{}>;
    tabs: QueryList<TabComponent>;
    ngAfterContentInit(): void;
    tabClicked(activeTab: any): void;
}
