import { AfterContentInit, QueryList, ElementRef } from '@angular/core';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';
export declare class SplitComponent implements AfterContentInit {
    private elementRef;
    direction: string;
    readonly mainCss: boolean;
    readonly rowCss: boolean;
    readonly columnCss: boolean;
    handle: SplitHandleComponent;
    areas: QueryList<SplitAreaDirective>;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    onDrag({x, y}: {
        x: any;
        y: any;
    }): void;
}
