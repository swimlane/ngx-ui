import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding, } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
var LongPressButtonComponent = /** @class */ (function () {
    function LongPressButtonComponent() {
        this.disabled = false;
        this.duration = 3000;
        this.icon = 'mouse';
        this.submitted = false;
        this.active = true;
        this._disabled = false;
        this.longPress = new EventEmitter();
        this.pressed = false;
        this._state = 'active';
    }
    LongPressButtonComponent.prototype.getState = function () {
        if (this.state) {
            return this.state;
        }
        return this._state;
    };
    LongPressButtonComponent.prototype.ngOnInit = function () {
        this.updateState();
    };
    LongPressButtonComponent.prototype.ngOnChanges = function () {
        this._disabled = this.disabled;
        this.updateState();
    };
    LongPressButtonComponent.prototype.updateState = function () {
        var _this = this;
        var currentState = this.getState();
        if (!currentState) {
            this._state = 'active';
        }
        this.submitted = false;
        this.active = false;
        switch (currentState) {
            case 'submitted':
                this.submitted = true;
                break;
            default:
                this.active = true;
                break;
        }
        if (this.submitted) {
            this._disabled = true;
            clearTimeout(this.lastTimeout);
            this.lastTimeout = setTimeout(function () {
                _this._state = 'active';
                _this._disabled = _this.disabled;
                _this.updateState();
            }, 3000);
        }
    };
    LongPressButtonComponent.prototype.onLongPressStart = function (event) {
        if (!this._disabled) {
            this.pressed = true;
        }
    };
    LongPressButtonComponent.prototype.onLongPressFinish = function (event) {
        if (!this._disabled) {
            this.pressed = false;
            this.longPress.emit(event);
            this._state = 'submitted';
            this.updateState();
        }
    };
    LongPressButtonComponent.prototype.onLongPressCancel = function (event) {
        this.pressed = false;
    };
    LongPressButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-long-press-button',
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./long-press-button.component.css'],
                    host: { class: 'ngx-long-press' },
                    template: "\n    <div long-press\n      [duration]=\"duration\"\n      [disabled]=\"_disabled\"\n      (longPressStart)=\"onLongPressStart($event)\"\n      (longPressFinish)=\"onLongPressFinish($event)\"\n      (longPressCancel)=\"onLongPressCancel($event)\">\n      <span class=\"inner-background\"></span>\n      <svg viewBox='-170 -170 340 340'>\n        <g transform=\"rotate(-90)\">\n          <circle\n            class=\"loading-circle\"\n            *ngIf=\"getState() !== 'submitted'\"\n            r=\"160\"\n            [@circleAnimation]=\"{value: pressed ? 'active' : 'inactive', params: { duration: duration }}\"\n          />\n          <circle\n            class=\"full-circle\"\n            *ngIf=\"getState() === 'submitted'\"\n            r=\"160\"\n          />\n        </g>\n      </svg>\n      <button [disabled]=\"_disabled\">\n        <ngx-icon *ngIf=\"getState() === 'active'\" class=\"icon\" [fontIcon]=\"icon\"></ngx-icon>\n        <ngx-icon *ngIf=\"getState() === 'submitted'\" class=\"icon\" fontIcon=\"check\"></ngx-icon>\n      </button>\n    </div>\n  ",
                    animations: [
                        trigger('circleAnimation', [
                            state('active', style({
                                strokeDasharray: '1000 1000'
                            })),
                            state('inactive', style({
                                strokeDasharray: '0 1000'
                            })),
                            transition('inactive => active', animate("{{ duration }}ms ease-out"), { params: { duration: 1000 } })
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    LongPressButtonComponent.ctorParameters = function () { return []; };
    LongPressButtonComponent.propDecorators = {
        'disabled': [{ type: Input },],
        'state': [{ type: Input },],
        'duration': [{ type: Input },],
        'icon': [{ type: Input },],
        'submitted': [{ type: HostBinding, args: ['class.submitted',] },],
        'active': [{ type: HostBinding, args: ['class.active',] },],
        '_disabled': [{ type: HostBinding, args: ['class.disabled-button',] },],
        'longPress': [{ type: Output },],
    };
    return LongPressButtonComponent;
}());
export { LongPressButtonComponent };
//# sourceMappingURL=long-press-button.component.js.map