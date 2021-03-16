import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import type { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { LongPressButtonState } from './enums';

@Component({
  selector: 'ngx-long-press-button',
  templateUrl: './long-press-button.component.html',
  styleUrls: ['./long-press-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'ngxLongPressButton',
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
      transition('inactive => active', animate(`{{ duration }}ms ease-out`), {
        params: { duration: 1000 }
      })
    ])
  ]
})
export class LongPressButtonComponent implements OnChanges {
  @Input() icon = 'mouse-hold';

  @InputEnum(LongPressButtonState)
  @Input('state')
  _state!: EnumKey<typeof LongPressButtonState>;
  state: LongPressButtonState = LongPressButtonState.Active;

  @InputNumeric(3000)
  @Input()
  duration = 3000;

  @HostBinding('class.disabled-button')
  @InputBoolean()
  @Input()
  disabled = false;

  @Output() longPress = new EventEmitter<MouseEvent>();

  pressed = false;
  private _longPressSubscription?: Subscription;

  @HostBinding('class.ngx-long-press') hostClass = true;

  @HostBinding('class.active') get activeClass() {
    return this.state === LongPressButtonState.Active;
  }

  @HostBinding('class.submitted') get submittedClass() {
    return this.state === LongPressButtonState.Submitted;
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.updateState();
  }

  updateState(): void {
    if (!this.state) {
      this._state = 'Active';
    }

    if (this.state === LongPressButtonState.Submitted) {
      this.disabled = true;
      this._longPressSubscription?.unsubscribe();

      this._longPressSubscription = timer(3000).subscribe(() => {
        this._state = 'Active';
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
      this._state = 'Submitted';
      this.longPress.emit(e);
      this.updateState();
    }
  }

  onLongPressCancel(): void {
    this.pressed = false;
  }
}
