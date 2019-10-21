import { Component } from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';

@Component({
  selector: 'ngx-json-editor-node',
  templateUrl: 'json-editor-node.component.html'
})
export class JsonEditorNodeComponent extends JsonEditorNode {

  constructor(public dialogMngr: DialogService) {
    super(dialogMngr)
  }


}
