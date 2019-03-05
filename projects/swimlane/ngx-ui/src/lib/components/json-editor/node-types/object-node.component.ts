import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { createValueForSchema, jsonSchemaDataTypes, inferType, dataTypeMap, getIcon } from '../json-editor.helper';

@Component({
  selector: 'ngx-json-object-node',
  templateUrl: 'object-node.component.html',
  encapsulation: ViewEncapsulation.None
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

  @Input()
  typeCheckOverrides?: any;

  @Output()
  modelChange: EventEmitter<any> = new EventEmitter();

  requiredCache: any = {};

  dataTypes: any[] = jsonSchemaDataTypes;
  propertyCounter: number = 1;
  propertyId: number = 1;
  propertyIndex: any = {};

  dataTypeMap = dataTypeMap;

  ngOnInit() {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.model !== undefined || changes.schema !== undefined) {
      this.update();
    }
  }

  update() {
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
            this.schema.properties[prop].type = this.schema.properties[prop].type[0];
            this.schema.properties[prop].$meta.currentType = this.schema.properties[prop].type;
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
    const propName = `${dataType.name} ${this.propertyCounter}`;
    this.propertyCounter++;
    const schema = JSON.parse(JSON.stringify(dataType.schema));

    this.model[propName] = createValueForSchema(dataType.schema);
    schema.nameEditable = true;
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
    this.updateIcons();
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
          ...inferType(this.model[prop], this.typeCheckOverrides)
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
  }

  /**
   *
   * @param property
   * @param type
   */
  changePropertyType(property: any, type: string) {
    const dataType = this.dataTypeMap[type];
    if (dataType) {
      delete property.format;
      property.type = dataType.schema.type;
      if (dataType.schema.format) {
        property.format = dataType.schema.format;
      }
      property.$meta.currentType = type;
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
  trackBy(index, value) {
    return value.value.id;
  }

  /**
   * Updates the icons in the schemas
   */
  private updateIcons() {
    for (const id in this.propertyIndex) {
      const schema = this.propertyIndex[id];
      if (!schema.$meta) {
        schema.$meta = {};
      }
      schema.$meta.icon = getIcon(schema);
    }
  }
}
