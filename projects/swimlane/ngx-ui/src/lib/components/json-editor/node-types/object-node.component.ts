import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { createValueForSchema, jsonSchemaDataTypes, inferType, dataTypeMap } from '../json-editor.helper';

@Component({
  selector: 'ngx-json-object-node',
  template: `
    <div [hidden]="!expanded">
      <div *ngFor="let prop of propertyIndex | iterableMap; trackBy: trackBy">

        <div class="property-def">
          <ngx-dropdown [showCaret]="true">
            <ngx-dropdown-toggle>
              <div class="type-icon">
                <ngx-icon [fontIcon]="dataTypeMap[prop.value.type] ? dataTypeMap[prop.value.type].icon : 'integration'"></ngx-icon>
              </div>
            </ngx-dropdown-toggle>
            <ngx-dropdown-menu class="ngx-dropdown-dark-outline">
              <ul class="vertical-list">
                <li>
                  <button type="button" (click)="deleteProperty(prop.value.propertyName)">Delete</button>
                </li>
              </ul>
            </ngx-dropdown-menu>
          </ngx-dropdown>

          <div class="property-name">
            <input type="text" *ngIf="prop.value.nameEditable"
              [ngModel]="prop.value.propertyName"
              (ngModelChange)="updatePropertyName(prop.value.id, $event)" />

            <ng-container *ngIf="!prop.value?.nameEditable">
              <div class="title" ngx-tooltip [tooltipTitle]="prop?.value?.description ? prop?.value?.description : prop?.value?.propertyName">
                {{prop.value?.title ? prop.value?.title : prop.value?.propertyName}}
                <span *ngIf="requiredCache[prop.value.propertyName]">*</span>
              </div>
            </ng-container>
          </div>
        </div>

        <ngx-json-editor-node
          [model]="model[prop.value.propertyName]"
          (modelChange)="updateProp(prop.value.id, $event)"
          [schema]="prop.value"
          [required]="!!requiredCache[prop.value.propertyName]"
          [inline]="prop.value.type !== 'array' && prop.value.type !== 'object'"
          [path]="path + getPath(prop.value.propertyName)"
          [errors]="errors">
        </ngx-json-editor-node>
      </div>

      <ngx-dropdown [showCaret]="true">
        <ngx-dropdown-toggle>
          <div class="add-button">
            <ngx-icon fontIcon="plus-bold"></ngx-icon>
          </div>
        </ngx-dropdown-toggle>
        <ngx-dropdown-menu class="ngx-dropdown-dark-outline">
          <ul class="vertical-list">
            <li *ngFor="let prop of schema.properties | iterableMap" (click)="addSchemaProperty(prop.key)">
              <button [disabled]="model[prop.key] !== undefined" type="button">{{prop.value.title ? prop.value.title : prop.key}}</button>
            </li>
            <li *ngFor="let prop of schema.patternProperties | iterableMap" (click)="addSchemaPatternProperty(prop.key)">
              <button type="button">{{prop.value.title ? prop.value.title : prop.key}}</button>
            </li>
            <ng-template [ngIf]="!schema || schema.additionalProperties !== false">
              <li *ngFor="let dataType of dataTypes" (click)="addProperty(dataType)">
                <button type="button">{{dataType.name}}</button>
              </li>
            </ng-template>
          </ul>
        </ngx-dropdown-menu>
      </ngx-dropdown>
    </div>
  `
})
export class ObjectNodeComponent implements OnInit {
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

  ngOnInit() {
    if (this.schema && this.schema.required) {
      for (const prop of this.schema.required) {
        this.requiredCache[prop] = true;
      }
    }

    for (const prop in this.model) {
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

    if (this.schema && this.schema.properties) {
      for (const propName in this.schema.properties) {
        if (this.model[propName] !== undefined) {
          continue;
        }
        if (this.requiredCache[propName]) {
          setTimeout(() => {
            this.addSchemaProperty(propName);
          });
        }
      }
    }
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
