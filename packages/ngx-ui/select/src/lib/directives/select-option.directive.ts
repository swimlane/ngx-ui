import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { SelectDropdownOption } from '../models';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';
import { SelectOptionTemplateDirective } from './select-option-template.directive';

@Directive({
  selector: 'ngx-select-option',
  exportAs: 'ngxSelectOption',
})
export class SelectOptionDirective implements SelectDropdownOption {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_hidden: BooleanInput;

  @Input() name = '';
  @Input() value!: unknown;

  @NgxBooleanInput()
  @Input()
  disabled = false;

  @NgxBooleanInput()
  @Input()
  hidden = false;

  @Input('optionTemplate')
  optionTemplateInput?: TemplateRef<unknown>;

  @ContentChild(SelectOptionTemplateDirective, {
    read: TemplateRef,
    static: true,
  })
  optionTemplateQuery!: TemplateRef<unknown>;

  get optionTemplate(): TemplateRef<unknown> {
    return this.optionTemplateInput || this.optionTemplateQuery;
  }

  @Input('inputTemplate')
  inputTemplateInput?: TemplateRef<unknown>;

  @ContentChild(SelectOptionInputTemplateDirective, {
    read: TemplateRef,
    static: true,
  })
  inputTemplateQuery!: TemplateRef<unknown>;

  get inputTemplate(): TemplateRef<unknown> {
    return this.inputTemplateInput || this.inputTemplateQuery;
  }
}
