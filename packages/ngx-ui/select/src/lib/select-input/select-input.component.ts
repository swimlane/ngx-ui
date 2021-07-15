import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AutofocusControllerDirective,
  NGX_AUTOFOCUS_CONTROLLER_PROVIDER,
  NGX_AUTOFOCUS_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/autofocus';
import {
  InputAttributeControllerDirective,
  NGX_INPUT_ATTRIBUTE_CONTROLLER_PROVIDER,
  NGX_INPUT_ATTRIBUTE_WATCHED_CONTROLLER,
} from '@swimlane/ngx-ui/input-attribute';
import { KeyboardKeys } from '@swimlane/ngx-ui/typings';
import { timer } from 'rxjs';
import type { SelectDropdownOption } from '../models';

@Component({
  selector: 'ngx-select-input',
  exportAs: 'ngxSelectInput',
  templateUrl: './select-input.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NGX_AUTOFOCUS_CONTROLLER_PROVIDER,
    NGX_INPUT_ATTRIBUTE_CONTROLLER_PROVIDER,
  ],
})
export class SelectInputComponent implements AfterViewInit, OnChanges {
  @Input() identifier?: string;
  @Input() options: SelectDropdownOption[] = [];
  @Input() selectCaret?: string | TemplateRef<unknown>;

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
  @Output() selectInputKeyup = new EventEmitter<{
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
    return !(typeof this.selectCaret === 'object');
  }

  selectedOptions: SelectDropdownOption[] = [];

  @HostBinding('class.ngx-select-input') hostClass = true;

  constructor(
    @Inject(NGX_INPUT_ATTRIBUTE_WATCHED_CONTROLLER)
    public readonly inputAttributeController: InputAttributeControllerDirective,
    @Inject(NGX_AUTOFOCUS_WATCHED_CONTROLLER)
    public readonly autofocusController: AutofocusControllerDirective
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('options' in changes && !changes.options.firstChange) {
      this.selectedOptions = this.calcSelectedOptions(this.selected);
    }
  }

  ngAfterViewInit(): void {
    if (this.tagging && this.autofocusController.ngxAutofocus) {
      timer(5).subscribe(() => {
        this.inputElement?.nativeElement.focus();
      });
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    event.stopPropagation();

    const key = event.key;
    const value = (event.target as HTMLInputElement).value;

    if (key === KeyboardKeys.Enter) {
      if (value !== '') {
        const hasSelection = this.selected.find((selection) => {
          return value === selection;
        });

        if (!hasSelection) {
          const newSelections = [...this.selected, value];
          this.selection.emit(newSelections);
          (event.target as HTMLInputElement).value = '';
        }
      }

      event.preventDefault();
    } else if (key === KeyboardKeys.Escape) {
      this.toggle.emit();
    }

    this.selectInputKeyup.emit({ event, value });
  }

  onGlobalKeyUp(event: KeyboardEvent) {
    event.stopPropagation();
    const key = event.key;

    if (key === KeyboardKeys.ArrowDown) {
      this.activate.emit(event);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disableDropdown) return;
    event.stopPropagation();

    if (!this.tagging) {
      this.selectInputKeyup.emit({ event });
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

  private calcSelectedOptions(selected: unknown[]) {
    const results: SelectDropdownOption[] = [];

    // result out if nothing here
    if (!selected) return results;

    for (const selection of selected) {
      let match: SelectDropdownOption | undefined;

      if (this.options) {
        match = this.options.find((option) => {
          if (this.identifier) {
            return (
              (selection as Record<string, unknown>)[this.identifier] ===
              (option.value as Record<string, unknown>)[this.identifier]
            );
          }

          return selection === option.value;
        });
      }

      if ((this.tagging || this.allowAdditions) && !match) {
        match = { value: selection, name: selection as string };
      }

      if (match) results.push(match);
    }

    return results;
  }
}
