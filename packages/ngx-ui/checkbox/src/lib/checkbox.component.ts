import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BooleanInput,
  CssPixelInput,
  NgxBooleanInput,
  NgxCssPixelInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';

const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};

let nextId = 0;

@Component({
  selector: 'ngx-checkbox',
  exportAs: 'ngxCheckbox',
  // templateUrl: './checkbox.component.html',
  template: `
    <label class="ngx-checkbox--label">
      <input
        type="checkbox"
        [id]="id + '-chk'"
        [(ngModel)]="value"
        [disabled]="disabled"
        [name]="name + '-chk'"
        [tabIndex]="tabindex"
        (focus)="checkboxFocus.emit($event)"
        (blur)="checkboxBlur.emit($event)"
        (change)="checkboxChange.emit($event)"
      />

      <div
        class="ngx-checkbox--box"
        [class.checked]="value"
        [style.width]="diameter"
        [style.height]="diameter"
        [style.min-width]="diameter"
        [style.min-height]="diameter"
      ></div>

      <div class="ngx-checkbox--content">
        <ng-content></ng-content>
      </div>
    </label>
  `,
  // styleUrls: ['./checkbox.component.scss'],
  styles: [
    // language=scss
    `
      .ngx-checkbox {
        display: flex;

        &.disabled {
          * {
            cursor: not-allowed;
          }
        }

        &.round {
          .ngx-checkbox--box {
            border-radius: 100% !important;
          }
        }

        .ngx-checkbox--label {
          display: flex;
          cursor: pointer;
          margin-bottom: 0;

          input {
            display: none;
          }

          .ngx-checkbox--box {
            border-radius: 0.125rem;
            background-color: transparent;
            border: 0.125rem solid var(--ngx-ui-color-blue-grey-600);
            transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
            user-select: none;
            margin: auto 0.625rem auto 0;

            &:after {
              position: absolute;
              top: calc(50% - 0.5rem);
              left: calc(50% - 0.125rem);
              width: 0.375rem;
              height: 0.75rem;
              content: '';
              border: solid var(--ngx-ui-color-white);
              border-width: 0 0.125rem 0.125rem 0;
              transform: rotate(0deg) scale(0);
              transition: all 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
            }

            &.checked {
              background-color: var(--ngx-ui-color-blue-400);
              border-radius: 0.125rem;
              opacity: 1;
              border: 0.125rem solid var(--ngx-ui-color-blue-400);
              transform: rotate(0deg) scale(1);

              &:after {
                transform: rotate(45deg) scale(1);
              }
            }
          }

          .ngx-checkbox--content {
            margin: auto 0;
            color: var(--ngx-ui-color-blue-grey-100);
          }
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECKBOX_VALUE_ACCESSOR],
})
export class CheckboxComponent implements ControlValueAccessor {
  static ngAcceptInputType_diameter: CssPixelInput;
  static ngAcceptInputType_tabindex: NumericInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_round: BooleanInput;

  @HostBinding('class.ngx-checkbox') hostClass = true;

  @Input() id = `checkbox-${++nextId}`;
  @Input() name = '';

  @NgxCssPixelInput()
  @Input()
  diameter: CssPixelInput = '18px';

  @NgxNumericInput(0)
  @Input()
  tabindex = 0;

  @HostBinding('class.disabled')
  @NgxBooleanInput()
  @Input()
  disabled = false;

  @HostBinding('class.round')
  @NgxBooleanInput()
  @Input()
  round = false;

  @Output() checkboxChange = new EventEmitter<Event>();
  @Output() checkboxBlur = new EventEmitter<FocusEvent>();
  @Output() checkboxFocus = new EventEmitter<FocusEvent>();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  set value(value: boolean) {
    if (this._value !== value) {
      this._value = value;
      this.cdr.markForCheck();
      this.onChangeCallback(this._value);
    }
  }

  get value(): boolean {
    return this._value;
  }

  private _value = false;

  onBlur() {
    this.onTouchedCallback();
  }

  toggle() {
    this.value = !this.value;
  }

  writeValue(value: boolean) {
    this.value = value;
  }

  registerOnChange(fn: (_: boolean) => void) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  private onTouchedCallback = () => {
    // placeholder
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChangeCallback = (_: boolean) => {
    // placeholder
  };
}
