import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { requiredIndicatorIcon, inferTypeName } from '../../json-editor.helper';
import { JSONSchema7 } from 'json-schema';

@Component({
  selector: 'ngx-json-editor-node-flat',
  templateUrl: './json-editor-node-flat.component.html',
  styleUrls: ['./json-editor-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonEditorNodeFlatComponent extends JsonEditorNode implements OnInit {
  @Input() model: any;

  @Input() schema: JSONSchema7;

  @Input() typeCheckOverrides?: any;

  @Input() errors: any[];

  @Input() label: string;

  @Input() level: number = -1;

  @Input() schemaBuilderMode?: boolean;

  @Input() schemaRef?: any;

  requiredIndicator: SafeHtml;

  indentationArray: number[] = [];

  inferTypeName = inferTypeName;

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

  parseInt(value: string): number | null {
    return value ? parseInt(value, 10) : null;
  }
}
