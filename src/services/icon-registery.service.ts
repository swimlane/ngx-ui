import { Injectable } from '@angular/core';

type IconMap = Map<string, string[]>;

function convertClass(input: string = 'svg'): string {
  const classes = input.trim().split(' ').map(d => {
    const [set, icon] = d.split(':');
    return set.length ? `${set} ${set}-${icon}` : icon;
  }).join(' ');
  return `ngx-icon ${classes}`;
}

@Injectable()
export class IconRegisteryService {

  private _defaultFontSetClass: string = 'ngx';
  private _iconMap: IconMap = new Map();

  setDefaultFontSetClass(iconSet) {
    if (!arguments.length) return this._defaultFontSetClass;
    this._defaultFontSetClass = iconSet;
  }

  get(keys: string | string[], set: string): string[] {
    return this.lookup(keys, set)
      .map(k => convertClass(k));
  }

  lookup(keys: any, set?: string): string[] {
    return (Array.isArray(keys) ? keys : [keys])
      .reduce((p: string[], k: string) => {
        k = this._expandKeys(k, set).map(kk => {
          const x = this._iconMap.get(kk);
          return (x && x.length === 1) ? x[0] : kk;
        }).join(' ');
        return p.concat(this._iconMap.get(k) || [k]);
      }, []);
  }

  add(key: string, icon: any): void {
    key = this._expandKeys(key).join(' ');
    icon = this.lookup(icon);
    this._iconMap.set(key, icon);
  }

  private _expandKeys(key: string, set: string = this._defaultFontSetClass): string[] {
    return key.split(' ').map(k => {
      if (k.includes(':')) return k;
      return `${set}:${k}`;
    });
  }
}
