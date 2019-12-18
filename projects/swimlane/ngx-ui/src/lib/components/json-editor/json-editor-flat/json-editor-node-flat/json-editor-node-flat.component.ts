import { Component, Input, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { requiredIndicatorIcon, inferTypeName, JSONEditorSchema } from '../../json-editor.helper';

@Component({
  selector: 'ngx-json-editor-node-flat',
  templateUrl: './json-editor-node-flat.component.html',
  styleUrls: ['./json-editor-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonEditorNodeFlatComponent extends JsonEditorNode implements OnInit {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @Input() errors: any[];

  @Input() label: string;

  @Input() level: number = -1;

  @Input() schemaBuilderMode?: boolean;

  @Input() schemaRef?: JSONEditorSchema;

  @Output() updatePropertyNameEvent = new EventEmitter<{ id: string; name: string }>();

  requiredIndicator: SafeHtml;

  inferTypeName = inferTypeName;

  indentationArray: number[] = [];

  constructor(public dialogMngr: DialogService, private domSanitizer: DomSanitizer) {
    super(dialogMngr);
    this.requiredIndicator = this.domSanitizer.bypassSecurityTrustHtml(requiredIndicatorIcon);
  }

  ngOnInit() {
    this.level += 1;
    if (this.level > 1) {
      this.indentationArray = Array(this.level - 1).fill(this.level);
    }
  }

  updatePropertyName(id: string, name: string): void {
    this.updatePropertyNameEvent.emit({ id, name });
  }
}
