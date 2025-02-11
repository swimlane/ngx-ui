import { Directive, Input, TemplateRef, ContentChild, OnChanges, SimpleChanges } from '@angular/core';

import { SelectOptionTemplateDirective } from './select-option-template.directive';
import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';
import { SelectDropdownOption } from './select-dropdown-option.interface';
import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { TooltipConfig, DEFAULT_TOOLTIP_CONFIG } from '../tooltip/tooltip-config.interface';
@Directive({
  exportAs: 'ngxSelectOption',
  selector: 'ngx-select-option',
  standalone: false
})
export class SelectOptionDirective implements SelectDropdownOption, OnChanges {
  @Input() name = '';
  @Input() value: any;
  @Input() tooltipConfig: TooltipConfig = DEFAULT_TOOLTIP_CONFIG;

  @Input()
  @CoerceBooleanProperty()
  disabled = false;

  @Input()
  @CoerceBooleanProperty()
  hidden = false;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('optionTemplate')
  _optionTemplateInput: TemplateRef<any>;

  @ContentChild(SelectOptionTemplateDirective, { read: TemplateRef, static: true })
  _optionTemplateQuery: TemplateRef<any>;

  get optionTemplate(): TemplateRef<any> {
    return this._optionTemplateInput || this._optionTemplateQuery;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('inputTemplate')
  _inputTemplateInput: TemplateRef<any>;

  @ContentChild(SelectOptionInputTemplateDirective, { read: TemplateRef, static: true })
  _inputTemplateQuery: TemplateRef<any>;

  get inputTemplate(): TemplateRef<any> {
    return this._inputTemplateInput || this._inputTemplateQuery;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tooltipConfig?.currentValue) {
      // Use default values then override with provided custom options
      this.tooltipConfig = { ...DEFAULT_TOOLTIP_CONFIG, ...changes.tooltipConfig.currentValue };
    }
  }
}
