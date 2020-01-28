import { Component, Input, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
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

  @Input() label: string;

  @Input() level: number = -1;

  @Output() updatePropertyNameEvent = new EventEmitter<{ id: string; name: string }>();

  indentationArray: number[] = [];
  placeholder: string = '';

  constructor(public dialogMngr: DialogService) {
    super(dialogMngr);
  }

  ngOnInit() {
    this.level += 1;

    if (this.level > 1) {
      this.indentationArray = Array(this.level - 1).fill(this.level);
    }

    if (this.schema.examples && Array.isArray(this.schema.examples)) {
      this.placeholder = this.schema.examples.join(', ');
    }
  }

  updatePropertyName(id: string, name: string): void {
    this.updatePropertyNameEvent.emit({ id, name });
  }
}
