import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JSONSchema7 } from 'json-schema';

@Component({
  selector: 'app-json-editor-page',
  templateUrl: './json-editor-page.component.html',
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
        description: 'The unique identifier for a product',
        type: 'number'
      },
      productName: {
        description: 'Name of the product',
        type: 'string',
        examples: ['Apples', 'Oranges']
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
            type: 'number'
          }
        },
        required: ['length', 'width', 'height']
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
      }
    },
    required: ['productId', 'productName', 'price', 'availability', 'onSale', 'dimensions']
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
  modelSchemaRef: JSONSchema7 = {};

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

  toggleCompressed(): void {
    this.compressed = !this.compressed;
  }

  updateJsonEditorSchema(schema: string) {
    this.jsonEditorSchema = JSON.parse(schema);
    this.jsonEditorModel = {};
    this.jsonEditorModelFlat = {};
  }

  schemaChange(schema: JSONSchema7): void {
    this.schemaRef = schema;
  }

  modelSchemaChange(schema: JSONSchema7): void {
    this.modelSchemaRef = schema;
  }
}
