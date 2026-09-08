import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { SelectTaggingValidator } from './select-tagging.interface';
import { freeTagPlainLabel, splitFreeTagBatch } from './select-tagging.util';

const CHIP_TOOLTIP_MIN_LENGTH = 32;

/** Derived chip presentation — never mutates consumer option objects. */
interface SelectedChipView {
  readonly option: SelectDropdownOption;
  readonly trackBy: unknown;
  /** Plain text label for free-tagging display and chip edit. */
  readonly labelText: string;
  readonly tooltipTitle: string;
  readonly invalid: boolean;
}

@Component({
  exportAs: 'ngxSelectInput',
  selector: 'ngx-select-input',
  templateUrl: './select-input.component.html',
  host: {
    class: 'ngx-select-input',
    '[class.ngx-select-input--has-controls]': 'hasControls'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class SelectInputComponent implements AfterViewInit, OnChanges {
  @Input() selectId: string;
  @Input() placeholder: string;
  @Input() placeholderTemplate: TemplateRef<any>;
  @Input() identifier: string;
  @Input() options: SelectDropdownOption[];
  @Input() label: string;
  @Input() hint: string;
  @Input() selectCaret: string | TemplateRef<any>;
  @Input() requiredIndicator: string | boolean;
  @Input() tabindex = 0;
  @Input() withHint = true;
  @Input() maxSelections?: number;
  @Input() taggingValidator?: SelectTaggingValidator;

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
    this.rebuildSelectedChips(val);
    if (this.selectedChipIndex != null && this.selectedChipIndex >= (val?.length || 0)) {
      this.setSelectedChipIndex(val?.length ? val.length - 1 : null);
    }
  }

  @Output() toggle = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() selection = new EventEmitter<any[]>();
  @Output() activate = new EventEmitter<void>();
  @Output() activateLast = new EventEmitter<void>();
  @Output() keyup = new EventEmitter<{ event: KeyboardEvent; value?: string }>();
  @Output() taggingError = new EventEmitter<string>();

  @ViewChild('inputContainer')
  readonly inputContainer?: ElementRef<HTMLElement>;

  @ViewChild('tagInput')
  readonly inputElement?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  /** Derived chip view models (tooltip / invalid / plain label). */
  selectedChips: SelectedChipView[] = [];
  /** Option list mirrored from selectedChips for existing callers/tests. */
  selectedOptions: SelectDropdownOption[] = [];
  selectedChipIndex: number | null = null;

  private _selected: any[];
  private _lastTaggingError = '';
  private suppressEscapeToggle = false;

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  /** Enhanced chip UX only when tagging has no usable options dropdown. */
  get isFreeTagging(): boolean {
    return !!this.tagging && (this.disableDropdown || !this.options?.length);
  }

  get caretVisible(): boolean {
    if (this.disableDropdown) return false;
    return !(this.tagging && (!this.options || !this.options.length));
  }

  get clearVisible() {
    return this.allowClear && !this.multiple && !this.tagging && this.selectedChips?.length > 0;
  }

  get hasControls(): boolean {
    return this.caretVisible || this.clearVisible;
  }

  get isNotTemplate() {
    return !(typeof this.selectCaret === 'object' && this.selectCaret instanceof TemplateRef);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      'options' in changes ||
      'taggingValidator' in changes ||
      'tagging' in changes ||
      'disableDropdown' in changes ||
      'identifier' in changes ||
      'allowAdditions' in changes
    ) {
      this.rebuildSelectedChips(this.selected);
    }
  }

  ngAfterViewInit(): void {
    if (this.tagging && this.autofocus) {
      setTimeout(() => this.inputElement?.nativeElement.focus(), 5);
    }
    if (this.isFreeTagging) this.syncInputHeight();
  }

  onInputKeyDown(event: KeyboardEvent): void {
    event.stopPropagation();
    if (!this.tagging) return;

    if (this.isFreeTagging) {
      this.onFreeTaggingKeyDown(event);
      return;
    }

    // Classic tagging-with-options: preserve prior Enter/Escape behavior only.
    switch (event.code) {
      case KeyboardKeys.ENTER:
        event.preventDefault();
        break;
      case KeyboardKeys.ESCAPE: {
        const value = (event.target as HTMLInputElement).value;
        if (value === '') {
          const newSelections = this.selected.slice(0, this.selected.length - 1);
          this.selection.emit(newSelections);
        }
        break;
      }
    }
  }

  onInputKeyUp(event: KeyboardEvent): void {
    event.stopPropagation();
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;

    if (this.isFreeTagging) {
      this.onFreeTaggingKeyUp(event, value);
      return;
    }

    // Classic tagging-with-options keyup (unchanged contract).
    switch (event.code) {
      case KeyboardKeys.ENTER:
        event.preventDefault();
        if (value !== '') {
          const hasSelection = this.selected?.find(selection => value === selection);
          if (!hasSelection) {
            this.selection.emit([...(this.selected || []), value]);
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

  onInputPaste(event: ClipboardEvent): void {
    if (!this.isFreeTagging) return;

    const pasted = event.clipboardData?.getData('text') || '';
    // Decide multi-value after sanitization so `&amp;` is not treated as a `;` separator.
    if (splitFreeTagBatch(pasted).length <= 1) {
      setTimeout(() => this.syncInputHeight());
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const input = event.target as HTMLTextAreaElement;
    const value = input.value || '';
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    this.commitInput(`${value.slice(0, start)}${pasted}${value.slice(end)}`);
  }

  onInputValueChange(): void {
    if (this.isFreeTagging) this.syncInputHeight();
  }

  onInputBlur(event: FocusEvent): void {
    if (!this.isFreeTagging) return;
    const next = event.relatedTarget as Node | null;
    if (next && this.inputContainer?.nativeElement.contains(next)) return;
    this.commitInput(this.inputElement?.nativeElement.value || '');
  }

  onChipClick(event: MouseEvent, index: number): void {
    if (!this.isFreeTagging) return;
    event.stopPropagation();
    this.commitInput(this.inputElement?.nativeElement.value || '');
    this.setSelectedChipIndex(index);
    this.focusInput();
  }

  onChipDoubleClick(event: MouseEvent, index: number): void {
    if (!this.isFreeTagging) return;
    event.preventDefault();
    event.stopPropagation();

    const chip = this.selectedChips[index];
    if (!chip || chip.option.disabled) return;

    const selections = [...(this.selected || [])];
    selections.splice(index, 1);
    this.selection.emit(selections);
    this.setSelectedChipIndex(null);
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.value = chip.labelText;
      this.syncInputHeight();
    }
    this.emitTaggingError('');
    this.focusInput();
  }

  clearInput() {
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.value = '';
      if (this.isFreeTagging) this.syncInputHeight();
    }
    this.keyup.emit({ event: undefined, value: '' });
    this._cdr.markForCheck();
  }

  onClearTaggingInput(ev?: PointerEvent): void {
    ev?.stopPropagation();
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.value = '';
    }
  }

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
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.code === KeyboardKeys.TAB) return;
    if (this.disableDropdown) return;
    event.stopPropagation();

    if (!this.tagging) {
      event.preventDefault();
      this.keyup.emit({ event });
    }
  }

  onClick(event?: MouseEvent): void {
    if (this.disabled || (event?.target as HTMLElement | null)?.closest?.('button')) return;

    if (!this.disableDropdown) {
      this.activate.emit();
    }

    if (this.tagging) this.focusInput();
  }

  onFocus(event?: FocusEvent) {
    if (this.disabled || !this.tagging) return;
    // focusin bubbles from buttons (clear/caret); don't treat those as field activation.
    if ((event?.target as HTMLElement | null)?.closest?.('button')) return;
    this.onClick();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onToggle(_ev?: PointerEvent): void {
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

    const index = (this.selected || []).findIndex(selection => {
      if (this.identifier !== undefined && selection != null && option.value != null) {
        return selection[this.identifier] === option.value[this.identifier];
      }
      return selection === option.value;
    });
    this.removeOptionAt(index);
  }

  focus() {
    // Prefer the container so classic tagging still runs onFocus → open dropdown.
    // Free tagging then moves focus into the textarea via onFocus/onClick.
    this.inputContainer?.nativeElement.focus();
    if (this.isFreeTagging) this.focusInput();
  }

  private onFreeTaggingKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLTextAreaElement;
    const value = input.value || '';
    const empty = !value;
    const caret = input.selectionStart ?? 0;
    const atStart = caret === 0 && (input.selectionEnd ?? 0) === 0;
    const key = event.key;

    if (key === KeyboardKeys.ARROW_LEFT && (empty || atStart) && this.selected?.length) {
      event.preventDefault();
      this.setSelectedChipIndex(
        this.selectedChipIndex == null ? this.selected.length - 1 : Math.max(0, this.selectedChipIndex - 1)
      );
      return;
    }

    if (key === KeyboardKeys.ARROW_RIGHT && this.selectedChipIndex != null) {
      event.preventDefault();
      this.setSelectedChipIndex(this.selectedChipIndex < this.selected.length - 1 ? this.selectedChipIndex + 1 : null);
      return;
    }

    if ((key === KeyboardKeys.BACKSPACE || key === KeyboardKeys.DELETE) && this.selectedChipIndex != null) {
      event.preventDefault();
      this.removeOptionAt(this.selectedChipIndex);
      return;
    }

    if (key === KeyboardKeys.BACKSPACE && empty && atStart && this.selected?.length) {
      event.preventDefault();
      this.setSelectedChipIndex(this.selected.length - 1);
      return;
    }

    if (key === KeyboardKeys.ESCAPE) {
      if (this.selectedChipIndex != null) {
        event.preventDefault();
        this.setSelectedChipIndex(null);
        this.suppressEscapeToggle = true;
        return;
      }
      if (empty && this.selected?.length) {
        event.preventDefault();
        this.removeOptionAt(this.selected.length - 1);
        this.suppressEscapeToggle = true;
        return;
      }
    }

    if (key.length === 1 && this.selectedChipIndex != null) {
      this.setSelectedChipIndex(null);
    }

    if (key.length === 1 && this._lastTaggingError) {
      this.emitTaggingError('');
    }

    if (key === KeyboardKeys.ENTER || key === KeyboardKeys.TAB || key === ',') {
      if (!value) {
        if (key !== KeyboardKeys.TAB) event.preventDefault();
        return;
      }
      event.preventDefault();
      this.commitInput(value);
    }
  }

  private onFreeTaggingKeyUp(event: KeyboardEvent, value: string): void {
    if (event.code === KeyboardKeys.ESCAPE) {
      event.preventDefault();
      if (this.suppressEscapeToggle) {
        this.suppressEscapeToggle = false;
        return;
      }
      this.toggle.emit();
      return;
    }

    if (
      event.key === KeyboardKeys.ENTER ||
      event.key === KeyboardKeys.TAB ||
      event.key === KeyboardKeys.ARROW_LEFT ||
      event.key === KeyboardKeys.ARROW_RIGHT ||
      event.key === ','
    ) {
      return;
    }

    this.keyup.emit({ event, value });
  }

  private commitInput(raw: string): void {
    if (!raw) return;

    const values = splitFreeTagBatch(raw);

    if (!values.length) {
      this.clearInput();
      return;
    }

    const next = [...(this.selected || [])];
    let lastError = '';

    for (const value of values) {
      if (next.includes(value)) continue;

      const reason =
        this.maxSelections !== undefined && next.length >= this.maxSelections
          ? `A maximum of ${this.maxSelections} selections is allowed.`
          : this.taggingValidator?.(value, next) || '';

      if (reason) {
        lastError = reason;
        continue;
      }

      next.push(value);
    }

    if (next.length !== (this.selected || []).length) {
      this.selection.emit(next);
    }

    this.emitTaggingError(lastError);
    this.clearInput();
  }

  private removeOptionAt(index: number): void {
    if (index < 0 || index >= (this.selected || []).length) return;

    const selections = [...this.selected];
    selections.splice(index, 1);
    this.selection.emit(selections);
    this.setSelectedChipIndex(selections.length ? Math.min(index, selections.length - 1) : null);
    this.emitTaggingError('');
  }

  private setSelectedChipIndex(index: number | null): void {
    if (this.selectedChipIndex === index) return;
    this.selectedChipIndex = index;
    this._cdr.markForCheck();
  }

  private emitTaggingError(error: string): void {
    if (error === this._lastTaggingError) return;
    this._lastTaggingError = error;
    this.taggingError.emit(error);
    this._cdr.markForCheck();
  }

  private focusInput(): void {
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
      this.syncInputHeight();
    }, 30);
  }

  private syncInputHeight(): void {
    const el = this.inputElement?.nativeElement;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }

  private rebuildSelectedChips(selected: any[] | null | undefined): void {
    this.selectedChips = this.buildSelectedChips(selected);
    this.selectedOptions = this.selectedChips.map(chip => chip.option);
  }

  private buildSelectedChips(selected: any[] | null | undefined): SelectedChipView[] {
    const results: SelectedChipView[] = [];
    if (!selected) return results;

    const free = this.isFreeTagging;
    const validator = free ? this.taggingValidator : undefined;

    for (const selection of selected) {
      let match: SelectDropdownOption | undefined;

      if (this.options) {
        match = this.options.find(option => {
          if (this.identifier) {
            return selection[this.identifier] === option.value[this.identifier];
          }
          return selection === option.value;
        });
      }

      if ((this.tagging || this.allowAdditions) && !match) {
        const label = freeTagPlainLabel(selection);
        match = { value: selection, name: label };
      }

      if (!match) continue;

      const labelText = free ? freeTagPlainLabel(match.value, match.name) : '';
      const tooltipTitle = free && labelText.length >= CHIP_TOOLTIP_MIN_LENGTH ? labelText : '';
      const invalid = validator ? !!validator(match.value, selected) : false;

      results.push({
        option: match,
        trackBy: this.resolveTrackBy(match),
        labelText,
        tooltipTitle,
        invalid
      });
    }

    return results;
  }

  private resolveTrackBy(option: SelectDropdownOption): unknown {
    if (this.identifier && option?.value != null) {
      return option.value[this.identifier];
    }
    return option?.value ?? option;
  }
}
