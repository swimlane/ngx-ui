import { Component } from '@angular/core';

@Component({
  selector: 'app-json-editor-page',
  templateUrl: './json-editor-page.component.html'
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
        examples: [
          'this is an example',
          'another example'
        ]
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

  _jsonEditorSchema: any = {};

  jsonEditorModel: any = {
    metaData: "<< console.log('this should be of type code') >>"
  };

  typeOverrides: any = {
    'string=code': (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }
      const regex = new RegExp(/^<<(.*)>>$/, 's');
      return regex.test(value);
    }
  };

  updateJsonEditorSchema(schema: string) {
    this.jsonEditorSchema = JSON.parse(schema);
    this.jsonEditorModel = {};
  }
}
