var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef, HostListener, EventEmitter, Output, HostBinding } from '@angular/core';
var DropdownToggleDirective = /** @class */ (function () {
    function DropdownToggleDirective(element) {
        this.disabled = false;
        this.toggle = new EventEmitter();
        this.element = element.nativeElement;
    }
    DropdownToggleDirective.prototype.onClick = function (event) {
        event.preventDefault();
        this.toggle.emit(event);
    };
    __decorate([
        HostBinding('class.disabled'),
        Input(),
        __metadata("design:type", Object)
    ], DropdownToggleDirective.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DropdownToggleDirective.prototype, "toggle", void 0);
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DropdownToggleDirective.prototype, "onClick", null);
    DropdownToggleDirective = __decorate([
        Directive({
            selector: 'ngx-dropdown-toggle',
            host: {
                class: 'ngx-dropdown-toggle'
            }
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], DropdownToggleDirective);
    return DropdownToggleDirective;
}());
export { DropdownToggleDirective };
//# sourceMappingURL=dropdown-toggle.directive.js.map