import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import { HotkeysService } from './hotkeys.service';
import { Subscription } from 'rxjs/Subscription';
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
