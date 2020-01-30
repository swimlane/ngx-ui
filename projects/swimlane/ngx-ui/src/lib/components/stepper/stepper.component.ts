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
  }

  @Input()
  get allowJumpTo() { return this._allowJumpTo; }
  set allowJumpTo(v: boolean) {
    this._allowJumpTo = coerceBooleanProperty(v);
  }

  @Output() indexChange = new EventEmitter<number>();

  stepsArr: number[] = [];

  private _currentStep: number = 0;
  private _steps: number = 0;
  private _allowJumpTo: boolean = false;

  get currentStep() {
    return this._currentStep;
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  previous() {
    if (this._currentStep > 0) {
      this._currentStep--;
      this.indexChange.emit(this._currentStep);
      this.cdr.markForCheck();
    }
  }

  next() {
    if (this.stepsArr.length && this.currentStep < this.stepsArr.length - 1) {
      this._currentStep++;
      this.indexChange.emit(this._currentStep);
      this.cdr.markForCheck();
    }
  }

  at(step: number) {
    if (step !== undefined && !isNaN(step) && step >= 0 && step < this.stepsArr.length) {
      this._currentStep = step;
      this.indexChange.emit(this._currentStep);
      this.cdr.markForCheck();
    }
  }
}
