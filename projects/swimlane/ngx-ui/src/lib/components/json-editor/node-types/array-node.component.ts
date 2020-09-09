import { Input, EventEmitter, Output, OnChanges, SimpleChanges, Directive } from '@angular/core';

import {
  createValueForSchema,
  jsonSchemaDataTypes,
  dataTypeMap,
  inferType,
  getIcon,
  getCurrentType,
  JsonSchemaDataType,
  JSONEditorSchema,
  jsonSchemaDataFormats
} from '../json-editor.helper';

@Directive()
export class ArrayNode implements OnChanges {
  @Input()
  schema: JSONEditorSchema;

  @Input() model: any[];

  @Input() required: boolean = false;

  @Input() expanded: boolean;

  @Input() path: string;

  @Input() errors: any[];

  @Input() typeCheckOverrides?: any;

  @Input() schemaRef: JSONEditorSchema;

  @Input() showKnownProperties = false;

  @Output() modelChange: EventEmitter<any[]> = new EventEmitter();

  @Output() schemaChange: EventEmitter<JSONEditorSchema> = new EventEmitter();

  requiredCache: any = {};
  schemas: JSONEditorSchema[] = [];
  dataTypes: JsonSchemaDataType[] = [...jsonSchemaDataTypes, ...jsonSchemaDataFormats];
  dataTypeMap = dataTypeMap;

  _array = Array;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.schema) {
      if (this.schema && this.schema.required) {
        for (const prop of this.schema.required) {
          this.requiredCache[prop] = true;
        }
      }
    }

    this.initSchemasTypeByModelValue();
    this.updateIcons();
  }

  /**
   * Updates an array item of the model and emits the change event
   * @param index
   * @param value
   */
  updateArrayItem(index: number, value: any): void {
    this.model[index] = value;
    this.modelChange.emit(this.model);
  }

  /**
   * Adds a new item to the model
   */
  addArrayItem(dataType?: JsonSchemaDataType): void {
    let schema;
    if (dataType) {
      schema = JSON.parse(JSON.stringify({ ...(this.schema.items as object), ...dataType.schema }));
    } else {
      schema = JSON.parse(JSON.stringify(this.schema.items));
    }

    if (!schema.type) {
      schema.type = 'object';
    }

    if (!schema.$meta) {
      schema.$meta = {};
    }

    if (Array.isArray(schema.type)) {
      schema.$meta.type = [...schema.type];
      schema.type = schema.type[0];
      schema.$meta.currentType = getCurrentType(schema);
    }

    const value: any = createValueForSchema(schema);

    if (value !== undefined) {
      this.model.push(value);
      this.schemas.push(schema);
    }

    this.modelChange.emit(this.model);
    this.updateIcons();
  }

  /**
   * Deletes an item from the array
   * @param index
   */
  deleteArrayItem(index: number): void {
    this.model.splice(index, 1);
    this.schemas.splice(index, 1);
    this.model = [...this.model];
    this.schemas = [...this.schemas];
    this.modelChange.emit(this.model);
  }

  /**
   * Track By function for the array ittierator
   * @param index
   * @param value
   */
  arrayTrackBy(index: number): number {
    return index;
  }

  /**
   *
   * @param property
   * @param type
   */
  changeItemType(index: number, type: string) {
    const schema = this.schemas[index];
    const dataType = this.dataTypeMap[type];
    if (dataType) {
      delete schema.format;
      schema.type = dataType.schema.type;
      if (dataType.schema.format) {
        schema.format = dataType.schema.format;
      }
      schema.$meta.currentType = getCurrentType(schema);
    }

    const value: any = createValueForSchema(schema);
    this.model[index] = value;

    this.modelChange.emit(this.model);
    this.updateIcons();
  }

  /**
   * Infers the schema type for each item in the array
   */
  private initSchemasTypeByModelValue(): void {
    this.schemas = [];
    if (Array.isArray(this.model)) {
      this.model.forEach(value => {
        let schema = inferType(value, this.typeCheckOverrides);

        if (this.schema.items) {
          schema = JSON.parse(JSON.stringify({ ...(this.schema.items as object), ...schema }));
        }

        this.schemas.push(schema);
      });
    }
  }

  /**
   * Updates the icons in the schemas
   */
  private updateIcons(): void {
    for (const schema of this.schemas) {
      if (!schema.$meta) {
        schema.$meta = {};
      }
      schema.$meta.icon = getIcon(schema);
    }
  }
}
