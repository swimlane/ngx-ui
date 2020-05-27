import * as Ajv from 'ajv';
import { Injectable } from '@angular/core';

@Injectable()
export class SchemaValidatorService {
  ajv: Ajv.Ajv;

  constructor() {
    this.ajv = new Ajv({
      allErrors: true
    });
    this.ajv.addFormat('password', '.*');
    this.ajv.addFormat('code', '.*');

    this.ajv.addKeyword('isNotEmpty', {
      type: 'string',
      validate: function myValidation(_schema: any, data: any) {
        if ((myValidation as any).errors === null) (myValidation as any).errors = [];

        if (typeof data === 'string' && data.trim() === '') {
          (myValidation as any).errors.push({
            keyword: 'isNotEmpty',
            message: 'required',
            params: { keyword: 'isNotEmpty' }
          });
          return false;
        }
        return true;
      },
      errors: true
    });
  }

  /**
   * Validates schemas of a specified type
   */
  validate(schema: any, model: any): any[] {
    const valid = this.ajv.validate(schema, model);

    if (!valid) {
      return this.ajv.errors;
    } else return [];
  }
}
