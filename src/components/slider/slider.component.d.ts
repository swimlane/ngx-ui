import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import './slider.scss';
export declare class SliderComponent implements ControlValueAccessor {
    id: string;
    min: number;
    max: number;
    step: number;
    orientation: string;
    filled: boolean;
    multiple: boolean;
    showTicks: boolean;
    tickStep: any;
    _value: any;
    count: any[];
    active: boolean;
    value: any;
    change: EventEmitter<{}>;
    readonly isFilled: boolean;
    readonly isHorizontal: boolean;
    readonly isVertical: boolean;
    readonly isActive: boolean;
    readonly percent: number;
    getCount(): any[];
    getFill(): {
        'background-size': string;
    };
    onMouseDown(): void;
    onMouseUp(): void;
    ngOnInit(): void;
    onChange(event: any): void;
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onTouchedCallback;
    private onChangeCallback;
}
