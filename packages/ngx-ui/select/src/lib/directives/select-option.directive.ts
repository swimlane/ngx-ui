import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { SelectDropdownOption } from '../models';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';
import { SelectOptionTemplateDirective } from './select-option-template.directive';

@Directive({
  selector: 'ngx-select-option',
  exportAs: 'ngxSelectOption'
})
export class SelectOptionDirective implements SelectDropdownOption {
  @Input() name = '';
  @Input() value!: unknown;

  @InputBoolean()
  @Input()
  disabled = false;

  @InputBoolean()
  @Input()
  hidden = false;

  @Input('optionTemplate')
  optionTemplateInput?: TemplateRef<unknown>;

  @ContentChild(SelectOptionTemplateDirective, {
    read: TemplateRef,
    static: true
  })
  optionTemplateQuery!: TemplateRef<unknown>;

  get optionTemplate(): TemplateRef<unknown> {
    return this.optionTemplateInput || this.optionTemplateQuery;
  }

  @Input('inputTemplate')
  inputTemplateInput?: TemplateRef<unknown>;

  @ContentChild(SelectOptionInputTemplateDirective, {
    read: TemplateRef,
    static: true
  })
  inputTemplateQuery!: TemplateRef<unknown>;

  get inputTemplate(): TemplateRef<unknown> {
    return this.inputTemplateInput || this.inputTemplateQuery;
  }

  constructor() {}
}
