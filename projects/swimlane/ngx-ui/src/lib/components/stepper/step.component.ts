import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ChangeDetectorRef, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  exportAs: 'ngxStep',
  selector: 'ngx-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  host: {
    class: 'ngx-step',
    '[class.ngx-step--last]': 'last',
    '[class.ngx-step--active]': 'step === active',
    '[class.ngx-step--semi-complete]': 'step === active - 1',
    '[class.ngx-step--complete]': 'step < active - 1'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class StepComponent implements OnInit {
  @Input()
  get completeIcon() {
    return this._completeIcon;
  }
  set completeIcon(v: string) {
    this._completeIcon = v;
    this._cdr.markForCheck();
  }

  @Input()
  get active() {
    return this._active;
  }
  set active(v: number) {
    if (v !== this.active) {
      this._active = coerceNumberProperty(v);
      this.activeChange.emit(this._active);
    }

    this._cdr.markForCheck();
  }

  @Input()
  get step() {
    return this._step;
  }
  set step(v: number) {
    this._step = coerceNumberProperty(v);
    this._cdr.markForCheck();
  }

  @Input()
  get total() {
    return this._total;
  }
  set total(v: number) {
    this._total = coerceNumberProperty(v);
    this._cdr.markForCheck();
  }

  @Output() activeChange = new EventEmitter<number>();

  get last() {
    return this.step === (this.total - 1);
  }

  get height() {
    return this._el && this._el.nativeElement ? this._el.nativeElement.clientHeight : 0;
  }

  get width() {
    return this._el && this._el.nativeElement ? this._el.nativeElement.clientWidth : 0;
  }

  private _active?: number;
  private _step?: number;
  private _total?: number;
  private _completeIcon?: string;

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _el: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    this._cdr.markForCheck();
  }
}
