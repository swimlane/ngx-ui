var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        HostListener('input', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], AutosizeDirective.prototype, "onInput", null);
    AutosizeDirective = __decorate([
        Directive({
            selector: 'textarea[autosize]'
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer])
    ], AutosizeDirective);
    return AutosizeDirective;
}());
export { AutosizeDirective };
//# sourceMappingURL=input-autosize.directive.js.map