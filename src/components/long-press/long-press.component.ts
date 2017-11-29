import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  HostBinding,
  HostListener
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'ngx-long-press',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./long-press.component.scss'],
  host: {class: 'ngx-long-press'},
  template: `
    <span class="inner-background"></span>
    <svg viewBox='-170 -170 340 340'>
      <g transform="rotate(-90)">
        <circle
          r="160"
          [@circleAnimation]="{value: pressed ? 'active' : 'inactive', params: { duration: duration }}"
        />
      </g>
    </svg>
    <button [disabled]="_disabled">
      <ngx-icon *ngIf="active" class="icon" [fontIcon]="icon"></ngx-icon>
      <ngx-icon *ngIf="submitted" class="icon" fontIcon="check"></ngx-icon>
    </button>
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
export class LongPressComponent implements OnInit, OnChanges {
  @Input() disabled: boolean = false;
  @Input() state: string = 'active'; // active, submitted
  @Input() duration: number = 3000;
  @Input() icon: string = 'mouse';

  @HostBinding('class.submitted') submitted: boolean = false;
  @HostBinding('class.active') active: boolean = true;
  @HostBinding('class.disabled-button') _disabled: boolean = false;

  @Output() longPress: EventEmitter<any> = new EventEmitter<any>();

  lastTimeout: any;
  pressed: boolean = false;
  pressTimeout: any;

  ngOnInit(): void {
    this.updateState();
  }

  ngOnChanges(): void {
    this._disabled = this.disabled;
    this.updateState();
  }

  updateState() {
    if (!this.state) {
      this.state = 'active';
    }

    this.submitted = false;
    this.active = false;

    switch (this.state) {
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
        this.state = 'active';
        this._disabled = this.disabled;
        this.updateState();
      }, 3000);
    }
  }

  @HostListener('mousedown', ['$event'])
  onPress(event): void {
    if (this._disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    this.pressed = true;
    this.pressTimeout = setTimeout(() => {
      if (this.pressed) {
        this.longPress.emit(event);
        this.pressed = false;
        this.state = 'submitted';
        this.updateState();
      }
    }, this.duration);
  }

  @HostListener('mouseout', ['$event'])
  @HostListener('mouseup', ['$event'])
  onRelease(event): void {
    this.pressed = false;
    clearTimeout(this.pressTimeout);
  }
}
