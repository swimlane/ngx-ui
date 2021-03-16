import { Injectable } from '@angular/core';
import type { ErrorObject } from 'ajv';
import Ajv from 'ajv';

@Injectable()
export class SchemaValidatorService {
  ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({
      allErrors: true
    });
    this.ajv.addFormat('password', '.*');
    this.ajv.addFormat('code', '.*');
  }

  /**
   * Validates schemas of a specified type
   */
  validate(schema: any, model: any): any[] | ErrorObject[] | null | undefined {
    const valid = this.ajv.validate(schema, model);

    if (!valid) {
      return this.ajv.errors;
    }

    return [];
  }
}
