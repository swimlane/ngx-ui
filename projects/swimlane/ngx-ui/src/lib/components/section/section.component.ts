import {
  Component,
  Input,
  ContentChild,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

import { SectionHeaderComponent } from './section-header.component';

@Component({
  selector: 'ngx-section',
  exportAs: 'ngxSection',
  templateUrl: './section.component.html',
  host: {
    class: 'ngx-section',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() sectionCollapsed: boolean = false;
  @Input() sectionCollapsible: boolean = true;
  @Input() sectionTitle: string;
  @Input() padding: any = '1.8em';

  @Output() toggle = new EventEmitter();

  @ContentChild(SectionHeaderComponent) headerComp: SectionHeaderComponent;

  onSectionClicked(): void {
    this.sectionCollapsed = !this.sectionCollapsed;
    this.toggle.emit(this.sectionCollapsed);
  }
}
