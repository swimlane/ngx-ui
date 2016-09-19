import { QueryList, EventEmitter } from '@angular/core';
import { Tab } from './tab.component';
import './tabs.scss';
export declare class Tabs {
    vertical: boolean;
    onSelect: EventEmitter<{}>;
    tabs: QueryList<Tab>;
    ngAfterContentInit(): void;
    tabClicked(activeTab: any): void;
}
