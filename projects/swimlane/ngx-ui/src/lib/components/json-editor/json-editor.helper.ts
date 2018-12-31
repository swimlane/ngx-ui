export const jsonSchemaDataTypes: any[] = [
  {
    name: 'String',
    defaultValue: () => '',
    schema: {
      type: 'string'
    },
    icon: 'field-text'
  },
  {
    name: 'Number',
    defaultValue: () => 0,
    schema: {
      type: 'number'
    },
    icon: 'field-numeric'
  },
  {
    name: 'Integer',
    defaultValue: () => 0,
    schema: {
      type: 'integer'
    },
    icon: 'field-numeric'
  },
  {
    name: 'Boolean',
    defaultValue: () => true,
    schema: {
      type: 'boolean'
    },
    icon: 'check-square-filled'
  },
  {
    name: 'Date',
    defaultValue: () => '',
    schema: {
      type: 'string',
      format: 'date'
    },
    icon: 'field-date'
  },
  {
    name: 'Date & Time',
    defaultValue: () => '',
    schema: {
      type: 'string',
      format: 'date-time'
    },
    icon: 'field-date'
  },
  {
    name: 'Password',
    defaultValue: () => '',
    schema: {
      type: 'string',
      format: 'password'
    },
    icon: 'lock'
  },
  {
    name: 'Code',
    defaultValue: () => '',
    schema: {
      type: 'string',
      format: 'code'
    },
    icon: 'code'
  },
  {
    name: 'Object',
    defaultValue: () => JSON.parse(JSON.stringify({})),
    schema: {
      type: 'object'
    },
    icon: 'reference-tree'
  },
  {
    name: 'Array',
    defaultValue: () => JSON.parse(JSON.stringify([])),
    schema: {
      type: 'array'
    },
    icon: 'integrations'
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

export function createValueForSchema(schema: any): any {
  if (schema.default) {
    return schema.default;
  }
  if (schema.type) {
    return dataTypeMap[schema.type].defaultValue();
  }
  return null;
}

export function inferType(value: any): string {
  if (typeof value === 'string') {
    return 'string';
  }
  if (typeof value === 'number') {
    return 'number';
  }
  if (typeof value === 'boolean') {
    return 'boolean';
  }
  if (Array.isArray[value]) {
    return 'array';
  }
  if (typeof value === 'object') {
    return 'object';
  }

  return 'object';
}
