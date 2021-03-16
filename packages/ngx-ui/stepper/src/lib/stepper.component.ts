import { BooleanInput, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { DestroyedService } from '@swimlane/ngx-ui/destroyed';
import { EnumKey } from '@swimlane/ngx-ui/types';
import { queueForNextRender } from '@swimlane/ngx-ui/utils/queue-for-next-render';
import { takeUntil } from 'rxjs/operators';
import {
  StepperAnimationStates,
  StepperBarAnimationStates,
  StepperPosition,
} from './enums';
import { StepComponent } from './step/step.component';
import { stepperAnimations } from './stepper.animation';

@Component({
  selector: 'ngx-stepper',
  exportAs: 'ngxStepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stepperAnimations.horizontalStepTransition,
    stepperAnimations.verticalStepTransition,
    stepperAnimations.horizontalBarTransition,
    stepperAnimations.verticalBarTransition,
  ],
  providers: [DestroyedService],
})
export class StepperComponent {
  static ngAcceptInputType_active: NumericInput;
  static ngAcceptInputType_readonly: BooleanInput;
  static ngAcceptInputType_progress: BooleanInput;
  static ngAcceptInputType_large: BooleanInput;
  static ngAcceptInputType_removeHighlight: BooleanInput;
  static ngAcceptInputType_trackBar: BooleanInput;

  @InputEnum(StepperPosition)
  @Input('position')
  _position!: EnumKey<typeof StepperPosition>;
  position = StepperPosition.Top;

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

    if (
      v !== undefined &&
      !isNaN(v) &&
      v !== this._active &&
      v >= 0 &&
      (!this._steps || v <= this._steps.length)
    ) {
      this._active = v;

      if (this._steps) {
        for (const step of this._steps) {
          step.active = v;
        }
      }

      this.activeChange.emit(this._active);
    }
  }

  @HostBinding('class.ngx-stepper--readonly')
  @InputBoolean()
  @Input()
  readonly = true;

  @HostBinding('class.ngx-stepper--with-progress')
  @InputBoolean()
  @Input()
  progress = false;

  @HostBinding('class.ngx-stepper--lg')
  @InputBoolean()
  @Input()
  large = false;

  @HostBinding('class.ngx-stepper--no-highlight')
  @InputBoolean()
  @Input()
  removeHighlight = false;

  @InputBoolean()
  @Input()
  trackBar = true;

  @Output() activeChange = new EventEmitter<number>();

  @ContentChildren(StepComponent)
  get steps() {
    return this._steps;
  }

  set steps(v) {
    if (v) {
      this._steps = v;
      this.destroyed.imperativeDestroy();

      for (const item of this._steps.map((step, i) => ({ step, i }))) {
        setTimeout(() => {
          item.step.step = item.i;
          item.step.active = this.active;
          item.step.total = this._steps!.length;

          if (!item.step.completeIcon) {
            item.step.completeIcon = this.completeIcon;
          }

          item.step.activeChange.pipe(takeUntil(this.destroyed)).subscribe(
            /* istanbul ignore next */
            (active) => (this.active = active)
          );
        });
      }

      this.cdr.markForCheck();
    }
  }

  get completeSteps() {
    return this._steps?.filter((s) => s.step! < this.active).length || 0;
  }

  get vertical() {
    return (
      this.position === StepperPosition.Left ||
      this.position === StepperPosition.Right
    );
  }

  get barState() {
    return this._barState;
  }

  get stepsLength() {
    return this.steps?.length || 0;
  }

  private _active = 0;
  private _completeIcon = 'ngx-icon ngx-check';
  private _steps?: QueryList<StepComponent>;
  private _barState = StepperBarAnimationStates.Stay;

  @HostBinding('class.ngx-stepper') hostClass = true;

  @HostBinding('class.ngx-stepper--top') get positionTopClass() {
    return this.position === StepperPosition.Top;
  }

  @HostBinding('class.ngx-stepper--bottom') get positionBottomClass() {
    return this.position === StepperPosition.Bottom;
  }

  @HostBinding('class.ngx-stepper--left') get positionLeftClass() {
    return this.position === StepperPosition.Left;
  }

  @HostBinding('class.ngx-stepper--right') get positionRightClass() {
    return this.position === StepperPosition.Right;
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyed: DestroyedService
  ) {}

  previous() {
    if (this._active > 0) {
      this.active--;
    }
  }

  next() {
    if (this.steps?.length && this._active < this.stepsLength - 1) {
      this.active++;
    }
  }

  first() {
    this.active = 0;
  }

  last() {
    this.active = this.stepsLength - 1;
  }

  complete() {
    this.active = this.stepsLength;
  }

  onResize() {
    this.cdr.detectChanges();
  }

  onStepAnimationStart(i: number) {
    if (i === this._active) {
      queueForNextRender(() => {
        this._barState = StepperBarAnimationStates.Move;
      });
    }
  }

  onStepAnimationEnd(i: number) {
    if (i === this._active) {
      queueForNextRender(() => {
        this._barState = StepperBarAnimationStates.Stay;
      });
    }
  }

  getStepState(i: number) {
    const position = i - this._active;

    if (position < 0) {
      return this.vertical
        ? StepperAnimationStates.Up
        : StepperAnimationStates.Left;
    } else if (position > 0) {
      return this.vertical
        ? StepperAnimationStates.Down
        : StepperAnimationStates.Right;
    }

    return StepperAnimationStates.Current;
  }
}
