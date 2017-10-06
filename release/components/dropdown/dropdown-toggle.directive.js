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
    DropdownToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'ngx-dropdown-toggle',
                    host: {
                        class: 'ngx-dropdown-toggle'
                    }
                },] },
    ];
    /** @nocollapse */
    DropdownToggleDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    DropdownToggleDirective.propDecorators = {
        'disabled': [{ type: HostBinding, args: ['class.disabled',] }, { type: Input },],
        'toggle': [{ type: Output },],
        'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
    };
    return DropdownToggleDirective;
}());
export { DropdownToggleDirective };
//# sourceMappingURL=dropdown-toggle.directive.js.map