import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

const hotkeys = {};
const hotkeyChangedSource = new Subject();

export function _combToString(combination) {
  return [...combination].sort().join('+').toLowerCase();
}

export function _stringToComb(combination) {
  const parts = combination.split('+');
  let comb = [];
  for (let part of parts) {
    part = part.trim();
    if (part.length === 0 || part === '+') {
      continue;
    }

    comb.push(part.toLowerCase());
  }
  return comb.sort((a, b) => {
    let special = ['ctrl', 'shift', 'alt', 'meta'];
    if (special.includes(a)){
      return -1;
    }
    if (special.includes(b)) {
      return 1;
    }
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  });
}

export function _activate(component) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (const hotkey of hotkeyList) {
      if (hotkey.component === component) {
        hotkey.status = 'active';
      }
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function _add(combination, hotkey) {
  const combArray = _stringToComb(combination);
  const combString = _combToString(combArray);
  hotkey.combination = combArray;
  hotkey.status = 'active';

  if (hotkeys[combString] === undefined) {
    hotkeys[combString] = [];
  }

  hotkeys[combString].push(hotkey);
  hotkeyChangedSource.next(hotkeys);
}

export function _suspend(component) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (const hotkey of hotkeyList) {
      if (hotkey.component === component) {
        hotkey.status = 'suspended';
      }
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function _deregister(component) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (const hotkey of hotkeyList) {
      if (hotkey.component === component) {
        hotkeys[comb].splice(hotkeys[comb].indexOf(hotkey), 1);
      }
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function _keyPress(event) {
  const combination = _getCombination(event);
  const combStr = _combToString(combination);

  if (hotkeys[combStr]) {
    for (const hotkey of hotkeys[combStr]) {
      if (hotkey.status === 'active') {
        hotkey.callback();
      }
    }

    return false;
  }

  return true;
}

export function _getCombination(event) {
  const combination = [];
  combination.push(event.key.toLowerCase());

  if (event.metaKey) {
    combination.push('meta');
  }

  if (event.ctrlKey) {
    combination.push('ctrl');
  }

  if (event.shiftKey) {
    combination.push('shift');
  }

  if (event.altKey) {
    combination.push('alt');
  }

  return combination;
}

export function Hotkey(key, description?: string) {
  return (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) => {
    const oldInit = target.ngOnInit;
    target.ngOnInit = function() {
      if (oldInit) oldInit.bind(this)();

      _add(key, {
        callback: () => {
          target[name].bind(this)();
        },
        description,
        component: this
      });
    };

    const oldDestroy = target.ngOnDestroy;
    target.ngOnDestroy = function() {
      if (oldDestroy) oldDestroy.bind(this)();
      _deregister(this);
    };
  };
}

@Injectable()
export class HotkeysService {
  hotkeys = hotkeys;
  add = _add;
  suspend = _suspend;
  activate = _activate;
  deregister = _deregister;
  keyPress = _keyPress;
  changeEvent = hotkeyChangedSource.asObservable();
}
