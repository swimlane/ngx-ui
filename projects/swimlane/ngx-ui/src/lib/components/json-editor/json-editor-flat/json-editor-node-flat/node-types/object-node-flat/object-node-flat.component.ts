import { Component, ViewEncapsulation, Input, ViewChild, TemplateRef } from '@angular/core';
import { ObjectNode } from '../../../../node-types/object-node.component';
import { DialogService } from '../../../../../dialog/dialog.service';

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

  @Input() schemaRef: any;

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
      if (this.level > 0) {
        this.updateSchemaPropertyName(this.schemaRef, newName, oldName);
        this.schemaRef.properties[newName] = options.newProperty.value;
      }

      this.updateSchemaPropertyName(this.schema, newName, oldName);
      this.updatePropertyName(options.newProperty.key, newName);
    }

    this.toggleRequiredValue(options.required, newName);

    this.schema.properties[newName] = options.newProperty.value;
    this.updateProp(options.newProperty.key, options.newProperty.value);
    this.propertyIndex[options.newProperty.key] = options.newProperty.value;


    console.log(this.schemaRef);
    console.log(this.schema);
    console.log(this.model);

    this.schemaChange.emit();
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
