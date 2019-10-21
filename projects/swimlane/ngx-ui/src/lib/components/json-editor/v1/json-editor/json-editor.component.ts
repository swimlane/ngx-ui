import { Component, ViewEncapsulation, ContentChildren, QueryList } from '@angular/core';
import { JsonEditor } from '../../json-editor';
import { SchemaValidatorService } from '../../schema-validator.service';
import { JsonEditorNodeComponent } from '../json-editor-node/json-editor-node.component';

@Component({
  selector: 'ngx-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorComponent extends JsonEditor {
  @ContentChildren(JsonEditorNodeComponent)
  nodeElms: QueryList<JsonEditorNodeComponent>;

  constructor(protected schemaValidatorService: SchemaValidatorService) {
    super(schemaValidatorService);
  }
}
