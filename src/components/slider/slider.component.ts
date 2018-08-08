import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  HostBinding,
  forwardRef,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

const SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderComponent),
  multi: true
};

const edge = window.navigator.userAgent.indexOf("Edge") > -1;

@Component({
  selector: 'ngx-slider',
  template: `
    <div class="slider-inner">
      <div class="ticks-container" *ngIf="showTicks">
        <div class="tick" *ngFor="let s of _ticks" [ngStyle]="s">
        </div>
      </div>
      <div class="inputs">
        <div class="slider-track">
        </div>
        <span
          *ngIf="filled"
          [ngStyle]="_fill"
          class="fill-bar">
        </span>
        <ng-container *ngFor="let value of _values; let i = index; let odd = odd; trackBy: trackIndex">
          <input
            type="range"
            [id]="id + '-' + i"
            [attr.list]="id + '-list'"
            [attr.orientation]="orientation"
            [class.odd]="odd"
            [class.active]="_active[i]"
            [ngModel]="value"
            (ngModelChange)="setValue($event, i)"
            [min]="min"
            [max]="max"
            [step]="step"
            [disabled]="disabled"
            (input)="onChange($event)"
            (change)="onChange($event)"
            (mouseenter)="setActive(i, true)"
            (mouseleave)="setActive(i, false)"
          />
          <div class="slider-thumb" [class.active]="_active[i]" [ngStyle]="_thumbs[i]" >
          </div>
        </ng-container>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./slider.component.scss'],
  providers: [SLIDER_VALUE_ACCESSOR],
  host: {
    class: 'ngx-slider'
  }
})
export class SliderComponent implements ControlValueAccessor, OnInit {
  @Input() id: string = `range-${++nextId}`;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() orientation: string = 'horizontal';

  @HostBinding('class.filled')
  @Input() filled: boolean = false;

  @HostBinding('class.multiple')
  @Input() multiple: boolean = false;

  @HostBinding('class.disabled')
  @Input() disabled: boolean = false;

  @Input() showTicks: boolean = false;
  @Input() tickStep: number;

  _values = [0];
  _percents = [0];
  _thumbs: any[] = [];
  _fill: any;
  _ticks = [];
  _active = [];

  @HostBinding('class.active')
  active: boolean;

  get value() {
    if (!this._values) return 0;
    if (this.multiple) return [...this._values].sort(((a, b) => a - b)).join(',');
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
    }
  }

  get percent(): string {
    const pct = this._percents;
    if (this.multiple) return pct.join(',');
    return '' + pct[0];
  }

  @Output() change = new EventEmitter();

  @HostBinding('class.horizontal')
  get isHorizontal(): boolean {
    return this.orientation === 'horizontal';
  }

  @HostBinding('class.vertical')
  get isVertical(): boolean {
    return this.orientation === 'vertical';
  }

  setValues(values: number[]) {
    this._values = values;
    this._percents = values
      .map(v => Math.max(this.min, Math.min(this.max, v)))
      .map(v => Math.round(100 * (v - this.min) / (this.max - this.min)));

    this._thumbs = this._percents
      .map(p => {
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

  ngOnInit(): void {
    if (this.showTicks) {
      this._ticks = this.getTicks();
    }
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
  onMouseDown(): void {
    event.stopPropagation();
    this.active = true;
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(): void {
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
    val = String(val).split(',');
    if (String(val) !== String(this._values)) {
      this.setValues(val);
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

  private onTouchedCallback: () => void = () => {
    // placeholder
  };

  private onChangeCallback: (_: any) => void = () => {
    // placeholder
  };
}
