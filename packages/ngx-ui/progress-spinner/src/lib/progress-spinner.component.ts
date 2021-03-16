import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { id } from '@swimlane/ngx-ui/utils/id';
import { ProgressSpinnerAppearance, ProgressSpinnerMode } from './enums';
import { ProgressSpinnerLabel } from './interfaces';

@Component({
  selector: 'ngx-progress-spinner',
  exportAs: 'ngxProgressSpinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerComponent {
  static ngAcceptInputType_isFailure: BooleanInput;
  static ngAcceptInputType_value: NumericInput;
  static ngAcceptInputType_total: NumericInput;
  static ngAcceptInputType_diameter: NumericInput;
  static ngAcceptInputType_strokeWidth: NumericInput;

  @InputEnum(ProgressSpinnerMode)
  @Input('mode')
  _mode!: EnumKey<typeof ProgressSpinnerMode>;
  mode = ProgressSpinnerMode.Indeterminate;

  @InputEnum(ProgressSpinnerAppearance)
  @Input('appearance')
  _appearance!: EnumKey<typeof ProgressSpinnerAppearance>;
  appearance = ProgressSpinnerAppearance.Default;

  @InputBoolean()
  @Input()
  isFailure?: boolean;

  @Input() color = '#1483FF';
  @Input() failStatusColor = '#FF4514';
  @Input() inProgressIcon?: TemplateRef<unknown>;
  @Input() completeIcon?: TemplateRef<unknown>;
  @Input() failIcon?: TemplateRef<unknown>;
  @Input() spinnerLabel?: ProgressSpinnerLabel;

  @InputNumeric(0)
  @Input()
  value = 0;

  @InputNumeric(100)
  @Input()
  total = 100;

  @InputNumeric(100)
  @Input()
  diameter = 100;

  @InputNumeric(3)
  @Input()
  strokeWidth = 3;

  get radius() {
    return this.diameter / 2;
  }

  get strokeDasharray() {
    return `${this._circumference} ${this._circumference}`;
  }

  get strokeDashoffset() {
    return this._circumference - (this.percentage / 100) * this._circumference;
  }

  get percentage() {
    return (100 / this._modeTotal) * this._modeValue;
  }

  get isComplete() {
    return this.value === this.total;
  }

  @HostBinding('class.ngx-progress-spinner') hostClass = true;

  @HostBinding('class.ngx-progress-spinner--indeterminate')
  get indeterminateClass() {
    return this.mode === ProgressSpinnerMode.Indeterminate;
  }

  @HostBinding('style.--spinner-color')
  @Input()
  get spinnerColor() {
    return this.isComplete && this.isFailure
      ? this.failStatusColor
      : this.color;
  }

  @HostBinding('class.ngx-progress-spinner--show-icon')
  get showIcon() {
    return this.appearance === ProgressSpinnerAppearance.Icon;
  }

  readonly uid = id();

  private readonly _indeterminate = {
    value: 50,
    total: 100,
  };

  private get _circumference() {
    return this.radius * 2 * Math.PI;
  }

  private get _modeValue() {
    return this.mode === ProgressSpinnerMode.Determinate || this.isComplete
      ? this.value
      : this._indeterminate.value;
  }

  private get _modeTotal() {
    return this.mode === ProgressSpinnerMode.Determinate || this.isComplete
      ? this.total
      : this._indeterminate.total;
  }
}
