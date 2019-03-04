import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

import { createValueForSchema, jsonSchemaDataTypes, dataTypeMap, inferType, getIcon } from '../json-editor.helper';

@Component({
  selector: 'ngx-json-array-node',
  templateUrl: 'array-node.component.html'
})
export class ArrayNodeComponent implements OnChanges {
  @Input()
  schema: any;

  @Input()
  model: any[];

  @Input()
  required: boolean = false;

  @Input()
  expanded: boolean;

  @Input()
  path: string;

  @Input()
  errors: any[];

  @Input()
  typeCheckOverrides: any;

  @Output()
  modelChange: EventEmitter<any[]> = new EventEmitter();

  requiredCache: any = {};
  schemas: any[] = [];
  dataTypes: any[] = jsonSchemaDataTypes;
  dataTypeMap = dataTypeMap;
  getIcon = getIcon;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.schema) {
      if (this.schema && this.schema.required) {
        for (const prop of this.schema.required) {
          this.requiredCache[prop] = true;
        }
      }
    }

    if (changes.model || changes.schema) {
      this.initSchemasTypeByModelValue();
    }
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
  addArrayItem(dataType?: any): void {
    let schema;
    if (dataType) {
      schema = JSON.parse(JSON.stringify(dataType.schema));
    } else {
      schema = JSON.parse(JSON.stringify(this.schema.items));
    }

    if (!schema.type) {
      schema.type = 'object';
    }

    const value: any = createValueForSchema(schema);

    if (value !== undefined) {
      this.model.push(value);
      this.schemas.push(schema);
    }

    this.modelChange.emit(this.model);
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
   *
   * @param value Updates the whole model and emits the change event
   */
  updateModel(value: any, parseAsJson: boolean = false): void {
    if (parseAsJson) {
      this.model = JSON.parse(value);
    } else {
      this.model = value;
    }
    this.modelChange.emit(this.model);
  }

  /**
   * Track By function for the array ittierator
   * @param index
   * @param value
   */
  arrayTrackBy(index: number, value: any): number {
    return index;
  }

  private initSchemasTypeByModelValue(): void {
    this.schemas = [];
    this.model.forEach(value => {
      this.schemas.push(inferType(value, this.typeCheckOverrides));
    });
  }
}
