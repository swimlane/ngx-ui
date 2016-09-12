import { Component, Input, Output, EventEmitter, HostListener, HostBinding } from "@angular/core";
import './slider.scss';

@Component({
  selector: 'slider',
  template: `
    <div>
      <input
        type="range"
        [(ngModel)]="value"
        [min]="min"
        [max]="max"
        [multiple]="multiple"
        [step]="step"
        (input)="changed($event)"
        (change)="changed($event)"
      />
    </div>
  `,
  host: {
    'class': 'slider'
  }
})
export class Slider {

  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() multiple = false;
  @Input() direction = 'horizontal';

  @Input()
  set value(val) {
    this._value = val;
  }

  get value() {
    if(this._value == undefined) return 0;
    if(!this._value.join) return this._value;
    return this._value.join(',');
  }

  @Output() onChange = new EventEmitter();

  @HostBinding('class.horizontal')
  get isHorizontal() {
    return this.direction === 'horizontal';
  }

  @HostBinding('class.vertical')
  get isVertical() {
    return this.direction === 'vertical';
  }

  @HostBinding('class.active')
  get isActive() {
    return this.active;
  }

  get percent() {
    return Math.round(100 * (this.value - this.min) / (this.max - this.min));
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown() {
    this.active = true;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp() {
    this.active = false;
  }

  changed(event) {
    this.onChange.emit({
      value: this.value,
      percent: this.percent,
      event
    });
  }

}
