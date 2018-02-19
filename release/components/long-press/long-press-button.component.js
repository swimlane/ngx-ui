var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding, } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
var LongPressButtonComponent = /** @class */ (function () {
    function LongPressButtonComponent() {
        this.disabled = false;
        this.duration = 3000;
        this.icon = 'mouse-hold';
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
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LongPressButtonComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LongPressButtonComponent.prototype, "state", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], LongPressButtonComponent.prototype, "duration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LongPressButtonComponent.prototype, "icon", void 0);
    __decorate([
        HostBinding('class.submitted'),
        __metadata("design:type", Boolean)
    ], LongPressButtonComponent.prototype, "submitted", void 0);
    __decorate([
        HostBinding('class.active'),
        __metadata("design:type", Boolean)
    ], LongPressButtonComponent.prototype, "active", void 0);
    __decorate([
        HostBinding('class.disabled-button'),
        __metadata("design:type", Boolean)
    ], LongPressButtonComponent.prototype, "_disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], LongPressButtonComponent.prototype, "longPress", void 0);
    LongPressButtonComponent = __decorate([
        Component({
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
        })
    ], LongPressButtonComponent);
    return LongPressButtonComponent;
}());
export { LongPressButtonComponent };
//# sourceMappingURL=long-press-button.component.js.map