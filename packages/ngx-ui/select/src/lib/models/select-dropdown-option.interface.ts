import type { TemplateRef } from '@angular/core';

export interface SelectDropdownOption {
  readonly name: string;
  readonly value: unknown;
  readonly disabled?: boolean;
  readonly hidden?: boolean;
  readonly inputTemplate?: TemplateRef<unknown>;
  readonly optionTemplate?: TemplateRef<unknown>;
}
