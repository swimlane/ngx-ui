import { Component, Input, ViewEncapsulation } from '@angular/core';
var LoadingComponent = (function () {
    function LoadingComponent() {
        this.visible = false;
        this.progress = 0;
    }
    LoadingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-loading-bar',
                    template: "\n    <div class=\"ngx-loading-bar\" [hidden]=\"!visible\">\n      <div \n        class=\"ngx-loading-bar-bar\"\n        [style.width.%]=\"progress\">\n      </div>\n    </div>\n  ",
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./loading.component.scss']
                },] },
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = function () { return []; };
    LoadingComponent.propDecorators = {
        'visible': [{ type: Input },],
        'progress': [{ type: Input },],
    };
    return LoadingComponent;
}());
export { LoadingComponent };
//# sourceMappingURL=loading.component.js.map