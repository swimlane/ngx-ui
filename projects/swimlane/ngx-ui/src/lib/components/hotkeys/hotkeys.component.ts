import { trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fadeInAnimation } from '../../animations/fade-in.animation';
import { slideDownFadeOutAnimation } from '../../animations/slide-down-fade-out.animation';
import { HotkeysService } from './hotkeys.service';
import { Hotkey } from './hotkey.interface';
import { HotkeyStatus } from './hotkey-status.enum';

@Component({
  exportAs: 'ngxHotkeys',
  selector: 'ngx-hotkeys',
  templateUrl: './hotkeys.component.html',
  styleUrls: ['./hotkeys.component.scss'],
  animations: [
    trigger('containerAnimationState', slideDownFadeOutAnimation()),
    trigger('iconAnimationState', fadeInAnimation())
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class HotkeysComponent implements OnInit, OnDestroy {
  readonly hotkeys$ = new BehaviorSubject<Hotkey[]>([]);
  visible = false;

  private readonly _destroy = new Subject<void>();

  constructor(private readonly _hotkeysService: HotkeysService) {}

  ngOnInit(): void {
    this._hotkeysService.changeEvent.pipe(takeUntil(this._destroy)).subscribe(this.updateHotkeys.bind(this));
    this.updateHotkeys(this._hotkeysService.hotKeys);
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  updateHotkeys(hotkeys: { [combo: string]: Hotkey[] }) {
    const hks: Hotkey[] = [];

    for (const comb in hotkeys) {
      for (const hotkey of hotkeys[comb]) {
        if (hotkey.status === HotkeyStatus.Active && hotkey.visible) {
          hks.push(hotkey);
        }
      }
    }

    this.hotkeys$.next(hks);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
