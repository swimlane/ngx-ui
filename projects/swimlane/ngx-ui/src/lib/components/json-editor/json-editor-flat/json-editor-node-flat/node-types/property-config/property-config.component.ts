import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { DialogService } from '../../../../../dialog/dialog.service';
import { JSONEditorSchema, ObjectProperty, propTypes, JsonSchemaDataType } from '../../../../json-editor.helper';
import { JSONSchema7TypeName } from 'json-schema';

export interface PropertyConfigOptions {
  required: boolean;
  index: number;
  newProperty: ObjectProperty;
  oldProperty: ObjectProperty;
}

@Component({
  selector: 'ngx-property-config',
  templateUrl: './property-config.component.html',
  styleUrls: ['./property-config.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PropertyConfigComponent implements OnInit {
  @Input() property: ObjectProperty;

  @Input() index: number;

  @Input() schema: JSONEditorSchema;

  @Input() formats: JsonSchemaDataType[] = [];

  @Input() arrayItem = false;

  @Output() updateSchema = new EventEmitter<PropertyConfigOptions>();

  propTypes: string[] = propTypes;

  editableProperty: ObjectProperty;

  required = false;

  newEnumValue = '';

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.editableProperty = JSON.parse(JSON.stringify(this.property));

    if (!this.arrayItem) {
      this.setRequired();
    }
  }

  applyChanges(): void {
    this.dialogService.destroyAll();
    this.updateSchema.emit({
      required: this.required,
      index: this.index,
      newProperty: this.editableProperty,
      oldProperty: this.property
    });
  }

  updateType(type: string): void {
    if (this.editableProperty.value['type'] !== type) {
      this.editableProperty.value['type'] = type as JSONSchema7TypeName;
      delete this.editableProperty.value['format'];

      this.cleanUpPropertyConstrains();
    }
  }

  updateExamples(examples: string[]): void {
    if (examples && examples.length) {
      this.editableProperty.value['examples'] = examples;
    } else {
      delete this.editableProperty.value.examples;
    }
  }

  updateFormat(format: string): void {
    if (this.editableProperty.value['format'] !== format) {
      this.editableProperty.value['type'] = 'string';
      this.editableProperty.value['format'] = format;
      this.cleanUpPropertyConstrains();
    }
  }

  addEnumValue(): void {
    const enumValues = (this.editableProperty.value['enum'] = this.editableProperty.value['enum'] || []);

    if (!enumValues.includes(this.newEnumValue)) {
      enumValues.push(this.newEnumValue);
      this.newEnumValue = '';
      delete this.editableProperty.value['format'];
    }
  }

  updateDefault(enumValue: string): void {
    if (!enumValue) {
      delete this.editableProperty.value['default'];
    } else {
      this.editableProperty.value['default'] = enumValue;
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

  private cleanUpPropertyConstrains(): void {
    delete this.editableProperty.value['enum'];
    delete this.editableProperty.value['properties'];
    delete this.editableProperty.value['required'];
    delete this.editableProperty.value['items'];
    delete this.editableProperty.value['minimum'];
    delete this.editableProperty.value['maximum'];
    delete this.editableProperty.value['default'];
    delete this.editableProperty.value['minLength'];
    delete this.editableProperty.value['maxLength'];
    delete this.editableProperty.value['minItems'];
    delete this.editableProperty.value['maxItems'];
  }

  private setRequired(): void {
    this.required = this.schema.required.includes(this.property.value.propertyName);
  }
}
