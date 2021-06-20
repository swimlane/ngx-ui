import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { BehaviorSubject } from 'rxjs';
import { ButtonState } from './enums';

@Component({
  selector: 'ngx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_timeout: NumericInput;

  @Input() promise?: Promise<unknown>;

  @HostBinding('class.disabled')
  @NgxBooleanInput()
  @Input()
  disabled = false;

  @NgxNumericInput(3000)
  @Input()
  timeout = 3000;

  @Input() set _state(v: EnumKey<typeof ButtonState>) {
    const buttonState = ButtonState[v];
    this.state = buttonState;

    this.inProgress$.next(buttonState === ButtonState.inProgress);
    this.active$.next(buttonState === ButtonState.active);
    this.success$.next(buttonState === ButtonState.success);
    this.fail$.next(buttonState === ButtonState.fail);
  }

  state = ButtonState.active;

  @HostBinding('class.ngx-button') hostClass = true;

  @HostBinding('class.in-progress') get inProgressClass() {
    return this.inProgress$.value;
  }

  @HostBinding('class.active') get activeClass() {
    return this.active$.value;
  }

  @HostBinding('class.success') get successClass() {
    return this.success$.value;
  }

  @HostBinding('class.fail') get failedClass() {
    return this.fail$.value;
  }

  readonly inProgress$ = new BehaviorSubject(false);
  readonly active$ = new BehaviorSubject(false);
  readonly success$ = new BehaviorSubject(false);
  readonly fail$ = new BehaviorSubject(false);

  private timerId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.updateState();
  }

  ngOnChanges(): void {
    this.updateState();
    void this.updatePromise();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();

      return false;
    }

    return true;
  }

  private updatePromise(): Promise<unknown> | undefined {
    if (!this.promise) return;

    this._state = 'inProgress';

    return this.promise
      .then(() => (this._state = 'success'))
      .catch(() => (this._state = 'fail'))
      .finally(() => this.updateState());
  }

  private updateState(): void {
    if (!this.state) {
      this._state = 'active';
    }

    if (
      this.timeout &&
      (this.state === ButtonState.success ||
        this.state === ButtonState.fail ||
        this.state === ButtonState.inProgress)
    ) {
      if (this.timerId) clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this._state = 'active';
        this.updateState();
      }, this.timeout);
    }
  }
}
