import type { JSONSchema7 } from 'json-schema';
import { jsonSchemaDataFormats, jsonSchemaDataTypes } from '../constants';
import type { JSONEditorSchema, JsonSchemaDataType } from '../interfaces';

export const dataTypeMap: Record<string, JsonSchemaDataType> = {};
for (const dType of [...jsonSchemaDataTypes, ...jsonSchemaDataFormats]) {
  let key = dType.schema.type;
  if (dType.schema.format) {
    key = `${key}=${dType.schema.format}`;
  }

  dataTypeMap[key] = dType;
}

export function createValueForSchema(
  schema: JSONEditorSchema
): JSONSchema7['default'] | unknown {
  if (schema.default) {
    return schema.default;
  }
  if (schema.type) {
    return dataTypeMap[schema.type as string].defaultValue();
  }

  return undefined;
}

/**
 * Infers the schema type of the value
 * @param value the value to infer the schema for
 * @param overrides an object with overridden inference functions for various schema types
 * @param allowedTypes the allowed schema types to consider
 */
export function inferType(
  value: unknown,
  overrides?: Record<string, unknown>,
  allowedTypes?: string[]
): any {
  if (overrides) {
    for (const typeName in overrides) {
      if (allowedTypes !== undefined && !allowedTypes.includes(typeName)) {
        continue;
      }
      // tslint:disable-next-line: tsr-detect-unsafe-properties-access
      if (
        dataTypeMap[typeName] &&
        ((overrides as Record<string, unknown>)[typeName] as any)(value)
      ) {
        return dataTypeMap[typeName].schema;
      }
    }
  }

  let type;
  for (const typeName in dataTypeMap) {
    if (allowedTypes !== undefined && !allowedTypes.includes(typeName)) {
      continue;
    }

    if (dataTypeMap[typeName].matchType(value)) {
      type = dataTypeMap[typeName].schema;
    }
  }

  if (!type) {
    type = dataTypeMap['object'].schema;
  }
  return type;
}

/**
 * Returns the icon for the schema
 */
export function getIcon(schema: JSONEditorSchema): string {
  let key = schema.type as string;
  if (schema.format) {
    key = `${key}=${schema.format}`;
  }
  if (dataTypeMap[key]) {
    return dataTypeMap[key].icon;
  }

  return 'integration';
}

/**
 * Returns a string for the schema.$meta.currentType property in the following format:
 * string, string=code, object, etc.
 * @param schema
 */
export function getCurrentType(schema: JSONEditorSchema): string {
  if (schema.type !== 'string') {
    return schema.type as string;
  }

  if (schema.format) {
    return `string=${schema.format}`;
  }

  return 'string';
}
