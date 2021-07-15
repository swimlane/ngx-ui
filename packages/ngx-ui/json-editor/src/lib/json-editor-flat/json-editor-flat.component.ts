import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DialogService } from '@swimlane/ngx-ui/dialog';
import { jsonSchemaDataFormats } from '../constants';
import { JsonEditor } from '../directives';
import {
  JSONEditorSchema,
  JsonSchemaDataType,
  PropertyConfigOptions,
} from '../interfaces';
import { SchemaValidatorService } from '../services';
import { JsonEditorNodeFlatComponent } from './json-editor-node-flat/json-editor-node-flat.component';
import { PropertyConfigComponent } from './json-editor-node-flat/property-config/property-config.component';

@Component({
  selector: 'ngx-json-editor-flat',
  templateUrl: './json-editor-flat.component.html',
  styleUrls: ['./json-editor-flat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonEditorFlatComponent
  extends JsonEditor
  implements OnInit, OnChanges
{
  @Input() model: any;

  @Input() schema!: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @Input() schemaBuilderMode = false;

  @Input() formats: string[] = [];

  @Input() compressed = false;

  @Input() hideRoot = false;

  @Input() showKnownProperties = false;

  @ContentChildren(JsonEditorNodeFlatComponent)
  nodeElms?: QueryList<JsonEditorNodeFlatComponent>;

  @ViewChild('propertyConfigTmpl')
  propertyConfigTmpl?: TemplateRef<PropertyConfigComponent>;

  schemaRef?: JSONEditorSchema;

  customFormats: JsonSchemaDataType[] = [];

  constructor(
    private dialogService: DialogService,
    schemaValidatorService: SchemaValidatorService,
    cdr: ChangeDetectorRef
  ) {
    super(schemaValidatorService, cdr);
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
        formats: this.customFormats,
      },
      class: 'property-config-dialog',
    });
  }

  updateSchema(options: PropertyConfigOptions): void {
    const editedSchema = options.newProperty;

    if (editedSchema.title) {
      this.schema.title = editedSchema.title;
      if (this.schemaRef) {
        this.schemaRef.title = editedSchema.title;
      }
    } else {
      delete this.schema.title;
      if (this.schemaRef) {
        delete this.schemaRef.title;
      }
    }

    if (editedSchema.description) {
      this.schema.description = editedSchema.description;
      if (this.schemaRef) {
        this.schemaRef.description = editedSchema.description;
      }
    } else {
      delete this.schema.description;
      if (this.schemaRef) {
        delete this.schemaRef.description;
      }
    }

    this.schema = { ...this.schema };
    this.schemaRef = { ...this.schemaRef };

    this.schemaUpdate.emit(this.schemaRef);
  }

  private buildCustomFormats(): void {
    this.formats.forEach((format) => {
      const found = jsonSchemaDataFormats.find(
        (dataFormat: JsonSchemaDataType) => {
          return dataFormat.schema.format === format;
        }
      );

      if (found) {
        this.customFormats.push(found);
      } else {
        this.customFormats.push({
          name: format.charAt(0).toUpperCase() + format.slice(1),
          defaultValue: () => '',
          schema: {
            type: 'string',
            format,
          },
          icon: 'field-text',
          matchType: (): boolean => {
            return false;
          },
        });
      }
    });
  }
}
