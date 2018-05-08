import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HotkeysService } from './hotkeys.service';
export declare class HotkeysComponent implements OnInit, OnDestroy {
    private elementRef;
    private hotkeysService;
    listener: Subscription;
    hotkeys: any[];
    visible: boolean;
    constructor(elementRef: ElementRef, hotkeysService: HotkeysService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateHotkeys(hotkeys: any): void;
    show(): void;
    hide(): void;
}
