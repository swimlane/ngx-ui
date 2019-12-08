import { Component, ViewEncapsulation, Input, ViewChild, TemplateRef } from '@angular/core';
import { ObjectNode } from '../../../../node-types/object-node.component';
import { DialogService } from '../../../../../dialog/dialog.service';
import { JSONSchema7 } from 'json-schema';
import { JsonSchemaDataType } from '@swimlane/ngx-ui/components/json-editor/json-editor.helper';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ngx-json-object-node-flat',
  templateUrl: './object-node-flat.component.html',
  styleUrls: ['./object-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ObjectNodeFlatComponent extends ObjectNode {
  @ViewChild('propertyConfigTmpl', { static: false }) propertyConfigTmpl: TemplateRef<any>;

  @Input() level: number;

  @Input() schemaBuilderMode: boolean;

  @Input() schemaRef: JSONSchema7;

  constructor(private dialogService: DialogService) {
    super();
  }

  onPropertyConfig(property: unknown): void {
    this.dialogService.create({
      template: this.propertyConfigTmpl,
      context: {
        property,
        propertyIndex: this.propertyIndex,
        schema: this.schema
      },
      class: 'property-config-dialog'
    });
  }

  updateSchema(options: any): void {
    const newName = options.newProperty.value.propertyName;
    const oldName = options.oldProperty.value.propertyName;

    if (newName !== options.oldProperty.value.propertyName) {
      this.updateSchemaPropertyName(this.schemaRef, newName, oldName);
      this.updateSchemaPropertyName(this.schema, newName, oldName);
      this.updatePropertyName(options.newProperty.key, newName);
    }

    this.toggleRequiredValue(options.required, newName);

    this.schema.properties[newName] = options.newProperty.value;
    this.propertyIndex[options.newProperty.key] = options.newProperty.value;
    this.updateSchemaRefProperty(options.newProperty.value);

    console.log(this.schemaRef);
    console.log(this.schema);
    console.log(this.model);

    this.schemaChange.emit();
  }

  addProperty(dataType: JsonSchemaDataType): void {
    super.addProperty(dataType);

    if (this.schemaBuilderMode) {
      this.updateSchemaRefProperty(this.propertyIndex[this.propertyId - 1]);
      this.schemaChange.emit();
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

  private swapSchemaProperties(previousIndex: number, currentIndex: number): void {
    const propertiesIds = Object.keys(this.schemaRef.properties)

    moveItemInArray(propertiesIds, previousIndex, currentIndex);

    this.schemaRef.properties = propertiesIds.reduce((result, prop) => {
      result[prop] = this.schemaRef.properties[prop];
      return result;
    }, {});

    this.schemaChange.emit();
  }

  private updateSchemaRefProperty(prop: any): void {
    // TODO: add missing properties
    this.schemaRef.properties[prop.propertyName] = {
      type: prop.type,
      ...prop['description'] && { description: prop['description'] },
      ...prop['nameEditable'] && { nameEditable: prop['nameEditable'] },
      ...prop['minimum'] && { minimum: prop['minimum'] },
      ...prop['maximum'] && { maximum: prop['maximum'] },
      ...prop['minLength'] && { minLength: prop['minLength'] },
      ...prop['minLength'] && { minLength: prop['minLength'] },
      ...prop['minItems'] && { minItems: prop['minItems'] },
      ...prop['maxItems'] && { maxItems: prop['maxItems'] },
      ...prop['pattern'] && { pattern: prop['pattern'] }
    };
  }

  private updateSchemaPropertyName(schema: any, newName: string, oldName: string): void {
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

  private updateRequiredProperties(schema: any, newName: string, oldName: string): void {
    const requiredIndex = schema.required.indexOf(oldName);
    if (requiredIndex >= 0) {
      schema.required[requiredIndex] = newName;
    }
  }
}
