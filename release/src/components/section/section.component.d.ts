import { SectionHeaderComponent } from './section-header.component';
import './section.scss';
export declare class SectionComponent {
    sectionCollapsed: boolean;
    sectionCollapsible: boolean;
    sectionTitle: string;
    headerComp: SectionHeaderComponent;
    onSectionClicked(): void;
}
