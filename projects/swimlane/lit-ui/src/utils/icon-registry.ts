import { convertClass } from './convert-class';

/**
 * Static icon registry for swim-icon. Mirrors @swimlane/ngx-ui IconRegistryService.
 * When a key is not in the map, returns convertClass(expandedKey) so default
 * lit set works without pre-registration.
 */
class IconRegistry {
  private _defaultFontSetClass = 'lit';
  private _iconMap = new Map<string, string[]>();

  setDefaultFontSetClass(iconSet: string): string {
    this._defaultFontSetClass = iconSet;
    return this._defaultFontSetClass;
  }

  get(keys: string | string[], set?: string): string[] {
    return this.lookup(keys, set).map(k => convertClass(k));
  }

  lookup(keys: string | string[], set?: string): string[] {
    const effectiveSet = set ?? this._defaultFontSetClass;
    return (Array.isArray(keys) ? keys : [keys]).reduce((p: string[], k: string) => {
      const expanded = this._expandKeys(k, effectiveSet)
        .map(kk => {
          const x = this._iconMap.get(kk);
          return x && x.length === 1 ? x[0] : kk;
        })
        .join(' ');
      return p.concat(this._iconMap.get(expanded) || [expanded]);
    }, []);
  }

  add(key: string, icon: string | string[]): void {
    const k = this._expandKeys(key, this._defaultFontSetClass).join(' ');
    const v = this.lookup(icon);
    this._iconMap.set(k, v);
  }

  private _expandKeys(key: string, set: string): string[] {
    return key.split(' ').map(k => {
      if (k.includes(':')) return k;
      return `${set}:${k}`;
    });
  }
}

export const iconRegistry = new IconRegistry();
