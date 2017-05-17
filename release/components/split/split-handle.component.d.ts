import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
export declare class SplitHandleComponent {
    drag: EventEmitter<{
        x: number;
        y: number;
    }>;
    dragStart: EventEmitter<any>;
    dragEnd: EventEmitter<any>;
    dblclick: EventEmitter<any>;
    subscription: Subscription;
    onMousedown(ev: any): void;
    onMouseMove(ev: any): void;
    onMouseup(ev: any): void;
}
