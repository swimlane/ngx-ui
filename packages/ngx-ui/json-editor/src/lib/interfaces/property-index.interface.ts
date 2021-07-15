import type { JSONEditorSchema } from './json-editor-schema.interface';

export interface PropertyIndex extends JSONEditorSchema {
  [id: number]: JSONEditorSchema;
}
