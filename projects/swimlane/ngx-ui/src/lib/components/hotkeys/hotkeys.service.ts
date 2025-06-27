import { Injectable, NgZone } from '@angular/core';
import Mousetrap from 'mousetrap';
import { Subject } from 'rxjs';

import { Hotkey } from './hotkey.interface';
import { HotkeyStatus } from './hotkey-status.enum';

let hotkeys: { [combo: string]: Hotkey[] } = {};
const hotkeyChangedSource = new Subject<{ [combo: string]: Hotkey[] }>();
const isMac = /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
const tags = ['INPUT', 'SELECT', 'TEXTAREA'];

/* eslint-disable */
const map = {
  command: '\u2318', // ⌘
  shift: '\u21E7', // ⇧
  left: '\u2190', // ←
  right: '\u2192', // →
  up: '\u2191', // ↑
  down: '\u2193', // ↓
  return: '\u23CE', // ⏎
  backspace: '\u232B' // ⌫
};
/* eslint-enable */

function _getDisplay(combo: string) {
  const keys = combo.split('+');
  const result = [];

  for (const k of keys) {
    if (k === 'mod') {
      result.push(isMac ? map.command : /* istanbul ignore next */ 'ctrl');
      continue;
    }

    const mapped = map[k];
    result.push(mapped || k);
  }

  return result;
}

export function _add(combo: string, opts: Hotkey) {
  opts.status = opts.status || HotkeyStatus.Active;
  opts.keys = _getDisplay(combo);
  opts.visible = opts.visible !== undefined ? opts.visible : true;

  opts.allowIn = Array.isArray(opts.allowIn) ? opts.allowIn.map(tag => tag.toUpperCase()) : [];

  const mousetrap = new Mousetrap();

  if (opts.allowIn.length) {
    /* istanbul ignore next */
    mousetrap.stopCallback = function (_, element) {
      if (!tags.includes(element.tagName) || opts.allowIn.includes(element.tagName)) {
        return false;
      }

      return true;
    };
  }

  mousetrap.bind(combo, callback);

  if (hotkeys[combo] === undefined) {
    hotkeys[combo] = [];
  }

  hotkeys[combo].push(opts);
  hotkeyChangedSource.next(hotkeys);

  return opts;

  /* istanbul ignore next */
  function callback(event: Event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      // internet explorer
      event.returnValue = false;
    }

    if (opts && opts.status === HotkeyStatus.Active) {
      opts.zone.run(() => {
        opts.callback(event);
      });
    }
  }
}

export function _suspend(comp: any) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (const hotkey of hotkeyList) {
      if (hotkey.component === comp) {
        hotkey.status = HotkeyStatus.Suspended;
      }
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function _pauseOthers(comp?: any) {
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

export function _unpauseOthers(comp?: any) {
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

export function _activate(comp: any) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (const hotkey of hotkeyList) {
      if (hotkey.component === comp) {
        hotkey.status = HotkeyStatus.Active;
      }
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function _deregister(comp: any) {
  for (const comb in hotkeys) {
    const hotkeyList = hotkeys[comb];

    for (let i = 0; i < hotkeyList.length; i++) {
      if (hotkeyList[i].component === comp) {
        hotkeyList[i].status = HotkeyStatus.Disabled;
        hotkeyList.splice(hotkeyList.indexOf(hotkeyList[i]), 1);
      }
    }

    if (!hotkeyList.length) {
      Mousetrap.unbind(comb);
    }
  }

  hotkeyChangedSource.next(hotkeys);
}

export function HotKey(key: string, description: string, options?: Partial<Hotkey>) {
  return (target: any, name: string) => {
    const oldInit = target.ngOnInit;
    target.ngOnInit = function () {
      if (oldInit) oldInit.bind(this)();

      _add(key, {
        callback: /* istanbul ignore next */ () => {
          target[name].bind(this)();
        },
        description,
        component: this,
        zone: new NgZone({ enableLongStackTrace: false }),
        ...options
      });
    };

    const oldDestroy = target.ngOnDestroy;
    target.ngOnDestroy = function () {
      if (oldDestroy) oldDestroy.bind(this)();
      _deregister(this);
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class HotkeysService {
  readonly suspend = _suspend;
  readonly activate = _activate;
  readonly deregister = _deregister;
  readonly pauseOthers = _pauseOthers;
  readonly unpauseOthers = _unpauseOthers;
  readonly changeEvent = hotkeyChangedSource.asObservable();

  get hotKeys() {
    return hotkeys;
  }

  constructor(private readonly ngZone: NgZone) {}

  add(combo: string, opts: Hotkey) {
    return _add(combo, { zone: this.ngZone, ...opts });
  }

  clear() {
    hotkeys = {};
    Mousetrap.reset();
  }
}
