import type { BooleanInput } from '@angular/cdk/coercion';
import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import { interval, Subscription, timer } from 'rxjs';
import { mapTo, switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[ngxLongPress]',
})
export class LongPressDirective {
  static ngAcceptInputType_duration: NumericInput;
  static ngAcceptInputType_continuousInterval: NumericInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_continuous: BooleanInput;

  @InputNumeric(3000)
  @Input('ngxLongPressDuration')
  duration = 3000;

  @InputBoolean()
  @Input('ngxLongPressDisabled')
  disabled = false;

  @InputBoolean()
  @Input('ngxLongPressContinuous')
  continuous = false;

  @InputNumeric(50)
  @Input('ngxLongPressContinuousInterval')
  continuousInterval = 50;

  @Output() longPressStart = new EventEmitter<MouseEvent>();
  @Output() longPressFinish = new EventEmitter<MouseEvent>();
  @Output() longPressCancel = new EventEmitter<MouseEvent>();

  private pressing = false;
  private longPressSubscription?: Subscription;

  @HostListener('mousedown', ['$event'])
  onPress(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    this.pressing = true;
    this.longPressStart.emit(event);

    let obs = timer(this.duration).pipe(mapTo(event));

    if (this.continuous) {
      obs = obs.pipe(
        tap((mouseEvent: MouseEvent) => this.longPressFinish.emit(mouseEvent)),
        switchMap((mouseEvent) =>
          interval(this.continuousInterval).pipe(mapTo(mouseEvent))
        ),
        takeUntil(this.longPressCancel)
      );
    }

    this.longPressSubscription = obs.subscribe((mouseEvent) => {
      if (this.pressing) {
        this.pressing = this.continuous;
        this.longPressFinish.emit(mouseEvent);
      }
    });
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onRelease(event: MouseEvent) {
    this.pressing = false;
    if (this.longPressSubscription) {
      this.longPressSubscription.unsubscribe();
    }
    this.longPressCancel.emit(event);
  }
}
