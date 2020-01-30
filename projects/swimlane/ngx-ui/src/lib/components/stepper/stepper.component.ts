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

import { StepperDirection } from './stepper-direction.enum';
import { StepComponent } from './step.component';

@Component({
  exportAs: 'ngxStepper',
  selector: 'ngx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  host: {
    class: 'ngx-stepper',
    '[class.ngx-stepper--clickable]': 'clickable',
    '[class.ngx-stepper--vertical]': 'direction === StepperDirection.Vertical'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class StepperComponent implements OnDestroy {
  @Input() completeIcon = 'ngx-icon ngx-check';
  @Input() direction = StepperDirection.Horizontal;

  @Input()
  get active() {
    return this._active;
  }
  set active(v: number) {
    v = coerceNumberProperty(v);

    if (v !== undefined && !isNaN(v) && v >= 0 && (!this._steps || v < this._steps.length)) {
      this._active = v;
      this.activeChange.emit(this._active);

      if (this._steps) {
        for (const step of this._steps) {
          step.active = v;
        }
      }

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
      item.step.step = item.i;
      item.step.active = this.active;
      item.step.total = this._steps.length;

      if (!item.step.completeIcon) {
        item.step.completeIcon = this.completeIcon;
      }

      item.step.activeChange.pipe(takeUntil(this._destroy$)).subscribe(active => this.active = active);
    }

    this._cdr.markForCheck();
  }

  readonly StepperDirection = StepperDirection;

  private _active: number = 0;
  private _clickable: boolean = false;
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
}
