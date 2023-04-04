import {
  Component,
  Input,
  ContentChild,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';

import { SectionHeaderComponent } from './section-header.component';
import { SectionAppearance } from './section-appearance.enum';
import { TogglePosition } from './section-toggle-position.enum';

let nextId = 0;

@Component({
  selector: 'ngx-section',
  exportAs: 'ngxSection',
  templateUrl: './section.component.html',
  host: { class: 'ngx-section' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @HostBinding('id')
  @Input()
  id = `section-${++nextId}`;

  @HostBinding('class.outline')
  get outline() {
    return this.appearance === SectionAppearance.Outline;
  }

  @HostBinding('class.light')
  get light() {
    return this.appearance === SectionAppearance.Light;
  }

  @Input() sectionCollapsed = false;
  @Input() sectionCollapsible = true;
  @Input() headerToggle = false;
  @Input() sectionTitle: string;
  @Input() padding: any = '1.8em';
  @Input() appearance: SectionAppearance = SectionAppearance.Legacy;
  @Input() togglePosition: TogglePosition = TogglePosition.Left;

  @Output() toggle = new EventEmitter();

  @ContentChild(SectionHeaderComponent) headerComp: SectionHeaderComponent;

  readonly TogglePosition = TogglePosition;

  onSectionClicked(event: PointerEvent): void {
    event.stopPropagation();
    this.sectionCollapsed = !this.sectionCollapsed;
    this.toggle.emit(this.sectionCollapsed);
  }
}
