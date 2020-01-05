import { Component, ViewEncapsulation, Input, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ObjectNode } from '../../../../node-types/object-node.component';
import { DialogService } from '../../../../../dialog/dialog.service';
import {
  JsonSchemaDataType,
  JSONEditorSchema,
  ObjectProperty,
  createValueForSchema
} from '@swimlane/ngx-ui/components/json-editor/json-editor.helper';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PropertyConfigOptions } from '../property-config/property-config.component';

@Component({
  selector: 'ngx-json-object-node-flat',
  templateUrl: './object-node-flat.component.html',
  styleUrls: ['./object-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ObjectNodeFlatComponent extends ObjectNode implements OnInit {
  @ViewChild('propertyConfigTmpl', { static: false }) propertyConfigTmpl: TemplateRef<any>;

  @Input() level: number;

  @Input() schemaBuilderMode: boolean;

  @Input() formats: string[];

  constructor(private dialogService: DialogService) {
    super();
  }

  ngOnInit() {
    setTimeout(() => {
      this.initSchemaProperties(this.schema);
      this.initSchemaProperties(this.schemaRef);
    });
  }

  onUpdatePropertyName(options: { id: string; name: string }): void {
    this.updatePropertyName(options.id, options.name);
  }

  onPropertyConfig(property: ObjectProperty, index: number): void {
    this.dialogService.create({
      template: this.propertyConfigTmpl,
      context: {
        property,
        index,
        schema: this.schema,
        formats: this.formats
      },
      class: 'property-config-dialog'
    });
  }

  updateSchema(options: PropertyConfigOptions): void {
    const oldProperty = options.oldProperty.value;
    const newProperty = options.newProperty.value;

    const oldName = oldProperty.propertyName;
    const newName = newProperty.propertyName;

    if (newName !== oldName) {
      if (oldName in this.schema.properties) {
        this.updateSchemaPropertyName(this.schema, newName, oldName);
      }

      this.updateSchemaPropertyName(this.schemaRef, newName, oldName);
      this.updatePropertyName(options.newProperty.key, newName);
    }

    this.toggleRequiredValue(options.required, newName);

    this.schema.properties[newName] = newProperty;
    this.propertyIndex[options.newProperty.key] = newProperty;
    this.updateSchemaRefProperty(newProperty);

    if (newName !== oldName) {
      this.swapSchemaProperties(options.index);
    }

    if (oldProperty.type !== newProperty.type) {
      const value: any = createValueForSchema(newProperty);
      this.model[newProperty.propertyName] = value;
    }

    this.schemaChange.emit();
  }

  addProperty(dataType: JsonSchemaDataType): void {
    super.addProperty(dataType);

    if (this.schemaBuilderMode) {
      if (dataType.name === 'Array') {
        this.propertyIndex[this.propertyId - 1] = {
          ...this.propertyIndex[this.propertyId - 1],
          items: {
            type: 'string'
          }
        };
      }

      this.updateSchemaRefProperty(this.propertyIndex[this.propertyId - 1]);
      this.schemaChange.emit();
      this.update();
    }
  }

  deleteProperty(propName: string): void {
    delete this.schema.properties[propName];
    delete this.schemaRef.properties[propName];
    this.toggleRequiredValue(false, propName);
    super.deleteProperty(propName);
    this.schemaChange.emit();
  }

  drop(event: CdkDragDrop<string[]>): void {
    const propertyIndexArray = Object.keys(this.propertyIndex);

    const currentIndexId = propertyIndexArray[event.currentIndex];
    const previousIndexId = propertyIndexArray[event.previousIndex];

    const tempProperty = this.propertyIndex[currentIndexId];
    this.propertyIndex[currentIndexId] = this.propertyIndex[previousIndexId];
    this.propertyIndex[currentIndexId].id = currentIndexId;

    this.propertyIndex[previousIndexId] = tempProperty;
    this.propertyIndex[previousIndexId].id = previousIndexId;

    this.swapSchemaProperties(event.previousIndex, event.currentIndex);
  }

  private swapSchemaProperties(currentIndex: number, previousIndex?: number): void {
    const propertiesIds = Object.keys(this.schemaRef.properties);

    if (previousIndex === undefined) {
      previousIndex = propertiesIds.length - 1;
    }

    moveItemInArray(propertiesIds, previousIndex, currentIndex);

    this.schemaRef.properties = propertiesIds.reduce((result, prop) => {
      result[prop] = this.schemaRef.properties[prop];
      return result;
    }, {});

    this.schemaChange.emit();
  }

  private initSchemaProperties(schema: JSONEditorSchema): void {
    schema.required = schema.required || [];
    schema.properties = schema.properties || {};
  }

  private updateSchemaRefProperty(prop: any): void {
    this.schemaRef.properties[prop.propertyName] = {
      type: prop.type,
      ...(prop['format'] && { format: prop['format'] }),
      ...(prop['items'] && { items: prop['items'] }),
      ...(prop['required'] && { required: prop['required'] }),
      ...(prop['properties'] && { properties: prop['properties'] }),
      ...(prop['enum'] && { enum: prop['enum'] }),
      ...(prop['default'] && { default: prop['default'] }),
      ...(prop['description'] && { description: prop['description'] }),
      ...(prop['nameEditable'] && { nameEditable: prop['nameEditable'] }),
      ...(prop['minimum'] && { minimum: prop['minimum'] }),
      ...(prop['maximum'] && { maximum: prop['maximum'] }),
      ...(prop['minLength'] && { minLength: prop['minLength'] }),
      ...(prop['maxLength'] && { maxLength: prop['maxLength'] }),
      ...(prop['minItems'] && { minItems: prop['minItems'] }),
      ...(prop['maxItems'] && { maxItems: prop['maxItems'] }),
      ...(prop['pattern'] && { pattern: prop['pattern'] })
    };
  }

  private updateSchemaPropertyName(schema: JSONEditorSchema, newName: string, oldName: string): void {
    this.updateRequiredProperties(schema, newName, oldName);
    schema.properties[newName] = schema.properties[oldName];
    delete schema.properties[oldName];
  }

  private toggleRequiredValue(required: boolean, propertyName: string): void {
    const requiredIndex = this.schema.required.indexOf(propertyName);
    if (requiredIndex >= 0 && !required) {
      this.schema.required.splice(requiredIndex, 1);
    } else if (requiredIndex < 0 && required) {
      this.schema.required.push(propertyName);
    }

    this.schemaRef.required = [...this.schema.required];
    this.updateRequiredCache();
  }

  private updateRequiredProperties(schema: JSONEditorSchema, newName: string, oldName: string): void {
    const requiredIndex = schema.required.indexOf(oldName);
    if (requiredIndex >= 0) {
      schema.required[requiredIndex] = newName;
    }
  }
}
