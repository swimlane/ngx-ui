import { Component, Input, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
import './slider.scss';

let nextId = 0;

@Component({
  selector: 'swui-slider',
  template: `
    <div class="slider-inner">
      <input
        type="range"
        [id]="id"
        [attr.list]="id + '-list'"
        [attr.orientation]="orientation"
        [(ngModel)]="value"
        [min]="min"
        [max]="max"
        [multiple]="multiple"
        [step]="step"
        (input)="changed($event)"
        (change)="changed($event)"
      />
      <span
        *ngIf="filled"
        [ngStyle]="getFill()"
        class="fill-bar">
      </span>
      <datalist
        *ngIf="showTicks"
        [id]="id + '-list'">
        <option *ngFor="let i of count">
          {{i}}
        </option>
      </datalist>
    </div>
  `,
  host: {
    class: 'slider'
  }
})
export class Slider {

  @Input() id = `range-${++nextId}`;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() orientation = 'horizontal';
  @Input() filled = false;

  // Not supported in all
  // browers see polyfill
  // http://leaverou.github.io/multirange/
  @Input() multiple = false;

  @Input() showTicks = false;
  @Input() tickStep;

  _value: any;
  count = [];
  active: boolean;

  @Input()
  set value(val) {
    this._value = val;
  }

  get value() {
    if(this._value === undefined) return 0;
    if(!this._value.join) return this._value;
    return this._value.join(',');
  }

  @Output() onChange = new EventEmitter();

  @HostBinding('class.filled')
  get isFilled() {
    return this.filled;
  }

  @HostBinding('class.horizontal')
  get isHorizontal() {
    return this.orientation === 'horizontal';
  }

  @HostBinding('class.vertical')
  get isVertical() {
    return this.orientation === 'vertical';
  }

  @HostBinding('class.active')
  get isActive() {
    return this.active;
  }

  get percent() {
    return Math.round(100 * (this.value - this.min) / (this.max - this.min));
  }

  getCount() {
    let idxs = [];
    const step = this.tickStep || this.step;

    let i = this.min;
    while(i <= this.max) {
      idxs.push(i);
      i += step;
    }

    return idxs;
  }

  getFill() {
    if(this.filled) {
      const size = this.isHorizontal ?
        `${this.percent}% 100%` :
        `100% ${this.percent}%`;

      return {
        'background-size': size
      };
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown() {
    this.active = true;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp() {
    this.active = false;
  }

  ngOnInit() {
    if(this.showTicks) {
      this.count = this.getCount();
    }
  }

  changed(event) {
    this.onChange.emit({
      value: this.value,
      percent: this.percent,
      event
    });
  }

}
