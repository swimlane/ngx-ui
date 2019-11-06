import { Component, ContentChildren, QueryList } from '@angular/core';
import { JsonEditorNodeV2Component } from './json-editor-node-v2/json-editor-node-v2.component';
import { SchemaValidatorService } from '../schema-validator.service';
import { JsonEditor } from '../json-editor';

@Component({
  selector: 'ngx-json-editor-v2',
  templateUrl: './json-editor-v2.component.html',
  styleUrls: ['./json-editor-v2.component.scss']
})
export class JsonEditorV2Component extends JsonEditor {
  @ContentChildren(JsonEditorNodeV2Component)
  nodeElms: QueryList<JsonEditorNodeV2Component>;

  constructor(protected schemaValidatorService: SchemaValidatorService) {
    super(schemaValidatorService);
  }
}
