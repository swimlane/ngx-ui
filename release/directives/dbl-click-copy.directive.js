import { Directive, Output, EventEmitter, HostListener, ElementRef, HostBinding } from '@angular/core';
var DblClickCopyDirective = /** @class */ (function () {
    function DblClickCopyDirective(element) {
        this.element = element;
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
//# sourceMappingURL=dbl-click-copy.directive.js.map