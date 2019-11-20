import { Component, ContentChildren, QueryList, Input, ViewEncapsulation } from '@angular/core';
import { JsonEditorNodeFlatComponent } from './json-editor-node-flat/json-editor-node-flat.component';
import { SchemaValidatorService } from '../schema-validator.service';
import { JsonEditor } from '../json-editor';
import { JSONSchema7 } from 'json-schema';

@Component({
  selector: 'ngx-json-editor-flat',
  templateUrl: './json-editor-flat.component.html',
  styleUrls: ['./json-editor-flat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonEditorFlatComponent extends JsonEditor {
  @Input() model: any;

  @Input() schema: JSONSchema7;

  @Input() typeCheckOverrides?: any;

  @Input() schemaBuilderMode?: boolean;

  @ContentChildren(JsonEditorNodeFlatComponent)
  nodeElms: QueryList<JsonEditorNodeFlatComponent>;

  schemaRef: JSONSchema7;

  constructor(protected schemaValidatorService: SchemaValidatorService) {
    super(schemaValidatorService);
  }

  ngOnInit() {
    this.schemaRef = JSON.parse(JSON.stringify(this.schema));
  }
}
