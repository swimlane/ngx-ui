import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import { StepContentDirective } from '../directives';

@Component({
  selector: 'ngx-step',
  exportAs: 'ngxStep',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent implements OnInit {
  static ngAcceptInputType_active: NumericInput;
  static ngAcceptInputType_step: NumericInput;
  static ngAcceptInputType_total: NumericInput;

  @Input() label?: string;
  @Input() icon?: string;
  @Input() completeIcon?: string;

  @Input()
  get active() {
    return this._active || -1;
  }

  set active(v: number) {
    if (v !== this.active) {
      this._active = coerceNumberProperty(v);
      this.activeChange.emit(this._active);
    }

    this.cdr.markForCheck();
  }

  private _active?: number;

  @InputNumeric()
  @Input()
  step?: number;

  @InputNumeric()
  @Input()
  total?: number;

  @Output() activeChange = new EventEmitter<number>();

  @ContentChildren(StepContentDirective, { descendants: false })
  readonly content?: QueryList<StepContentDirective>;

  get height() {
    return this.el.nativeElement.clientHeight;
  }

  get width() {
    return this.el.nativeElement.clientWidth;
  }

  get stepHeight() {
    return (this.el.nativeElement.querySelector(
      '.ngx-step--circle'
    ) as HTMLElement).offsetHeight;
  }

  get stepWidth() {
    return (this.el.nativeElement.querySelector(
      '.ngx-step--circle'
    ) as HTMLElement).offsetWidth;
  }

  @HostBinding('class.ngx-step') hostClass = true;

  @HostBinding('class.ngx-step--active') get activeClass() {
    return this.step === this.active && this.active !== undefined;
  }

  @HostBinding('class.ngx-step--complete-last') get completeLastClass() {
    return this.step === this.active - 1;
  }

  @HostBinding('class.ngx-step--complete') getCompleteClass() {
    return this.step && this.step < this.active;
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly el: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    this.cdr.markForCheck();
  }
}
