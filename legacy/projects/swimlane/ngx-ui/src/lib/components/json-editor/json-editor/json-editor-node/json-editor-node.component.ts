import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';
import { JSONEditorSchema } from '../../json-editor.helper';

@Component({
  selector: 'ngx-json-editor-node',
  templateUrl: 'json-editor-node.component.html',
  styleUrls: ['./json-editor-node.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorNodeComponent extends JsonEditorNode {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @Input() errors: any[];

  @Input() showKnownProperties = false;

  @Input() isDuplicated = false;

  placeholder: string = '';

  constructor(public dialogMngr: DialogService) {
    super(dialogMngr);
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.schema.examples && Array.isArray(this.schema.examples)) {
      this.placeholder = this.schema.examples.join(', ');
    }
  }
}
