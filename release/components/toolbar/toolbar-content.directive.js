var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Directive } from '@angular/core';
/**
 * Toolbar Content Directive
 * See: https://github.com/angular/angular/issues/11251
 */
var ToolbarContentDirective = /** @class */ (function () {
    function ToolbarContentDirective() {
    }
    ToolbarContentDirective = __decorate([
        Directive({ selector: 'ngx-toolbar-content' })
    ], ToolbarContentDirective);
    return ToolbarContentDirective;
}());
export { ToolbarContentDirective };
//# sourceMappingURL=toolbar-content.directive.js.map