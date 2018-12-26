import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { createValueForSchema, jsonSchemaDataTypes, inferType, dataTypeMap } from '../json-editor.helper';

@Component({
  selector: 'ngx-json-object-node',
  templateUrl: 'object-node.component.html'
})
export class ObjectNodeComponent implements OnInit, OnChanges {
  @Input()
  schema: any;

  @Input()
  model: any;

  @Input()
  required: boolean = false;

  @Input()
  expanded: boolean;

  @Input()
  path: string;

  @Input()
  errors: any[];

  @Output()
  modelChange: EventEmitter<any> = new EventEmitter();

  requiredCache: any = {};

  dataTypes: any[] = jsonSchemaDataTypes;
  propertyCounter: number = 1;
  propertyId: number = 1;
  propertyIndex: any = {};

  dataTypeMap = dataTypeMap;

  ngOnInit() {
    this.updateRequiredCache();
    this.indexProperties();
    this.addRequiredProperties();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.model !== undefined || changes.schema !== undefined) {
      this.updateRequiredCache();
      this.indexProperties();
      this.addRequiredProperties();
    }
  }

  /**
   * Updates a property on the model and emits the change event
   * @param propName
   * @param value
   */
  updateProp(id: any, value: any) {
    const propName = this.propertyIndex[id].propertyName;
    this.model[propName] = value;
    this.modelChange.emit(this.model);
  }

  /**
   * Updates the name of a property
   * @param id
   * @param name
   */
  updatePropertyName(id: any, name: string) {
    const oldName = this.propertyIndex[id].propertyName;
    this.model[name] = this.model[oldName];
    this.propertyIndex[id].propertyName = name;
    delete this.model[oldName];
    this.propertyIndex = { ...this.propertyIndex };
    this.modelChange.emit(this.model);
  }

  /**
   * Updates the whole model and emits the change event
   */
  updateModel(value: any, parseAsJson: boolean = false) {
    if (parseAsJson) {
      this.model = JSON.parse(value);
    } else {
      this.model = value;
    }
    this.modelChange.emit(this.model);
  }

  /**
   * Adds a new property to the model
   */
  addProperty(dataType: any) {
    const propName = `new ${dataType.name} ${this.propertyCounter}`;
    this.propertyCounter++;
    const schema = JSON.parse(JSON.stringify(dataType.schema));

    this.model[propName] = createValueForSchema(dataType.schema);
    schema.nameEditable = true;
    schema.propertyName = propName;
    schema.id = this.propertyId++;
    this.propertyIndex[schema.id] = schema;
    this.propertyIndex = { ...this.propertyIndex };

    this.modelChange.emit(this.model);
  }

  /**
   * Adds a new property as defined in the schema
   */
  addSchemaProperty(propName: string) {
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
  }

  /**
   * Adds a new patternProperty as defined in the schema
   */
  addSchemaPatternProperty(propName: string) {
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
  updateRequiredCache() {
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
  indexProperties() {
    for (const prop in this.model) {
      if (this.isIndexed(prop)) {
        continue;
      }

      let schema: any;
      if (this.schema.properties && this.schema.properties[prop]) {
        schema = JSON.parse(JSON.stringify(this.schema.properties[prop]));
      } else {
        schema = {
          type: inferType(this.model[prop])
        };
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
  }

  isIndexed(propertyName: string): boolean {
    return Object.values(this.propertyIndex).findIndex((s: any) => s.propertyName === propertyName) !== -1;
  }

  /**
   * Inits the required properties on the model
   */
  addRequiredProperties() {
    setTimeout(() => {
      if (this.schema && this.schema.properties) {
        for (const propName in this.schema.properties) {
          if (this.model[propName] !== undefined) {
            continue;
          }
          if (this.requiredCache[propName]) {
            this.addSchemaProperty(propName);
          }
        }
      }
    });
  }

  /**
   * Returns the icon for the schema
   */
  getIcon(schema: any): string {
    let key = schema.type;
    if (schema.format) {
      key = `${key}=${schema.format}`;
    }
    if (this.dataTypeMap[key]) {
      return this.dataTypeMap[key].icon;
    }

    return 'integration';
  }

  /**
   * Track By function for the array ittierator
   * @param index
   * @param value
   */
  trackBy(index, value) {
    return value.value.id;
  }
}
