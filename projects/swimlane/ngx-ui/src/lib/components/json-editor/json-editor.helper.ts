import { JSONSchema7 } from 'json-schema';

export const jsonSchemaDataTypes: any[] = [
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
    name: 'Date',
    defaultValue: () => '',
    schema: {
      type: 'string',
      format: 'date'
    },
    icon: 'field-date',
    matchType: (value: any): boolean => {
      return false; // needs to be overriden
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
    matchType: (value: any): boolean => {
      return false; // needs to be overriden
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
    matchType: (value: any): boolean => {
      return false; // needs to be overriden
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
    matchType: (value: any): boolean => {
      return false; // needs to be overriden
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
  }
];

export const dataTypeMap: {} = {};
for (const dType of jsonSchemaDataTypes) {
  let key = dType.schema.type;
  if (dType.schema.format) {
    key = `${key}=${dType.schema.format}`;
  }

  dataTypeMap[key] = dType;
}

export function createValueForSchema(schema: JSONSchema7): any {
  if (schema.default) {
    return schema.default;
  }
  if (schema.type) {
    return dataTypeMap[schema.type as string].defaultValue();
  }
  return null;
}

/**
 * Infers the schema type of the value
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
    type = dataTypeMap['object'].schema;
  }
  return type;
}

/**
 * Returns the icon for the schema
 */
export function getIcon(schema: JSONSchema7): string {
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
export function getCurrentType(schema: JSONSchema7): string {
  if (schema.type !== 'string') {
    return schema.type as string;
  }

  if (schema.format) {
    return `string=${schema.format}`;
  } else {
    return 'string';
  }
}
