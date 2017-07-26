import { ElementRef, Renderer, OnChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IconRegisteryService } from '../../services/icon-registery.service';
export declare class IconComponent implements OnChanges, OnInit {
    private http;
    private renderer;
    private elementRef;
    private iconRegisteryService;
    fontIcon: string | string[];
    alt: string;
    defaultPath: string;
    fontSet: string;
    svgSrc: string;
    cssClasses: string[];
    constructor(http: HttpClient, renderer: Renderer, elementRef: ElementRef, iconRegisteryService: IconRegisteryService);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    update(): void;
    loadSvg(val: string): void;
}
