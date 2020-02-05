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
  encapsulation: ViewEncapsulation.None
})
export class ProgressSpinnerComponent {
  @Input() mode = ProgressSpinnerMode.Indeterminate;
  @Input() color = '#1483FF';
  @Input() inProgressIcon?: TemplateRef<any>;
  @Input() completeIcon?: TemplateRef<any>;

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

  @HostBinding('style.box-shadow')
  get boxShadow() {
    return `0px 0px 5px 0px ${this.color}`;
  }

  get radius() {
    return this.diameter / 2 - this.strokeWidth;
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

  readonly ProgressSpinnerMode = ProgressSpinnerMode;

  private _value = 0;
  private _total = 100;
  private _diameter = 100;
  private _strokeWidth = 5;
  private readonly _indeterminate = {
    value: 50,
    total: 100
  };

  private get _circumference() {
    return this.radius * 2 * Math.PI;
  }

  private get _modeValue() {
    return this.mode === ProgressSpinnerMode.Determinate || this.value === this.total
      ? this.value
      : this._indeterminate.value;
  }

  private get _modeTotal() {
    return this.mode === ProgressSpinnerMode.Determinate || this.value === this.total
      ? this.total
      : this._indeterminate.total;
  }

  constructor(private readonly _cdr: ChangeDetectorRef) {}
}
