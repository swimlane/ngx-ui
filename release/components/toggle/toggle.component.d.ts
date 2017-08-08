import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class ToggleComponent implements ControlValueAccessor {
    id: string;
    name: string;
    disabled: boolean;
    required: boolean;
    tabIndex: number;
    label: string;
    value: boolean;
    change: EventEmitter<{}>;
    private readonly getHostCssClasses;
    private readonly getDisabled;
    private _value;
    toggle(): void;
    onBlur(): void;
    onChange(): void;
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onTouchedCallback;
    private onChangeCallback;
}
