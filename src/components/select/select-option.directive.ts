import { Directive, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { SelectOptionTemplateDirective } from './select-option-template.directive';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';

@Directive({
  selector: 'ngx-select-option'
})
export class SelectOptionDirective {

  @Input() name: string = '';
  @Input() value: any;
  @Input() disabled: boolean = false;

  @Input()
  @ContentChild(SelectOptionTemplateDirective, { read: TemplateRef }) 
  optionTemplate: TemplateRef<any>;

  @Input()
  @ContentChild(SelectOptionInputTemplateDirective, { read: TemplateRef }) 
  inputTemplate: TemplateRef<any>;

}
