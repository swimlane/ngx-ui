var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
var LongPressDirective = /** @class */ (function () {
    function LongPressDirective() {
        this.duration = 3000;
        this.disabled = false;
        this.longPressStart = new EventEmitter();
        this.longPressFinish = new EventEmitter();
        this.longPressCancel = new EventEmitter();
        this.pressed = false;
    }
    LongPressDirective.prototype.onPress = function (event) {
        var _this = this;
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
        this.pressed = true;
        this.longPressStart.emit(true);
        this.pressTimeout = setTimeout(function () {
            if (_this.pressed) {
                _this.pressed = false;
                _this.longPressFinish.emit(true);
            }
        }, this.duration);
    };
    LongPressDirective.prototype.onRelease = function (event) {
        this.pressed = false;
        clearTimeout(this.pressTimeout);
        this.longPressCancel.emit(true);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LongPressDirective.prototype, "duration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LongPressDirective.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LongPressDirective.prototype, "longPressStart", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LongPressDirective.prototype, "longPressFinish", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LongPressDirective.prototype, "longPressCancel", void 0);
    __decorate([
        HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], LongPressDirective.prototype, "onPress", null);
    __decorate([
        HostListener('mouseout', ['$event']),
        HostListener('mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], LongPressDirective.prototype, "onRelease", null);
    LongPressDirective = __decorate([
        Directive({ selector: '[long-press]' })
    ], LongPressDirective);
    return LongPressDirective;
}());
export { LongPressDirective };
//# sourceMappingURL=long-press.directive.js.map