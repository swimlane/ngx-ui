import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  BooleanInput,
  Controller,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { EnumKey, InputType } from '@swimlane/ngx-ui/typings';
import { BehaviorSubject } from 'rxjs';

const MIN_WIDTH = 60;

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

  @Input() hint = '';
  @Input() placeholder = '';

  @HostBinding('class.has-placeholder')
  get hasPlaceholder(): boolean {
    return !!this.placeholder && this.placeholder.length > 0;
  }

  @Input() label = '';

  @HostBinding('class.no-label') get noLabelClass() {
    return !this.label;
  }

  @NgxNumericInput(MIN_WIDTH)
  @Input()
  minWidth = MIN_WIDTH;

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

  @HostBinding('class.disabled')
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
    if ('unlockable' in changes) {
      if (changes.unlockable.currentValue) {
        this.disabled = true;
      }
    }

    if ('type' in changes || 'passwordTextVisible' in changes) {
      this.updateInputType();
    }

    super.ngOnChanges(changes);
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
