import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { DialogService } from '../../../../../../dialog/dialog.service';
import {
  JSONEditorSchema,
  ObjectProperty,
  propTypes
} from '@swimlane/ngx-ui/components/json-editor/json-editor.helper';
import { JSONSchema7TypeName } from 'json-schema';

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

  @Input() formats: string[] = [];

  @Output() updateSchema = new EventEmitter();

  propTypes: string[] = propTypes;

  editableProperty: ObjectProperty;

  required = false;

  newEnumValue = '';

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.editableProperty = JSON.parse(JSON.stringify(this.property));
    this.setRequired();
  }

  applyChanges(): void {
    this.dialogService.destroyAll();
    this.updateSchema.emit({
      schema: this.schema,
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
