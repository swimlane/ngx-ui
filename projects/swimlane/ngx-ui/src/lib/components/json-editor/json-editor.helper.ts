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
      type: 'date'
    },
    icon: 'field-date'
  },
  {
    name: 'Date & Time',
    defaultValue: () => '',
    schema: {
      type: 'dateTime'
    },
    icon: 'field-date'
  },
  {
    name: 'Password',
    defaultValue: () => '',
    schema: {
      type: 'password'
    },
    icon: 'lock'
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
  dataTypeMap[dType.schema.type] = dType;
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
