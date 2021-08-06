import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { DialogService } from '../../../../../dialog/dialog.service';
import { JSONEditorSchema, propTypes, JsonSchemaDataType } from '../../../../json-editor.helper';
import { JSONSchema7TypeName } from 'json-schema';

export interface PropertyConfigOptions {
  required: boolean;
  index: number;
  newProperty: JSONEditorSchema;
  oldProperty: JSONEditorSchema;
}

@Component({
  selector: 'ngx-property-config',
  templateUrl: './property-config.component.html',
  styleUrls: ['./property-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyConfigComponent implements OnInit {
  @Input() property: JSONEditorSchema;

  @Input() index?: number;

  @Input() schema: JSONEditorSchema;

  @Input() formats: JsonSchemaDataType[] = [];

  @Input() arrayItem? = false;

  @Input() rootItem? = false;

  @Output() updateSchema = new EventEmitter<PropertyConfigOptions>();

  propTypes: string[] = propTypes;

  editableProperty: JSONEditorSchema;

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
    if (this.editableProperty.type !== type) {
      this.editableProperty.type = type as JSONSchema7TypeName;
      delete this.editableProperty.format;

      this.cleanUpPropertyConstrains();
    }
  }

  updateExamples(examples: string[]): void {
    if (examples && examples.length) {
      this.editableProperty.examples = examples;
    } else {
      delete this.editableProperty.examples;
    }
  }

  updateFormat(format: string): void {
    if (this.editableProperty.format !== format) {
      this.editableProperty.type = 'string';
      this.editableProperty.format = format;
      this.cleanUpPropertyConstrains();
    }
  }

  addEnumValue(): void {
    const enumValues = (this.editableProperty.enum = this.editableProperty.enum || []);

    if (!enumValues.includes(this.newEnumValue)) {
      enumValues.push(this.newEnumValue);
      this.newEnumValue = '';
      delete this.editableProperty.format;
    }
  }

  updateDefault(enumValue: string): void {
    if (!enumValue) {
      delete this.editableProperty.default;
    } else {
      this.editableProperty.default = enumValue;
    }
  }

  removeEnumValue(val: string): void {
    const enumValues = this.editableProperty.enum;
    const index = enumValues.indexOf(val);

    if (index > -1) {
      enumValues.splice(index, 1);
    }

    if (!enumValues.length) {
      // Remove enum property if empty
      delete this.editableProperty.enum;
    }
  }

  private cleanUpPropertyConstrains(): void {
    delete this.editableProperty.enum;
    delete this.editableProperty.properties;
    delete this.editableProperty.required;
    delete this.editableProperty.items;
    delete this.editableProperty.minimum;
    delete this.editableProperty.maximum;
    delete this.editableProperty.default;
    delete this.editableProperty.minLength;
    delete this.editableProperty.maxLength;
    delete this.editableProperty.minItems;
    delete this.editableProperty.maxItems;
  }

  private setRequired(): void {
    this.required = this.schema.required.includes(this.property.propertyName);
  }
}
