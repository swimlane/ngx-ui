import { TemplateRef } from '@angular/core';

export interface SelectDropdownOption {
  readonly name: string;
  readonly value: any;
  readonly disabled?: boolean;
  readonly hidden?: boolean;
  readonly inputTemplate?: TemplateRef<any>;
  readonly optionTemplate?: TemplateRef<any>;
}
