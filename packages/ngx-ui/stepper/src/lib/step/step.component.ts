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
import { NgxNumericInput, NumericInput } from '@swimlane/ngx-ui/common';
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

  @Input() label = '';
  @Input() icon = '';
  @Input() completeIcon = '';

  @NgxNumericInput<StepComponent>(
    0,
    ({ component, setFn, previousValue, coercedValue }) => {
      if (coercedValue !== previousValue) {
        setFn();
        component.activeChange.emit(coercedValue);
      }
    }
  )
  @Input()
  active = 0;

  @NgxNumericInput(0)
  @Input()
  step = 0;

  @NgxNumericInput(0)
  @Input()
  total = 0;

  @Output() activeChange = new EventEmitter<number>();

  @HostBinding('class.ngx-step') hostClass = true;

  @HostBinding('class.ngx-step--active') get activeClass() {
    return this.active !== undefined && this.step === this.active;
  }

  @HostBinding('class.ngx-step--complete-last') get completeLastClass() {
    return this.step === this.active - 1;
  }

  @HostBinding('class.ngx-step--complete') get completeClass() {
    return this.step < this.active;
  }

  @ContentChildren(StepContentDirective, { descendants: false })
  readonly content?: QueryList<StepContentDirective>;

  get height() {
    return this.el.nativeElement.clientHeight;
  }

  get width() {
    return this.el.nativeElement.clientWidth;
  }

  get stepHeight() {
    return (
      this.el.nativeElement.querySelector('.ngx-step--circle') as HTMLElement
    ).offsetHeight;
  }

  get stepWidth() {
    return (
      this.el.nativeElement.querySelector('.ngx-step--circle') as HTMLElement
    ).offsetWidth;
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly el: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    this.cdr.markForCheck();
  }
}
