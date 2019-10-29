import { Component, ContentChildren, QueryList } from '@angular/core';
import { JsonEditorV2NodeComponent } from '../json-editor-v2-node/json-editor-v2-node.component';
import { SchemaValidatorService } from '../../schema-validator.service';
import { JsonEditor } from '../../json-editor';

@Component({
  selector: 'ngx-json-editor-v2',
  templateUrl: './json-editor-v2.component.html',
  styleUrls: ['./json-editor-v2.component.scss']
})
export class JsonEditorV2Component extends JsonEditor {

  @ContentChildren(JsonEditorV2NodeComponent)
  nodeElms: QueryList<JsonEditorV2NodeComponent>;

  constructor(protected schemaValidatorService: SchemaValidatorService) {
    super(schemaValidatorService);
  }

}
