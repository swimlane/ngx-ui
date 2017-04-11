import { Directive, Output, EventEmitter, HostListener, ElementRef, HostBinding } from '@angular/core';
var DblClickCopyDirective = (function () {
    function DblClickCopyDirective(element) {
        this.element = element;
        this.onCopy = new EventEmitter();
    }
    Object.defineProperty(DblClickCopyDirective.prototype, "title", {
        get: function () {
            return 'Double click to copy to clipboard';
        },
        enumerable: true,
        configurable: true
    });
    DblClickCopyDirective.prototype.onDblClick = function (event) {
        var selection = getSelection();
        var range = document.createRange();
        range.selectNodeContents(this.element.nativeElement);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        this.onCopy.emit(range);
        console.log("Copied " + range + " to your clipboard!");
    };
    return DblClickCopyDirective;
}());
export { DblClickCopyDirective };
DblClickCopyDirective.decorators = [
    { type: Directive, args: [{ selector: '[dbl-click-copy]' },] },
];
/** @nocollapse */
DblClickCopyDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
DblClickCopyDirective.propDecorators = {
    'onCopy': [{ type: Output },],
    'title': [{ type: HostBinding, args: ['attr.title',] },],
    'onDblClick': [{ type: HostListener, args: ['dblclick', ['$event'],] },],
};
//# sourceMappingURL=dbl-click-copy.directive.js.map