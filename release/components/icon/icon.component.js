import { Component, Input, ChangeDetectionStrategy, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { IconRegisteryService } from '../../services/icon-registery.service';
var IconComponent = (function () {
    function IconComponent(http, renderer, elementRef, iconRegisteryService) {
        this.http = http;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.iconRegisteryService = iconRegisteryService;
        this.defaultPath = 'assets/svgs';
        this.fontSet = 'icon';
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
        this.http.get(this.defaultPath + "/" + val + ".svg")
            .subscribe(function (res) {
            // get our element and clean it out
            var element = _this.elementRef.nativeElement;
            element.innerHTML = '';
            // get response and build svg element
            var response = res.text();
            var parser = new DOMParser();
            var svg = parser.parseFromString(response, 'image/svg+xml');
            // insert the svg result
            element.innerHTML = svg.documentElement.outerHTML;
        }, function (err) { return console.error(err); });
    };
    IconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-icon',
                    template: "\n    <ng-container [ngSwitch]=\"cssClasses?.length\">\n      <ng-content *ngSwitchCase=\"\"></ng-content>\n      <ng-content *ngSwitchCase=\"0\"></ng-content>\n      <i *ngSwitchCase=\"1\" [ngClass]=\"cssClasses[0]\"></i>\n      <span *ngSwitchDefault class=\"icon-fx-stacked\">\n        <i *ngFor=\"let cssClass of cssClasses\" [ngClass]=\"cssClass\"></i>\n      </span>\n    </ng-container>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styleUrls: ['./icon.component.css'],
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    IconComponent.ctorParameters = function () { return [
        { type: Http, },
        { type: Renderer, },
        { type: ElementRef, },
        { type: IconRegisteryService, },
    ]; };
    IconComponent.propDecorators = {
        'fontIcon': [{ type: Input },],
        'alt': [{ type: Input },],
        'defaultPath': [{ type: Input },],
        'fontSet': [{ type: Input },],
        'svgSrc': [{ type: Input },],
    };
    return IconComponent;
}());
export { IconComponent };
//# sourceMappingURL=icon.component.js.map