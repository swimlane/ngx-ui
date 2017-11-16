var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ContentChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SectionHeaderComponent } from './section-header.component';
var SectionComponent = /** @class */ (function () {
    function SectionComponent() {
        this.sectionCollapsed = false;
        this.sectionCollapsible = true;
        this.padding = '1.8em';
        this.toggle = new EventEmitter();
    }
    SectionComponent.prototype.onSectionClicked = function () {
        this.sectionCollapsed = !this.sectionCollapsed;
        this.toggle.emit(this.sectionCollapsed);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SectionComponent.prototype, "sectionCollapsed", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SectionComponent.prototype, "sectionCollapsible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SectionComponent.prototype, "sectionTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SectionComponent.prototype, "padding", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SectionComponent.prototype, "toggle", void 0);
    __decorate([
        ContentChild(SectionHeaderComponent),
        __metadata("design:type", SectionHeaderComponent)
    ], SectionComponent.prototype, "headerComp", void 0);
    SectionComponent = __decorate([
        Component({
            selector: 'ngx-section',
            template: "\n    <section>\n      <header\n        [class.ngx-section-collapsible]=\"sectionCollapsible\"\n        class=\"ngx-section-header\"\n        *ngIf=\"headerComp || sectionTitle\">\n        <button\n          *ngIf=\"sectionCollapsible\"\n          class=\"ngx-section-toggle\"\n          (click)=\"onSectionClicked()\"\n          type=\"button\"\n          title=\"Toggle Content Visibility\">\n          <span\n            [class.icon-arrow-down]=\"!sectionCollapsed\"\n            [class.icon-arrow-right]=\"sectionCollapsed\">\n          </span>\n        </button>\n        <ng-content select=\"ngx-section-header\"></ng-content>\n        <h1 *ngIf=\"sectionTitle\" [innerHTML]=\"sectionTitle\"></h1>\n      </header>\n      <div class=\"ngx-section-content\" [style.padding]=\"padding\" *ngIf=\"!sectionCollapsed\">\n        <ng-content></ng-content>\n      </div>\n    </section>\n  ",
            host: {
                class: 'ngx-section'
            },
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./section.component.css'],
        })
    ], SectionComponent);
    return SectionComponent;
}());
export { SectionComponent };
//# sourceMappingURL=section.component.js.map