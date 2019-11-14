import * as Ajv from 'ajv';

export class SchemaValidator {
  private ajv: Ajv.Ajv;

  constructor(ajv?: Ajv.Ajv) {
    if (ajv) {
      this.ajv = ajv;
    } else {
      this.ajv = new Ajv({
        allErrors: true
      });
      this.ajv.addFormat('password', '.*');
      this.ajv.addFormat('code', '.*');
    }
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
