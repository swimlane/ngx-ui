import { Component, ViewEncapsulation } from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';

@Component({
  selector: 'ngx-json-editor-node',
  templateUrl: 'json-editor-node.component.html',
  styleUrls: ['./json-editor-node.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorNodeComponent extends JsonEditorNode {

  constructor(public dialogMngr: DialogService) {
    super(dialogMngr)
  }
}
