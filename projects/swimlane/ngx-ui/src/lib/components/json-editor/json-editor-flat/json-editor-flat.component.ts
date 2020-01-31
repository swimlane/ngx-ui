import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { JsonEditorNodeFlatComponent } from './json-editor-node-flat/json-editor-node-flat.component';
import { SchemaValidatorService } from '../schema-validator.service';
import { JsonEditor } from '../json-editor';
import { JSONEditorSchema, JsonSchemaDataType, jsonSchemaDataFormats } from '../json-editor.helper';

@Component({
  selector: 'ngx-json-editor-flat',
  templateUrl: './json-editor-flat.component.html',
  styleUrls: ['./json-editor-flat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class JsonEditorFlatComponent extends JsonEditor {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @Input() schemaBuilderMode?: boolean = false;

  @Input() formats?: string[] = [];

  @Input() compressed = false;

  @ContentChildren(JsonEditorNodeFlatComponent)
  nodeElms: QueryList<JsonEditorNodeFlatComponent>;

  schemaRef: JSONEditorSchema;

  customFormats: JsonSchemaDataType[] = [];

  constructor(protected schemaValidatorService: SchemaValidatorService) {
    super(schemaValidatorService);
  }

  ngOnInit() {
    this.schemaRef = JSON.parse(JSON.stringify(this.schema));

    if (this.formats.length && this.schemaBuilderMode) {
      this.buildCustomFormats();
    }
  }

  private buildCustomFormats(): void {
    this.formats.forEach(format => {
      const found = jsonSchemaDataFormats.find((dataFormat: JsonSchemaDataType) => {
        return dataFormat.schema.format === format;
      });

      if (found) {
        this.customFormats.push(found);
      } else {
        this.customFormats.push({
          name: format.charAt(0).toUpperCase() + format.slice(1),
          defaultValue: () => '',
          schema: {
            type: 'string',
            format
          },
          icon: 'field-text',
          matchType: (): boolean => {
            return false;
          }
        });
      }
    });
  }
}
