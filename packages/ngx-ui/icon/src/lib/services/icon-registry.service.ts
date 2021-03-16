import { Injectable } from '@angular/core';
import { convertIconClass } from '../utils';

@Injectable()
export class IconRegistryService {
  private _defaultFontSetClass = 'ngx';
  private _iconMap = new Map<string, string[]>();

  setDefaultFontSetClass(iconSet: string) {
    this._defaultFontSetClass = iconSet;
    return this._defaultFontSetClass;
  }

  get(keys: string | string[], set?: string): string[] {
    return this.lookup(keys, set).map(k => convertIconClass(k));
  }

  lookup(keys: string | string[], set?: string): string[] {
    return (Array.isArray(keys) ? keys : [keys]).reduce((p: string[], k: string) => {
      k = this._expandKeys(k, set)
        .map(kk => {
          const x = this._iconMap.get(kk);
          return x && x.length === 1 ? x[0] : kk;
        })
        .join(' ');
      return p.concat(this._iconMap.get(k) || [k]);
    }, []);
  }

  add(key: string, icon: string | string[]): void {
    const k = this._expandKeys(key).join(' ');
    const v = this.lookup(icon);
    this._iconMap.set(k, v);
  }

  private _expandKeys(key: string, set: string = this._defaultFontSetClass): string[] {
    return key.split(' ').map(k => {
      if (k.includes(':')) return k;
      return `${set}:${k}`;
    });
  }
}
