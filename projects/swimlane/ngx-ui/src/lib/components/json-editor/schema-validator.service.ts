import Ajv, { Format, InstanceOptions, KeywordDefinition } from 'ajv';
import addFormats from 'ajv-formats';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaValidatorService {
  ajv = new Ajv({
    allErrors: true,
    strict: true
  });

  constructor() {
    addFormats(this.ajv);
    this.ajv.addKeyword('$meta');
    this.ajv.addFormat('password', '.*');
    this.ajv.addFormat('code', '.*');
    this.ajv.addFormat('binary', '.*');
  }

  /**
   * Allows for overriding the default set Ajv Options
   * @param opts {InstanceOptions} The Ajv options to override
   */
  setAjvOptions(opts: InstanceOptions): void {
    this.ajv.opts = opts;
  }

  /**
   * Allows for adding Ajv keywords
   * @param keywords {Array<string | KeywordDefinition>} The Ajv keywords to add
   */
  addAjvKeywords(keywords: Array<string | KeywordDefinition>): void {
    if (Array.isArray(keywords)) {
      keywords.forEach((keyword: string | KeywordDefinition) => {
        this.ajv.addKeyword(keyword);
      });
    }
  }

  /**
   * Allows for adding Ajv formats
   * @param formats {Map<string, Format>} The Ajv formats to add
   */
  addAjvFormats(formats: Map<string, Format>): void {
    if (formats) {
      formats.forEach((formatValue: Format, formatName: string) => {
        this.ajv.addFormat(formatName, formatValue);
      });
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
