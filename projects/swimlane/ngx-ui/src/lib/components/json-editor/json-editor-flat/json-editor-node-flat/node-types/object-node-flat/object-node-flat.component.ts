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
    // this.schema = options.schema;
    if (options.oldProperty.value.propertyName !== options.newProperty.value.propertyName) {
      console.log('different');
      // this.updateSchemaPropertyName(this.schema, options.newProperty.value.propertyName, options.oldProperty.value.propertyName);
      this.updateSchemaPropertyName(this.schemaRef, options.newProperty.value.propertyName, options.oldProperty.value.propertyName);
    }

    this.updatePropertyName(options.newProperty.key, options.newProperty.value.propertyName);

    console.log(this.schemaRef);
    console.log(this.schema);
    console.log(this.model);
  }

  private updateSchemaPropertyName(schema: any, newName: string, oldName: string): void {
    this.updateRequiredProperties(schema, newName, oldName);

    schema.properties[oldName] = schema.properties[newName];
    delete schema.properties[newName];
  }

  private updateRequiredProperties(schema: any, newName: string, oldName: string): void {
    const requiredIndex = schema.required.indexOf(newName);
    if (requiredIndex >= 0) {
      schema.required[requiredIndex] = oldName;
    }
  }
}
