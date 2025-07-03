import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, HotKey, HotkeysService } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-hotkeys-page',
  templateUrl: './hotkeys-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class HotkeysPageComponent implements OnInit, OnDestroy {
  currentTheme = 'night';
  themes = ['day', 'night', 'moonlight'];

  constructor(readonly hotkeysService: HotkeysService, readonly dialogMngr: DialogService) {}

  ngOnInit() {
    this.hotkeysService.add('mod+h', {
      callback: () => {
        alert('Hotkey activated');
      },
      description: 'Show message',
      component: this
    });
  }

  ngOnDestroy() {
    this.hotkeysService.deregister('mod+h');
  }

  @HotKey('mod+alt+s', 'Switch themes')
  switchThemes() {
    let idx = this.themes.indexOf(this.currentTheme);
    idx = (idx + 1) % 3;
    this.setTheme(this.themes[idx]);
  }

  @HotKey('up up down down left right left right b a enter', 'Do some magic!', {
    visible: false
  })
  onKey() {
    alert('BOSS!');
  }

  setTheme(theme) {
    this.currentTheme = theme;
    const elm = document.querySelector('body');

    // remove old
    elm.classList.remove('day-theme');
    elm.classList.remove('night-theme');
    elm.classList.remove('moonlight-theme');

    // add new
    elm.classList.add(`${theme}-theme`);
  }

  openDialogAndPauseHotkeys(options) {
    const dlg = this.dialogMngr.create(options);
    this.hotkeysService.pauseOthers(dlg.instance);
    dlg.instance.close.subscribe(() => {
      this.hotkeysService.unpauseOthers(dlg.instance);
    });
  }
}
