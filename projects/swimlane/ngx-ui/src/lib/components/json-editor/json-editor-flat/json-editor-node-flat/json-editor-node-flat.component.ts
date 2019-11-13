import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';

@Component({
  selector: 'ngx-json-editor-node-flat',
  templateUrl: './json-editor-node-flat.component.html',
  styleUrls: ['./json-editor-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonEditorNodeFlatComponent extends JsonEditorNode implements OnInit {
  @Input() model: any;

  @Input() schema: any;

  @Input() typeCheckOverrides?: any;

  @Input() errors: any[];

  @Input() level: number = -1;
  @Input() schemaBuilderMode?: boolean;

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

  parseInt(value: string): number | null {
    return value ? parseInt(value) : null;
  }
}
