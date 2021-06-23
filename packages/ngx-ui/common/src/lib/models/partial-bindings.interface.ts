export interface PartialBindings extends Record<string, unknown> {
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
}

export type PartialBindingsNoInput = Omit<PartialBindings, 'inputs'>;
