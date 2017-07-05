import { Component, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
var SplitHandleComponent = (function () {
    function SplitHandleComponent() {
        this.drag = new EventEmitter();
        this.dragStart = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.dblclick = new EventEmitter();
    }
    SplitHandleComponent.prototype.onMousedown = function (ev) {
        var _this = this;
        var mouseup$ = Observable.fromEvent(document, 'mouseup');
        this.subscription = mouseup$
            .subscribe(function (e) { return _this.onMouseup(e); });
        var mousemove$ = Observable.fromEvent(document, 'mousemove')
            .takeUntil(mouseup$)
            .subscribe(function (e) { return _this.onMouseMove(e); });
        this.subscription.add(mousemove$);
        this.dragStart.emit(ev);
    };
    SplitHandleComponent.prototype.onMouseMove = function (ev) {
        this.drag.emit(ev);
    };
    SplitHandleComponent.prototype.onMouseup = function (ev) {
        if (this.subscription) {
            this.dragEnd.emit(ev);
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    SplitHandleComponent.decorators = [
        { type: Component, args: [{
                    selector: '[ngxSplitHandle]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <button\n      #splitHandle\n      (mousedown)=\"onMousedown($event)\"\n      (dblclick)=\"dblclick.emit($event)\"\n      class=\"icon-split-handle ngx-split-button\">\n    </button>\n  ",
                    host: {
                        class: 'ngx-split-handle'
                    }
                },] },
    ];
    /** @nocollapse */
    SplitHandleComponent.ctorParameters = function () { return []; };
    SplitHandleComponent.propDecorators = {
        'drag': [{ type: Output },],
        'dragStart': [{ type: Output },],
        'dragEnd': [{ type: Output },],
        'dblclick': [{ type: Output },],
    };
    return SplitHandleComponent;
}());
export { SplitHandleComponent };
//# sourceMappingURL=split-handle.component.js.map