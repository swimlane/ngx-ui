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
import {
  BooleanInput,
  DestroyedService,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { queueForNextRender } from '@swimlane/ngx-ui/utils';
import { takeUntil } from 'rxjs/operators';
import {
  StepperAnimationState,
  StepperBarAnimationState,
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
  static ngAcceptInputType_readonly: BooleanInput;
  static ngAcceptInputType_progress: BooleanInput;
  static ngAcceptInputType_large: BooleanInput;
  static ngAcceptInputType_removeHighlight: BooleanInput;
  static ngAcceptInputType_trackBar: BooleanInput;
  static ngAcceptInputType_active: NumericInput;

  @HostBinding('class.ngx-stepper') hostClass = true;

  @Input('position') set _position(v: EnumKey<typeof StepperPosition>) {
    this.position = StepperPosition[v];
  }

  position = StepperPosition.top;

  @NgxNumericInput<StepperComponent>(
    0,
    ({ component, coercedValue, previousValue, setFn }) => {
      if (
        coercedValue !== undefined &&
        !isNaN(coercedValue) &&
        coercedValue !== previousValue &&
        coercedValue >= 0 &&
        (!component._steps || coercedValue <= component._steps.length)
      ) {
        setFn();

        if (component._steps) {
          for (const step of component._steps) {
            step.active = coercedValue;
          }
        }

        component.activeChange.emit(coercedValue);
      }
    }
  )
  @Input()
  active = 0;

  @HostBinding('class.ngx-stepper--readonly')
  @NgxBooleanInput()
  @Input()
  readonly = true;

  @HostBinding('class.ngx-stepper--with-progress')
  @NgxBooleanInput()
  @Input()
  progress = false;

  @HostBinding('class.ngx-stepper--lg')
  @NgxBooleanInput()
  @Input()
  large = false;

  @HostBinding('class.ngx-stepper--no-highlight')
  @NgxBooleanInput()
  @Input()
  removeHighlight = false;

  @NgxBooleanInput()
  @Input()
  trackBar = false;

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

  private _completeIcon = 'ngx-icon ngx-check';

  @ContentChildren(StepComponent)
  get steps() {
    return this._steps;
  }

  set steps(v) {
    this._steps = v;
    this.destroyed.imperativeDestroy();

    for (const item of this._steps?.map((step, i) => ({ step, i })) || []) {
      setTimeout(() => {
        item.step.step = item.i;
        item.step.active = this.active;
        item.step.total = this._steps?.length || 0;

        if (!item.step.completeIcon) {
          item.step.completeIcon = this.completeIcon;
        }

        item.step.activeChange
          .pipe(takeUntil(this.destroyed))
          .subscribe((active: number) => (this.active = active));
      });
    }

    this.cdr.markForCheck();
  }

  private _steps?: QueryList<StepComponent>;

  @Output() activeChange = new EventEmitter<number>();

  get completeSteps() {
    return (this._steps?.filter((s) => s.step < this.active) || []).length;
  }

  get vertical() {
    return (
      this.position === StepperPosition.left ||
      this.position === StepperPosition.right
    );
  }

  get barState() {
    return this._barState;
  }

  private _barState = StepperBarAnimationState.stay;

  readonly StepperPosition = StepperPosition;

  @HostBinding('class.ngx-stepper--top') get topClass() {
    return this.position === StepperPosition.top;
  }

  @HostBinding('class.ngx-stepper--bottom') get bottomClass() {
    return this.position === StepperPosition.bottom;
  }

  @HostBinding('class.ngx-stepper--left') get leftClass() {
    return this.position === StepperPosition.left;
  }

  @HostBinding('class.ngx-stepper--right') get rightClass() {
    return this.position === StepperPosition.right;
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyed: DestroyedService
  ) {}

  previous() {
    if (this.active > 0) {
      this.active--;
    }
  }

  next() {
    if (this.steps?.length && this.active < this.steps?.length - 1) {
      this.active++;
    }
  }

  first() {
    this.active = 0;
  }

  last() {
    if (this._steps) {
      this.active = this._steps.length - 1;
    }
  }

  complete() {
    if (this._steps) {
      this.active = this._steps.length;
    }
  }

  onResize() {
    this.cdr.detectChanges();
  }

  onStepAnimationStart(i: number) {
    if (i === this.active) {
      queueForNextRender(() => {
        this._barState = StepperBarAnimationState.move;
        this.cdr.markForCheck();
      });
    }
  }

  onStepAnimationEnd(i: number) {
    if (i === this.active) {
      queueForNextRender(() => {
        this._barState = StepperBarAnimationState.stay;
        this.cdr.markForCheck();
      });
    }
  }

  getStepState(i: number) {
    const position = i - this.active;

    if (position < 0) {
      return this.vertical
        ? StepperAnimationState.up
        : StepperAnimationState.left;
    } else if (position > 0) {
      return this.vertical
        ? StepperAnimationState.down
        : StepperAnimationState.right;
    }

    return StepperAnimationState.current;
  }
}
