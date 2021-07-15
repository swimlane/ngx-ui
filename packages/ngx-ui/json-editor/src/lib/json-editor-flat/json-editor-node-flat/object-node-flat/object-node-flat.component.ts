import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DialogService } from '@swimlane/ngx-ui/dialog';
import { jsonSchemaDataTypes } from '../../../constants';
import { ObjectNode } from '../../../directives';
import type {
  JSONEditorSchema,
  JsonSchemaDataType,
  PropertyConfigOptions,
} from '../../../interfaces';
import { createValueForSchema } from '../../../utils';
import { PropertyConfigComponent } from '../property-config/property-config.component';

@Component({
  selector: 'ngx-json-object-node-flat',
  templateUrl: './object-node-flat.component.html',
  styleUrls: ['./object-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectNodeFlatComponent
  extends ObjectNode
  implements OnInit, OnChanges
{
  @ViewChild('propertyConfigTmpl', { static: false })
  propertyConfigTmpl?: TemplateRef<PropertyConfigComponent>;

  @Input() level?: number;

  @Input() schemaBuilderMode?: boolean;

  @Input() formats: JsonSchemaDataType[] = [];

  @Input() compressed?: boolean;

  @Input() hideRoot = false;

  @Input() isDuplicated = false;

  indentationArray: number[] = [];

  duplicatedFields = new Map<string, string>();

  constructor(private dialogService: DialogService, cdr: ChangeDetectorRef) {
    super(cdr);
  }

  ngOnInit() {
    if (this.schemaBuilderMode) {
      this.dataTypes = [...jsonSchemaDataTypes, ...this.formats];
    }

    setTimeout(() => {
      this.initSchemaProperties(this.schema);
      if (this.schemaRef) {
        this.initSchemaProperties(this.schemaRef);
      }
    });

    this.indentationArray = this.level
      ? Array(this.level).fill(this.level)
      : [];
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if ('level' in changes) {
      this.indentationArray = this.level
        ? Array(this.level).fill(this.level)
        : [];
    }
  }

  onUpdatePropertyName(options: { id: string; name: string }): void {
    const existingSchemaProperty = this.schemaRef?.properties?.[options.name];
    const existingPropertyValue = this.model[options.name];
    const oldName =
      this.propertyIndex[options.id as unknown as number].propertyName;

    this.duplicatedFields.delete(options.id);

    if (!existingSchemaProperty && existingPropertyValue === undefined) {
      const index = Object.keys(this.schemaRef?.properties || {}).findIndex(
        (prop) => prop === oldName
      );
      if (this.schemaRef) {
        this.updateSchemaPropertyName(
          this.schemaRef,
          options.name,
          this.propertyIndex[options.id as unknown as number].propertyName || ''
        );
      }
      this.swapSchemaProperties(index);
      this.updatePropertyName(options.id, options.name);
      this.schemaUpdate.emit();
    } else if (oldName !== options.name) {
      this.duplicatedFields.set(options.id, options.name);
    }
  }

  onPropertyConfig(property: JSONEditorSchema, index: number): void {
    this.dialogService.create({
      template: this.propertyConfigTmpl,
      context: {
        property,
        index,
        schema: this.schema,
        formats: this.formats,
      },
      class: 'property-config-dialog',
    });
  }

  updateSchema(options: PropertyConfigOptions): void {
    const oldProperty = options.oldProperty;
    const newProperty = options.newProperty;

    const oldName = oldProperty.propertyName || '';
    const newName = newProperty.propertyName || '';

    if (newName !== oldName) {
      if (this.schema.properties && oldName in this.schema.properties) {
        if (newName) {
          this.updateSchemaPropertyName(this.schema, newName, oldName);
        }
      }

      if (this.schemaRef) {
        this.updateSchemaPropertyName(this.schemaRef, newName, oldName);
      }

      if (options.newProperty.id) {
        this.updatePropertyName(options.newProperty.id, newName);
      }
    }

    this.toggleRequiredValue(options.required, newName);

    if (this.schema.properties) {
      this.schema.properties[newName] = newProperty;
    }

    if (options.newProperty.id) {
      this.propertyIndex[options.newProperty.id] = newProperty;
    }

    this.updateSchemaRefProperty(newProperty);

    if (newName !== oldName) {
      this.swapSchemaProperties(options.index);
    }

    if (oldProperty.type !== newProperty.type) {
      if (newProperty.propertyName) {
        this.model[newProperty.propertyName] =
          createValueForSchema(newProperty);
      }
    }

    this.propertyIndex = { ...this.propertyIndex };
    this.schemaUpdate.emit();
  }

  addProperty(dataType: JsonSchemaDataType): void {
    super.addProperty(dataType);

    this.updateSchemaRefProperty(this.propertyIndex[this.propertyId - 1]);
    this.schemaUpdate.emit();
  }

  deleteProperty(propName: string): void {
    if (this.schemaBuilderMode) {
      if (this.schema.properties) {
        delete this.schema.properties[propName];
      }
      if (this.schemaRef?.properties) {
        delete this.schemaRef.properties[propName];
      }

      this.toggleRequiredValue(false, propName);
    } else if (
      this.schema.required &&
      !this.schema.required.includes(propName) &&
      this.schema.properties &&
      !(propName in this.schema.properties)
    ) {
      if (this.schemaRef?.properties) {
        delete this.schemaRef.properties[propName];
      }
    }

    this.schemaUpdate.emit();
    super.deleteProperty(propName);
  }

  drop(event: CdkDragDrop<string[]>): void {
    const propertyIndexValues = Object.values(this.propertyIndex);

    moveItemInArray(
      propertyIndexValues,
      event.previousIndex,
      event.currentIndex
    );

    let index = 0;
    for (const prop in this.propertyIndex) {
      this.propertyIndex[prop] = propertyIndexValues[index];
      this.propertyIndex[prop].id = parseInt(prop, 10);
      index += 1;
    }

    this.propertyIndex = { ...this.propertyIndex };

    this.swapSchemaProperties(event.currentIndex, event.previousIndex);
  }

  private swapSchemaProperties(
    currentIndex: number,
    previousIndex?: number
  ): void {
    const propertiesIds = Object.keys(this.schemaRef?.properties || {});

    if (previousIndex === undefined) {
      previousIndex = propertiesIds.length - 1;
    }

    moveItemInArray(propertiesIds, previousIndex, currentIndex);

    if (this.schemaRef) {
      this.schemaRef.properties = propertiesIds.reduce((result: any, prop) => {
        if (this.schemaRef?.properties) {
          result[prop] = this.schemaRef.properties[prop];
        }

        return result;
      }, {});
    }

    this.schemaUpdate.emit();
  }

  private initSchemaProperties(schema: JSONEditorSchema): void {
    if (schema) {
      schema.required = schema.required || [];
      schema.properties = schema.properties || {};
    }
  }

  private updateSchemaRefProperty(prop: any): void {
    if (this.schemaRef?.properties) {
      this.schemaRef.properties[prop.propertyName] = {
        type: prop.type,
        ...(prop['format'] && { format: prop['format'] }),
        ...(prop['examples'] && { examples: prop['examples'] }),
        ...(prop['title'] && { title: prop['title'] }),
        ...(prop['items'] && { items: prop['items'] }),
        ...(prop['required'] && { required: prop['required'] }),
        ...(prop['properties'] && { properties: prop['properties'] }),
        ...(prop['enum'] && { enum: prop['enum'] }),
        ...(prop['default'] && { default: prop['default'] }),
        ...(prop['description'] && { description: prop['description'] }),
        ...(prop['nameEditable'] && { nameEditable: prop['nameEditable'] }),
        ...(prop['minimum'] && { minimum: prop['minimum'] }),
        ...(prop['maximum'] && { maximum: prop['maximum'] }),
        ...(prop['minLength'] && { minLength: prop['minLength'] }),
        ...(prop['maxLength'] && { maxLength: prop['maxLength'] }),
        ...(prop['minItems'] && { minItems: prop['minItems'] }),
        ...(prop['maxItems'] && { maxItems: prop['maxItems'] }),
        ...(prop['pattern'] && { pattern: prop['pattern'] }),
      };
    }
  }

  private updateSchemaPropertyName(
    schema: JSONEditorSchema,
    newName: string,
    oldName: string
  ): void {
    this.updateRequiredProperties(schema, newName, oldName);
    if (schema.properties) {
      schema.properties[newName] = schema.properties[oldName];
      delete schema.properties[oldName];
    }
  }

  private toggleRequiredValue(required: boolean, propertyName: string): void {
    const requiredIndex = this.schema.required?.indexOf(propertyName) || -1;
    if (requiredIndex >= 0 && !required) {
      this.schema.required?.splice(requiredIndex, 1);
    } else if (requiredIndex < 0 && required) {
      this.schema.required?.push(propertyName);
    }

    if (this.schemaRef) {
      this.schemaRef.required = [...(this.schema.required || [])];
    }

    this.updateRequiredCache();
  }

  private updateRequiredProperties(
    schema: JSONEditorSchema,
    newName: string,
    oldName: string
  ): void {
    const requiredIndex = schema.required?.indexOf(oldName) || -1;
    if (requiredIndex >= 0) {
      if (schema.required) {
        schema.required[requiredIndex] = newName;
      }
    }
  }
}
