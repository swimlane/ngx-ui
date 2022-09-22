import { Input, EventEmitter, Output, OnChanges, SimpleChanges, Directive } from '@angular/core';
import { JSONSchema7TypeName } from 'json-schema';

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

  @Input() required = false;

  @Input() expanded: boolean;

  @Input() path: string;

  @Input() errors: any[];

  @Input() typeCheckOverrides?: any;

  @Input() schemaRef: JSONEditorSchema;

  @Input() showKnownProperties = false;

  @Output() modelChange: EventEmitter<any[]> = new EventEmitter();

  @Output() schemaUpdate: EventEmitter<JSONEditorSchema> = new EventEmitter();

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
   *
   * @param index
   * @param value
   */
  updateArrayItem(index: number, value: any): void {
    this.model = [...this.model];
    this.model[index] = value;
    this.modelChange.emit(this.model);
  }

  /**
   * Adds a new item to the model
   */
  addArrayItem(dataType?: JsonSchemaDataType): void {
    let schema;
    if (dataType) {
      if (dataType.name === 'String') {
        dataType.schema = { type: 'string' };
      }
      schema = JSON.parse(JSON.stringify({ ...(this.schema.items as any), ...dataType.schema }));
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
      this.model = [...this.model, value];
      this.schemas = [...this.schemas, schema];
    }

    this.modelChange.emit(this.model);
    this.updateIcons();
  }

  /**
   * Deletes an item from the array
   *
   * @param index
   */
  deleteArrayItem(index: number): void {
    this.model = [...this.model];
    this.model.splice(index, 1);
    this.schemas.splice(index, 1);
    this.schemas = [...this.schemas];
    this.modelChange.emit(this.model);
  }

  /**
   * Track By function for the array ittierator
   *
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
    this.model = [...this.model];
    this.model[index] = value;

    this.modelChange.emit(this.model);
    this.updateIcons();
  }

  private getTypeFromSchemaProperty(index: number): JSONSchema7TypeName {
    if (this.schema == null || this.schema.items == null) {
      return undefined;
    }

    if (Array.isArray(this.schema.items)) {
      if (this.schema.items.length === 0) {
        return undefined;
      }
      return this.schema.items[index];
    }

    if (this.schema.items.type !== undefined) {
      return this.schema.items as JSONSchema7TypeName;
    }

    return undefined;
  }

  /**
   * Infers the schema type for each item in the array
   */
  private initSchemasTypeByModelValue(): void {
    const prevSchemas = this.schemas ? [...this.schemas] : [];
    this.schemas = [];
    if (Array.isArray(this.model)) {
      this.model.forEach((value, index) => {
        const inferedSchema = this.getTypeFromSchemaProperty(index) ?? inferType(value, this.typeCheckOverrides);
        let schema;

        if (inferedSchema.type === 'null' && prevSchemas[index]) {
          schema = prevSchemas[index];
        } else {
          schema = inferedSchema;
        }

        if (
          prevSchemas.length > 0 &&
          prevSchemas[index].format !== undefined &&
          prevSchemas[index].format !== schema.format
        ) {
          schema.format = prevSchemas[index].format;
        }
        if (prevSchemas.length > 0 && prevSchemas[index].format === undefined) {
          schema.format = prevSchemas[index].format;
        }
        if (this.schema.items) {
          schema = JSON.parse(JSON.stringify({ ...(this.schema.items as any), ...schema }));
        }

        this.schemas.push(Object.assign({}, schema));
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
