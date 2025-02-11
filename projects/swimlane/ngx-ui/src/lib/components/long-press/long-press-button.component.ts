import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

import { LongPressButtonState } from './long-press-button-state.enum';

@Component({
  exportAs: 'ngxLongPressButton',
  selector: 'ngx-long-press-button',
  templateUrl: './long-press-button.component.html',
  styleUrls: ['./long-press-button.component.scss'],
  host: {
    class: 'ngx-long-press',
    '[class.disabled-button]': 'disabled',
    '[class.active]': 'state === LongPressButtonState.Active',
    '[class.submitted]': 'state === LongPressButtonState.Submitted'
  },
  animations: [
    trigger('circleAnimation', [
      state(
        'active',
        style({
          strokeDasharray: '1000 1000'
        })
      ),
      state(
        'inactive',
        style({
          strokeDasharray: '0 1000'
        })
      ),
      transition('inactive => active', animate('{{ duration }}ms ease-out'), { params: { duration: 1000 } })
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class LongPressButtonComponent implements OnInit, OnChanges {
  @Input() state = LongPressButtonState.Active;
  @Input() icon = 'mouse-hold';

  @Input()
  get duration() {
    return this._duration;
  }
  set duration(duration: number) {
    this._duration = coerceNumberProperty(duration);
  }

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Output() longPress: EventEmitter<boolean> = new EventEmitter<boolean>();

  readonly LongPressButtonState = LongPressButtonState;
  pressed = false;

  private _lastTimeout: any;
  private _duration = 3000;
  private _disabled = false;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateState();
  }

  ngOnChanges(): void {
    this.updateState();
  }

  updateState() {
    if (!this.state) {
      this.state = LongPressButtonState.Active;
    }

    if (this.state === LongPressButtonState.Submitted) {
      this.disabled = true;
      clearTimeout(this._lastTimeout);

      this._lastTimeout = setTimeout(() => {
        this.state = LongPressButtonState.Active;
        this.disabled = false;
        this.updateState();
      }, 3000);
    }

    this.cdr.markForCheck();
  }

  onLongPressStart(): void {
    if (!this.disabled) {
      this.pressed = true;
    }
  }

  onLongPressFinish(e: boolean): void {
    if (!this.disabled) {
      this.pressed = false;
      this.state = LongPressButtonState.Submitted;
      this.longPress.emit(e);
      this.updateState();
    }
  }

  onLongPressCancel(): void {
    this.pressed = false;
  }
}
