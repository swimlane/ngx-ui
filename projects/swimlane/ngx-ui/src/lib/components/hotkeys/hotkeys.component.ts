import { trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fadeIn, slideDown } from '../../animations/animations';
import { HotkeysService } from './hotkeys.service';
import { Hotkey } from './hotkey.interface';
import { HotkeyStatus } from './hotkey-status.enum';

@Component({
  exportAs: 'ngxHotkeys',
  selector: 'ngx-hotkeys',
  templateUrl: './hotkeys.component.html',
  styleUrls: ['./hotkeys.component.scss'],
  animations: [
    trigger('containerAnimationState', slideDown),
    trigger('iconAnimationState', fadeIn)
  ]
})
export class HotkeysComponent implements OnInit, OnDestroy {
  hotkeys: Hotkey[] = [];
  visible: boolean = false;

  private readonly _destroy = new Subject<void>();

  constructor(private readonly _hotkeysService: HotkeysService) {}

  ngOnInit(): void {
    this._hotkeysService.changeEvent.pipe(takeUntil(this._destroy)).subscribe(this.updateHotkeys.bind(this));
    this.updateHotkeys(this._hotkeysService.hotkeys);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  updateHotkeys(hotkeys: { [combo: string]: Hotkey[] }) {
    this.hotkeys = [];

    for (const comb in hotkeys) {
      for (const hotkey of hotkeys[comb]) {
        if (hotkey.status === HotkeyStatus.Active && hotkey.visible) {
          this.hotkeys.push(hotkey);
        }
      }
    }
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
