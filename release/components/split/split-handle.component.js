import { Component, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
var SplitHandleComponent = /** @class */ (function () {
    function SplitHandleComponent() {
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
    return SplitHandleComponent;
}());
export { SplitHandleComponent };
//# sourceMappingURL=split-handle.component.js.map