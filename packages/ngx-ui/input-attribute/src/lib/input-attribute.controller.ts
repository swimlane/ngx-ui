import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  BooleanInput,
  Controller,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { EnumKey, InputType } from '@swimlane/ngx-ui/typings';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[ngxInputAttribute]',
  exportAs: 'ngxInputAttribute',
})
export class InputAttributeControllerDirective
  extends Controller
  implements OnChanges
{
  static ngAcceptInputType_min: NumericInput;
  static ngAcceptInputType_max: NumericInput;
  static ngAcceptInputType_minlength: NumericInput;
  static ngAcceptInputType_maxlength: NumericInput;

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;
  static ngAcceptInputType_autocomplete: BooleanInput;
  static ngAcceptInputType_autocorrect: BooleanInput;
  static ngAcceptInputType_spellcheck: BooleanInput;
  static ngAcceptInputType_passwordToggleEnabled: BooleanInput;
  static ngAcceptInputType_passwordTextVisible: BooleanInput;
  static ngAcceptInputType_unlockable: BooleanInput;

  @Input() placeholder = '';

  @NgxNumericInput(-1)
  @Input()
  tabindex = -1;

  @NgxNumericInput()
  @Input()
  min?: number;

  @NgxNumericInput()
  @Input()
  max?: number;

  @NgxNumericInput()
  @Input()
  minlength?: number;

  @NgxNumericInput()
  @Input()
  maxlength?: number;

  @NgxBooleanInput()
  @Input()
  disabled = false;

  @Input() requiredIndicator: string | boolean = '*';

  @NgxBooleanInput()
  @Input()
  required = false;

  @NgxBooleanInput()
  @Input()
  autocomplete = false;

  @NgxBooleanInput()
  @Input()
  autocorrect = false;

  @NgxBooleanInput()
  @Input()
  spellcheck = false;

  @NgxBooleanInput()
  @Input()
  passwordToggleEnabled = false;

  @NgxBooleanInput()
  @Input()
  passwordTextVisible = false;

  @NgxBooleanInput()
  @Input()
  unlockable = false;

  @Input() unlockableTooltip = 'Click to unlock';

  @Input('type') set _type(v: EnumKey<typeof InputType>) {
    this.type = InputType[v];
  }

  type = InputType.text;

  private readonly $type = new BehaviorSubject(this.type);
  readonly type$ = this.$type.asObservable();

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if ('unlockable' in changes) {
      if (changes.unlockable.currentValue) {
        this.disabled = true;
      }
    }

    if ('type' in changes || 'passwordTextVisible' in changes) {
      this.updateInputType();
    }
  }

  togglePasswordVisible() {
    this.passwordTextVisible = !this.passwordTextVisible;
  }

  private updateInputType() {
    this.$type.next(
      this.passwordTextVisible && this.type === InputType.password
        ? InputType.text
        : this.type
    );
  }
}
