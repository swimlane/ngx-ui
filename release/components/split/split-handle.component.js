import { Component, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
var SplitHandleComponent = (function () {
    function SplitHandleComponent() {
        this.drag = new EventEmitter();
    }
    SplitHandleComponent.prototype.onMousedown = function () {
        var _this = this;
        var mouseup$ = Observable.fromEvent(document, 'mouseup');
        this.subscription = mouseup$
            .subscribe(function (ev) { return _this.onMouseup(); });
        var mousemove$ = Observable.fromEvent(document, 'mousemove')
            .takeUntil(mouseup$)
            .subscribe(function (event) { return _this.onMouseMove(event); });
        this.subscription.add(mousemove$);
    };
    SplitHandleComponent.prototype.onMouseMove = function (event) {
        this.drag.emit({
            x: event.movementX,
            y: event.movementY
        });
    };
    SplitHandleComponent.prototype.onMouseup = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    return SplitHandleComponent;
}());
export { SplitHandleComponent };
SplitHandleComponent.decorators = [
    { type: Component, args: [{
                selector: '[ngxSplitHandle]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: "\n    <button\n      #splitHandle\n      (mousedown)=\"onMousedown()\"\n      class=\"icon-split-handle ngx-split-button\">\n    </button>\n  ",
                host: {
                    class: 'ngx-split-handle'
                }
            },] },
];
/** @nocollapse */
SplitHandleComponent.ctorParameters = function () { return []; };
SplitHandleComponent.propDecorators = {
    'drag': [{ type: Output },],
};
//# sourceMappingURL=split-handle.component.js.map