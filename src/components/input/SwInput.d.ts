import { EventEmitter } from '@angular/core';
import './swInput.scss';
export declare class SwInput {
    id: string;
    name: any;
    value: string;
    label: string;
    onChange: EventEmitter<{}>;
    labelState: string;
    underlineState: string;
    focused: boolean;
    ngOnInit(): void;
    onKeyUp(event: any): void;
    onFocus(event: any): void;
    onBlur(event: any): void;
    updateState(): void;
}
