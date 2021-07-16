import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';

@Component({
  selector: 'ngx-doc-page[header]',
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPageComponent {
  static ngAcceptInputType_deprecated: BooleanInput;

  @HostBinding('class.ngx-doc-page') hostClass = true;

  @Input() header = '';

  @NgxBooleanInput()
  @Input()
  deprecated = false;
}
