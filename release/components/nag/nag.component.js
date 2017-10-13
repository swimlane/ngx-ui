import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
var NagComponent = /** @class */ (function () {
    function NagComponent() {
        this.cssClass = '';
        this.state = 'closed';
        this.stateChanged = new EventEmitter();
        this.title = '';
    }
    Object.defineProperty(NagComponent.prototype, "klass", {
        get: function () {
            return "ngx-nag ngx-nag-bottom ngx-nag-" + this.state + " " + this.cssClass;
        },
        enumerable: true,
        configurable: true
    });
    NagComponent.prototype.toggle = function () {
        this.state = this.state !== 'open' ? 'open' : 'closed';
        this.stateChanged.emit(this.state);
    };
    NagComponent.prototype.ngOnDestroy = function () {
        this.stateChanged.emit(this.state);
    };
    NagComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.watch && this.state === 'closed') {
            this.state = 'peek';
            setTimeout(function () {
                _this.state = 'closed';
            }, 100);
        }
    };
    NagComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-nag',
                    template: "\n    <div class=\"ngx-nag-content\">\n      <ngx-toolbar\n        class=\"ngx-nag-toolbar\"\n        (click)=\"toggle()\"\n        [title]=\"title\">\n        <ngx-toolbar-title *ngIf=\"!title\">\n          <ng-content select=\"[ngx-nag-title]\"></ng-content>\n        </ngx-toolbar-title>\n        <ngx-toolbar-content>\n          <ngx-icon class=\"ngx-nag-icon\" fontIcon=\"down\"></ngx-icon>\n        </ngx-toolbar-content>\n      </ngx-toolbar>\n      <section class=\"ngx-nag-body ngx-section-content\">\n        <ng-content></ng-content>\n      </section>\n    </div>\n  ",
                    host: {
                        role: 'dialog',
                        tabindex: '-1'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./nag.component.css'],
                    animations: [
                        trigger('drawerTransition', [
                            state('void', style({
                                transform: 'translateY(0)'
                            })),
                            state('closed', style({
                                transform: 'translateY(-50px)'
                            })),
                            state('peek', style({
                                transform: 'translateY(-70px)'
                            })),
                            state('open', style({
                                transform: 'translateY(-100%)'
                            })),
                            transition('* => *', animate('300ms ease-out')),
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    NagComponent.ctorParameters = function () { return []; };
    NagComponent.propDecorators = {
        'cssClass': [{ type: Input },],
        'state': [{ type: HostBinding, args: ['@drawerTransition',] }, { type: Input },],
        'stateChanged': [{ type: Output },],
        'zIndex': [{ type: HostBinding, args: ['style.zIndex',] }, { type: Input },],
        'title': [{ type: Input },],
        'watch': [{ type: Input },],
        'klass': [{ type: HostBinding, args: ['class',] },],
    };
    return NagComponent;
}());
export { NagComponent };
//# sourceMappingURL=nag.component.js.map