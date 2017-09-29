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
    SectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-section',
                    template: "\n    <section>\n      <header\n        [class.ngx-section-collapsible]=\"sectionCollapsible\"\n        class=\"ngx-section-header\"\n        *ngIf=\"headerComp || sectionTitle\">\n        <button\n          *ngIf=\"sectionCollapsible\"\n          class=\"ngx-section-toggle\"\n          (click)=\"onSectionClicked()\"\n          type=\"button\"\n          title=\"Toggle Content Visibility\">\n          <span\n            [class.icon-arrow-down]=\"!sectionCollapsed\"\n            [class.icon-arrow-right]=\"sectionCollapsed\">\n          </span>\n        </button>\n        <ng-content select=\"ngx-section-header\"></ng-content>\n        <h1 *ngIf=\"sectionTitle\" [innerHTML]=\"sectionTitle\"></h1>\n      </header>\n      <div class=\"ngx-section-content\" [style.padding]=\"padding\" *ngIf=\"!sectionCollapsed\">\n        <ng-content></ng-content>\n      </div>\n    </section>\n  ",
                    host: {
                        class: 'ngx-section'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./section.component.css'],
                },] },
    ];
    /** @nocollapse */
    SectionComponent.ctorParameters = function () { return []; };
    SectionComponent.propDecorators = {
        'sectionCollapsed': [{ type: Input },],
        'sectionCollapsible': [{ type: Input },],
        'sectionTitle': [{ type: Input },],
        'padding': [{ type: Input },],
        'toggle': [{ type: Output },],
        'headerComp': [{ type: ContentChild, args: [SectionHeaderComponent,] },],
    };
    return SectionComponent;
}());
export { SectionComponent };
//# sourceMappingURL=section.component.js.map