import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  exportAs: 'ngxStepper',
  selector: 'ngx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  host: { class: 'ngx-stepper' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class StepperComponent {
  @Input()
  get steps() { return this._steps; }
  set steps(v: number) {
    this._steps = coerceNumberProperty(v);

    if (!isNaN(this._steps)) {
      this.stepsArr = Array.from(Array(this._steps), (_, i) => i);
    }

    this.cdr.markForCheck();
  }

  @Input()
  get active() { return this._active; }
  set active(v: number) {
    v = coerceNumberProperty(v);

    if (v !== undefined && !isNaN(v) && v >= 0 && v < this.stepsArr.length) {
      this._active = v;
      this.activeChange.emit(this._active);
      this.cdr.markForCheck();
    }
  }

  @Input()
  get clickable() { return this._clickable; }
  set clickable(v: boolean) {
    this._clickable = coerceBooleanProperty(v);
  }

  @Output() activeChange = new EventEmitter<number>();

  stepsArr: number[] = [];

  private _active: number = 0;
  private _steps: number = 0;
  private _clickable: boolean = false;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  previous() {
    if (this._active > 0) {
      this.active--;
    }
  }

  next() {
    if (this.stepsArr.length && this._active < this.stepsArr.length - 1) {
      this.active++;
    }
  }

  first() {
    this.active = 0;
  }

  last() {
    this.active = this._steps - 1;
  }
}
