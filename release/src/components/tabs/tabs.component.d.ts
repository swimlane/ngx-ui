import { QueryList, EventEmitter } from '@angular/core';
import { TabComponent } from './tab.component';
import './tabs.scss';
export declare class TabsComponent {
    vertical: boolean;
    onSelect: EventEmitter<{}>;
    tabs: QueryList<TabComponent>;
    ngAfterContentInit(): void;
    tabClicked(activeTab: any): void;
}
