import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { KeyboardKeys } from '../../utils/keys';
import { SelectDropdownOption } from './select-dropdown-option.interface';

@Component({
  exportAs: 'ngxSelectInput',
  selector: 'ngx-select-input',
  templateUrl: './select-input.component.html',
  host: { class: 'ngx-select-input' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectInputComponent implements AfterViewInit {
  @Input() placeholder: string;
  @Input() identifier: string;
  @Input() options: SelectDropdownOption[];
  @Input() label: string;
  @Input() hint: string;
  @Input() selectCaret: string | TemplateRef<any>;
  @Input() requiredIndicator: string | boolean;

  @Input()
  get autofocus() {
    return this._autofocus;
  }
  set autofocus(autofocus) {
    this._autofocus = coerceBooleanProperty(autofocus);
  }

  @Input()
  get allowClear() {
    return this._allowClear;
  }
  set allowClear(allowClear) {
    this._allowClear = coerceBooleanProperty(allowClear);
  }

  @Input()
  get multiple() {
    return this._multiple;
  }
  set multiple(multiple) {
    this._multiple = coerceBooleanProperty(multiple);
  }

  @Input()
  get tagging() {
    return this._tagging;
  }
  set tagging(tagging) {
    this._tagging = coerceBooleanProperty(tagging);
  }

  @Input()
  get allowAdditions() {
    return this._allowAdditions;
  }
  set allowAdditions(allowAdditions) {
    this._allowAdditions = coerceBooleanProperty(allowAdditions);
  }

  @Input()
  get disableDropdown() {
    return this._disableDropdown;
  }
  set disableDropdown(disableDropdown) {
    this._disableDropdown = coerceBooleanProperty(disableDropdown);
  }

  @Input()
  get selected() {
    return this._selected;
  }
  set selected(val: any[]) {
    this._selected = val;
    this.selectedOptions = this.calcSelectedOptions(val);
  }

  @Output() toggle = new EventEmitter<void>();
  @Output() selection = new EventEmitter<any[]>();
  @Output() activate = new EventEmitter<Event>();
  @Output() keyup = new EventEmitter<{ event: KeyboardEvent; value?: string }>();

  @ViewChild('tagInput')
  readonly inputElement?: ElementRef<HTMLInputElement>;

  get caretVisible(): boolean {
    if (this.disableDropdown) return false;
    if (this.tagging && (!this.options || !this.options.length)) return false;
    return true;
  }

  get isNotTemplate() {
    return !(typeof this.selectCaret === 'object' && this.selectCaret instanceof TemplateRef);
  }

  selectedOptions: SelectDropdownOption[] = [];

  private _selected: any[];
  private _autofocus: boolean;
  private _allowClear: boolean;
  private _multiple: boolean;
  private _tagging: boolean;
  private _allowAdditions: boolean;
  private _disableDropdown: boolean;

  ngAfterViewInit(): void {
    if (this.tagging && this.autofocus) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 5);
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    event.stopPropagation();

    const key = event.key;
    const value = (event.target as any).value;

    if (key === (KeyboardKeys.ENTER as any)) {
      if (value !== '') {
        const hasSelection = this.selected.find(selection => {
          return value === selection;
        });

        if (!hasSelection) {
          const newSelections = [...this.selected, value];
          this.selection.emit(newSelections);
          (event.target as any).value = '';
        }
      }

      event.preventDefault();
    } else if (key === (KeyboardKeys.ESCAPE as any)) {
      this.toggle.emit();
    }

    this.keyup.emit({ event, value });
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disableDropdown) return;
    event.stopPropagation();

    if (!this.tagging) {
      this.keyup.emit({ event });
    }
  }

  onClick(event: Event): void {
    if (this.disableDropdown) return;
    this.activate.emit(event);

    if (this.tagging) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 5);
    }
  }

  onOptionRemove(event: Event, option: SelectDropdownOption): void {
    event.stopPropagation();

    const newSelections = this.selected.filter(selection => {
      if (this.identifier !== undefined) {
        return option.value[this.identifier] !== selection[this.identifier];
      }

      return option.value !== selection;
    });

    this.selection.emit(newSelections);
  }

  private calcSelectedOptions(selected: any[]) {
    const results: SelectDropdownOption[] = [];

    // result out if nothing here
    if (!selected) return results;

    for (const selection of selected) {
      let match: SelectDropdownOption;

      if (this.options) {
        match = this.options.find(option => {
          if (this.identifier) {
            return selection[this.identifier] === option.value[this.identifier];
          }

          return selection === option.value;
        });
      }

      if ((this.tagging || this.allowAdditions) && !match) {
        match = { value: selection, name: selection };
      }

      if (match) results.push(match);
    }

    return results;
  }
}
