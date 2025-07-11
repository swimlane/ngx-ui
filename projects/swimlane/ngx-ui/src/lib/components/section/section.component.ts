import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { SectionHeaderComponent } from './section-header.component';
import { SectionAppearance } from './section-appearance.enum';
import { TogglePosition } from './section-toggle-position.enum';
import { debounceable } from '../../decorators/debounceable/debounceable.decorator';

let nextId = 0;

@Component({
  selector: 'ngx-section',
  exportAs: 'ngxSection',
  templateUrl: './section.component.html',
  host: { class: 'ngx-section' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./section.component.scss'],
  standalone: false
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

  @HostBinding('class.minimal')
  get minimal() {
    return this.appearance === SectionAppearance.Minimal;
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

  @debounceable(75, true)
  onSectionClicked(): void {
    this.sectionCollapsed = !this.sectionCollapsed;
    this.toggle.emit(this.sectionCollapsed);
  }
}
