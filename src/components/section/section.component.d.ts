import { EventEmitter } from '@angular/core';
import { SectionHeaderComponent } from './section-header.component';
export declare class SectionComponent {
    sectionCollapsed: boolean;
    sectionCollapsible: boolean;
    sectionTitle: string;
    toggle: EventEmitter<{}>;
    headerComp: SectionHeaderComponent;
    onSectionClicked(): void;
}
