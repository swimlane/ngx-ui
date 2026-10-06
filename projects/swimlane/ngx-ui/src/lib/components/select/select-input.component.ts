import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { KeyboardKeys } from '../../enums/keyboard-keys.enum';
import { SelectDropdownOption } from './select-dropdown-option.interface';
import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { CoerceNumberProperty } from '../../utils/coerce/coerce-number';
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
export class SelectInputComponent implements AfterViewInit, OnChanges, OnDestroy {
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

  /** Idle ms before uncommitted tag text is added or an in-place chip edit is saved. 0 disables. */
  @Input()
  @CoerceNumberProperty()
  tagCommitDebounce = 1000;

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
    if (this.editingChipIndex != null && this.editingChipIndex >= (val?.length || 0)) {
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
  selectedChipIndex: number | null = null;
  editingChipIndex: number | null = null;
  editingChipMinWidth: number | null = null;

  private _selected: any[];
  private _lastTaggingError = '';
  private suppressEscapeToggle = false;
  private tagCommitTimer: ReturnType<typeof setTimeout> | null = null;
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

  ngOnDestroy(): void {
    this.clearTagCommitTimer();
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
    this.scheduleTagCommit();
    this._cdr.markForCheck();
  }

  onInputValueChange(): void {
    if (!this.isFreeTagging) return;
    this.syncInputHeight();
    this.scheduleTagCommit();
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

    if (event.key === KeyboardKeys.ESCAPE) {
      event.preventDefault();
      this.suppressEscapeToggle = true;
      this.cancelChipEdit();
      this.focusInput();
      return;
    }

    if (event.key === KeyboardKeys.ENTER || event.key === KeyboardKeys.TAB) {
      event.preventDefault();
      this.commitChipEdit((event.target as HTMLInputElement).value || '');
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
    this.scheduleTagCommit();
    if (this.isFreeTagging || this.editingChipIndex == null) return;
    this.keyup.emit({ event: undefined, value: this.chipEditInput?.nativeElement.value || '' });
  }

  onChipEditBlur(event: FocusEvent): void {
    if (this.editingChipIndex == null) return;
    this.commitChipEdit((event.target as HTMLInputElement).value || '');
  }

  /** Exit in-place edit without committing (e.g. after dropdown pick). */
  cancelChipEdit(): void {
    this.clearTagCommitTimer();
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
    if (target?.closest?.('.ngx-select-input-option')) return;

    if (this.editingChipIndex != null) {
      this.commitChipEdit(this.chipEditInput?.nativeElement.value || '');
    }

    if (!this.disableDropdown) {
      this.activate.emit();
    }

    if (this.tagging) this.focusInput();
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
    const atStart = caret === 0 && (input.selectionEnd ?? 0) === 0;
    const key = event.key;

    if (
      event.repeat &&
      (key === KeyboardKeys.BACKSPACE || key === KeyboardKeys.DELETE || key === KeyboardKeys.ENTER || key === ',')
    ) {
      return;
    }

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
      this.clearTagCommitTimer();
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
    this.clearTagCommitTimer();
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

    const added = next.length !== (this.selected || []).length;
    if (added) {
      this.selection.emit(next);
    }

    this.emitTaggingError(lastError);
    if (lastError && retainOnError && !added) return;
    this.clearInput();
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

  private scheduleTagCommit(): void {
    this.clearTagCommitTimer();
    if (this.disabled || !this.tagCommitDebounce) return;

    if (this.editingChipIndex != null) {
      this.tagCommitTimer = setTimeout(() => {
        this.tagCommitTimer = null;
        if (this.editingChipIndex == null) return;
        this.commitChipEdit(this.chipEditInput?.nativeElement.value || '');
      }, this.tagCommitDebounce);
      return;
    }

    if (!this.isFreeTagging) return;
    const raw = this.inputElement?.nativeElement.value || '';
    if (!splitFreeTagBatch(raw).length) return;

    this.tagCommitTimer = setTimeout(() => {
      this.tagCommitTimer = null;
      if (this.editingChipIndex != null) return;
      this.commitInput(this.inputElement?.nativeElement.value || '', true);
    }, this.tagCommitDebounce);
  }

  private clearTagCommitTimer(): void {
    if (this.tagCommitTimer == null) return;
    clearTimeout(this.tagCommitTimer);
    this.tagCommitTimer = null;
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
    this.setSelectedChipIndex(null);
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

  private commitChipEdit(raw: string): void {
    this.clearTagCommitTimer();
    const index = this.editingChipIndex;
    if (index == null) return;

    const value = normalizeFreeTagInput(raw);
    const next = [...(this.selected || [])];
    this.cancelChipEdit();

    if (!value) {
      next.splice(index, 1);
      this.selection.emit(next);
      this.focusInput();
      return;
    }

    if (value !== next[index]) {
      const peers = next.filter((_, i) => i !== index);
      if (peers.includes(value)) {
        this.focusInput();
        return;
      }

      const reason = this.taggingValidator?.(value, peers) || '';
      if (reason) {
        this.emitTaggingError(reason);
        this.focusInput();
        return;
      }

      next[index] = value;
      this.selection.emit(next);
    }

    this.focusInput();
  }

  private removeOptionAt(index: number): void {
    if (index < 0 || index >= (this.selected || []).length) return;

    if (this.editingChipIndex != null) {
      this.cancelChipEdit();
    }

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
      if (this.editingChipIndex != null) return;
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
