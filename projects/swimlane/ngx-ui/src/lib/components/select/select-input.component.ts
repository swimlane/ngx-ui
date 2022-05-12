import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
import { SelectDropdownOption } from './select-dropdown-option.interface';
import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';

@Component({
  exportAs: 'ngxSelectInput',
  selector: 'ngx-select-input',
  templateUrl: './select-input.component.html',
  host: {
    class: 'ngx-select-input',
    '[class.ngx-select-input--has-controls]': 'hasControls'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectInputComponent implements AfterViewInit, OnChanges {
  @Input() selectId: string;
  @Input() placeholder: string;
  @Input() identifier: string;
  @Input() options: SelectDropdownOption[];
  @Input() label: string;
  @Input() hint: string;
  @Input() selectCaret: string | TemplateRef<any>;
  @Input() requiredIndicator: string | boolean;
  @Input() tabindex = 0;

  @Input()
  @CoerceBooleanProperty()
  autofocus: boolean;

  @Input()
  @CoerceBooleanProperty()
  allowClear: boolean;

  @Input()
  @CoerceBooleanProperty()
  multiple: boolean;

  @Input()
  @CoerceBooleanProperty()
  tagging: boolean;

  @Input()
  @CoerceBooleanProperty()
  allowAdditions: boolean;

  @Input()
  @CoerceBooleanProperty()
  disableDropdown: boolean;

  @Input()
  @CoerceBooleanProperty()
  disabled: boolean;

  @Input()
  get selected() {
    return this._selected;
  }
  set selected(val: any[]) {
    this._selected = val;
    this.selectedOptions = this.calcSelectedOptions(val);
  }

  @Output() toggle = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() selection = new EventEmitter<any[]>();
  @Output() activate = new EventEmitter<void>();
  @Output() activateLast = new EventEmitter<void>();
  @Output() keyup = new EventEmitter<{ event: KeyboardEvent; value?: string }>();

  @ViewChild('inputContainer')
  readonly inputContainer?: ElementRef<HTMLElement>;

  @ViewChild('tagInput')
  readonly inputElement?: ElementRef<HTMLInputElement>;

  get caretVisible(): boolean {
    if (this.disableDropdown) return false;
    return !(this.tagging && (!this.options || !this.options.length));
  }

  get clearVisible() {
    return this.allowClear && !this.multiple && !this.tagging && this.selectedOptions?.length > 0;
  }

  get hasControls(): boolean {
    return this.caretVisible || this.clearVisible;
  }

  get isNotTemplate() {
    return !(typeof this.selectCaret === 'object' && this.selectCaret instanceof TemplateRef);
  }

  selectedOptions: SelectDropdownOption[] = [];

  private _selected: any[];

  ngOnChanges(changes: SimpleChanges) {
    if ('options' in changes && !changes.options.firstChange) {
      this.selectedOptions = this.calcSelectedOptions(this.selected);
    }
  }

  ngAfterViewInit(): void {
    if (this.tagging && this.autofocus) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 5);
    }
  }

  // Events in the input box
  onInputKeyDown(event: KeyboardEvent): void {
    event.stopPropagation();

    switch (event.code) {
      case KeyboardKeys.ENTER:
        event.preventDefault();
        break;
      case KeyboardKeys.ESCAPE: {
        const value = (event.target as any).value;
        if (value === '') {
          const newSelections = this.selected.slice(0, this.selected.length - 1);
          this.selection.emit(newSelections);
        }
        break;
      }
    }
  }

  // Events in the input box
  onInputKeyUp(event: KeyboardEvent): void {
    event.stopPropagation();

    const value = (event.target as any).value;

    switch (event.code) {
      case KeyboardKeys.ENTER:
        event.preventDefault();
        if (value !== '') {
          const hasSelection = this.selected.find(selection => {
            return value === selection;
          });

          if (!hasSelection) {
            const newSelections = [...this.selected, value];
            this.selection.emit(newSelections);
            this.clearInput();
          }
        }
        return;
      case KeyboardKeys.ESCAPE:
        event.preventDefault();
        this.toggle.emit();
        return;
    }

    this.keyup.emit({ event, value });
  }

  clearInput() {
    if (this.inputElement && this.inputElement.nativeElement) {
      this.inputElement.nativeElement.value = '';
    }
    this.keyup.emit({ event: undefined, value: '' });
  }

  // Events on ngx-select-input-box element
  onGlobalKeyUp(event: KeyboardEvent) {
    event.stopPropagation();

    switch (event.code) {
      case KeyboardKeys.SPACE:
      case KeyboardKeys.ARROW_DOWN:
        event.preventDefault();
        this.activate.emit();
        break;
      case KeyboardKeys.ARROW_UP:
        event.preventDefault();
        this.activateLast.emit();
        break;
      case KeyboardKeys.ESCAPE:
        event.preventDefault();
        this.close.emit();
        break;
      // TODO: Printable characters: select any matching options without expanding the options menu
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.code === KeyboardKeys.TAB) return; // don't trap tabs

    if (this.disableDropdown) return;
    event.stopPropagation();

    if (!this.tagging) {
      event.preventDefault();
      this.keyup.emit({ event });
    }
  }

  onClick(): void {
    if (this.disableDropdown) return;
    this.activate.emit();

    if (this.tagging) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 30);
    }
  }

  onFocus() {
    if (!this.disabled && this.tagging) {
      // Open dropdown and focus on input
      this.onClick();
    }
  }

  onToggle(_ev?: PointerEvent): void {
    // Future: this should stopPropagation
    // not happening now to ensure closeOnBodyClick is triggered
    this.toggle.emit();
  }

  onClear(ev?: PointerEvent): void {
    if (!this.disabled) {
      ev?.stopPropagation();
      this.selection.emit([]);
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

  onClearTaggingInput(ev?: PointerEvent): void {
    ev?.stopPropagation();
    if (this.inputElement && this.inputElement.nativeElement) {
      this.inputElement.nativeElement.value = '';
    }
  }

  focus() {
    this.inputContainer.nativeElement.focus();
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
