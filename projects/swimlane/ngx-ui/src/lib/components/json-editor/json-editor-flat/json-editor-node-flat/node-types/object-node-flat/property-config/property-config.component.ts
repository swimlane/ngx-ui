import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { DialogService } from '../../../../../../dialog/dialog.service';
import { JsonSchemaDataType, jsonSchemaDataTypes, inferTypeName, JSONEditorSchema } from '@swimlane/ngx-ui/components/json-editor/json-editor.helper';

interface ObjectProperty {
  key: number;
  value: {
    propertyName: string;
    description: string;
  }
}

@Component({
  selector: 'ngx-property-config',
  templateUrl: './property-config.component.html',
  styleUrls: ['./property-config.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PropertyConfigComponent implements OnInit {
  @Input() property: ObjectProperty;
  @Input() propertyIndex: any[];
  @Input() schema: JSONEditorSchema;

  @Output() updateSchema = new EventEmitter()

  inferTypeName = inferTypeName;

  dataTypes: JsonSchemaDataType[] = jsonSchemaDataTypes;

  editableProperty: ObjectProperty;

  required = false;

  newEnumValue = '';

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    this.editableProperty = JSON.parse(JSON.stringify(this.property));
    this.setRequired();
  }

  applyChanges(): void {
    this.dialogService.destroyAll();
    this.updateSchema.emit({ schema: this.schema, required: this.required, newProperty: this.editableProperty, oldProperty: this.property });
  }

  updateTypeAndFormat(event: string): void {
    let format = '';

    switch (event) {
      case 'Date':
        format = 'date';
        break;
      case 'Date & Time':
        format = 'date-time';
        break;
      case 'Password':
        format = 'password';
        break;
      case 'Code':
        format = 'code';
        break;
    }

    if (format) {
      this.editableProperty.value['type'] = 'string';
      this.editableProperty.value['format'] = format;
    } else {
      this.editableProperty.value['type'] = event;
      delete this.editableProperty.value['format'];
    }

    // TODO: Delete minimum, maximum, etc...
  }

  addEnumValue(): void {
    const enumValues = this.editableProperty.value['enum'] = this.editableProperty.value['enum'] || [];

    if (!enumValues.includes(this.newEnumValue)) {
      enumValues.push(this.newEnumValue);
      this.newEnumValue = '';
    }
  }

  removeEnumValue(val: string): void {
    const enumValues = this.editableProperty.value['enum'];
    const index = enumValues.indexOf(val);

    if (index > -1) {
      enumValues.splice(index, 1);
    }

    if (!enumValues.length) {
      // Remove enum property if empty
      delete this.editableProperty.value['enum'];
    }
  }

  private setRequired(): void {
    this.required = this.schema.required.includes(this.property.value.propertyName);
  }
}