import { EventEmitter, OnInit } from '@angular/core';
import { InputTypes } from './input-types';
import './input.scss';
export declare class InputComponent implements OnInit {
    id: string;
    name: any;
    value: string;
    label: string;
    type: InputTypes;
    hint: string;
    required: boolean;
    passwordToggleEnabled: boolean;
    passwordTextVisible: boolean;
    onChange: EventEmitter<{}>;
    blur: EventEmitter<{}>;
    focus: EventEmitter<{}>;
    keyup: EventEmitter<{}>;
    click: EventEmitter<{}>;
    private labelState;
    private underlineState;
    private focused;
    ngOnInit(): void;
    onKeyUp(event: any): void;
    onFocus(event: any): void;
    onBlur(event: any): void;
    updateState(): void;
}
