import { Directive, Input, ElementRef, HostListener, EventEmitter, Output, HostBinding } from '@angular/core';
var DropdownToggleDirective = /** @class */ (function () {
    function DropdownToggleDirective(element) {
        this.element = element.nativeElement;
    }
    DropdownToggleDirective.prototype.onClick = function (event) {
        event.preventDefault();
        this.toggle.emit(event);
    };
    return DropdownToggleDirective;
}());
export { DropdownToggleDirective };
//# sourceMappingURL=dropdown-toggle.directive.js.map