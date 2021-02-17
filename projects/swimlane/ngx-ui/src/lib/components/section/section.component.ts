import {
  Component,
  Input,
  ContentChild,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

import { SectionHeaderComponent } from './section-header.component';
import { SectionApperance } from './section-appearance.enum';
import { TogglePosition } from './section-toggle-position.enum';

@Component({
  selector: 'ngx-section',
  exportAs: 'ngxSection',
  templateUrl: './section.component.html',
  host: {
    class: 'ngx-section',
    '[class.legacy]': 'appearance === "legacy"',
    '[class.outline]': 'appearance === "outline"',
    '[class.toggle-right]': 'togglePosition === "right"'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input() sectionCollapsed: boolean = false;
  @Input() sectionCollapsible: boolean = true;
  @Input() sectionTitle: string;
  @Input() padding: any = '1.8em';
  @Input() appearance: SectionApperance.Legacy;
  @Input() togglePosition: TogglePosition = TogglePosition.Left;

  @Output() toggle = new EventEmitter();

  @ContentChild(SectionHeaderComponent) headerComp: SectionHeaderComponent;

  onSectionClicked(): void {
    this.sectionCollapsed = !this.sectionCollapsed;
    this.toggle.emit(this.sectionCollapsed);
  }
}
