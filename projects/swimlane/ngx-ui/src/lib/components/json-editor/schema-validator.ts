import * as Ajv from 'ajv';

export class SchemaValidator {
  static ajv: Ajv.Ajv;

  /**
   * Get or init Ajv instance
   */
  static getAjv() {
    if (!SchemaValidator.ajv) {
      SchemaValidator.ajv = new Ajv({
        allErrors: true
      });

      SchemaValidator.ajv.addFormat('password', '.*');
      SchemaValidator.ajv.addFormat('code', '.*');
    }

    return SchemaValidator.ajv;
  }

  /**
   * Validates schemas of a specified type
   */
  static validate(schema: any, model: any): any[] {
    const ajv = SchemaValidator.getAjv();

    const valid = ajv.validate(schema, model);

    if (!valid) {
      return ajv.errors;
    } else return [];
  }
}
