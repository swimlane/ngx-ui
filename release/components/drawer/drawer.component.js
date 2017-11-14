import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { DrawerService } from './drawer.service';
var DrawerComponent = /** @class */ (function () {
    function DrawerComponent(drawerManager) {
        this.drawerManager = drawerManager;
    }
    Object.defineProperty(DrawerComponent.prototype, "size", {
        /**
         * Gets the size of the drawer
         *
         * @readonly
         * @type {number}
         * @memberOf DrawerComponent
         */
        get: /**
           * Gets the size of the drawer
           *
           * @readonly
           * @type {number}
           * @memberOf DrawerComponent
           */
        function () {
            return this._size;
        },
        set: /**
           * Size of the drawer. A percentage.
           *
           * @memberOf DrawerComponent
           */
        function (val) {
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
        get: /**
           * Is the drawer a left opening drawer
           *
           * @readonly
           * @type {boolean}
           * @memberOf DrawerComponent
           */
        function () {
            return this.direction === 'left';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawerComponent.prototype, "cssClasses", {
        get: /**
           * Gets the css classes for host
           *
           * @readonly
           * @type {string}
           * @memberOf DrawerComponent
           */
        function () {
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
        get: /**
           * Is the drawer a bottom of top drawer
           *
           * @readonly
           * @type {boolean}
           * @memberOf DrawerComponent
           */
        // @HostBinding('class.bottom-drawer')
        function () {
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
    /**
       * Sets the dimensions
       *
       * @param {number} size
       *
       * @memberOf DrawerComponent
       */
    DrawerComponent.prototype.setDimensions = /**
       * Sets the dimensions
       *
       * @param {number} size
       *
       * @memberOf DrawerComponent
       */
    function (size) {
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
    /**
       * On destroy callback
       *
       * @memberOf DrawerComponent
       */
    DrawerComponent.prototype.ngOnDestroy = /**
       * On destroy callback
       *
       * @memberOf DrawerComponent
       */
    function () {
        this.close.emit(true);
    };
    /**
       * Exit listener
       *
       * @memberOf DrawerComponent
       */
    DrawerComponent.prototype.onEscapeKey = /**
       * Exit listener
       *
       * @memberOf DrawerComponent
       */
    function () {
        this.close.emit(true);
    };
    return DrawerComponent;
}());
export { DrawerComponent };
//# sourceMappingURL=drawer.component.js.map