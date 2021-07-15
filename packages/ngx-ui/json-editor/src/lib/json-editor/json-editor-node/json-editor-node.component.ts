import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { DialogService } from '@swimlane/ngx-ui/dialog';
import { JsonEditorNode } from '../../directives';
import type { JSONEditorSchema } from '../../interfaces';

@Component({
  selector: 'ngx-json-editor-node',
  templateUrl: './json-editor-node.component.html',
  styleUrls: ['./json-editor-node.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonEditorNodeComponent extends JsonEditorNode implements OnInit {
  static ngAcceptInputType_showKnownProperties: BooleanInput;
  static ngAcceptInputType_isDuplicated: BooleanInput;

  @Input() model: any;
  @Input() schema!: JSONEditorSchema;
  @Input() typeCheckOverrides?: any;
  @Input() errors: any[] = [];

  @NgxBooleanInput()
  @Input()
  showKnownProperties = false;

  @NgxBooleanInput()
  @Input()
  isDuplicated = false;

  placeholder = '';

  constructor(dialogMngr: DialogService) {
    super(dialogMngr);
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.schema.examples && Array.isArray(this.schema.examples)) {
      this.placeholder = this.schema.examples.join(', ');
    }
  }
}
