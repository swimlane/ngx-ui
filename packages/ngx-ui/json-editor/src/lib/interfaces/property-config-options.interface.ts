import type { JSONEditorSchema } from './json-editor-schema.interface';

export interface PropertyConfigOptions {
  required: boolean;
  index: number;
  newProperty: JSONEditorSchema;
  oldProperty: JSONEditorSchema;
}
