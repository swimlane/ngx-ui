import { ElementRef, Renderer } from '@angular/core';
import { Http } from '@angular/http';
export declare class IconComponent {
    private http;
    private renderer;
    private elementRef;
    fontIcon: string;
    alt: string;
    defaultPath: string;
    svgSrc: string;
    readonly cssClass: string;
    constructor(http: Http, renderer: Renderer, elementRef: ElementRef);
    loadSvg(val: string): void;
}
