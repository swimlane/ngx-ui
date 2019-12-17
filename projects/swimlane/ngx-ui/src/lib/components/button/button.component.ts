import { Component, Input, ViewEncapsulation, OnInit, OnChanges, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BehaviorSubject } from 'rxjs';

import { ButtonState } from './button-state.enum';

@Component({
  selector: 'ngx-button',
  exportAs: 'ngxButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    class: 'ngx-button',
    '[class.in-progress]': 'inProgress$.value',
    '[class.active]': 'active$.value',
    '[class.success]': 'success$.value',
    '[class.fail]': 'fail$.value',
    '[class.disabled-button]': 'disabled'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() promise?: Promise<any>;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(v: boolean) {
    this._disabled = coerceBooleanProperty(v);
  }

  @Input()
  get state() { return this._state; }
  set state(v: ButtonState) {
    this._state = v;

    this.inProgress$.next(v === ButtonState.InProgress);
    this.active$.next(v === ButtonState.Active);
    this.success$.next(v === ButtonState.Success);
    this.fail$.next(v === ButtonState.Fail);
  }

  readonly inProgress$ = new BehaviorSubject(false);
  readonly active$ = new BehaviorSubject(false);
  readonly success$ = new BehaviorSubject(false);
  readonly fail$ = new BehaviorSubject(false);

  private _state = ButtonState.Active;
  private _disabled = false;
  private _timer: any;

  ngOnInit() {
    this.updateState();
  }

  ngOnChanges() {
    this.updateState();
    this.updatePromise();
  }

  updatePromise() {
    if (this.promise) {
      this.state = ButtonState.InProgress;
      this.updateState();
      return this.promise
        .then(() => {
          this.state = ButtonState.Success;
          this.updateState();
        })
        .catch(() => {
          this.state = ButtonState.Fail;
          this.updateState();
        });
    }
  }

  updateState() {
    if (!this.state) {
      this.state = ButtonState.Active;
    }

    if (this.state === ButtonState.Success ||
        this.state === ButtonState.Fail ||
        this.state === ButtonState.InProgress) {
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this.state = ButtonState.Active;
        this.updateState();
      }, 3000);
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();

      return false;
    }

    return true;
  }
}
