import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ChangeDetectorRef,
  TemplateRef,
  HostBinding
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ProgressSpinnerMode } from './progress-spinner-mode.enum';
import { id } from '../../utils/id/id.util';

export enum SpinnerAppearance {
  Default = 'default',
  Icon = 'icon'
}

export interface SpinnerLabel {
  inProgressLabel: string;
  completeLabel: string;
  failLabel: string;
}

@Component({
  exportAs: 'ngxProgressSpinner',
  selector: 'ngx-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
  host: {
    class: 'ngx-progress-spinner',
    '[class.ngx-progress-spinner--indeterminate]': 'mode === ProgressSpinnerMode.Indeterminate'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class ProgressSpinnerComponent {
  @Input() mode = ProgressSpinnerMode.Indeterminate;
  @Input() color = '#1483FF';
  @Input() failStatusColor = '#FF4514';
  @Input() appearance: SpinnerAppearance = SpinnerAppearance.Default;
  @Input() inProgressIcon?: TemplateRef<any>;
  @Input() completeIcon?: TemplateRef<any>;
  @Input() failIcon?: TemplateRef<any>;
  @Input() isFailure: boolean;
  @Input() spinnerLabel?: SpinnerLabel;

  @Input()
  get value() {
    return this._value;
  }
  set value(v: number) {
    this._value = coerceNumberProperty(v);
    this._cdr.markForCheck();
  }

  @Input()
  get total() {
    return this._total;
  }
  set total(t: number) {
    this._total = t;
    this._cdr.markForCheck();
  }

  @Input()
  get diameter() {
    return this._diameter;
  }
  set diameter(d: number) {
    this._diameter = coerceNumberProperty(d);
    this._cdr.markForCheck();
  }

  @Input()
  get strokeWidth() {
    return this._strokeWidth;
  }
  set strokeWidth(s: number) {
    this._strokeWidth = coerceNumberProperty(s);
    this._cdr.markForCheck();
  }

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
    return this.mode === ProgressSpinnerMode.Indeterminate;
  }

  @Input()
  get spinnerColor() {
    return this.isComplete && this.isFailure ? this.failStatusColor : this.color;
  }

  @HostBinding('class.ngx-progress-spinner--show-icon')
  get showIcon() {
    return this.appearance === SpinnerAppearance.Icon;
  }

  readonly uid: string = id();
  readonly ProgressSpinnerMode = ProgressSpinnerMode;

  private _value = 0;
  private _total = 100;
  private _diameter = 100;
  private _strokeWidth = 3;
  private readonly _indeterminate = {
    value: 50,
    total: 100
  };

  private get _circumference() {
    return this.radius * 2 * Math.PI;
  }

  private get _modeValue() {
    return this.mode === ProgressSpinnerMode.Determinate || this.isComplete ? this.value : this._indeterminate.value;
  }

  private get _modeTotal() {
    return this.mode === ProgressSpinnerMode.Determinate || this.isComplete ? this.total : this._indeterminate.total;
  }

  constructor(private readonly _cdr: ChangeDetectorRef) {}
}
