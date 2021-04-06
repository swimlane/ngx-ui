import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  NgZone,
  Renderer2,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
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
export class ButtonComponent implements OnInit, OnChanges, OnDestroy {
  @Input() promise?: Promise<any>;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(v: boolean) {
    this._disabled = coerceBooleanProperty(v);
  }

  @Input()
  get state() {
    return this._state;
  }
  set state(v: ButtonState) {
    this._state = v;

    this.inProgress$.next(v === ButtonState.InProgress);
    this.active$.next(v === ButtonState.Active);
    this.success$.next(v === ButtonState.Success);
    this.fail$.next(v === ButtonState.Fail);
  }

  @Input()
  get timeout() {
    return this._timeout === undefined ? 3000 : this._timeout;
  }
  set timeout(v: number) {
    this._timeout = coerceNumberProperty(v);
  }

  readonly inProgress$ = new BehaviorSubject(false);
  readonly active$ = new BehaviorSubject(false);
  readonly success$ = new BehaviorSubject(false);
  readonly fail$ = new BehaviorSubject(false);

  private _state = ButtonState.Active;
  private _disabled = false;
  private _timer: any;
  private _timeout: any;
  private _clickListener: VoidFunction;

  constructor(ngZone: NgZone, renderer: Renderer2, host: ElementRef<HTMLElement>) {
    ngZone.runOutsideAngular(() => {
      this._clickListener = renderer.listen(host.nativeElement, 'click', (event: MouseEvent) => {
        if (this.disabled) {
          event.stopPropagation();
          event.preventDefault();
          // Necessary for legacy browsers that don't support preventDefault (e.g. IE)
          event.returnValue = false;
        }
      });
    });
  }

  ngOnInit() {
    this.updateState();
  }

  ngOnChanges() {
    this.updateState();
    this.updatePromise();
  }

  ngOnDestroy(): void {
    this._clickListener();
  }

  updatePromise() {
    if (this.promise) {
      this.state = ButtonState.InProgress;

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

    if (
      this.timeout &&
      (this.state === ButtonState.Success || this.state === ButtonState.Fail || this.state === ButtonState.InProgress)
    ) {
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this.state = ButtonState.Active;
        this.updateState();
      }, this.timeout);
    }
  }
}
