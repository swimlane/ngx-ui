import { EventEmitter } from '@angular/core';
export declare class LongPressDirective {
    duration: number;
    disabled: boolean;
    longPressStart: EventEmitter<any>;
    longPressFinish: EventEmitter<any>;
    longPressCancel: EventEmitter<any>;
    pressed: boolean;
    pressTimeout: any;
    onPress(event: any): void;
    onRelease(event: any): void;
}
