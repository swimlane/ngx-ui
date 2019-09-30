import { Directive, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { SelectOptionTemplateDirective } from './select-option-template.directive';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ngx-select-option'
})
export class SelectOptionDirective {
  @Input() name: string = '';
  @Input() value: any;
  @Input() disabled: boolean = false;
  @Input() hidden: boolean = false;

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
}
