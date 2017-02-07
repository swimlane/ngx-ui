import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class CheckboxComponent implements ControlValueAccessor {
    id: string;
    name: string;
    tabindex: number;
    disabled: boolean;
    change: EventEmitter<{}>;
    blur: EventEmitter<{}>;
    focus: EventEmitter<{}>;
    value: boolean;
    private _value;
    onBlur(event: any): void;
    onChange(event: any): void;
    toggle(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onTouchedCallback;
    private onChangeCallback;
}
