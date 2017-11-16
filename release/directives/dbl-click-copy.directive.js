var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Output, EventEmitter, HostListener, ElementRef, HostBinding } from '@angular/core';
var DblClickCopyDirective = /** @class */ (function () {
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
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DblClickCopyDirective.prototype, "onCopy", void 0);
    __decorate([
        HostBinding('attr.title'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], DblClickCopyDirective.prototype, "title", null);
    __decorate([
        HostListener('dblclick', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DblClickCopyDirective.prototype, "onDblClick", null);
    DblClickCopyDirective = __decorate([
        Directive({ selector: '[dbl-click-copy]' }),
        __metadata("design:paramtypes", [ElementRef])
    ], DblClickCopyDirective);
    return DblClickCopyDirective;
}());
export { DblClickCopyDirective };
//# sourceMappingURL=dbl-click-copy.directive.js.map