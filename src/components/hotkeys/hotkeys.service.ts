import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HotkeysService {

  hotkeys: any = {};
  hotkeyChangedSource;
  changeEvent;

  constructor() {
    this.hotkeyChangedSource = new Subject();
    this.changeEvent = this.hotkeyChangedSource.asObservable();
  }

  /**
   * Defines a hotkey
   *
   * @param {any} combination
   * @param {any} hotkey
   *
   * @memberof HotkeysService
   */
  add(combination, hotkey) {
    hotkey.combination = combination;
    hotkey.status = 'active';

    if (this.hotkeys[this.combToString(combination)] === undefined) {
      this.hotkeys[this.combToString(combination)] = [];
    }

    this.hotkeys[this.combToString(combination)].push(hotkey);
    this.hotkeyChangedSource.next(this.hotkeys);
  }

  /**
   * Suspends all hotkeys defined by the given component
   *
   * @param {any} component
   *
   * @memberof HotkeysService
   */
  suspend(component) {
    for (const comb in this.hotkeys) {
      const hotkeyList = this.hotkeys[comb];
      for (const hotkey of hotkeyList) {
        if (hotkey.component === component) {
          hotkey.status = 'suspended';
        }
      }
    }
    this.hotkeyChangedSource.next(this.hotkeys);
  }

  /**
   * Reactivates all hotkeys defined by the given component
   *
   * @param {any} component
   *
   * @memberof HotkeysService
   */
  activate(component) {
    for (const comb in this.hotkeys) {
      const hotkeyList = this.hotkeys[comb];
      for (const hotkey of hotkeyList) {
        if (hotkey.component === component) {
          hotkey.status = 'active';
        }
      }
    }
    this.hotkeyChangedSource.next(this.hotkeys);
  }

  /**
   * Removes all hotkeys defined by the given component
   *
   * @param {any} component
   *
   * @memberof HotkeysService
   */
  deregister(component) {
    for (const comb in this.hotkeys) {
      const hotkeyList = this.hotkeys[comb];
      for (const hotkey of hotkeyList) {
        if (hotkey.component === component) {
          this.hotkeys[comb].splice(this.hotkeys[comb].indexOf(hotkey), 1);
        }
      }
    }
    this.hotkeyChangedSource.next(this.hotkeys);
  }

  /**
   * Evaluates a keypress event and checks if there is a hotkey that matches it
   * then executes the callback defined for that hotkey
   * @param {any} event
   *
   * @memberof HotkeysService
   */
  keyPress(event) {
    const combination = this.getCombination(event);
    const combStr = this.combToString(combination);
    
    if (this.hotkeys[combStr]) {
      for (const hotkey of this.hotkeys[combStr]) {
        if (hotkey.status === 'active') {
          hotkey.callback();
        }
      }

      // prevent default
      return false;
    }

    // do not prevent default
    return true;
  }

  /**
   * Converts a key combination array to a string
   *
   * @param {any} combination
   * @returns
   *
   * @memberof HotkeysService
   */
  combToString(combination) {
    return combination.sort().join('+').toLowerCase();
  }

  /**
   * Creates a key combination array from the keypress event
   *
   * @param {any} event
   * @returns
   *
   * @memberof HotkeysService
   */
  getCombination(event) {
    let combination = [];
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
}
