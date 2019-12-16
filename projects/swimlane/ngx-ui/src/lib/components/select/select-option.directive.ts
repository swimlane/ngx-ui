import { Directive, Input, TemplateRef, ContentChild } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { SelectOptionTemplateDirective } from './select-option-template.directive';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';
import { SelectDropdownOption } from './select-dropdown-option.interface';

@Directive({
  // tslint:disable-next-line:directive-selector
  exportAs: 'ngxSelectOption',
  selector: 'ngx-select-option'
})
export class SelectOptionDirective implements SelectDropdownOption {
  @Input() name: string = '';
  @Input() value: any;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(disabled) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Input()
  get hidden() { return this._hidden; }
  set hidden(hidden) {
    this._hidden = coerceBooleanProperty(hidden);
  }

  @Input('optionTemplate')
  _optionTemplateInput: TemplateRef<any>;

  @ContentChild(SelectOptionTemplateDirective, { read: TemplateRef, static: true })
  _optionTemplateQuery: TemplateRef<any>;

  get optionTemplate(): TemplateRef<any> {
    return this._optionTemplateInput || this._optionTemplateQuery;
  }

  @Input('inputTemplate')
  _inputTemplateInput: TemplateRef<any>;

  @ContentChild(SelectOptionInputTemplateDirective, { read: TemplateRef, static: true })
  _inputTemplateQuery: TemplateRef<any>;

  get inputTemplate(): TemplateRef<any> {
    return this._inputTemplateInput || this._inputTemplateQuery;
  }

  private _disabled: boolean = false;
  private _hidden: boolean = false;
}
