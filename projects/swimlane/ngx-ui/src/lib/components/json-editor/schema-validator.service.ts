import * as Ajv from 'ajv';
import { Injectable } from '@angular/core';

@Injectable()
export class SchemaValidatorService {
  ajv: Ajv.Ajv;

  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
    });
    this.ajv.addFormat('password', '.*');
    this.ajv.addFormat('code', '.*');
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
