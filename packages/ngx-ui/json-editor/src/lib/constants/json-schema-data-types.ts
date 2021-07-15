import type { JsonSchemaDataType } from '../interfaces';

export const jsonSchemaDataTypes: JsonSchemaDataType[] = [
  {
    name: 'String',
    defaultValue: () => '',
    schema: {
      type: 'string',
    },
    icon: 'field-text',
    matchType: (value) => {
      return typeof value === 'string';
    },
  },
  {
    name: 'Number',
    defaultValue: () => 0,
    schema: {
      type: 'number',
    },
    icon: 'field-numeric',
    matchType: (value) => {
      return typeof value === 'number';
    },
  },
  {
    name: 'Integer',
    defaultValue: () => 0,
    schema: {
      type: 'integer',
    },
    icon: 'field-numeric',
    matchType: (value) => {
      return typeof value === 'number';
    },
  },
  {
    name: 'Boolean',
    defaultValue: () => true,
    schema: {
      type: 'boolean',
    },
    icon: 'check-square-filled',
    matchType: (value) => {
      return typeof value === 'boolean';
    },
  },
  {
    name: 'Object',
    defaultValue: () => JSON.parse(JSON.stringify({})),
    schema: {
      type: 'object',
    },
    icon: 'reference-tree',
    matchType: (value) => {
      return typeof value === 'object';
    },
  },
  {
    name: 'Array',
    defaultValue: () => JSON.parse(JSON.stringify([])),
    schema: {
      type: 'array',
    },
    icon: 'integrations',
    matchType: (value) => {
      return Array.isArray(value);
    },
  },
  {
    name: 'Null',
    defaultValue: () => null,
    schema: {
      type: 'null',
    },
    icon: 'disable', // ??
    matchType: (value) => {
      // NOTE: because of the way type inference is implemented, we need
      // to check for 'null' AFTER we check for 'object', since
      // typeof null === 'object'
      return value === null;
    },
  },
];
