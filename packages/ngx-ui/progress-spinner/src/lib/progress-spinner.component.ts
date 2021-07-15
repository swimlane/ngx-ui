import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { id } from '@swimlane/ngx-ui/utils';
import { ProgressSpinnerAppearance, ProgressSpinnerMode } from './enums';
import { SpinnerLabel } from './models';

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

  @HostBinding('class.ngx-progress-spinner') hostClass = true;

  @Input('mode') set _mode(v: EnumKey<typeof ProgressSpinnerMode>) {
    this.mode = ProgressSpinnerMode[v];
  }

  mode = ProgressSpinnerMode.indeterminate;

  @Input() color = '#1483FF';
  @Input() failStatusColor = '#FF4514';

  @Input('appearance') set _appearance(
    v: EnumKey<typeof ProgressSpinnerAppearance>
  ) {
    this.appearance = ProgressSpinnerAppearance[v];
  }

  appearance = ProgressSpinnerAppearance.default;

  @Input() inProgressIcon?: TemplateRef<unknown>;
  @Input() completeIcon?: TemplateRef<unknown>;
  @Input() failIcon?: TemplateRef<unknown>;

  @NgxBooleanInput()
  @Input()
  isFailure = false;

  @Input() spinnerLabel?: SpinnerLabel;

  @NgxNumericInput(0)
  @Input()
  value = 0;

  @NgxNumericInput(100)
  @Input()
  total = 100;

  @NgxNumericInput(100)
  @Input()
  diameter = 100;

  @NgxNumericInput(3)
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

  @HostBinding('class.ngx-progress-spinner--indeterminate')
  get indeterminateClass() {
    return this.mode === ProgressSpinnerMode.indeterminate;
  }

  @Input()
  get spinnerColor() {
    return this.isComplete && this.isFailure
      ? this.failStatusColor
      : this.color;
  }

  @HostBinding('class.ngx-progress-spinner--show-icon')
  get showIcon() {
    return this.appearance === ProgressSpinnerAppearance.icon;
  }

  readonly uid: string = id();
  readonly ProgressSpinnerMode = ProgressSpinnerMode;

  private readonly _indeterminate = {
    value: 50,
    total: 100,
  };

  private get _circumference() {
    return this.radius * 2 * Math.PI;
  }

  private get _modeValue() {
    return this.mode === ProgressSpinnerMode.determinate || this.isComplete
      ? this.value
      : this._indeterminate.value;
  }

  private get _modeTotal() {
    return this.mode === ProgressSpinnerMode.determinate || this.isComplete
      ? this.total
      : this._indeterminate.total;
  }
}
