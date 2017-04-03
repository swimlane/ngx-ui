import { Injectable } from '@angular/core';

type StringArray = any;
type IconMap = Map<string, StringArray>;

function convertClass(input: string = 'svg'): string {
  const classes = input.trim().split(' ').map(d => {
    const [set, key] = splitKey(d);
    return `${set}-${key}`;
  });
  classes.unshift('ngx-icon');
  return classes.join(' ');
}

function splitKey(key: string): any {
  if (key.includes('::')) {
    return key.split('::');
  }
  return ['icon', key];
}

function makeKey(key) {
  if (key.includes('::')) {
    return key;
  }
  return `icon::${key}`;
}

@Injectable()
export abstract class IconRegisteryService {

  protected iconMap: IconMap = new Map();

  get(key: StringArray): string[] {
    if (typeof key === 'string') {
      key = this.lookup(key) || [key];
    }
    key = Array.isArray(key) ? key : [key];
    return key.map(cc => convertClass(cc));
  }

  add(key: string, icon: any): void {
    key = makeKey(key);
    this.iconMap.set(key, icon);
  }

  lookup(key: any): any {
    if (Array.isArray(key)) {
      return [].concat(key.map(c => this.lookup(c)));
    }
    if (typeof key === 'string') {
      key = makeKey(key);
      if (this.iconMap.has(key)) {
        return this.lookup(this.iconMap.get(key));
      }
    }
    return key;
  }
}
