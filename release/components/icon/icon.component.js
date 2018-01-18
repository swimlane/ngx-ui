var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectionStrategy, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IconRegisteryService } from '../../services/icon-registery.service';
var IconComponent = /** @class */ (function () {
    function IconComponent(http, renderer, elementRef, iconRegisteryService) {
        this.http = http;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.iconRegisteryService = iconRegisteryService;
        this.defaultPath = 'assets/svgs';
        this.fontSet = 'ngx';
    }
    Object.defineProperty(IconComponent.prototype, "svgSrc", {
        set: function (val) {
            this.loadSvg(val);
        },
        enumerable: true,
        configurable: true
    });
    IconComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    IconComponent.prototype.ngOnInit = function () {
        this.update();
    };
    IconComponent.prototype.update = function () {
        if (this.fontIcon) {
            this.cssClasses = this.iconRegisteryService.get(this.fontIcon, this.fontSet);
        }
    };
    IconComponent.prototype.loadSvg = function (val) {
        var _this = this;
        var opts = { responseType: 'text' };
        this.http.get(this.defaultPath + "/" + val + ".svg", opts)
            .subscribe(function (response) {
            // get our element and clean it out
            var element = _this.elementRef.nativeElement;
            element.innerHTML = '';
            // get response and build svg element
            var parser = new DOMParser();
            var svg = parser.parseFromString(response, 'image/svg+xml');
            // insert the svg result
            element.innerHTML = svg.documentElement.outerHTML;
        }, function (err) { return console.error(err); });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], IconComponent.prototype, "fontIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IconComponent.prototype, "alt", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IconComponent.prototype, "defaultPath", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IconComponent.prototype, "fontSet", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IconComponent.prototype, "svgSrc", null);
    IconComponent = __decorate([
        Component({
            selector: 'ngx-icon',
            template: "\n    <ng-container [ngSwitch]=\"cssClasses?.length\">\n      <ng-content *ngSwitchCase=\"\"></ng-content>\n      <ng-content *ngSwitchCase=\"0\"></ng-content>\n      <i *ngSwitchCase=\"1\" [ngClass]=\"cssClasses[0]\"></i>\n      <span *ngSwitchDefault class=\"icon-fx-stacked\">\n        <i *ngFor=\"let cssClass of cssClasses\" [ngClass]=\"cssClass\"></i>\n      </span>\n    </ng-container>",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styleUrls: ['./icon.component.css'],
            encapsulation: ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [HttpClient,
            Renderer,
            ElementRef,
            IconRegisteryService])
    ], IconComponent);
    return IconComponent;
}());
export { IconComponent };
//# sourceMappingURL=icon.component.js.map