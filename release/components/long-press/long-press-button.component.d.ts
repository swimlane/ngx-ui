import { EventEmitter, OnInit, OnChanges } from '@angular/core';
export declare class LongPressButtonComponent implements OnInit, OnChanges {
    disabled: boolean;
    state: string;
    duration: number;
    icon: string;
    submitted: boolean;
    active: boolean;
    _disabled: boolean;
    longPress: EventEmitter<any>;
    lastTimeout: any;
    pressed: boolean;
    _state: string;
    getState(): string;
    ngOnInit(): void;
    ngOnChanges(): void;
    updateState(): void;
    onLongPressStart(event: any): void;
    onLongPressFinish(event: any): void;
    onLongPressCancel(event: any): void;
}
