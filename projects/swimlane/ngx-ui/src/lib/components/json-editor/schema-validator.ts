import * as Ajv from 'ajv';

export class SchemaValidator {
  /**
   * Validates schemas of a specified type
   */
  static validate(schema: any, model: any): any[] {
    const ajv = new Ajv({
      allErrors: true
    });
    const valid = ajv.validate(schema, model);

    if (!valid) {
      return ajv.errors;
    } else return [];
  }
}
