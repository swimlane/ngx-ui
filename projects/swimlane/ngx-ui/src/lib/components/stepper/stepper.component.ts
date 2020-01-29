import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'ngx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class StepperComponent {
  @Input() steps: number = 0;
  stepsArr: number[] = [];
  private _currentStep = 0;

  get currentStep() {
    return this._currentStep;
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!isNaN(this.steps)) {
      this.stepsArr = Array.from(Array(this.steps), (_x, i) => i);
    }
  }

  previousStep() {
    if (this._currentStep > 0) {
      this._currentStep--;
      this.cdr.markForCheck();
    }
  }

  nextStep() {
    if (this.stepsArr.length && this.currentStep < this.stepsArr.length - 1) {
      this._currentStep++;
      this.cdr.markForCheck();
    }
  }

  jumpToStep(step: number) {
    if (step !== undefined && !isNaN(step) && step >= 0 && step < this.stepsArr.length) {
      this._currentStep = step;
      this.cdr.markForCheck();
    }
  }
}
