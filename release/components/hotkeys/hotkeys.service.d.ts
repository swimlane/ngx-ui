import { Observable } from 'rxjs/Rx';
export declare function _combToString(combination: any): any;
export declare function _stringToComb(combination: any): any[];
export declare function _activate(component: any): void;
export declare function _add(combination: any, hotkey: any): void;
export declare function _suspend(component: any): void;
export declare function _deregister(component: any): void;
export declare function _keyPress(event: any): boolean;
export declare function _getCombination(event: any): any[];
export declare function Hotkey(key: any, description?: string): (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) => void;
export declare class HotkeysService {
    hotkeys: {};
    add: typeof _add;
    suspend: typeof _suspend;
    deregister: typeof _deregister;
    keyPress: typeof _keyPress;
    changeEvent: Observable<{}>;
}
