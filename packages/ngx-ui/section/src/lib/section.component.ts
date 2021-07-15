import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { SectionAppearance, SectionTogglePosition } from './enums';
import { SectionHeaderComponent } from './section-header/section-header.component';

@Component({
  selector: 'ngx-section',
  exportAs: 'ngxSection',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  static ngAcceptInputType_sectionCollapsed: BooleanInput;
  static ngAcceptInputType_sectionCollapsible: BooleanInput;

  @NgxBooleanInput()
  @Input()
  sectionCollapsed = false;

  @NgxBooleanInput()
  @Input()
  sectionCollapsible = true;

  @Input() headerToggle = false;

  @Input() sectionTitle!: string;
  @Input() padding = '1.8em';

  @Input('appearance') set _appearance(v: EnumKey<typeof SectionAppearance>) {
    this.appearance = SectionAppearance[v];
  }

  appearance = SectionAppearance.legacy;

  @Input('togglePosition')
  set _togglePosition(v: EnumKey<typeof SectionTogglePosition>) {
    this.togglePosition = SectionTogglePosition[v];
  }

  togglePosition = SectionTogglePosition.left;

  @Output() toggle = new EventEmitter<void>();

  @ContentChild(SectionHeaderComponent) headerComp?: SectionHeaderComponent;

  @HostBinding('class.ngx-section') hostClass = true;

  @HostBinding('class.outline')
  get outline() {
    return this.appearance === SectionAppearance.outline;
  }

  get toggleRight() {
    return this.togglePosition === SectionTogglePosition.right;
  }

  get toggleNone() {
    return this.togglePosition === SectionTogglePosition.none;
  }

  onSectionClicked(): void {
    this.sectionCollapsed = !this.sectionCollapsed;
    this.toggle.emit();
  }
}
