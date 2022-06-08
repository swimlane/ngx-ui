import {
  Component,
  ViewEncapsulation,
  Input,
  ViewChild,
  TemplateRef,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { ObjectNode } from '../../../../node-types/object-node.component';
import { DialogService } from '../../../../../dialog/dialog.service';
import {
  JsonSchemaDataType,
  jsonSchemaDataTypes,
  JSONEditorSchema,
  createValueForSchema
} from '../../../../json-editor.helper';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PropertyConfigOptions, PropertyConfigComponent } from '../property-config/property-config.component';

@Component({
  selector: 'ngx-json-object-node-flat',
  templateUrl: './object-node-flat.component.html',
  styleUrls: ['./object-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectNodeFlatComponent extends ObjectNode implements OnInit, OnChanges {
  @ViewChild('propertyConfigTmpl', { static: false }) propertyConfigTmpl: TemplateRef<PropertyConfigComponent>;

  @Input() level: number;

  @Input() schemaBuilderMode: boolean;

  @Input() formats: JsonSchemaDataType[] = [];

  @Input() hideRoot = false;

  @Input() isDuplicated = false;

  @Input() passwordToggleEnabled = false;

  indentationArray: number[] = [];

  duplicatedFields = new Map<string, string>();

  objectKeys = Object.keys;

  get isRoot() {
    return (this.hideRoot && this.level === -1) || (!this.hideRoot && this.level === 0);
  }

  constructor(private dialogService: DialogService, protected cdr: ChangeDetectorRef) {
    super(cdr);
  }

  ngOnInit() {
    if (this.schemaBuilderMode) {
      this.dataTypes = [...jsonSchemaDataTypes, ...this.formats];
    }

    setTimeout(() => {
      this.initSchemaProperties(this.schema);
      this.initSchemaProperties(this.schemaRef);
    });

    this.indentationArray = this.level > 0 ? Array(this.level).fill(this.level) : [];
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if ('level' in changes) {
      this.indentationArray = this.level > 0 ? Array(this.level).fill(this.level) : [];
    }
  }

  onUpdatePropertyName(options: { id: string; name: string }): void {
    const existingSchemaProperty = this.schemaRef.properties[options.name];
    const existingPropertyValue = this.model[options.name];
    const oldName = this.propertyIndex[options.id].propertyName;

    this.duplicatedFields.delete(options.id);

    if (!existingSchemaProperty && existingPropertyValue === undefined) {
      const index = Object.keys(this.schemaRef.properties).findIndex(prop => prop === oldName);
      this.updateSchemaPropertyName(this.schemaRef, options.name, this.propertyIndex[options.id].propertyName);
      this.swapSchemaProperties(index);
      this.updatePropertyName(options.id, options.name);
      this.schemaUpdate.emit();
    } else if (oldName !== options.name) {
      this.duplicatedFields.set(options.id, options.name);
    }
  }

  onPropertyConfig(property: JSONEditorSchema, index: number, isNew = false): void {
    const dialog = this.dialogService.create({
      template: this.propertyConfigTmpl,
      context: {
        property,
        index,
        schema: this.schema,
        formats: this.formats,
        isNew,
        apply: (options: PropertyConfigOptions) => {
          dialog.destroy();
          this.updateSchemaProperty(options);
        }
      },
      class: 'property-config-dialog'
    });
  }

  updateSchemaProperty(options: PropertyConfigOptions): void {
    const oldProperty = options.oldProperty;
    const newProperty = options.newProperty;

    const oldName = oldProperty.propertyName;
    const newName = newProperty.propertyName;

    if (newName !== oldName) {
      if (oldName in this.schema.properties) {
        this.updateSchemaPropertyName(this.schema, newName, oldName);
      }

      this.updateSchemaPropertyName(this.schemaRef, newName, oldName);
      this.updatePropertyName(options.newProperty.id, newName);
    }

    this.toggleRequiredValue(options.required, newName);

    this.schema.properties[newName] = newProperty;
    this.propertyIndex[options.newProperty.id] = newProperty;
    this.updateSchemaRefProperty(newProperty);

    if (newName !== oldName) {
      this.swapSchemaProperties(options.index);
    }

    if (oldProperty.type !== newProperty.type) {
      const value: any = createValueForSchema(newProperty);
      this.model[newProperty.propertyName] = value;
    }

    this.propertyIndex = { ...this.propertyIndex };
    this.schemaUpdate.emit();
  }

  addProperty(dataType: JsonSchemaDataType): void {
    super.addProperty(dataType);

    const index = this.propertyId - 1;
    const property = this.propertyIndex[index];
    this.updateSchemaRefProperty(property);
    this.schemaUpdate.emit();

    if (this.schemaBuilderMode) {
      this.onPropertyConfig(property, index, true);
    }
  }

  deleteProperty(propName: string): void {
    if (this.schemaBuilderMode) {
      delete this.schema.properties[propName];
      delete this.schemaRef.properties[propName];
      this.toggleRequiredValue(false, propName);
    } else if (!this.schema.required?.includes(propName) && !(propName in this.schema.properties)) {
      delete this.schemaRef.properties[propName];
    }

    this.schemaUpdate.emit();
    super.deleteProperty(propName);
  }

  drop(event: CdkDragDrop<string[]>): void {
    const propertyIndexValues = Object.values(this.propertyIndex);

    moveItemInArray(propertyIndexValues, event.previousIndex, event.currentIndex);

    let index = 0;
    for (const prop in this.propertyIndex) {
      this.propertyIndex[prop] = propertyIndexValues[index];
      this.propertyIndex[prop].id = parseInt(prop, 10);
      index += 1;
    }

    this.propertyIndex = { ...this.propertyIndex };

    this.swapSchemaProperties(event.currentIndex, event.previousIndex);
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

    this.schemaUpdate.emit();
  }

  private initSchemaProperties(schema: JSONEditorSchema): void {
    if (schema) {
      schema.required = schema.required || [];
      schema.properties = schema.properties || {};
    }
  }

  private updateSchemaRefProperty(prop: any): void {
    this.schemaRef.properties[prop.propertyName] = {
      type: prop.type,
      ...(prop.format && { format: prop.format }),
      ...(prop.examples && { examples: prop.examples }),
      ...(prop.title && { title: prop.title }),
      ...(prop.items && { items: prop.items }),
      ...(prop.required && { required: prop.required }),
      ...(prop.properties && { properties: prop.properties }),
      ...(prop.enum && { enum: prop.enum }),
      ...(prop.default && { default: prop.default }),
      ...(prop.description && { description: prop.description }),
      ...(prop.nameEditable && { nameEditable: prop.nameEditable }),
      ...(prop.minimum && { minimum: prop.minimum }),
      ...(prop.maximum && { maximum: prop.maximum }),
      ...(prop.minLength && { minLength: prop.minLength }),
      ...(prop.maxLength && { maxLength: prop.maxLength }),
      ...(prop.minItems && { minItems: prop.minItems }),
      ...(prop.maxItems && { maxItems: prop.maxItems }),
      ...(prop.pattern && { pattern: prop.pattern })
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
