import type { JsonSchemaDataType } from '../interfaces';

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
    matchType: (): boolean => {
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
    matchType: (): boolean => {
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
    matchType: (): boolean => {
      return false; // needs to be overriden
    }
  }
];
