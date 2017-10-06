import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ViewEncapsulation } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { DrawerService } from './drawer.service';
var DrawerComponent = /** @class */ (function () {
    function DrawerComponent(drawerManager) {
        this.drawerManager = drawerManager;
        /**
         * CSS Class
         *
         * @type {string}
         * @memberOf DrawerComponent
         */
        this.cssClass = '';
        /**
         * Drawer close event
         *
         * @memberOf DrawerComponent
         */
        this.close = new EventEmitter();
    }
    Object.defineProperty(DrawerComponent.prototype, "size", {
        /**
         * Gets the size of the drawer
         *
         * @readonly
         * @type {number}
         * @memberOf DrawerComponent
         */
        get: function () {
            return this._size;
        },
        /**
         * Size of the drawer. A percentage.
         *
         * @memberOf DrawerComponent
         */
        set: function (val) {
            this._size = val;
            this.setDimensions(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerComponent.prototype, "isLeft", {
        /**
         * Is the drawer a left opening drawer
         *
         * @readonly
         * @type {boolean}
         * @memberOf DrawerComponent
         */
        get: function () {
            return this.direction === 'left';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerComponent.prototype, "cssClasses", {
        /**
         * Gets the css classes for host
         *
         * @readonly
         * @type {string}
         * @memberOf DrawerComponent
         */
        get: function () {
            var clz = 'ngx-drawer';
            clz += " " + this.cssClass;
            if (this.isLeft)
                clz += ' left-drawer';
            if (this.isBottom)
                clz += ' bottom-drawer';
            return clz;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerComponent.prototype, "isBottom", {
        /**
         * Is the drawer a bottom of top drawer
         *
         * @readonly
         * @type {boolean}
         * @memberOf DrawerComponent
         */
        // @HostBinding('class.bottom-drawer')
        get: function () {
            return this.direction === 'bottom';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the dimensions
     *
     * @param {number} size
     *
     * @memberOf DrawerComponent
     */
    DrawerComponent.prototype.setDimensions = function (size) {
        var _this = this;
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;
        var height;
        var width;
        var transform;
        if (this.isLeft) {
            if (size) {
                var innerWidth_1 = size || winWidth;
                var widthPercent = (innerWidth_1 / 100) * winWidth;
                var newWidth = Math.ceil(widthPercent);
                height = '100%';
                width = newWidth + "px";
                transform = "translate(-" + width + ", 0px)";
            }
            else {
                transform = 'translate(100%, 0)';
            }
        }
        else if (this.isBottom) {
            if (size) {
                var innerHeight_1 = size || winHeight;
                var heightPercent = (innerHeight_1 / 100) * winHeight;
                var newHeight = Math.ceil(heightPercent);
                width = '100%';
                height = newHeight + "px";
                transform = "translate(0px, -" + height + ")";
            }
            else {
                transform = 'translate(0, 100%)';
            }
        }
        setTimeout(function () {
            _this.heightSize = height;
            _this.widthSize = width;
            _this.transform = transform;
        }, 10);
    };
    /**
     * On destroy callback
     *
     * @memberOf DrawerComponent
     */
    DrawerComponent.prototype.ngOnDestroy = function () {
        this.close.emit(true);
    };
    /**
     * Exit listener
     *
     * @memberOf DrawerComponent
     */
    DrawerComponent.prototype.onEscapeKey = function () {
        this.close.emit(true);
    };
    DrawerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-drawer',
                    template: "\n    <div class=\"ngx-drawer-content\">\n      <ng-template\n        [ngTemplateOutlet]=\"template\"\n        [ngOutletContext]=\"{ manager: drawerManager, context: context }\">\n      </ng-template>\n    </div>\n  ",
                    host: {
                        role: 'dialog',
                        tabindex: '-1'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styleUrls: ['./drawer.component.css'],
                    animations: [
                        trigger('drawerTransition', [
                            state('left', style({
                                transform: 'translateX(0%)'
                            })),
                            state('bottom', style({
                                transform: 'translateY(0%)'
                            })),
                            transition('void => left', [
                                style({ transform: 'translateX(100%)' }),
                                animate('150ms ease-out')
                            ]),
                            transition('left => void', [
                                animate('150ms ease-out', style({ transform: 'translateX(100%)' }))
                            ]),
                            transition('void => bottom', [
                                style({ transform: 'translateY(100%)' }),
                                animate('150ms ease-out')
                            ]),
                            transition('bottom => void', [
                                animate('150ms ease-out', style({ transform: 'translateY(100%)' }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    DrawerComponent.ctorParameters = function () { return [
        { type: DrawerService, },
    ]; };
    DrawerComponent.propDecorators = {
        'cssClass': [{ type: Input },],
        'direction': [{ type: HostBinding, args: ['@drawerTransition',] }, { type: Input },],
        'template': [{ type: Input },],
        'size': [{ type: Input },],
        'zIndex': [{ type: HostBinding, args: ['style.zIndex',] }, { type: Input },],
        'context': [{ type: Input },],
        'close': [{ type: Output },],
        'transform': [{ type: HostBinding, args: ['style.transform',] },],
        'widthSize': [{ type: HostBinding, args: ['style.width',] },],
        'heightSize': [{ type: HostBinding, args: ['style.height',] },],
        'cssClasses': [{ type: HostBinding, args: ['class',] },],
        'onEscapeKey': [{ type: HostListener, args: ['keyup.esc',] },],
    };
    return DrawerComponent;
}());
export { DrawerComponent };
//# sourceMappingURL=drawer.component.js.map