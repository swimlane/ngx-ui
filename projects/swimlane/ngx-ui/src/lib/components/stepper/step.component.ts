import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
  ContentChildren
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import type { QueryList } from '@angular/core';

import { StepContentDirective } from './step-content.directive';

@Component({
  exportAs: 'ngxStep',
  selector: 'ngx-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  host: {
    class: 'ngx-step',
    '[class.ngx-step--active]': 'step === active && active !== undefined',
    '[class.ngx-step--complete-last]': 'step === active - 1',
    '[class.ngx-step--complete]': 'step < active'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class StepComponent implements OnInit {
  @Input() label?: string;

  @Input()
  get icon() {
    return this._icon;
  }
  set icon(v: string) {
    this._icon = v;
  }

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

  @ContentChildren(StepContentDirective, { descendants: false })
  readonly content?: QueryList<StepContentDirective>;

  get height() {
    return this._el.nativeElement.clientHeight;
  }

  get width() {
    return this._el.nativeElement.clientWidth;
  }

  get stepHeight() {
    return (this._el.nativeElement.querySelector('.ngx-step--circle') as HTMLElement).offsetHeight;
  }

  get stepWidth() {
    return (this._el.nativeElement.querySelector('.ngx-step--circle') as HTMLElement).offsetWidth;
  }

  private _active?: number;
  private _step?: number;
  private _total?: number;
  private _icon?: string;
  private _completeIcon?: string;

  constructor(private readonly _cdr: ChangeDetectorRef, private readonly _el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this._cdr.markForCheck();
  }
}
