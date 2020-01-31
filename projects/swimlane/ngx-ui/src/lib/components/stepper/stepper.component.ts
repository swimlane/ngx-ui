import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  OnDestroy
} from '@angular/core';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StepperPosition } from './stepper-position.enum';
import { StepComponent } from './step.component';

@Component({
  exportAs: 'ngxStepper',
  selector: 'ngx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  host: {
    class: 'ngx-stepper',
    '[class.ngx-stepper--clickable]': 'clickable',
    '[class.ngx-stepper--top]': 'position === StepperPosition.Top',
    '[class.ngx-stepper--bottom]': 'position === StepperPosition.Bottom',
    '[class.ngx-stepper--left]': 'position === StepperPosition.Left',
    '[class.ngx-stepper--right]': 'position === StepperPosition.Right'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
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
    this._cdr.markForCheck();
  }

  @Input()
  get active() {
    return this._active;
  }
  set active(v: number) {
    v = coerceNumberProperty(v);

    if (v !== undefined && !isNaN(v) && v >= 0 && (!this._steps || v < this._steps.length)) {
      this._active = v;

      if (this._steps) {
        for (const step of this._steps) {
          step.active = v;
        }
      }

      this.activeChange.emit(this._active);
      this._cdr.markForCheck();
    }
  }

  @Input()
  get clickable() {
    return this._clickable;
  }
  set clickable(v: boolean) {
    this._clickable = coerceBooleanProperty(v);
    this._cdr.markForCheck();
  }

  @Output() activeChange = new EventEmitter<number>();

  @ContentChildren(StepComponent)
  get steps() { return this._steps };
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

        item.step.activeChange.pipe(takeUntil(this._destroy$)).subscribe(active => this.active = active);
      });
    }

    this._cdr.markForCheck();
  }

  get transform() {
    const distance = (this._vertical ? this._steps.first.height : this._steps.first.width) * this._complete;
    return `translate${ this._vertical ? 'Y' : 'X' }(${ distance }px)`;
  }

  private get _complete() {
    return this._steps.filter(s => s.step < this.active).length;
  }

  private get _vertical() {
    return this.position === StepperPosition.Left ||
           this.position === StepperPosition.Right;
  }

  readonly StepperPosition = StepperPosition;

  private _active: number = 0;
  private _clickable: boolean = false;
  private _completeIcon: string = 'ngx-icon ngx-check';
  private _steps?: QueryList<StepComponent>;
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

  onResize(_: Partial<DOMRectReadOnly>) {
    this._cdr.detectChanges();
  }
}
