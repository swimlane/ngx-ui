import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ButtonToggleComponent } from './button-toggle.component';

const BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonToggleGroupComponent),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'ngx-button-toggle-group',
  templateUrl: './button-toggle-group.component.html',
  styleUrls: ['./button-toggle-group.component.scss'],
  providers: [BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR],
  host: {
    role: 'group',
    class: 'ngx-button-toggle-group'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonToggleGroupComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  readonly UNIQUE_ID = `ngx-button-toggle-group-${++nextId}`;
  private _value = false;
  private _disabled;

  @Input() id: string = this.UNIQUE_ID;
  @Input() label;

  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.selectButtonToggle(newValue);
    }
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);

    this.checkChildren(this._disabled);
  }

  @Output() readonly valueChange = new EventEmitter();

  @ContentChildren(forwardRef(() => ButtonToggleComponent), {
    descendants: true
  })
  buttonToggles: QueryList<ButtonToggleComponent>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChangeCallback: (value: any) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouchedCallback: (value: any) => void = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  leftPosition: number | undefined;
  animationHolderWidth = 0;

  get itemCount(): number {
    return this.buttonToggles?.length || 0;
  }

  readonly destroy$ = new Subject<void>();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngAfterViewInit(): void {
    if (this.value) {
      this.selectButtonToggle(this.value);
    }

    this.checkChildren(this.disabled);

    this.listenChildren();
  }

  listenChildren() {
    this.buttonToggles?.forEach(toggle => {
      toggle.valueChange.pipe(takeUntil(this.destroy$)).subscribe(selectedToggleValue => {
        this.notifyChange(selectedToggleValue);
      });
    });
  }

  notifyChange(selectedToggleValue: any) {
    this.selectButtonToggle(selectedToggleValue);

    this.valueChange.emit(selectedToggleValue);
    this.onChangeCallback(selectedToggleValue);

    this.cdr.detectChanges();
  }

  selectButtonToggle(incomingValue: any): void {
    if (!this.buttonToggles) {
      return;
    }

    //before changing the active selection, calculate animation dimensions
    this.calcAnimationDimensions(incomingValue);

    this.clearButtonToggles();
    this.buttonToggles.forEach(toggle => {
      if (toggle.value !== undefined && toggle.value === incomingValue) {
        toggle.checked = true;
      }
    });
  }

  clearButtonToggles() {
    this.buttonToggles?.forEach(toggle => {
      toggle.checked = false;
    });
  }

  checkChildren(disabled: boolean) {
    this.buttonToggles?.forEach(toggle => {
      toggle.disabled = disabled;
      toggle.markForCheck();
    });
  }

  private calcAnimationDimensions(selectedToggleValue: any) {
    const newIncomingIndex = this.getToggleIndex(selectedToggleValue);

    let leftPosition = 0;
    this.buttonToggles.toArray().forEach((toggle, index) => {
      if (index < newIncomingIndex) {
        leftPosition += toggle.element?.nativeElement?.clientWidth || 0;
      }

      if (index === newIncomingIndex) {
        this.animationHolderWidth = toggle.element?.nativeElement.clientWidth - 4;
      }
    });

    this.leftPosition = leftPosition + (newIncomingIndex + 0.5) * 2;
  }

  private getToggleIndex(incomingValue) {
    return this.buttonToggles?.toArray().findIndex(toggle => {
      return toggle.value === incomingValue;
    });
  }
}
