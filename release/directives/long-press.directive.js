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
    LongPressDirective.decorators = [
        { type: Directive, args: [{ selector: '[long-press]' },] },
    ];
    /** @nocollapse */
    LongPressDirective.ctorParameters = function () { return []; };
    LongPressDirective.propDecorators = {
        'duration': [{ type: Input },],
        'disabled': [{ type: Input },],
        'longPressStart': [{ type: Output },],
        'longPressFinish': [{ type: Output },],
        'longPressCancel': [{ type: Output },],
        'onPress': [{ type: HostListener, args: ['mousedown', ['$event'],] },],
        'onRelease': [{ type: HostListener, args: ['mouseout', ['$event'],] }, { type: HostListener, args: ['mouseup', ['$event'],] },],
    };
    return LongPressDirective;
}());
export { LongPressDirective };
//# sourceMappingURL=long-press.directive.js.map