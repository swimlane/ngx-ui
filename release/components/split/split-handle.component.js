var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
var SplitHandleComponent = /** @class */ (function () {
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
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SplitHandleComponent.prototype, "drag", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SplitHandleComponent.prototype, "dragStart", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SplitHandleComponent.prototype, "dragEnd", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SplitHandleComponent.prototype, "dblclick", void 0);
    SplitHandleComponent = __decorate([
        Component({
            selector: '[ngxSplitHandle]',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n    <button\n      #splitHandle\n      (mousedown)=\"onMousedown($event)\"\n      (dblclick)=\"dblclick.emit($event)\"\n      class=\"icon-split-handle ngx-split-button\">\n    </button>\n  ",
            host: {
                class: 'ngx-split-handle'
            }
        })
    ], SplitHandleComponent);
    return SplitHandleComponent;
}());
export { SplitHandleComponent };
//# sourceMappingURL=split-handle.component.js.map