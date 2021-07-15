import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BooleanInput,
  NGX_UI_WINDOW,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';

let nextId = 0;

const SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderComponent),
  multi: true,
};

@Component({
  selector: 'ngx-slider',
  exportAs: 'ngxSlider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SLIDER_VALUE_ACCESSOR],
})
export class SliderComponent implements ControlValueAccessor, OnInit {
  static ngAcceptInputType_min: NumericInput;
  static ngAcceptInputType_max: NumericInput;
  static ngAcceptInputType_step: NumericInput;
  static ngAcceptInputType_tickStep: NumericInput;
  static ngAcceptInputType_filled: BooleanInput;
  static ngAcceptInputType_multiple: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_showTicks: BooleanInput;

  @Input() id = `range-${++nextId}`;

  @NgxNumericInput(0)
  @Input()
  min = 0;

  @NgxNumericInput(100)
  @Input()
  max = 100;

  @NgxNumericInput(1)
  @Input()
  step = 1;

  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  @HostBinding('class.filled')
  @NgxBooleanInput()
  @Input()
  filled = false;

  @HostBinding('class.multiple')
  @NgxBooleanInput()
  @Input()
  multiple = false;

  @HostBinding('class.disabled')
  @NgxBooleanInput()
  @Input()
  disabled = false;

  @NgxBooleanInput()
  @Input()
  showTicks = false;

  @NgxNumericInput()
  @Input()
  tickStep?: number;

  @Output() sliderChange = new EventEmitter();

  _values = [0];
  _percents = [0];
  _thumbs: any[] = [];
  _fill: any;
  _ticks = [];
  _active: boolean[] = [];

  @HostBinding('class.active')
  active?: boolean;

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

      this.sliderChange.emit({
        value: this._values,
        percent: this.percent,
      });

      this.cdr.markForCheck();
    }
  }

  get percent(): string {
    const pct = this._percents;
    if (this.multiple) return pct.join(',');
    return '' + pct[0];
  }

  @HostBinding('class.horizontal')
  get isHorizontal(): boolean {
    return this.orientation === 'horizontal';
  }

  @HostBinding('class.vertical')
  get isVertical(): boolean {
    return this.orientation === 'vertical';
  }

  isEdge = false;

  @HostBinding('class.ngx-slider') hostClass = true;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Inject(NGX_UI_WINDOW) ngxUiWindow: Window
  ) {
    this.isEdge = ngxUiWindow.navigator.userAgent.indexOf('Edge') > -1;
  }

  ngOnInit(): void {
    if (this.showTicks) {
      this._ticks = this.getTicks();
    }
    this.setValues([0]);
  }

  setValues(values: number[]) {
    this._values = values;
    this._percents = values
      .map((v) => Math.max(this.min, Math.min(this.max, v)))
      .map((v) => Math.round((100 * (v - this.min)) / (this.max - this.min)));

    this._thumbs = this._percents.map((p) => {
      return {
        left: `calc(${p}% - ${p / 100}em)`,
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

      this.sliderChange.emit({
        value: this.value,
        percent: this.percent,
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
    return this.getCount().map((p: any) => {
      return {
        left: `calc(${p}% - ${p / 100 - 0.5}em)`,
      };
    });
  }

  getFill(): any {
    if (this.filled) {
      const percentMin = this.multiple ? Math.min(...this._percents) : 0;
      const percentMax = this.multiple
        ? Math.max(...this._percents)
        : this._percents[0];
      const width = percentMax - percentMin;

      if (this.isEdge && this.multiple) {
        return {
          left: `calc(${percentMin}% - ${percentMin / 100 - 0.5}em)`,
          'background-size': `calc(${width}% - ${width / 100}em) 100%`,
        };
      }
      return {
        left: `${percentMin}%`,
        'background-size': `${width}% 100%`,
      };
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    event.stopPropagation();
    this.active = true;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    event.stopPropagation();
    this.active = false;
  }

  onChange(event: any): void {
    event.stopPropagation();

    this.sliderChange.emit({
      value: this.value,
      percent: this.percent,
    });
  }

  writeValue(val: any): void {
    val = val ? String(val).split(',') : ['0'];
    if (String(val) !== String(this._values)) {
      this.setValues(val.map((v: any) => +v));
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  trackIndex(index: number) {
    return index;
  }

  onChangeCallback: (_: any) => void = () => {
    // placeholder
  };

  onTouchedCallback: (_: any) => void = () => {
    // placeholder
  };
}
