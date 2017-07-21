import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import * as Mousetrap from 'mousetrap';

const hotkeys = {};
const hotkeyChangedSource = new Subject();
const isMac = /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

/*tslint:disable*/
const map = {
  command: '\u2318', // ⌘
  shift: '\u21E7', // ⇧
  left: '\u2190', // ←
  right: '\u2192', // →
  up: '\u2191', // ↑
  down: '\u2193', // ↓
  'return': '\u23CE', // ⏎
  backspace: '\u232B' // ⌫
};
/*tslint:enable*/

function _getDisplay(combo) {
  const keys = combo.split('+');
  const result = [];

  for(const k of keys) {
    if(k === 'mod') {
      result.push(isMac ? map.command : 'ctrl');
      continue;
    }

    const mapped = map[k];
    result.push(mapped || k);
  }

  return result;
}

export function _add(combo, opts) {
  opts.status = opts.status || 'active';
  opts.keys = _getDisplay(combo);
  opts.visible = opts.visible !== undefined ? opts.visible : true;

  Mousetrap.bind(combo, callback);

  if (hotkeys[combo] === undefined) {
    hotkeys[combo] = [];
  }

  hotkeys[combo].push(opts);
  hotkeyChangedSource.next(hotkeys);

  function callback(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      // internet explorer
      event.returnValue = false;
    }

    if (opts && opts.status === 'active') {
      opts.zone.run(() => {
        opts.callback(event);
      });
    }
  }
}

export function _suspend(comp) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (const hotkey of hotkeyList) {
      if (hotkey.component === comp) {
        hotkey.status = 'suspended';
      }
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function _pauseOthers(comp?) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (const hotkey of hotkeyList) {
      if (hotkey.component !== comp) {
        hotkey.status = `*${hotkey.status}`;
      }
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function _unpauseOthers(comp?) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (const hotkey of hotkeyList) {
      if (hotkey.component !== comp && hotkey.status[0] === '*') {
        hotkey.status = hotkey.status.replace('*', '');
      }
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function _activate(comp) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (const hotkey of hotkeyList) {
      if (hotkey.component === comp) {
        hotkey.status = 'active';
      }
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function _deregister(comp) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (const hotkey of hotkeyList) {
      if (hotkey.component === comp) {
        hotkeys[comb].status = 'disabled';
        hotkeys[comb].splice(hotkeys[comb].indexOf(hotkey), 1);
      }
    }

    if(!hotkeyList.length) {
      Mousetrap.unbind(comb);
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function Hotkey(key, description: string, options?: any) {
  return (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) => {
    const oldInit = target.ngOnInit;
    target.ngOnInit = function() {
      if (oldInit) oldInit.bind(this)();

      _add(key, {
        callback: () => {
          target[name].bind(this)();
        },
        description,
        component: this,
        zone: new NgZone({ enableLongStackTrace: false }),
        ...options
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
  suspend = _suspend;
  activate = _activate;
  deregister = _deregister;
  pauseOthers = _pauseOthers;
  unpauseOthers = _unpauseOthers;
  changeEvent = hotkeyChangedSource.asObservable();

  constructor(private ngZone: NgZone) {}

  add(combo, opts) {
    _add(combo, {zone: this.ngZone, ...opts });
  }
}
