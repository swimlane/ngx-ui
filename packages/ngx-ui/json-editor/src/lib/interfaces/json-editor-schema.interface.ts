import type { JSONSchema7, JSONSchema7TypeName } from 'json-schema';

export interface JSONEditorSchema extends JSONSchema7 {
  $meta?: any;
  properties?: Record<string, JSONEditorSchema>;
  patternProperties?: Record<string, JSONEditorSchema>;
  items?: JSONEditorSchema;
  nameEditable?: boolean;
  propertyName?: string;
  currentType?: JSONSchema7TypeName | JSONSchema7TypeName[];
  id?: number;
}
