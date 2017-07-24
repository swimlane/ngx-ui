import { Component, Input } from '@angular/core';
/**
 * TODO: Remove hidden when https://github.com/angular/angular/issues/18310 is resolved
 */
var TabComponent = (function () {
    function TabComponent() {
        this.title = '';
        this.active = false;
        this.disabled = false;
    }
    TabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-tab',
                    template: "\n    <div [hidden]=\"!active\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    host: {
                        class: 'ngx-tab'
                    }
                },] },
    ];
    /** @nocollapse */
    TabComponent.ctorParameters = function () { return []; };
    TabComponent.propDecorators = {
        'title': [{ type: Input },],
        'active': [{ type: Input },],
        'disabled': [{ type: Input },],
    };
    return TabComponent;
}());
export { TabComponent };
//# sourceMappingURL=tab.component.js.map