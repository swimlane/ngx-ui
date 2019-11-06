import { Component, ContentChildren, QueryList } from '@angular/core';
import { JsonEditorNodeFlatComponent } from './json-editor-node-flat/json-editor-node-flat.component';
import { SchemaValidatorService } from '../schema-validator.service';
import { JsonEditor } from '../json-editor';

@Component({
  selector: 'ngx-json-editor-flat',
  templateUrl: './json-editor-flat.component.html',
  styleUrls: ['./json-editor-flat.component.scss']
})
export class JsonEditorFlatComponent extends JsonEditor {
  @ContentChildren(JsonEditorNodeFlatComponent)
  nodeElms: QueryList<JsonEditorNodeFlatComponent>;

  constructor(protected schemaValidatorService: SchemaValidatorService) {
    super(schemaValidatorService);
  }
}
