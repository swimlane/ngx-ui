import { ElementRef, HostListener, Directive } from '@angular/core';
var AutosizeDirective = (function () {
    function AutosizeDirective(element) {
        this.element = element;
    }
    AutosizeDirective.prototype.ngAfterContentChecked = function () {
        this.adjust();
    };
    AutosizeDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    AutosizeDirective.prototype.adjust = function () {
        this.element.nativeElement.style.overflow = 'hidden';
        this.element.nativeElement.style.height = 'auto';
        this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
    };
    return AutosizeDirective;
}());
export { AutosizeDirective };
AutosizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[autosize]'
            },] },
];
/** @nocollapse */
AutosizeDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
AutosizeDirective.propDecorators = {
    'onInput': [{ type: HostListener, args: ['input', ['$event.target'],] },],
};
//# sourceMappingURL=input-autosize.directive.js.map