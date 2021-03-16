import type { BooleanInput } from '@angular/cdk/coercion';
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
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { SectionAppearance, SectionTogglePosition } from './enums';
import { SectionHeaderComponent } from './section-header/section-header.component';

@Component({
  selector: 'ngx-section',
  exportAs: 'ngxSection',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent {
  static ngAcceptInputType_sectionCollapsed: BooleanInput;
  static ngAcceptInputType_sectionCollapsible: BooleanInput;

  @InputBoolean()
  @Input()
  sectionCollapsed = false;

  @InputBoolean()
  @Input()
  sectionCollapsible = true;

  @Input() sectionTitle!: string;
  @Input() padding = '1.8em';

  @InputEnum(SectionAppearance)
  @Input('appearance')
  _appearance!: EnumKey<typeof SectionAppearance>;
  appearance = SectionAppearance.Legacy;

  @InputEnum(SectionTogglePosition)
  @Input('togglePosition')
  _togglePosition!: EnumKey<typeof SectionTogglePosition>;
  togglePosition = SectionTogglePosition.Left;

  @Output() toggle = new EventEmitter<void>();

  @ContentChild(SectionHeaderComponent) headerComp?: SectionHeaderComponent;

  @HostBinding('class.ngx-section') hostClass = true;

  @HostBinding('class.outline')
  get outline() {
    return this.appearance === SectionAppearance.Outline;
  }

  get toggleRight() {
    return this.togglePosition === SectionTogglePosition.Right;
  }

  onSectionClicked(): void {
    this.sectionCollapsed = !this.sectionCollapsed;
    this.toggle.emit();
  }
}
