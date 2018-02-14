import { EventEmitter, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { RadioButtonComponent } from './radiobutton.component';
export declare class RadioButtonGroupComponent implements ControlValueAccessor {
    _uniqueId: string;
    id: string;
    tabindex: number;
    disabled: boolean;
    change: EventEmitter<{}>;
    blur: EventEmitter<{}>;
    focus: EventEmitter<{}>;
    _radios: QueryList<RadioButtonComponent>;
    value: any;
    name: string;
    readonly selected: RadioButtonComponent;
    private _name;
    private _value;
    private _selected;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
    private _updateRadioButtonNames();
    private _updateSelectedRadioFromValue();
}
