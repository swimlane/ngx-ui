import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { JSONSchema7 } from 'json-schema';
import { DialogService } from '../../../../../../dialog/dialog.service';
import { JsonSchemaDataType, jsonSchemaDataTypes, inferTypeName } from '@swimlane/ngx-ui/components/json-editor/json-editor.helper';

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
  @Input() schema: JSONSchema7;

  @Output() updateSchema = new EventEmitter()

  inferTypeName = inferTypeName;

  dataTypes: JsonSchemaDataType[] = jsonSchemaDataTypes;

  editableProperty: ObjectProperty;

  required = false;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    console.log(this.property);
    console.log(this.propertyIndex);
    console.log(this.schema);

    this.editableProperty = JSON.parse(JSON.stringify(this.property));
    this.setRequired();
  }

  applyChanges(): void {
    // TODO update the rest
    console.log(this.editableProperty);
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

  private setRequired(): void {
    this.required = this.schema.required.includes(this.property.value.propertyName);
  }
}