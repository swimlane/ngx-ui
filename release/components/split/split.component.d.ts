import { AfterContentInit, QueryList, ElementRef } from '@angular/core';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';
export declare class SplitComponent implements AfterContentInit {
    private elementRef;
    direction: string;
    readonly mainCss: boolean;
    readonly rowCss: boolean;
    readonly columnCss: boolean;
    handles: QueryList<SplitHandleComponent>;
    areas: QueryList<SplitAreaDirective>;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    onDblClick(ev: any): void;
    onDrag({movementX, movementY}: {
        movementX: any;
        movementY: any;
    }): void;
    resize(delta: number): void;
}
