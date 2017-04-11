export declare class IconRegisteryService {
    private _defaultFontSetClass;
    private _iconMap;
    setDefaultFontSetClass(iconSet: any): string;
    get(keys: string | string[], set: string): string[];
    lookup(keys: any, set?: string): string[];
    add(key: string, icon: any): void;
    private _expandKeys(key, set?);
}
