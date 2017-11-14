import { Component, Input, ChangeDetectionStrategy, ElementRef, Renderer, OnChanges, ContentChild, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IconRegisteryService } from '../../services/icon-registery.service';
var IconComponent = /** @class */ (function () {
    function IconComponent(http, renderer, elementRef, iconRegisteryService) {
        this.http = http;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.iconRegisteryService = iconRegisteryService;
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
    return IconComponent;
}());
export { IconComponent };
//# sourceMappingURL=icon.component.js.map