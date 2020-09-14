import {
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  Directive
} from '@angular/core';

import {
  createValueForSchema,
  jsonSchemaDataTypes,
  jsonSchemaDataFormats,
  inferType,
  dataTypeMap,
  getIcon,
  getCurrentType,
  JsonSchemaDataType,
  JSONEditorSchema,
  PropertyIndex
} from '../json-editor.helper';
import { JSONSchema7TypeName } from 'json-schema';

@Directive()
export class ObjectNode implements OnInit, OnChanges {
  @Input() schema: JSONEditorSchema;

  @Input() model: any;

  @Input() required: boolean = false;

  @Input() expanded: boolean;

  @Input() path: string;

  @Input() errors: any[];

  @Input() typeCheckOverrides?: any;

  @Input() schemaBuilderMode: boolean;

  @Input() schemaRef: JSONEditorSchema;

  @Input() showKnownProperties = false;

  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  @Output() schemaChange: EventEmitter<JSONEditorSchema> = new EventEmitter();

  requiredCache: { [key: string]: boolean } = {};

  dataTypes: JsonSchemaDataType[] = [...jsonSchemaDataTypes, ...jsonSchemaDataFormats];
  propertyCounter: number = 1;
  propertyId: number = 1;
  propertyIndex: PropertyIndex = {};

