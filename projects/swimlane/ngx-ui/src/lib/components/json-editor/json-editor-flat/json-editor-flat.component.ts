import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  SimpleChanges
} from '@angular/core';
import { JsonEditorNodeFlatComponent } from './json-editor-node-flat/json-editor-node-flat.component';
import { SchemaValidatorService } from '../schema-validator.service';
import { JsonEditor } from '../json-editor';
import { JSONEditorSchema, JsonSchemaDataType, jsonSchemaDataFormats } from '../json-editor.helper';
import { DialogService } from '../../dialog/dialog.service';
import {
  PropertyConfigComponent,
  PropertyConfigOptions
} from './json-editor-node-flat/node-types/property-config/property-config.component';

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

  @Input() hideRoot = false;

  @Input() showAllObjectProperties = false;

  @ContentChildren(JsonEditorNodeFlatComponent) nodeElms: QueryList<JsonEditorNodeFlatComponent>;

  @ViewChild('propertyConfigTmpl') propertyConfigTmpl: TemplateRef<PropertyConfigComponent>;

  schemaRef: JSONEditorSchema;

  customFormats: JsonSchemaDataType[] = [];

  constructor(private dialogService: DialogService, protected schemaValidatorService: SchemaValidatorService) {
    super(schemaValidatorService);
  }

  ngOnInit() {
    if (this.formats.length && this.schemaBuilderMode) {
      this.buildCustomFormats();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes.schema) {
      this.schemaRef = JSON.parse(JSON.stringify(this.schema));
    }
  }

  onPropertyConfig(): void {
    this.dialogService.create({
      template: this.propertyConfigTmpl,
      context: {
        property: this.schema,
        schema: this.schema,
        formats: this.customFormats
      },
      class: 'property-config-dialog'
    });
  }

  updateSchema(options: PropertyConfigOptions): void {
    const editedSchema = options.newProperty;

    if (editedSchema.title) {
      this.schema.title = editedSchema.title;
      this.schemaRef.title = editedSchema.title;
    } else {
      delete this.schema.title;
      delete this.schemaRef.title;
    }

    if (editedSchema.description) {
      this.schema.description = editedSchema.description;
      this.schemaRef.description = editedSchema.description;
    } else {
      delete this.schema.description;
      delete this.schemaRef.description;
    }

    this.schema = { ...this.schema };
    this.schemaRef = { ...this.schemaRef };

    this.schemaChange.emit(this.schemaRef);
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
