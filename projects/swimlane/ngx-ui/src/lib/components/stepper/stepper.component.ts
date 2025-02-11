import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import type { QueryList } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StepComponent } from './step.component';
import { StepperAnimationStates } from './stepper-animation-states.enum';
import { StepperBarAnimationStates } from './stepper-bar-animation-states.enum';

import { StepperPosition } from './stepper-position.enum';
import { stepperAnimations } from './stepper.animation';

@Component({
  exportAs: 'ngxStepper',
  selector: 'ngx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  host: {
    class: 'ngx-stepper',
    '[class.ngx-stepper--readonly]': 'readonly',
    '[class.ngx-stepper--with-progress]': 'progress',
    '[class.ngx-stepper--lg]': 'large',
    '[class.ngx-stepper--no-highlight]': 'removeHighlight',
    '[class.ngx-stepper--top]': 'position === StepperPosition.Top',
    '[class.ngx-stepper--bottom]': 'position === StepperPosition.Bottom',
    '[class.ngx-stepper--left]': 'position === StepperPosition.Left',
    '[class.ngx-stepper--right]': 'position === StepperPosition.Right'
  },
  animations: [
    stepperAnimations.horizontalStepTransition,
    stepperAnimations.verticalStepTransition,
    stepperAnimations.horizontalBarTransition,
    stepperAnimations.verticalBarTransition
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class StepperComponent implements OnDestroy {
  @Input() position = StepperPosition.Top;

  @Input()
  get completeIcon() {
    return this._completeIcon;
  }

  set completeIcon(v: string) {
    if (this._steps) {
      for (const step of this._steps) {
        if (!step.completeIcon || step.completeIcon === this._completeIcon) {
          step.completeIcon = v;
        }
      }
    }

    this._completeIcon = v;
  }

  @Input()
  get active() {
    return this._active;
  }

  set active(v: number) {
    v = coerceNumberProperty(v);

    if (v !== undefined && !isNaN(v) && v !== this._active && v >= 0 && (!this._steps || v <= this._steps.length)) {
      this._active = v;

      if (this._steps) {
        for (const step of this._steps) {
          step.active = v;
        }
      }

      this.activeChange.emit(this._active);
    }
  }

  @Input()
  get readonly() {
    return this._readonly;
  }

  set readonly(v: boolean) {
    this._readonly = coerceBooleanProperty(v);
  }

  @Input()
  get progress() {
    return this._progress;
  }

  set progress(v: boolean) {
    this._progress = coerceBooleanProperty(v);
  }

  @Input()
  get large() {
    return this._large;
  }

  set large(v: boolean) {
    this._large = coerceBooleanProperty(v);
  }

  @Input()
  get removeHighlight() {
    return this._removeHighlight;
  }

  set removeHighlight(v: boolean) {
    this._removeHighlight = coerceBooleanProperty(v);
  }

  @Input()
  get trackBar() {
    return this._trackBar;
  }

  set trackBar(v: boolean) {
    this._trackBar = coerceBooleanProperty(v);
  }

  @Output() activeChange = new EventEmitter<number>();

  @ContentChildren(StepComponent)
  get steps() {
    return this._steps;
  }

  set steps(v) {
    this._steps = v;
    this._destroy$.next();

    for (const item of this._steps.map((step, i) => ({ step, i }))) {
      setTimeout(() => {
        item.step.step = item.i;
        item.step.active = this.active;
        item.step.total = this._steps.length;

        if (!item.step.completeIcon) {
          item.step.completeIcon = this.completeIcon;
        }

        item.step.activeChange.pipe(takeUntil(this._destroy$)).subscribe(
          /* istanbul ignore next */
          active => (this.active = active)
        );
      });
    }

    this._cdr.markForCheck();
  }

  get completeSteps() {
    return this._steps.filter(s => s.step < this.active).length;
  }

  get vertical() {
    return this.position === StepperPosition.Left || this.position === StepperPosition.Right;
  }

  get barState() {
    return this._barState;
  }

  readonly StepperPosition = StepperPosition;

  private _active = 0;
  private _readonly = true;
  private _trackBar = true;
  private _progress = false;
  private _large = false;
  private _removeHighlight = false;
  private _completeIcon = 'ngx-icon ngx-check';
  private _steps?: QueryList<StepComponent>;
  private _barState = StepperBarAnimationStates.Stay;
  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  previous() {
    if (this._active > 0) {
      this.active--;
    }
  }

  next() {
    if (this.steps.length && this._active < this._steps.length - 1) {
      this.active++;
    }
  }

  first() {
    this.active = 0;
  }

  last() {
    this.active = this._steps.length - 1;
  }

  complete() {
    this.active = this._steps.length;
  }

  onResize() {
    this._cdr.detectChanges();
  }

  onStepAnimationStart(i: number) {
    if (i === this._active) {
      setTimeout(() => {
        this._barState = StepperBarAnimationStates.Move;
        this._cdr.markForCheck();
      });
    }
  }

  onStepAnimationEnd(i: number) {
    if (i === this._active) {
      setTimeout(() => {
        this._barState = StepperBarAnimationStates.Stay;
        this._cdr.markForCheck();
      });
    }
  }

  getStepState(i: number) {
    const position = i - this._active;

    if (position < 0) {
      return this.vertical ? StepperAnimationStates.Up : StepperAnimationStates.Left;
    } else if (position > 0) {
      return this.vertical ? StepperAnimationStates.Down : StepperAnimationStates.Right;
    }

    return StepperAnimationStates.Current;
  }
}
