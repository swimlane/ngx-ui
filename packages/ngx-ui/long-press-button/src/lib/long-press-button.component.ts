import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { Subscription, timer } from 'rxjs';
import { LongPressButtonState } from './enums';

@Component({
  selector: 'ngx-long-press-button',
  exportAs: 'ngxLongPressButton',
  templateUrl: './long-press-button.component.html',
  styleUrls: ['./long-press-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('circleAnimation', [
      state(
        'active',
        style({
          strokeDasharray: '1000 1000',
        })
      ),
      state(
        'inactive',
        style({
          strokeDasharray: '0 1000',
        })
      ),
      transition('inactive => active', animate(`{{ duration }}ms ease-out`), {
        params: { duration: 1000 },
      }),
    ]),
  ],
})
export class LongPressButtonComponent implements OnChanges {
  static ngAcceptInputType_duration: NumericInput;
  static ngAcceptInputType_disabled: BooleanInput;

  @HostBinding('class.ngx-long-press') hostClass = true;

  @Input('state') set _state(v: EnumKey<typeof LongPressButtonState>) {
    this.state = LongPressButtonState[v];
  }

  state = LongPressButtonState.active;

  @Input() icon = 'mouse-hold';

  @NgxNumericInput(3000)
  @Input()
  duration = 3000;

  @HostBinding('class.disabled-button')
  @NgxBooleanInput()
  @Input()
  disabled = false;

  @Output() longPress = new EventEmitter<MouseEvent>();

  @HostBinding('class.active') get activeClass() {
    return this.state === LongPressButtonState.active;
  }

  @HostBinding('class.submitted') get submittedClass() {
    return this.state === LongPressButtonState.submitted;
  }

  readonly LongPressButtonState = LongPressButtonState;

  pressed = false;
  private _longPressSubscription?: Subscription;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.updateState();
  }

  updateState(): void {
    if (!this.state) {
      this._state = 'active';
    }

    if (this.state === LongPressButtonState.submitted) {
      this.disabled = true;
      this._longPressSubscription?.unsubscribe();

      this._longPressSubscription = timer(3000).subscribe(() => {
        this._state = 'active';
        this.disabled = false;
        this.updateState();
      });
    }

    this.cdr.markForCheck();
  }

  onLongPressStart(): void {
    if (!this.disabled) {
      this.pressed = true;
    }
  }

  onLongPressFinish(e: MouseEvent): void {
    if (!this.disabled) {
      this.pressed = false;
      this._state = 'submitted';
      this.longPress.emit(e);
      this.updateState();
    }
  }

  onLongPressCancel(): void {
    this.pressed = false;
  }
}
