import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';

@Component({
  selector: 'ngx-loading-bar',
  exportAs: 'ngxLoadingBar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingBarComponent {
  static ngAcceptInputType_visible: BooleanInput;
  static ngAcceptInputType_progress: NumericInput;

  @HostBinding('class.ngx-loading-bar') hostClass = true;

  @InputBoolean()
  @Input()
  visible = false;

  @InputNumeric(0)
  @Input()
  progress = 0;

  constructor(public readonly cdr: ChangeDetectorRef) {}
}
