import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { RadioButtonGroupComponent } from './radiobutton-group.component';
export declare class RadioButtonComponent implements ControlValueAccessor {
    radioGroup: RadioButtonGroupComponent;
    _uniqueId: string;
    id: string;
    name: string;
    tabindex: number;
    change: EventEmitter<{}>;
    blur: EventEmitter<{}>;
    focus: EventEmitter<{}>;
    checked: boolean;
    value: boolean;
    disabled: boolean;
    private _checked;
    private _value;
    private _disabled;
    constructor(radioGroup: RadioButtonGroupComponent);
    ngOnInit(): void;
    _onInputChange(event: Event): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
}
