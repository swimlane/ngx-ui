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
import {
  freeTagPlainLabel,
  freeTagBatchHasSeparator,
  splitFreeTagBatch,
  normalizeFreeTagInput
} from './select-tagging.util';
import { caretOffsetAtClientX } from './select-chip-caret.util';

const CHIP_TOOLTIP_MIN_LENGTH = 32;

function eventElement(event: Event): HTMLElement | null {
  return (event.target as HTMLElement | null) ?? null;
}

function isChipRemoveButton(event: Event): boolean {
  return !!eventElement(event)?.closest?.('button');
}

interface SelectedChipView {
  readonly option: SelectDropdownOption;
  readonly trackBy: unknown;
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
    const prevLen = this._selected?.length || 0;
    const wasAtEnd = this.inputInsertIndex >= prevLen;
    this._selected = val;
    this.rebuildSelectedChips(val);
    const len = val?.length || 0;
    this.inputInsertIndex = wasAtEnd ? len : Math.min(Math.max(0, this.inputInsertIndex), len);
    if (this.editingChipIndex != null && this.editingChipIndex >= len) {
      this.cancelChipEdit();
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

  @ViewChild('chipEditInput')
  readonly chipEditInput?: ElementRef<HTMLInputElement>;

  selectedChips: SelectedChipView[] = [];
  selectedOptions: SelectDropdownOption[] = [];
  /** Index of the free-tagging caret among chips (`length` = after last). */
  inputInsertIndex = 0;
  editingChipIndex: number | null = null;
  editingChipMinWidth: number | null = null;

  get isInputAtEnd(): boolean {
    return this.inputInsertIndex >= (this.selectedChips?.length || 0);
  }

  private _selected: any[];
  private _lastTaggingError = '';
  private suppressEscapeToggle = false;
  private suppressEnterKeyup = false;
  private pendingChipCaret: { index: number; offset: number; text: string } | null = null;

  constructor(private readonly _cdr: ChangeDetectorRef) {}

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

    const input = event.target as HTMLInputElement;
    const value = input.value || '';
    const empty = !value;

    if ((event.key === KeyboardKeys.ENTER || event.key === 'F2') && empty && this.selected?.length) {
      event.preventDefault();
      this.suppressEnterKeyup = true;
      const lastIndex = this.selected.length - 1;
      if (lastIndex >= 0) {
        const chip = this.selectedChips[lastIndex];
        if (chip && !chip.option.disabled) {
          this.beginChipEdit(lastIndex, 0, chip.labelText.length);
        }
      }
      return;
    }

    if (event.key === KeyboardKeys.BACKSPACE && empty && this.selected?.length) {
      event.preventDefault();
      this.removeOptionAt(this.selected.length - 1);
      return;
    }

    switch (event.code) {
      case KeyboardKeys.ENTER:
        event.preventDefault();
        break;
      case KeyboardKeys.ESCAPE: {
        if (value === '' && this.selected?.length) {
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

    switch (event.code) {
      case KeyboardKeys.ENTER:
        event.preventDefault();
        if (this.suppressEnterKeyup) {
          this.suppressEnterKeyup = false;
          return;
        }
        if (value !== '') {
          const hasSelection = this.selected?.find(selection => value === selection);
          if (!hasSelection) {
            this.selection.emit([...(this.selected || []), value]);
            this.clearInput();
          }
          return;
        }
        this.keyup.emit({ event, value });
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

    event.preventDefault();
    event.stopPropagation();

    const pasted = event.clipboardData?.getData('text/plain') || event.clipboardData?.getData('text') || '';
    const input = event.target as HTMLTextAreaElement;
    const value = input.value || '';
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    const merged = `${value.slice(0, start)}${pasted}${value.slice(end)}`;

    if (freeTagBatchHasSeparator(pasted) || splitFreeTagBatch(merged).length > 1) {
      this.commitInput(merged);
      return;
    }

    const inserted = splitFreeTagBatch(pasted)[0] ?? '';
    input.value = `${value.slice(0, start)}${inserted}${value.slice(end)}`;
    const caret = start + inserted.length;
    input.setSelectionRange(caret, caret);
    this.syncInputHeight();
    this._cdr.markForCheck();
  }

  onInputValueChange(): void {
    if (!this.isFreeTagging) return;
    this.syncInputHeight();
  }

  onInputBlur(event: FocusEvent): void {
    if (!this.isFreeTagging || this.editingChipIndex != null) return;
    const next = event.relatedTarget as Node | null;
    if (next && this.inputContainer?.nativeElement.contains(next)) return;
    this.commitInput(this.inputElement?.nativeElement.value || '');
  }

  onChipMouseDown(event: MouseEvent, index: number): void {
    if (!this.canStartChipEdit(event, index)) return;
    event.preventDefault?.();
    event.stopPropagation?.();
    this.startChipEdit(event, index);
  }

  onChipClick(event: MouseEvent, index: number): void {
    if (!this.tagging || this.disabled || isChipRemoveButton(event)) return;
    event.stopPropagation();
    if (this.editingChipIndex === index) return;
    this.startChipEdit(event, index);
  }

  onChipEditKeyDown(event: KeyboardEvent): void {
    event.stopPropagation();
    if (event.repeat) return;

    const input = event.target as HTMLInputElement;
    const value = input.value || '';
    const atStart = input.selectionStart === 0 && input.selectionEnd === 0;
    const atEnd = input.selectionStart === value.length && input.selectionEnd === value.length;
    const currentIndex = this.editingChipIndex;

    if (event.key === KeyboardKeys.ESCAPE) {
      event.preventDefault();
      this.suppressEscapeToggle = true;
      this.cancelChipEdit();
      this.focusInput();
      if (!this.isFreeTagging) {
        this.keyup.emit({ event: undefined, value: '' });
      }
      return;
    }

    if (event.key === KeyboardKeys.ENTER) {
      event.preventDefault();
      this.commitChipEdit(value, false);
      if (this.isFreeTagging && currentIndex != null) {
        this.setInputInsertIndex(currentIndex + 1);
      } else {
        this.focusInput();
      }
      return;
    }

    if (event.key === KeyboardKeys.TAB) {
      event.preventDefault();
      this.commitChipEdit(value, false);

      if (event.shiftKey) {
        if (currentIndex === 0) {
          this.inputContainer?.nativeElement.blur();
        } else if (this.isFreeTagging && currentIndex != null) {
          this.setInputInsertIndex(currentIndex);
        } else {
          this.focusInput();
        }
      } else {
        const isLast = currentIndex != null && currentIndex === (this.selected?.length ?? 0) - 1;
        if (isLast) {
          this.inputContainer?.nativeElement.blur();
        } else if (this.isFreeTagging && currentIndex != null) {
          this.setInputInsertIndex(currentIndex + 1);
        } else {
          this.focusInput();
        }
      }
      return;
    }

    if (event.key === KeyboardKeys.ARROW_LEFT && atStart) {
      event.preventDefault();
      this.commitChipEdit(value, false);
      if (this.isFreeTagging && currentIndex != null) {
        this.setInputInsertIndex(currentIndex);
      } else {
        this.focusInput();
      }
      return;
    }

    if (event.key === KeyboardKeys.ARROW_RIGHT && atEnd) {
      event.preventDefault();
      this.commitChipEdit(value, false);
      if (this.isFreeTagging && currentIndex != null) {
        this.setInputInsertIndex(currentIndex + 1);
      } else {
        this.focusInput();
      }
      return;
    }
  }

  onChipEditKeyUp(event: KeyboardEvent): void {
    event.stopPropagation();
    if (this.isFreeTagging || this.editingChipIndex == null) return;
    const value = (event.target as HTMLInputElement).value || '';
    this.keyup.emit({ event, value });
  }

  onChipEditValueChange(): void {
    this.syncChipEditWidth();
    if (this.isFreeTagging || this.editingChipIndex == null) return;
    this.keyup.emit({ event: undefined, value: this.chipEditInput?.nativeElement.value || '' });
  }

  onChipEditBlur(event: FocusEvent): void {
    if (this.editingChipIndex == null) return;
    if (event.target !== this.chipEditInput?.nativeElement) return;
    this.commitChipEdit((event.target as HTMLInputElement).value || '');
  }

  cancelChipEdit(): void {
    this.editingChipIndex = null;
    this.editingChipMinWidth = null;
    this._cdr.markForCheck();
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
    const target = event ? eventElement(event) : null;
    if (this.disabled || target?.closest?.('button')) return;
    if (this.tagging && target?.closest?.('.ngx-select-input-option')) return;

    if (this.editingChipIndex != null) {
      this.commitChipEdit(this.chipEditInput?.nativeElement.value || '');
    }

    if (!this.disableDropdown) {
      this.activate.emit();
    }

    if (this.isFreeTagging) {
      this.setInputInsertIndex(this.selected?.length || 0);
    } else if (this.tagging) {
      this.focusInput();
    }
  }

  onFocus(event?: FocusEvent) {
    if (this.disabled || !this.tagging) return;
    const target = event ? eventElement(event) : null;
    if (target?.closest?.('button')) return;
    if (target?.closest?.('.ngx-select-chip-edit') || this.editingChipIndex != null) return;
    this.onClick(event as unknown as MouseEvent);
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
    this.inputContainer?.nativeElement.focus();
    if (this.isFreeTagging) this.focusInput();
  }

  private onFreeTaggingKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLTextAreaElement;
    const value = input.value || '';
    const empty = !value;
    const caret = input.selectionStart ?? 0;
    const selEnd = input.selectionEnd ?? 0;
    const atStart = caret === 0 && selEnd === 0;
    const atEnd = caret === value.length && selEnd === value.length;
    const key = event.key;
    const chipCount = this.selected?.length || 0;

    if (
      event.repeat &&
      (key === KeyboardKeys.BACKSPACE || key === KeyboardKeys.DELETE || key === KeyboardKeys.ENTER || key === ',')
    ) {
      return;
    }

    if ((key === KeyboardKeys.ENTER || key === 'F2') && empty && chipCount) {
      event.preventDefault();
      const targetIndex = this.inputInsertIndex > 0 ? this.inputInsertIndex - 1 : 0;
      const chip = this.selectedChips[targetIndex];
      if (chip && !chip.option.disabled) {
        this.beginChipEdit(targetIndex, 0, chip.labelText.length);
      }
      return;
    }

    if (key === KeyboardKeys.ARROW_LEFT && (empty || atStart)) {
      event.preventDefault();
      if (this.inputInsertIndex > 0) {
        const targetIndex = this.inputInsertIndex - 1;
        const chip = this.selectedChips[targetIndex];
        if (chip && !chip.option.disabled) {
          this.beginChipEdit(targetIndex, 0, chip.labelText.length);
        }
      }
      return;
    }

    if (key === KeyboardKeys.ARROW_RIGHT && (empty || atEnd)) {
      event.preventDefault();
      if (this.inputInsertIndex < chipCount) {
        const targetIndex = this.inputInsertIndex;
        const chip = this.selectedChips[targetIndex];
        if (chip && !chip.option.disabled) {
          this.beginChipEdit(targetIndex, 0, 0);
        }
      }
      return;
    }

    if (key === KeyboardKeys.BACKSPACE && empty && atStart && this.inputInsertIndex > 0) {
      event.preventDefault();
      this.removeOptionAt(this.inputInsertIndex - 1);
      return;
    }

    if (key === KeyboardKeys.DELETE && empty && this.inputInsertIndex < chipCount) {
      event.preventDefault();
      this.removeOptionAt(this.inputInsertIndex);
      return;
    }

    if (key === KeyboardKeys.ESCAPE) {
      if (empty && chipCount && this.isInputAtEnd) {
        event.preventDefault();
        this.removeOptionAt(chipCount - 1);
        this.suppressEscapeToggle = true;
        return;
      }
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

  private commitInput(raw: string, retainOnError = false): void {
    if (!raw) return;

    const values = splitFreeTagBatch(raw);

    if (!values.length) {
      this.clearInput();
      return;
    }

    const next = [...(this.selected || [])];
    let lastError = '';
    let insertAt = Math.min(Math.max(0, this.inputInsertIndex), next.length);
    let added = 0;

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

      next.splice(insertAt, 0, value);
      insertAt++;
      added++;
    }

    if (added) {
      this.inputInsertIndex = insertAt;
      this.selection.emit(next);
    }

    this.emitTaggingError(lastError);
    if (lastError && retainOnError && !added) return;
    this.clearInput();
    this.setInputInsertIndex(this.inputInsertIndex);
  }

  private canStartChipEdit(event: Event, index: number): boolean {
    return !!this.tagging && !this.disabled && !isChipRemoveButton(event) && this.editingChipIndex !== index;
  }

  private startChipEdit(event: MouseEvent, index: number): void {
    const chipEl = event.currentTarget as HTMLElement | null;
    const nameEl =
      eventElement(event)?.closest?.('.ngx-select-input-name') || chipEl?.querySelector?.('.ngx-select-input-name');
    const label = nameEl as HTMLElement | null;
    const text = this.selectedChips[index]?.labelText ?? label?.textContent ?? '';
    const minWidth = label?.getBoundingClientRect().width ?? 0;
    const caretOffset = label ? caretOffsetAtClientX(label, text, event.clientX) : text.length;
    this.beginChipEdit(index, minWidth, caretOffset);
  }

  private discardOrCommitTrailingInput(): void {
    const raw = this.inputElement?.nativeElement.value || '';
    if (this.isFreeTagging) {
      this.commitInput(raw);
      return;
    }
    if (raw) this.clearInput();
  }

  private beginChipEdit(index: number, minWidth: number, caretOffset: number): void {
    const chip = this.selectedChips[index];
    if (!chip || chip.option.disabled) return;

    this.discardOrCommitTrailingInput();
    if (this.editingChipIndex != null && this.editingChipIndex !== index) {
      this.commitChipEdit(this.chipEditInput?.nativeElement.value || '');
    }

    this.editingChipMinWidth = Math.max(0, Math.ceil(minWidth));
    this.editingChipIndex = index;
    this.emitTaggingError('');
    this.pendingChipCaret = {
      index,
      text: chip.labelText,
      offset: Math.min(Math.max(0, caretOffset), chip.labelText.length)
    };

    if (!this.isFreeTagging) {
      this.activate.emit();
    }

    this._cdr.detectChanges();
    this.applyPendingChipCaret();
  }

  private applyPendingChipCaret(): void {
    const pending = this.pendingChipCaret;
    const el = this.chipEditInput?.nativeElement;
    if (!pending || !el || this.editingChipIndex !== pending.index) return;

    el.value = pending.text;
    this.syncChipEditWidth();
    const offset = Math.min(pending.offset, el.value.length);

    const place = () => {
      if (this.editingChipIndex !== pending.index) return;
      el.setSelectionRange(offset, offset);
    };

    el.addEventListener('focus', place, { once: true });
    el.focus();
    place();
    requestAnimationFrame(() => {
      place();
      if (!this.isFreeTagging) {
        this.keyup.emit({ event: undefined, value: el.value });
      }
    });

    this.pendingChipCaret = null;
  }

  private commitChipEdit(raw: string, focus = true): void {
    const index = this.editingChipIndex;
    if (index == null) return;

    const value = normalizeFreeTagInput(raw);
    const next = [...(this.selected || [])];
    this.cancelChipEdit();

    if (!value) {
      next.splice(index, 1);
      this.inputInsertIndex = Math.min(index, next.length);
      this.selection.emit(next);
      if (focus) this.focusInput();
      return;
    }

    if (value !== next[index]) {
      const peers = next.filter((_, i) => i !== index);
      if (peers.includes(value)) {
        if (focus) this.focusInput();
        return;
      }

      if (this.isFreeTagging) {
        const reason = this.taggingValidator?.(value, peers) || '';
        if (reason) {
          this.emitTaggingError(reason);
          if (focus) this.focusInput();
          return;
        }
      }

      next[index] = value;
      this.selection.emit(next);
    }

    if (focus) this.focusInput();
  }

  private removeOptionAt(index: number): void {
    if (index < 0 || index >= (this.selected || []).length) return;

    if (this.editingChipIndex != null) {
      this.cancelChipEdit();
    }

    const selections = [...this.selected];
    selections.splice(index, 1);
    this.inputInsertIndex = Math.min(index, selections.length);
    this.selection.emit(selections);
    this.emitTaggingError('');
    this.focusInput();
  }

  private setInputInsertIndex(index: number): void {
    const len = this.selected?.length || 0;
    const next = Math.max(0, Math.min(index, len));
    const raw = this.inputElement?.nativeElement.value || '';
    if (next !== this.inputInsertIndex) {
      this.inputInsertIndex = next;
      this._cdr.detectChanges();
      if (this.inputElement?.nativeElement) {
        this.inputElement.nativeElement.value = raw;
      }
    }
    this.focusInput();
    this.syncInputHeight();
  }

  private emitTaggingError(error: string): void {
    if (error === this._lastTaggingError) return;
    this._lastTaggingError = error;
    this.taggingError.emit(error);
    this._cdr.markForCheck();
  }

  private focusInput(): void {
    setTimeout(() => {
      if (this.editingChipIndex != null) return;
      this.inputElement?.nativeElement.focus();
      this.syncInputHeight();
    }, 30);
  }

  private syncInputHeight(): void {
    const el = this.inputElement?.nativeElement;
    if (!el) return;

    if (this.isFreeTagging && !this.isInputAtEnd) {
      el.style.height = '';
      if (!el.value) {
        el.style.width = '';
      } else {
        el.style.width = '0px';
        el.style.width = `${el.scrollWidth + 4}px`;
      }
      return;
    }

    el.style.width = '';
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }

  private syncChipEditWidth(): void {
    const el = this.chipEditInput?.nativeElement;
    if (!el) return;
    el.style.width = '1px';
    const listWidth = this.inputContainer?.nativeElement.querySelector('.ngx-select-input-list')?.clientWidth;
    const contentWidth = el.scrollWidth + 2;
    const nextWidth = Math.max(this.editingChipMinWidth ?? 0, contentWidth);
    el.style.width = `${listWidth ? Math.min(listWidth, nextWidth) : nextWidth}px`;
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

    selected.forEach((selection, index) => {
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

      if (!match) return;

      const labelText = this.tagging ? freeTagPlainLabel(match.value, match.name) : '';
      const tooltipTitle = free && labelText.length >= CHIP_TOOLTIP_MIN_LENGTH ? labelText : '';
      const peers = selected.filter((_, i) => i !== index);
      const invalid = validator ? !!validator(match.value, peers) : false;

      results.push({
        option: match,
        trackBy: this.resolveTrackBy(match),
        labelText,
        tooltipTitle,
        invalid
      });
    });

    return results;
  }

  private resolveTrackBy(option: SelectDropdownOption): unknown {
    if (this.identifier && option?.value != null) {
      return option.value[this.identifier];
    }
    return option?.value ?? option;
  }
}
