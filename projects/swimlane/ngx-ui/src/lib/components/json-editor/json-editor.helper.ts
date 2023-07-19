import type { JSONSchema7, JSONSchema7Type, JSONSchema7TypeName } from 'json-schema';

export const requiredIndicatorIcon = `
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.38411 10L2.19205 9.10616L3.89073 6.2089L1 4.97603L1.44702 3.55822L4.48676 4.32877L4.75497 1H6.21523L6.48344 4.29795L9.55298 3.55822L10 4.97603L7.10927 6.2089L8.77815 9.10616L7.61589 10L5.5 7.34931L3.38411 10Z" fill="#72819F" stroke="#72819F" stroke-width="0.5"/>
  </svg>`;

export interface JSONEditorTemplateProperty {
  key?: string;
  keyFieldType?: JSONSchema7TypeName;
  keyFieldFormat?: string;
  enum?: JSONSchema7Type[] | undefined;
  isRequired?: boolean;
  value?: any | undefined;
}

export interface JSONEditorSchema extends JSONSchema7 {
  $meta?: any;
  properties?: {
    [key: string]: JSONEditorSchema;
  };
  patternProperties?: {
    [key: string]: JSONEditorSchema;
  };
  items?: JSONEditorSchema;
  nameEditable?: boolean;
  propertyName?: string;
  currentType?: JSONSchema7TypeName | JSONSchema7TypeName[];
  id?: number;
}

export interface PropertyIndex extends JSONEditorSchema {
  [id: number]: JSONEditorSchema;
}

export interface JsonSchemaDataType {
  name: string;
  defaultValue: () => any;
  schema: {
    type: string;
    format?: string;
  };
  icon: string;
  matchType: (value: string) => boolean;
}

export const propTypes: string[] = ['null', 'string', 'number', 'integer', 'boolean', 'object', 'array'];

export const jsonSchemaDataTypes: JsonSchemaDataType[] = [
  {
    name: 'String',
    defaultValue: () => '',
    schema: {
      type: 'string'
    },
    icon: 'field-text',
    matchType: (value: any): boolean => {
      return typeof value === 'string';
    }
  },
  {
    name: 'Number',
    defaultValue: () => 0,
    schema: {
      type: 'number'
    },
    icon: 'field-numeric',
    matchType: (value: any): boolean => {
      return typeof value === 'number';
    }
  },
  {
    name: 'Integer',
    defaultValue: () => 0,
    schema: {
      type: 'integer'
    },
    icon: 'field-numeric',
    matchType: (value: any): boolean => {
      return typeof value === 'number';
    }
  },
  {
    name: 'Boolean',
    defaultValue: () => true,
    schema: {
      type: 'boolean'
    },
    icon: 'check-square-filled',
    matchType: (value: any): boolean => {
      return typeof value === 'boolean';
    }
  },
  {
    name: 'Object',
    defaultValue: () => JSON.parse(JSON.stringify({})),
    schema: {
      type: 'object'
    },
    icon: 'reference-tree',
    matchType: (value: any): boolean => {
      return typeof value === 'object';
    }
  },
  {
    name: 'Array',
    defaultValue: () => JSON.parse(JSON.stringify([])),
    schema: {
      type: 'array'
    },
    icon: 'integrations',
    matchType: (value: any): boolean => {
      return Array.isArray(value);
    }
  },
  {
    name: 'Null',
    defaultValue: () => null,
    schema: {
      type: 'null'
    },
    icon: 'disable', // ??
    matchType: (value: any): boolean => {
      // NOTE: because of the way type inference is implemented, we need
      // to check for 'null' AFTER we check for 'object', since
      // typeof null === 'object'
      return value === null;
    }
  }
];

export const jsonSchemaDataFormats: JsonSchemaDataType[] = [
  {
    name: 'Date',
    defaultValue: () => '',
    schema: {
      type: 'string',
      format: 'date'
    },
    icon: 'field-date',
    matchType: (): boolean => {
      return false; // needs to be overridden
    }
  },
  {
    name: 'Date & Time',
    defaultValue: () => '',
    schema: {
      type: 'string',
      format: 'date-time'
    },
    icon: 'field-date',
    matchType: (): boolean => {
      return false; // needs to be overridden
    }
  },
  {
    name: 'Password',
    defaultValue: () => '',
    schema: {
      type: 'string',
      format: 'password'
    },
    icon: 'lock',
    matchType: (): boolean => {
      return false; // needs to be overridden
    }
  },
  {
    name: 'Code',
    defaultValue: () => '',
    schema: {
      type: 'string',
      format: 'code'
    },
    icon: 'code',
    matchType: (): boolean => {
      return false; // needs to be overridden
    }
  }
];

export const dataTypeMap: Record<string, any> = {};

for (const dType of [...jsonSchemaDataTypes, ...jsonSchemaDataFormats]) {
  let key = dType.schema.type;
  if (dType.schema.format) {
    key = `${key}=${dType.schema.format}`;
  }

  dataTypeMap[key] = dType;
}

export function createValueForSchema(schema: JSONEditorSchema): any {
  if (schema.default) {
    return schema.default;
  }
  if (schema.type) {
    return dataTypeMap[schema.type as string].defaultValue();
  }
}

/**
 * Infers the schema type of the value
 *
 * @param value the value to infer the schema for
 * @param overrides an object with overridden inference functions for various schema types
 * @param allowedTypes the allowed schema types to consider
 */
export function inferType(value: any, overrides?: any, allowedTypes?: string[]): any {
  if (overrides) {
    for (const typeName in overrides) {
      if (allowedTypes !== undefined && !allowedTypes.includes(typeName)) {
        continue;
      }
      // eslint-disable-next-line
      if (dataTypeMap[typeName] && overrides[typeName](value)) {
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
    type = dataTypeMap.object.schema;
  }
  return { ...type };
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
 *
 * @param schema
 */
export function getCurrentType(schema: JSONEditorSchema): string {
  if (schema.type !== 'string') {
    return schema.type as string;
  }

  if (schema.format) {
    return `string=${schema.format}`;
  } else {
    return 'string';
  }
}
