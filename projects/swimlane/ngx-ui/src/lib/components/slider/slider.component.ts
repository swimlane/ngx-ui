import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

const SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderComponent),
  multi: true
};

const edge = typeof window !== 'undefined' ? window.navigator.userAgent.indexOf('Edge') > -1 : false;

@Component({
  selector: 'ngx-slider',
  exportAs: 'ngxSlider',
  templateUrl: './slider.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./slider.component.scss'],
  providers: [SLIDER_VALUE_ACCESSOR],
  host: {
    class: 'ngx-slider',
    '[class.filled]': 'filled',
    '[class.multiple]': 'multiple',
    '[class.disabled]': 'disabled',
    '[class.active]': 'active',
    '[class.vertical]': 'isVertical',
    '[class.horizontal]': 'isHorizontal'
  }
})
export class SliderComponent implements ControlValueAccessor, OnInit {
  @Input() id = `range-${++nextId}`;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() orientation = 'horizontal';
  @Input() filled = false;
  @Input() multiple = false;
  @Input() disabled = false;
  @Input() showTicks = false;
  @Input() tickStep: number;
  @Output() change = new EventEmitter();

  _values = [0];
  _percents = [0];
  _thumbs: any[] = [];
  _fill: any;
  _ticks = [];
  _active = [];
  active: boolean;

  get value() {
    if (!this._values) return 0;
    if (this.multiple) return [...this._values].sort((a, b) => a - b).join(',');
    return this._values[0];
  }

  set value(val: any) {
    val = ('' + val).split(',');
    if (String(val) !== String(this._values)) {
      this.setValues(val);
      this.onChangeCallback(this._values);

      this.change.emit({
        value: this._values,
        percent: this.percent
      });

      this.cdr.markForCheck();
    }
  }

  get percent(): string {
    const pct = this._percents;
    if (this.multiple) return pct.join(',');
    return '' + pct[0];
  }

  get isHorizontal(): boolean {
    return this.orientation === 'horizontal';
  }

  get isVertical(): boolean {
    return this.orientation === 'vertical';
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.showTicks) {
      this._ticks = this.getTicks();
    }
    this.setValues([0]);
  }

  setValues(values: number[]) {
    this._values = values;
    this._percents = values
      .map(v => Math.max(this.min, Math.min(this.max, v)))
      .map(v => Math.round((100 * (v - this.min)) / (this.max - this.min)));

    this._thumbs = this._percents.map(p => {
      return {
        left: `calc(${p}% - ${p / 100}em)`
      };
    });

    if (this.filled) {
      this._fill = this.getFill();
    }

    if (this.showTicks) {
      this._ticks = this.getTicks();
    }
  }

  setActive(index: number, active: boolean) {
    this._active[index] = active;
  }

  setValue(val: number, index: number) {
    if (this._values[index] !== val) {
      this._values[index] = val;
      this.setValues(this._values);
      this.onChangeCallback(this.value);

      this.change.emit({
        value: this.value,
        percent: this.percent
      });
    }
  }

  getCount(): any {
    const idxs = [];
    const step = this.tickStep || this.step;

    let i = this.min;
    while (i <= this.max) {
      idxs.push(i);
      i += step;
    }

    return idxs;
  }

  getTicks(): any {
    return this.getCount().map(p => {
      return {
        left: `calc(${p}% - ${p / 100 - 0.5}em)`
      };
    });
  }

  getFill(): any {
    if (this.filled) {
      const percentMin = this.multiple ? Math.min(...this._percents) : 0;
      const percentMax = this.multiple ? Math.max(...this._percents) : this._percents[0];
      const width = percentMax - percentMin;

      if (edge && this.multiple) {
        return {
          left: `calc(${percentMin}% - ${percentMin / 100 - 0.5}em)`,
          'background-size': `calc(${width}% - ${width / 100}em) 100%`
        };
      }
      return {
        left: `${percentMin}%`,
        'background-size': `${width}% 100%`
      };
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event): void {
    event.stopPropagation();
    this.active = true;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event): void {
    event.stopPropagation();
    this.active = false;
  }

  onChange(event): void {
    event.stopPropagation();

    this.change.emit({
      value: this.value,
      percent: this.percent
    });
  }

  writeValue(val): void {
    val = val ? String(val).split(',') : ['0'];
    if (String(val) !== String(this._values)) {
      this.setValues(val.map(v => +v));
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  trackIndex(index) {
    return index;
  }

  onChangeCallback: (_: any) => void = () => {
    // placeholder
  };

  onTouchedCallback: (_: any) => void = () => {
    // placeholder
  };
}
