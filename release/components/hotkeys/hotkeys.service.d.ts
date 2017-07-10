import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
export declare function _add(combo: any, opts: any): void;
export declare function _suspend(comp: any): void;
export declare function _pauseOthers(comp?: any): void;
export declare function _unpauseOthers(comp?: any): void;
export declare function _activate(comp: any): void;
export declare function _deregister(comp: any): void;
export declare function Hotkey(key: any, description: string, options?: any): (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) => void;
export declare class HotkeysService {
    private ngZone;
    hotkeys: {};
    suspend: typeof _suspend;
    activate: typeof _activate;
    deregister: typeof _deregister;
    pauseOthers: typeof _pauseOthers;
    unpauseOthers: typeof _unpauseOthers;
    changeEvent: Observable<{}>;
    constructor(ngZone: NgZone);
    add(combo: any, opts: any): void;
}
