import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';

@Component({
  selector: 'ngx-loading',
  exportAs: 'ngxLoading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  static ngAcceptInputType_visible: BooleanInput;
  static ngAcceptInputType_progress: NumericInput;

  @HostBinding('class.ngx-loading') hostClass = true;

  @NgxBooleanInput()
  @Input()
  visible = false;

  @NgxNumericInput(0)
  @Input()
  progress = 0;

  constructor(public readonly cdr: ChangeDetectorRef) {}
}
