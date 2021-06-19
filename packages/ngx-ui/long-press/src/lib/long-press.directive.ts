import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import {
  BooleanInput,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { interval, Subscription, timer } from 'rxjs';
import { mapTo, switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[ngxLongPress]',
})
export class LongPressDirective {
  static ngAcceptInputType_ngxLongPress: NumericInput;
  static ngAcceptInputType_ngxLongPressInterval: NumericInput;
  static ngAcceptInputType_ngxLongPressDisabled: BooleanInput;

  @NgxNumericInput(3000)
  @Input()
  ngxLongPress = 3000;

  @NgxBooleanInput()
  @Input()
  ngxLongPressDisabled = false;

  @NgxNumericInput()
  @Input()
  ngxLongPressInterval?: number;

  get isContinuous() {
    return this.ngxLongPressInterval != null;
  }

  @Output() longPressStart = new EventEmitter<MouseEvent>();
  @Output() longPressFinish = new EventEmitter<MouseEvent>();
  @Output() longPressCancel = new EventEmitter<MouseEvent>();

  private pressing = false;
  private longPressSubscription?: Subscription;

  @HostListener('mousedown', ['$event'])
  onPress(event: MouseEvent) {
    if (this.ngxLongPressDisabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    this.pressing = true;
    this.longPressStart.emit(event);

    let obs = timer(this.ngxLongPress).pipe(mapTo(event));

    if (this.isContinuous) {
      obs = obs.pipe(
        tap((mouseEvent: MouseEvent) => this.longPressFinish.emit(mouseEvent)),
        switchMap((mouseEvent) =>
          interval(this.ngxLongPressInterval).pipe(mapTo(mouseEvent))
        ),
        takeUntil(this.longPressCancel)
      );
    }

    this.longPressSubscription = obs.subscribe((mouseEvent) => {
      if (this.pressing) {
        this.pressing = this.isContinuous;
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
