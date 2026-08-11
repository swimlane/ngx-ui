import { Validator, type OutputUnit, type Schema } from '@cfworker/json-schema';
import { Injectable } from '@angular/core';

/**
 * Error shape expected by ngx-json-editor node path matching (`dataPath` + `message`).
 * `dataPath` uses the editor's path format (`.prop`, `[0]`, `['odd.key']`).
 */
export interface SchemaValidationError {
  dataPath: string;
  message: string;
  keyword?: string;
  schemaPath?: string;
  instancePath?: string;
}

/**
 * CSP-safe JSON Schema validation (no `eval` / `new Function`).
 * Replaces the former Ajv-based implementation for browser CSP compliance.
 */
@Injectable({
  providedIn: 'root'
})
export class SchemaValidatorService {
  /**
   * Validates `model` against `schema`.
   * @returns validation errors (empty when valid)
   */
  validate(schema: Schema | boolean | any, model: any): SchemaValidationError[] {
    if (schema === undefined || schema === null) {
      return [];
    }

    try {
      // shortCircuit=false → collect all errors (parity with Ajv allErrors: true)
      const validator = new Validator(schema as Schema | boolean, '7', false);
      const result = validator.validate(model);
      if (result.valid) {
        return [];
      }
      return (result.errors || []).map(error => this.toEditorError(error));
    } catch {
      // Invalid / unsupported schema constructs should not crash the editor
      return [
        {
          dataPath: '',
          message: 'Schema validation failed to run'
        }
      ];
    }
  }

  private toEditorError(error: OutputUnit): SchemaValidationError {
    return {
      dataPath: jsonPointerToDataPath(error.instanceLocation),
      message: error.error,
      keyword: error.keyword,
      schemaPath: error.keywordLocation,
      instancePath: error.instanceLocation
    };
  }
}

/**
 * Convert JSON Schema output `instanceLocation` (`#/a/0/b`) to ngx-json-editor `dataPath`
 * (`.a[0].b`), matching historical Ajv draft-04/06 `dataPath` style used by the UI.
 */
export function jsonPointerToDataPath(instanceLocation: string | undefined): string {
  if (!instanceLocation || instanceLocation === '#' || instanceLocation === '#/') {
    return '';
  }

  const pointer = instanceLocation.startsWith('#') ? instanceLocation.slice(1) : instanceLocation;
  if (!pointer || pointer === '/') {
    return '';
  }

  const segments = pointer
    .split('/')
    .slice(1)
    .map(segment => segment.replace(/~1/g, '/').replace(/~0/g, '~'));

  let path = '';
  for (const segment of segments) {
    if (/^(0|[1-9]\d*)$/.test(segment)) {
      path += `[${segment}]`;
    } else if (/^[A-Za-z_$][\w$]*$/.test(segment)) {
      path += `.${segment}`;
    } else {
      path += `['${segment.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}']`;
    }
  }
  return path;
}
