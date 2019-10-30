import { Component } from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';

@Component({
  selector: 'ngx-json-editor-v2-node',
  templateUrl: './json-editor-v2-node.component.html',
  styleUrls: ['./json-editor-v2-node.component.scss']
})
export class JsonEditorV2NodeComponent extends JsonEditorNode {
  constructor(public dialogMngr: DialogService) {
    super(dialogMngr);
  }
}
