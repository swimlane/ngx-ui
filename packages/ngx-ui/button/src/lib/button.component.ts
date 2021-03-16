import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { BehaviorSubject } from 'rxjs';
import { ButtonState } from './enums';

@Component({
  selector: 'ngx-button',
  exportAs: 'ngxButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, OnChanges {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_timeout: NumericInput;

  @Input() promise?: Promise<unknown>;

  @InputBoolean()
  @Input()
  disabled = false;

  @InputNumeric(3000)
  @Input()
  timeout = 3000;

  @Input('state')
  set _state(v: EnumKey<typeof ButtonState>) {
    const buttonState = ButtonState[v];
    this.state = buttonState;

    this.inProgress$.next(buttonState === ButtonState.InProgress);
    this.active$.next(buttonState === ButtonState.Active);
    this.success$.next(buttonState === ButtonState.Success);
    this.fail$.next(buttonState === ButtonState.Fail);
  }

  state = ButtonState.Active;

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

  private timerId?: number;

  constructor() {}

  ngOnInit(): void {
    this.updateState();
  }

  ngOnChanges() {
    this.updateState();
    this.updatePromise();
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

  updatePromise(): Promise<unknown> | undefined {
    if (this.promise) {
      this._state = 'InProgress';

      return this.promise
        .then(() => {
          this._state = 'Success';
        })
        .catch(() => {
          this._state = 'Fail';
        })
        .finally(() => {
          this.updateState();
        });
    }

    return undefined;
  }

  updateState() {
    if (!this.state) {
      this._state = 'Active';
    }

    if (
      this.timeout &&
      (this.state === ButtonState.Success || this.state === ButtonState.Fail || this.state === ButtonState.InProgress)
    ) {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = (setTimeout(() => {
        this._state = 'Active';
        this.updateState();
      }, this.timeout) as unknown) as number;
    }
  }
}
