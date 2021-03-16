import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { KeyboardKeys } from '@swimlane/ngx-ui/types';
import { timer } from 'rxjs';
import type { SelectDropdownOption } from '../models';

@Component({
  selector: 'ngx-select-input',
  exportAs: 'ngxSelectInput',
  templateUrl: './select-input.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent implements AfterViewInit {
  @Input() placeholder!: string;
  @Input() identifier?: string;
  @Input() options: SelectDropdownOption[] = [];
  @Input() label?: string;
  @Input() hint?: string;
  @Input() selectCaret?: string | TemplateRef<unknown>;
  @Input() requiredIndicator?: string | boolean;
  @Input() tabIndex?: number;

  @Input()
  autofocus!: boolean;

  @Input()
  allowClear!: boolean;

  @Input()
  multiple!: boolean;

  @Input()
  tagging!: boolean;

  @Input()
  allowAdditions!: boolean;

  @Input()
  disableDropdown!: boolean;

  @Input()
  get selected() {
    return this._selected;
  }

  set selected(val: unknown[]) {
    this._selected = val;
    this.selectedOptions = this.calcSelectedOptions(val);
  }

  private _selected!: unknown[];

  @Output() toggle = new EventEmitter<void>();
  @Output() selection = new EventEmitter<unknown[]>();
  @Output() activate = new EventEmitter<Event>();
  @Output() keyup = new EventEmitter<{
    event: KeyboardEvent;
    value?: string;
  }>();

  @ViewChild('tagInput')
  readonly inputElement?: ElementRef<HTMLInputElement>;

  get caretVisible(): boolean {
    if (this.disableDropdown) return false;
    return !(this.tagging && (!this.options || !this.options.length));
  }

  get isNotTemplate(): boolean {
    return !(
      typeof this.selectCaret === 'object' &&
      this.selectCaret instanceof TemplateRef
    );
  }

  selectedOptions: SelectDropdownOption[] = [];

  @HostBinding('class.ngx-select-input') hostClass = true;

  ngAfterViewInit(): void {
    if (this.tagging && this.autofocus) {
      timer(5).subscribe(() => {
        this.inputElement?.nativeElement.focus();
      });
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    event.stopPropagation();

    const key = event.key;
    const value = (event.target as HTMLInputElement).value;

    if (key === KeyboardKeys.ENTER) {
      if (value !== '') {
        const hasSelection = this.selected.find((selection) => {
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

  onGlobalKeyUp(event: KeyboardEvent) {
    event.stopPropagation();
    const key = event.key;

    if (key === KeyboardKeys.ARROW_DOWN) {
      this.activate.emit(event);
    }
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
      timer(5).subscribe(() => {
        this.inputElement?.nativeElement.focus();
      });
    }
  }

  onToggle(): void {
    this.toggle.emit();
  }

  onOptionRemove(event: Event, option: SelectDropdownOption): void {
    event.stopPropagation();

    const newSelections = this.selected.filter((selection) => {
      if (this.identifier !== undefined) {
        return (
          (option.value as Record<string, unknown>)[this.identifier] !==
          (selection as Record<string, unknown>)[this.identifier]
        );
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
      let match: SelectDropdownOption | undefined;

      if (this.options) {
        match = this.options.find((option) => {
          if (this.identifier) {
            return (
              selection[this.identifier] ===
              (option.value as Record<string, unknown>)[this.identifier]
            );
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
