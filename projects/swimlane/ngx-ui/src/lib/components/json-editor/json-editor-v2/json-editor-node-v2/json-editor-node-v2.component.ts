import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';

@Component({
  selector: 'ngx-json-editor-node-v2',
  templateUrl: './json-editor-node-v2.component.html',
  styleUrls: ['./json-editor-node-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonEditorNodeV2Component extends JsonEditorNode implements OnInit {
  @Input() level: number = -1;

  indentationArray: number[] = [];

  constructor(public dialogMngr: DialogService) {
    super(dialogMngr);
  }

  ngOnInit() {
    this.level += 1;
    if (this.level > 1) {
      this.indentationArray = Array(this.level - 1).fill(this.level);
    }
  }
}
