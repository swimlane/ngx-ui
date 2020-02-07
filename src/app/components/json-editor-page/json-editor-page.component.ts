import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JSONSchema7 } from 'json-schema';

@Component({
  selector: 'app-json-editor-page',
  templateUrl: './json-editor-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorPageComponent {
  jsonEditorSchema = {
    title: 'Product',
    description: "A product from Acme's catalog",
    type: 'object'
  };

  compressed = false;

  _jsonEditorSchema: any = {};

  jsonEditorModel: any = {
    metaData: "<< console.log('this should be of type code') >>"
  };

  jsonEditorModelFlat: any = {
    metaData: "<< console.log('this should be of type code') >>"
  };

  jsonEditorSchemaBuilderModel: any = {};

  schemaRef: JSONSchema7 = {};

  customFormats = ['password', 'code', 'date', 'date-time', 'custom'];

  typeOverrides: any = {
    'string=code': (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }
      const regex = new RegExp(/^<<(.*)>>$/, 's');
      return regex.test(value);
    }
  };

  toggleCompressed(): void {
    this.compressed = !this.compressed;
  }

  updateJsonEditorSchema(schema: string) {
    this.jsonEditorSchema = JSON.parse(schema);
    this.jsonEditorModel = {};
  }

  schemaChange(schema: JSONSchema7): void {
    this.schemaRef = schema;
  }
}
