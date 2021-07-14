import { Inject, Injectable, NgZone, Type } from '@angular/core';
import { NGX_UI_IS_MAC } from '@swimlane/ngx-ui/common';
import * as Mousetrap from 'mousetrap';
import { Subject } from 'rxjs';
import { HOT_KEYS_MAP, TAGS } from '../constants';
import { HotkeyStatus } from '../enums';
import { HotkeyOptions, Hotkeys } from '../models';

@Injectable()
export class HotkeysService {
  private readonly $hotKeysChanged = new Subject<Hotkeys>();
  readonly changeEvent = this.$hotKeysChanged.asObservable();
  readonly hotkeys: Hotkeys = {};

  constructor(
    @Inject(NGX_UI_IS_MAC) private readonly isMac: boolean,
    private readonly ngZone: NgZone
  ) {}

  add(combo: string, options: Omit<HotkeyOptions, 'zone'>) {
    const mergeOptions: HotkeyOptions = { ...options, zone: this.ngZone };
    mergeOptions.status = mergeOptions.status || HotkeyStatus.active;
    mergeOptions.keys = this.getDisplay(combo);
    mergeOptions.visible =
      mergeOptions.visible !== undefined ? mergeOptions.visible : true;

    mergeOptions.allowIn = Array.isArray(mergeOptions.allowIn)
      ? mergeOptions.allowIn.map((tag) => tag.toUpperCase())
      : [];

    function callback(event: Event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        // IE
        event.returnValue = false;
      }

      if (mergeOptions.status === HotkeyStatus.active) {
        mergeOptions.zone.run(() => {
          mergeOptions.callback(event);
        });
      }
    }

    const mousetrap = new Mousetrap();

    if (mergeOptions.allowIn.length) {
      mousetrap.stopCallback = function (_, element) {
        return !(
          !TAGS.includes(element.tagName) ||
          mergeOptions.allowIn?.includes(element.tagName)
        );
      };
    }

    mousetrap.bind(combo, callback);

    if (this.hotkeys[combo] === undefined) {
      this.hotkeys[combo] = [];
    }

    this.hotkeys[combo].push(mergeOptions);
    this.$hotKeysChanged.next(this.hotkeys);

    return options;
  }

  suspend(comp: Type<unknown>) {
    for (const combo in this.hotkeys) {
      // noinspection JSUnfilteredForInLoop
      const hotkeyList = this.hotkeys[combo];
      for (const hotkey of hotkeyList) {
        if (hotkey.component === comp) {
          hotkey.status = HotkeyStatus.suspended;
        }
      }
    }

    this.$hotKeysChanged.next(this.hotkeys);
  }

  pauseOthers(comp?: Type<unknown>) {
    for (const comb in this.hotkeys) {
      // noinspection JSUnfilteredForInLoop
      const hotkeyList = this.hotkeys[comb];

      for (const hotkey of hotkeyList) {
        if (hotkey.component !== comp) {
          hotkey.status = `*${hotkey.status}`;
        }
      }
    }

    this.$hotKeysChanged.next(this.hotkeys);
  }

  unpauseOthers(comp?: Type<unknown>) {
    for (const comb in this.hotkeys) {
      // noinspection JSUnfilteredForInLoop
      const hotkeyList = this.hotkeys[comb];

      for (const hotkey of hotkeyList) {
        if (hotkey.component !== comp && hotkey.status?.[0] === '*') {
          hotkey.status = hotkey.status?.replace('*', '');
        }
      }
    }

    this.$hotKeysChanged.next(this.hotkeys);
  }

  activate(comp: Type<unknown>) {
    for (const comb in this.hotkeys) {
      // noinspection JSUnfilteredForInLoop
      const hotkeyList = this.hotkeys[comb];

      for (const hotkey of hotkeyList) {
        if (hotkey.component === comp) {
          hotkey.status = HotkeyStatus.active;
        }
      }
    }

    this.$hotKeysChanged.next(this.hotkeys);
  }

  deregister(comp: Type<unknown>) {
    for (const comb in this.hotkeys) {
      // noinspection JSUnfilteredForInLoop
      const hotkeyList = this.hotkeys[comb];

      for (let i = 0; i < hotkeyList.length; i++) {
        if (hotkeyList[i].component === comp) {
          hotkeyList[i].status = HotkeyStatus.disabled;
          hotkeyList.splice(hotkeyList.indexOf(hotkeyList[i]), 1);
        }
      }

      if (!hotkeyList.length) {
        // noinspection JSUnfilteredForInLoop
        Mousetrap.unbind(comb);
      }
    }

    this.$hotKeysChanged.next(this.hotkeys);
  }

  private getDisplay(combo: string) {
    const keys = combo.split('+');
    const result = [];

    for (const k of keys) {
      if (k === 'mod') {
        result.push(this.isMac ? HOT_KEYS_MAP.command : 'ctrl');
        continue;
      }

      const mapped = HOT_KEYS_MAP[k as keyof typeof HOT_KEYS_MAP];
      result.push(mapped || k);
    }

    return result;
  }
}
