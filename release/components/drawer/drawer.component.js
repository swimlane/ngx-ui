var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ViewEncapsulation } from '@angular/core';
import { trigger } from '@angular/animations';
import { DrawerService } from './drawer.service';
import { drawerTransition } from '../../animations';
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DrawerComponent.prototype, "cssClass", void 0);
    __decorate([
        HostBinding('@drawerTransition'),
        Input(),
        __metadata("design:type", String)
    ], DrawerComponent.prototype, "direction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DrawerComponent.prototype, "template", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DrawerComponent.prototype, "size", null);
    __decorate([
        HostBinding('style.zIndex'),
        Input(),
        __metadata("design:type", Number)
    ], DrawerComponent.prototype, "zIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DrawerComponent.prototype, "context", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DrawerComponent.prototype, "close", void 0);
    __decorate([
        HostBinding('style.transform'),
        __metadata("design:type", String)
    ], DrawerComponent.prototype, "transform", void 0);
    __decorate([
        HostBinding('style.width'),
        __metadata("design:type", Object)
    ], DrawerComponent.prototype, "widthSize", void 0);
    __decorate([
        HostBinding('style.height'),
        __metadata("design:type", Object)
    ], DrawerComponent.prototype, "heightSize", void 0);
    __decorate([
        HostBinding('class'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], DrawerComponent.prototype, "cssClasses", null);
    __decorate([
        HostListener('keyup.esc'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DrawerComponent.prototype, "onEscapeKey", null);
    DrawerComponent = __decorate([
        Component({
            selector: 'ngx-drawer',
            template: "\n    <div class=\"ngx-drawer-content\">\n      <ng-template\n        [ngTemplateOutlet]=\"template\"\n        [ngTemplateOutletContext]=\"{ manager: drawerManager, context: context }\">\n      </ng-template>\n    </div>\n  ",
            host: {
                role: 'dialog',
                tabindex: '-1'
            },
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./drawer.component.css'],
            animations: [
                trigger('drawerTransition', drawerTransition)
            ]
        }),
        __metadata("design:paramtypes", [DrawerService])
    ], DrawerComponent);
    return DrawerComponent;
}());
export { DrawerComponent };
//# sourceMappingURL=drawer.component.js.map