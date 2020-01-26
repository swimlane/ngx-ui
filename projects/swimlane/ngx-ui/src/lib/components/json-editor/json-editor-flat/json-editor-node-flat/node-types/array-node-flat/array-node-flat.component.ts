import { Component, ViewEncapsulation, Input, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ArrayNode } from '../../../../node-types/array-node.component';
import { JSONEditorSchema, JsonSchemaDataType } from '../../../../json-editor.helper';
import { DialogService } from '../../../../../dialog/dialog.service';
import { PropertyConfigOptions, PropertyConfigComponent } from '../property-config/property-config.component';

@Component({
  selector: 'ngx-json-array-node-flat',
  templateUrl: './array-node-flat.component.html',
  styleUrls: ['./array-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArrayNodeFlatComponent extends ArrayNode implements OnInit {
  @ViewChild('propertyConfigTmpl', { static: false }) propertyConfigTmpl: TemplateRef<PropertyConfigComponent>;

  @Input() level: number;

  @Input() schemaBuilderMode: boolean;

  @Input() formats: string[];

  @Input() compressed: boolean;

  indentationArray: number[] = [];

  constructor(private dialogService: DialogService) {
    super();
  }

  ngOnInit() {
    if (this.schemaBuilderMode && !this.model.length && this.schemaRef.items && this.schemaRef.items.type) {
      this.model.push(this.schemaRef.items);
    }

    if (this.level > 0) {
      this.indentationArray = Array(this.level).fill(this.level);
    }
  }

  onPropertyConfig(item: JSONEditorSchema, index: number): void {
    this.dialogService.create({
      template: this.propertyConfigTmpl,
      context: {
        property: { value: item },
        index,
        schema: this.schema,
        formats: this.formats
      },
      class: 'property-config-dialog'
    });
  }

  updateSchema(options: PropertyConfigOptions): void {
    this.schema.items = options.newProperty.value;
    this.schemaRef.items = options.newProperty.value;
    this.schemaChange.emit();
  }

  addArrayItem(dataType?: JsonSchemaDataType) {
    if (this.schemaBuilderMode && dataType) {
      this.addDefaultItemForSchemaBuilder(dataType);
    } else {
      super.addArrayItem(dataType);
    }
  }

  deleteArrayItem(index: number): void {
    if (this.schemaBuilderMode) {
      this.removeDefaultItemForSchemaBuilder();
    } else {
      super.deleteArrayItem(index);
    }
  }

  addDefaultItemForSchemaBuilder(dataType: JsonSchemaDataType): void {
    this.schema.items = dataType.schema as object;
    this.schemaRef.items = dataType.schema as object;

    this.model.push(this.schemaRef.items);

    this.schemaChange.emit();
  }

  private removeDefaultItemForSchemaBuilder(): void {
    delete this.schema.items;
    delete this.schemaRef.items;

    this.model = [];

    this.schemaChange.emit();
  }
}
