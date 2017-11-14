import { Component, Input, ContentChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SectionHeaderComponent } from './section-header.component';
var SectionComponent = /** @class */ (function () {
    function SectionComponent() {
    }
    SectionComponent.prototype.onSectionClicked = function () {
        this.sectionCollapsed = !this.sectionCollapsed;
        this.toggle.emit(this.sectionCollapsed);
    };
    return SectionComponent;
}());
export { SectionComponent };
//# sourceMappingURL=section.component.js.map