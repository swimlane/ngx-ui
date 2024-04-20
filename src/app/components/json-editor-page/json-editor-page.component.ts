import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Format, KeywordDefinition } from 'ajv';
import { JSONSchema7 } from 'json-schema';

@Component({
  selector: 'app-json-editor-page',
  templateUrl: './json-editor-page.component.html',
  styleUrls: ['./json-editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorPageComponent {
  jsonEditorSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Product',
    description: "A product from Acme's catalog",
    type: 'object',
    properties: {
      metaData: {
        type: ['string', 'string=code', 'number', 'object']
      },
      productId: {
        title: 'The unique identifier for a product',
        description: 'The unique identifier for a product',
        type: 'number'
      },
      productName: {
        description: 'Name of the product',
        type: 'string',
        examples: ['Apples', 'Oranges'],
        minLength: 3,
        maxLength: 20
      },
      price: {
        description: 'The price of the product',
        type: 'number',
        exclusiveMinimum: 0
      },
      tags: {
        description: 'Tags for the product',
        type: 'array',
        items: {
          type: 'string'
        },
        minItems: 1,
        uniqueItems: true
      },
      availability: {
        type: 'string',
        enum: ['In Stock', 'Sold Out'],
        default: 'In Stock'
      },
      onSale: {
        description: 'The sale status of the product',
        type: 'boolean'
      },
      dimensions: {
        type: 'object',
        properties: {
          length: {
            type: 'integer'
          },
          width: {
            type: 'number'
          },
          height: {
            type: 'number',
            description: 'Height if dimensions are a volume'
          }
        },
        required: ['length', 'width'],
        additionalProperties: false
      },
      warehouseLocation: {
        description: 'Coordinates of the warehouse where the product is located.',
        title: 'Longitude and Latitude',
        required: ['latitude', 'longitude'],
        type: 'object',
        properties: {
          latitude: {
            type: 'number',
            minimum: -90,
            maximum: 90
          },
          longitude: {
            type: 'number',
            minimum: -180,
            maximum: 180
          }
        }
      },
      userApiKey: {
        title: 'User API key',
        type: 'string',
        format: 'password'
      },
      file: {
        title: 'File Binary',
        type: 'string',
        format: 'binary'
      }
    },
    required: ['productId', 'productName', 'price', 'availability', 'onSale', 'dimensions', 'userApiKey', 'file']
  };
  formats: Map<string, Format> = new Map([
    ['test', 'test'],
    ['test2', 'test2']
  ]);
  keywords: Array<string | KeywordDefinition> = ['test3', 'test4', 'test5'];
  hideRoot = false;
  showKnownProperties = false;
  passwordToggleEnabled = false;
  expanded = true;

  _jsonEditorSchema: any = {};

  jsonEditorModel: any = {
    metaData: "<< console.log('this should be of type code') >>"
  };

  jsonEditorModelFlat: any = {
    metaData: "<< console.log('this should be of type code') >>"
  };

  jsonEditorFlatWithTemplateModel: any = {};
  jsonEditorSchemaBuilderModel: any = {};

  schemaRef: JSONSchema7 = {};
  modelSchemaRef: JSONSchema7 = {};
  schemaWithTemplate: JSONSchema7 = {};

  customFormats = ['password', 'code', 'date', 'date-time', 'custom'];

  typeOverrides: any = {
    'string=code': (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }
      const regex = /^<<(.*)>>$/s;
      return regex.test(value);
    }
  };

  updateJsonEditorSchema(schema: string) {
    this.jsonEditorSchema = JSON.parse(schema);
    this.jsonEditorModel = {};
    this.jsonEditorModelFlat = {};
  }

  schemaUpdate(schema: JSONSchema7): void {
    this.schemaRef = schema;
  }

  modelschemaUpdate(schema: JSONSchema7): void {
    this.modelSchemaRef = schema;
  }
}
