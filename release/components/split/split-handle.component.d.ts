import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
export declare class SplitHandleComponent {
    drag: EventEmitter<{
        x: number;
        y: number;
    }>;
    subscription: Subscription;
    onMousedown(): void;
    onMouseMove(event: any): void;
    onMouseup(): void;
}
