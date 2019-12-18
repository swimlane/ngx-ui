import { Component, ViewEncapsulation, Input } from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';
import { JSONEditorSchema } from '../../json-editor.helper';

@Component({
  selector: 'ngx-json-editor-node',
  templateUrl: 'json-editor-node.component.html',
  styleUrls: ['./json-editor-node.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonEditorNodeComponent extends JsonEditorNode {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @Input() errors: any[];

  constructor(public dialogMngr: DialogService) {
    super(dialogMngr);
  }
}
