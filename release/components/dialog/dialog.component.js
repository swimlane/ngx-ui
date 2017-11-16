var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, Renderer, ElementRef, HostListener, trigger, style, animate, transition, state, ViewEncapsulation } from '@angular/core';
var DialogComponent = /** @class */ (function () {
    function DialogComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.open = new EventEmitter();
        this.close = new EventEmitter();
    }
    Object.defineProperty(DialogComponent.prototype, "contentzIndex", {
        get: function () {
            return this.zIndex + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogComponent.prototype, "visibleState", {
        get: function () {
            return this.visible ? 'active' : 'inactive';
        },
        enumerable: true,
        configurable: true
    });
    DialogComponent.prototype.ngOnInit = function () {
        if (this.visible)
            this.show();
    };
    DialogComponent.prototype.show = function () {
        var _this = this;
        this.visible = true;
        setTimeout(function () {
            _this.renderer.invokeElementMethod(_this.element.nativeElement, 'focus', []);
        }, 10);
        this.open.emit();
    };
    DialogComponent.prototype.onKeyDown = function () {
        if (this.closeOnEscape)
            this.hide();
    };
    DialogComponent.prototype.hide = function () {
        this.visible = false;
        this.close.emit();
    };
    DialogComponent.prototype.onDocumentClick = function (target) {
        if (this.containsTarget(target)) {
            this.hide();
        }
    };
    DialogComponent.prototype.containsTarget = function (target) {
        return this.closeOnBlur &&
            target.classList.contains('dialog');
    };
    /**
     * On destroy callback
     *
     * @memberOf DrawerComponent
     */
    DialogComponent.prototype.ngOnDestroy = function () {
        this.close.emit(true);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DialogComponent.prototype, "visible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DialogComponent.prototype, "zIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogComponent.prototype, "content", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DialogComponent.prototype, "template", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogComponent.prototype, "cssClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DialogComponent.prototype, "context", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DialogComponent.prototype, "closeOnBlur", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DialogComponent.prototype, "closeOnEscape", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DialogComponent.prototype, "closeButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DialogComponent.prototype, "class", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DialogComponent.prototype, "open", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DialogComponent.prototype, "close", void 0);
    __decorate([
        HostListener('keydown.esc'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DialogComponent.prototype, "onKeyDown", null);
    __decorate([
        HostListener('document:click', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DialogComponent.prototype, "onDocumentClick", null);
    DialogComponent = __decorate([
        Component({
            selector: 'ngx-dialog',
            encapsulation: ViewEncapsulation.None,
            styleUrls: ['./dialog.component.css'],
            template: "\n    <div      \n      [class]=\"class\"\n      [class.ngx-dialog]=\"true\"\n      [style.zIndex]=\"zIndex\">\n      <div\n        class=\"ngx-dialog-content {{cssClass}}\"\n        [@visibilityTransition]=\"visibleState\"\n        [style.zIndex]=\"contentzIndex\"\n        tabindex=\"-1\"\n        role=\"dialog\">\n        <button\n          *ngIf=\"closeButton\"\n          type=\"button\"\n          class=\"close\"\n          (click)=\"hide()\">\n          <span class=\"icon-x\"></span>\n        </button>\n        <div\n          class=\"ngx-dialog-header\"\n          *ngIf=\"title\">\n          <h2\n            *ngIf=\"title\"\n            class=\"ngx-dialog-title\"\n            [innerHTML]=\"title\">\n          </h2>\n        </div>\n        <ng-template\n          *ngIf=\"template\"\n          [ngTemplateOutlet]=\"template\"\n          [ngTemplateOutletContext]=\"{ context: context }\">\n        </ng-template>\n        <div\n          *ngIf=\"content\"\n          [innerHTML]=\"content\">\n        </div>\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
            animations: [
                trigger('visibilityTransition', [
                    state('active', style({
                        opacity: 1,
                        transform: 'scale3d(1, 1, 1)'
                    })),
                    transition('void => *', [
                        style({
                            opacity: 0,
                            transform: 'scale3d(1.2, 1.2, 1.2)'
                        }),
                        animate('0.2s ease-out')
                    ]),
                    transition('* => inactive', [
                        style({
                            opacity: 1,
                            transform: 'scale3d(1, 1, 1)'
                        }),
                        animate('0.2s ease-out', style({
                            transform: 'scale3d(0.9, 0.9, 1)',
                            opacity: 0
                        }))
                    ])
                ])
            ],
            host: {
                tabindex: '-1'
            }
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer])
    ], DialogComponent);
    return DialogComponent;
}());
export { DialogComponent };
//# sourceMappingURL=dialog.component.js.map