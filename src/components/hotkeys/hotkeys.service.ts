import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

const hotkeys = {};
const hotkeyChangedSource = new Subject();

function combToString(combination) {
  return combination.sort().join('+').toLowerCase();
}

function activate(component) {
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

function add(combination, hotkey) {
  hotkey.combination = combination;
  hotkey.status = 'active';

  if (hotkeys[combToString(combination)] === undefined) {
    hotkeys[combToString(combination)] = [];
  }

  hotkeys[combToString(combination)].push(hotkey);
  hotkeyChangedSource.next(hotkeys);
}

function suspend(component) {
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

function deregister(component) {
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

function keyPress(event) {
  const combination = getCombination(event);
  const combStr = combToString(combination);

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

function getCombination(event) {
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
      if (oldInit) oldInit.bind(target)();

      add(key, {
        callback: () => {
          target[name]();
        },
        description,
        component: target
      });
    };

    const oldDestroy = target.ngOnDestroy;
    target.ngOnDestroy = function() {
      if (oldDestroy) oldDestroy.bind(target)();
      deregister(target);
    };
  };
}

@Injectable()
export class HotkeysService {

  hotkeys = hotkeys;
  add = add;
  suspend = suspend;
  deregister = deregister;
  keyPress = keyPress;
  changeEvent = hotkeyChangedSource.asObservable();
  
}
