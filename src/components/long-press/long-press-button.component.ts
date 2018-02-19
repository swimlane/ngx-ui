import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  HostBinding,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'ngx-long-press-button',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./long-press-button.component.scss'],
  host: {class: 'ngx-long-press'},
  template: `
    <div long-press
      [duration]="duration"
      [disabled]="_disabled"
      (longPressStart)="onLongPressStart($event)"
      (longPressFinish)="onLongPressFinish($event)"
      (longPressCancel)="onLongPressCancel($event)">
      <span class="inner-background"></span>
      <svg viewBox='-170 -170 340 340'>
        <g transform="rotate(-90)">
          <circle
            class="loading-circle"
            *ngIf="getState() !== 'submitted'"
            r="160"
            [@circleAnimation]="{value: pressed ? 'active' : 'inactive', params: { duration: duration }}"
          />
          <circle
            class="full-circle"
            *ngIf="getState() === 'submitted'"
            r="160"
          />
        </g>
      </svg>
      <button [disabled]="_disabled">
        <ngx-icon *ngIf="getState() === 'active'" class="icon" [fontIcon]="icon"></ngx-icon>
        <ngx-icon *ngIf="getState() === 'submitted'" class="icon" fontIcon="check"></ngx-icon>
      </button>
    </div>
  `,
  animations: [
    trigger('circleAnimation', [
      state('active', style({
        strokeDasharray: '1000 1000'
      })),
      state('inactive', style({
        strokeDasharray: '0 1000'
      })),
      transition('inactive => active', animate(`{{ duration }}ms ease-out`), {params: {duration: 1000}})
    ])
  ]
})
export class LongPressButtonComponent implements OnInit, OnChanges {
  @Input() disabled: boolean = false;
  @Input() state: string; // active, submitted - overrides default state
  @Input() duration: number = 3000;
  @Input() icon: string = 'mouse-hold';

  @HostBinding('class.submitted') submitted: boolean = false;
  @HostBinding('class.active') active: boolean = true;
  @HostBinding('class.disabled-button') _disabled: boolean = false;

  @Output() longPress: EventEmitter<any> = new EventEmitter<any>();

  lastTimeout: any;
  pressed: boolean = false;
  _state: string = 'active';

  getState(): string {
    if (this.state) {
      return this.state;
    }
    return this._state;
  }

  ngOnInit(): void {
    this.updateState();
  }

  ngOnChanges(): void {
    this._disabled = this.disabled;
    this.updateState();
  }

  updateState() {
    const currentState = this.getState();
    if (!currentState) {
      this._state = 'active';
    }

    this.submitted = false;
    this.active = false;

    switch (currentState) {
      case 'submitted':
        this.submitted = true;
        break;
      default:
        this.active = true;
        break;
    }

    if (this.submitted) {
      this._disabled = true;
      clearTimeout(this.lastTimeout);
      this.lastTimeout = setTimeout(() => {
        this._state = 'active';
        this._disabled = this.disabled;
        this.updateState();
      }, 3000);
    }
  }

  onLongPressStart(event): void {
    if (!this._disabled) {
      this.pressed = true;
    }
  }

  onLongPressFinish(event): void {
    if (!this._disabled) {
      this.pressed = false;
      this.longPress.emit(event);
      this._state = 'submitted';
      this.updateState();
    }
  }

  onLongPressCancel(event): void {
    this.pressed = false;
  }
}
