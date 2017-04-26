import { Component, Output, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';
var SplitHandleComponent = (function () {
    function SplitHandleComponent() {
    }
    SplitHandleComponent.prototype.ngAfterContentInit = function () {
        var getMouseEventPosition = function (event) { return ({ x: event.movementX, y: event.movementY }); };
        var mousedown$ = Observable.fromEvent(this.button.nativeElement, 'mousedown').map(getMouseEventPosition);
        var mousemove$ = Observable.fromEvent(document, 'mousemove').map(getMouseEventPosition);
        var mouseup$ = Observable.fromEvent(document, 'mouseup');
        this.drag = mousedown$
            .switchMap(function (mousedown) {
            return mousemove$.map(function (mousemove) { return ({
                x: mousemove.x,
                y: mousemove.y
            }); })
                .takeUntil(mouseup$);
        });
    };
    return SplitHandleComponent;
}());
export { SplitHandleComponent };
SplitHandleComponent.decorators = [
    { type: Component, args: [{
                selector: '[ngxSplitHandle]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: "\n    <button\n      #splitHandle\n      class=\"icon-split-handle ngx-split-button\">\n    </button>\n  ",
                host: {
                    class: 'ngx-split-handle'
                }
            },] },
];
/** @nocollapse */
SplitHandleComponent.ctorParameters = function () { return []; };
SplitHandleComponent.propDecorators = {
    'button': [{ type: ViewChild, args: ['splitHandle',] },],
    'drag': [{ type: Output },],
};
//# sourceMappingURL=split-handle.component.js.map