  dataTypeMap = dataTypeMap;

  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.model !== undefined || changes.schema !== undefined) {
      this.update();
    }
  }

  update(): void {
    setTimeout(() => {
      for (const prop in this.schema.properties) {
        if (Array.isArray(this.schema.properties[prop].type) && this.schema.properties[prop].type.length > 0) {
          if (!this.schema.properties[prop].$meta) {
            this.schema.properties[prop].$meta = {};
          }

          this.schema.properties[prop].$meta.type = [...this.schema.properties[prop].type];

          if (this.model[prop] !== undefined) {
            this.schema.properties[prop] = {
              ...this.schema.properties[prop],
              ...inferType(this.model[prop], this.typeCheckOverrides, this.schema.properties[prop].$meta.type)
            };
          } else {
            this.schema.properties[prop].type = this.schema.properties[prop].type[0] as JSONSchema7TypeName;
            this.schema.properties[prop].$meta.currentType = getCurrentType(this.schema.properties[prop]);
          }
        }
      }

      this.updateRequiredCache();
      this.indexProperties();
      this.addRequiredProperties();
      this.updateIcons();
    });
  }

  /**
   * Updates a property on the model and emits the change event
   * @param propName
   * @param value
   */
  updateProp(id: number | string, value: any): void {
    const propName = this.propertyIndex[id].propertyName;
    this.model[propName] = value;
    this.modelChange.emit(this.model);
  }

  /**
   * Updates the name of a property
   * @param id
   * @param name
   */
  updatePropertyName(id: number | string, name: string) {
    const oldName = this.propertyIndex[id].propertyName;
    this.model[name] = this.model[oldName];
    this.propertyIndex[id].propertyName = name;
    delete this.model[oldName];
    this.propertyIndex = { ...this.propertyIndex };
    this.modelChange.emit(this.model);
  }

  /**
   * Adds a new property to the model
   */
  addProperty(dataType: JsonSchemaDataType): void {
    const propName = `${dataType.name} ${this.propertyCounter}`;
    this.propertyCounter++;
    const schema = JSON.parse(JSON.stringify(dataType.schema));

    this.model[propName] = createValueForSchema(dataType.schema as JSONEditorSchema);
    schema.nameEditable = !this.schemaBuilderMode;
    schema.propertyName = propName;

    schema.id = this.propertyId++;
    this.propertyIndex[schema.id] = schema;
    this.propertyIndex = { ...this.propertyIndex };

    this.modelChange.emit(this.model);
    this.updateIcons();
  }

  /**
   * Adds a new property as defined in the schema
   */
  addSchemaProperty(propName: string): void {
    if (this.model[propName] !== undefined) {
      return;
    }

    const schema = JSON.parse(JSON.stringify(this.schema.properties[propName]));
    if (!schema.type) {
      schema.type = 'object';
    }

    const value: any = createValueForSchema(schema);
    this.model[propName] = value;

    schema.nameEditable = false;
    schema.propertyName = propName;
    schema.id = this.propertyId++;
    this.propertyIndex[schema.id] = schema;
    this.propertyIndex = { ...this.propertyIndex };

    this.modelChange.emit(this.model);
    this.updateIcons();
  }

  /**
   * Adds a new patternProperty as defined in the schema
   */
  addSchemaPatternProperty(propName: string): void {
    const newPropName = `new ${this.schema.patternProperties[propName].title} ${this.propertyCounter}`;
    this.propertyCounter++;

    const schema = JSON.parse(JSON.stringify(this.schema.patternProperties[propName]));
    schema.isPatternProperty = true;
    if (!schema.type) {
      schema.type = 'object';
    }

    const value: any = createValueForSchema(schema);
    this.model[newPropName] = value;

    schema.nameEditable = true;
    schema.propertyName = newPropName;
    schema.id = this.propertyId++;
    this.propertyIndex[schema.id] = schema;
    this.propertyIndex = { ...this.propertyIndex };

    this.modelChange.emit(this.model);
    this.updateIcons();
  }

  /**
   * Deletes a property
   */
  deleteProperty(propName: string): void {
    delete this.model[propName];
    for (const id in this.propertyIndex) {
      if (this.propertyIndex[id].propertyName === propName) {
        delete this.propertyIndex[id];
        break;
      }
    }
    this.model = { ...this.model };
    this.propertyIndex = { ...this.propertyIndex };
    this.modelChange.emit(this.model);
  }

  /**
   * Returns the absolute tree path of the property
   */
  getPath(propName: string): string {
    let propSchema;

    for (const id in this.propertyIndex) {
      if (this.propertyIndex[id].propertyName === propName) {
        propSchema = this.propertyIndex[id];
        break;
      }
    }

    if (propSchema.isPatternProperty) {
      return `['${propName}']`;
    }

    return `.${propName}`;
  }

  /**
   * Updates the required cache
   */
  updateRequiredCache(): void {
    this.requiredCache = {};
    if (this.schema && this.schema.required) {
      for (const prop of this.schema.required) {
        this.requiredCache[prop] = true;
      }
    }
  }

  /**
   * Creates an index out of all the properties in the model
   */
  indexProperties(): void {
    const props = this.schemaBuilderMode ? this.schemaRef.properties : this.model;

    for (const prop in props) {
      if (this.isIndexed(prop)) {
        continue;
      }

      let schema: JSONEditorSchema;

      if (this.schema.properties && this.schema.properties[prop]) {
        schema = JSON.parse(JSON.stringify(this.schema.properties[prop]));
      } else {
        let matchesPattern = false;
        if (this.schema.patternProperties) {
          for (const pattern in this.schema.patternProperties) {
            // tslint:disable-next-line: tsr-detect-non-literal-regexp
            const patternRegex = new RegExp(pattern);
            if (patternRegex.test(prop)) {
              schema = JSON.parse(JSON.stringify(this.schema.patternProperties[pattern]));
              matchesPattern = true;
            }
          }
        }

        if (!matchesPattern) {
          schema = {
            ...inferType(this.model[prop], this.typeCheckOverrides)
          };
        }
      }

      schema.id = this.propertyId++;
      schema.propertyName = prop;
      this.propertyIndex[schema.id] = schema;
      this.propertyIndex = { ...this.propertyIndex };
    }

    for (const id in this.propertyIndex) {
      const schema = this.propertyIndex[id];
      if (this.model[schema.propertyName] === undefined) {
        delete this.propertyIndex[id];
      }
    }

    this.propertyIndex = { ...this.propertyIndex };
    this.cdr.markForCheck();
  }

  isIndexed(propertyName: string): boolean {
    return Object.values(this.propertyIndex).findIndex((s: JSONEditorSchema) => s.propertyName === propertyName) !== -1;
  }

  /**
   * Inits the required properties on the model
   */
  addRequiredProperties(): void {
    if (this.schema && this.schema.properties) {
      for (const propName in this.schema.properties) {
        if (this.model[propName] !== undefined) {
          continue;
        }

        if (this.requiredCache[propName] || this.schemaBuilderMode) {
          // List all properties not only required if we are in schema builder mode
          this.addSchemaProperty(propName);
        }
      }
    }
  }

  /**
   *
   * @param property
   * @param type
   */
  changePropertyType(property: JSONEditorSchema, type: string) {
    const dataType = this.dataTypeMap[type];
    if (dataType) {
      delete property.format;
      property.type = dataType.schema.type;
      if (dataType.schema.format) {
        property.format = dataType.schema.format;
      }
      property.$meta.currentType = getCurrentType(property);
      this.schema.properties[property.propertyName] = { ...property };
    }

    const value: any = createValueForSchema(property);
    this.model[property.propertyName] = value;

    this.modelChange.emit(this.model);
    this.updateIcons();
  }

  /**
   * Track By function for the array ittierator
   * @param index
   * @param value
   */
  trackBy(_, value) {
    return value.id;
  }

  /**
   * Updates the icons in the schemas
   */
  protected updateIcons(): void {
    for (const id in this.propertyIndex) {
      const schema = this.propertyIndex[id];
      if (!schema.$meta) {
        schema.$meta = {};
      }
      schema.$meta.icon = getIcon(schema);
    }
  }
}
