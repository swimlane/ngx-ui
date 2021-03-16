import type { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { DialogService } from '@swimlane/ngx-ui/dialog';
import { JsonEditorNode } from '../../directives';
import type { JSONEditorSchema } from '../../interfaces';

@Component({
  selector: 'ngx-json-editor-node',
  templateUrl: './json-editor-node.component.html',
  styleUrls: ['./json-editor-node.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorNodeComponent extends JsonEditorNode {
  static ngAcceptInputType_showKnownProperties: BooleanInput;
  static ngAcceptInputType_isDuplicated: BooleanInput;

  @Input() model: any;
  @Input() schema!: JSONEditorSchema;
  @Input() typeCheckOverrides?: any;
  @Input() errors: any[] = [];

  @InputBoolean()
  @Input()
  showKnownProperties = false;

  @InputBoolean()
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
