import { ElementRef, HostListener, Directive, Renderer } from '@angular/core';
var AutosizeDirective = /** @class */ (function () {
    function AutosizeDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    AutosizeDirective.prototype.ngAfterContentChecked = function () {
        this.adjust();
    };
    AutosizeDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    AutosizeDirective.prototype.adjust = function () {
        var height = this.element.nativeElement.scrollHeight + 'px';
        this.renderer.setElementStyle(this.element.nativeElement, 'overflow', 'hidden');
        this.renderer.setElementStyle(this.element.nativeElement, 'height', height);
    };
    AutosizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'textarea[autosize]'
                },] },
    ];
    /** @nocollapse */
    AutosizeDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    AutosizeDirective.propDecorators = {
        'onInput': [{ type: HostListener, args: ['input', ['$event.target'],] },],
    };
    return AutosizeDirective;
}());
export { AutosizeDirective };
//# sourceMappingURL=input-autosize.directive.js.map