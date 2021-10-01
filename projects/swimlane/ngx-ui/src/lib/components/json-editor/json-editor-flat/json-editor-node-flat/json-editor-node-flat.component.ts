import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { requiredIndicatorIcon, JSONEditorSchema, JsonSchemaDataType } from '../../json-editor.helper';

@Component({
  selector: 'ngx-json-editor-node-flat',
  templateUrl: './json-editor-node-flat.component.html',
  styleUrls: ['./json-editor-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorNodeFlatComponent extends JsonEditorNode implements OnInit, OnChanges {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @Input() errors: any[];

  @Input() label: string;

  @Input() level: number;

  @Input() schemaBuilderMode?: boolean;

  @Input() schemaRef?: JSONEditorSchema;

  @Input() formats: JsonSchemaDataType[];

  @Input() arrayItem = false;

  @Input() hideRoot = false;

  @Input() arrayName = '';

  @Input() compressed: boolean;

  @Input() indentationArray: number[];

  @Input() showKnownProperties = false;

  @Input() isDuplicated = false;

  @Input() passwordToggleEnabled = false;

  @Output() updatePropertyNameEvent = new EventEmitter<{ id: string | number; name: string }>();

  requiredIndicator: SafeHtml;

  nextLevel = 0;

  constructor(public dialogMngr: DialogService, private domSanitizer: DomSanitizer) {
    super(dialogMngr);
    this.requiredIndicator = this.domSanitizer.bypassSecurityTrustHtml(requiredIndicatorIcon);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if ('level' in changes || 'hideRoot' in changes) {
      this.nextLevel = this.level === undefined ? (this.hideRoot ? -1 : 0) : this.level + 1;
    }
  }

  updatePropertyName(id: string | number, name: string): void {
    this.updatePropertyNameEvent.emit({ id, name });
  }
}
