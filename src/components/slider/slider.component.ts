import {
  Component, Input, Output, EventEmitter,
  HostListener, HostBinding, forwardRef, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

const SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderComponent),
  multi: true
};

@Component({
  selector: 'ngx-slider',
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
        (input)="onChange($event)"
        (change)="onChange($event)"
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
  encapsulation: ViewEncapsulation.None,
  styles: [require('./slider.component.scss')],
  providers: [SLIDER_VALUE_ACCESSOR],
  host: {
    class: 'ngx-slider'
  }
})
export class SliderComponent implements ControlValueAccessor {

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

  get value() {
    if(!this._value) return 0;
    if(!this._value.join) return this._value;
    return this._value.join(',');
  }

  set value(val: any) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeCallback(this._value);

      this.change.emit({
        value: this.value,
        percent: this.percent
      });
    }
  }

  @Output() change = new EventEmitter();

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
    event.stopPropagation();
    this.active = true;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp() {
    event.stopPropagation();
    this.active = false;
  }

  ngOnInit() {
    if(this.showTicks) {
      this.count = this.getCount();
    }
  }

  onChange(event) {
    event.stopPropagation();

    this.change.emit({
      value: this.value,
      percent: this.percent
    });
  }

  writeValue(val) {
    if (val !== this._value) {
      this._value = val;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback: () => void = () => {
    // placeholder
  }

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  }

}
