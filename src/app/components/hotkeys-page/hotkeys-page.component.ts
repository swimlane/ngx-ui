import { Component } from '@angular/core';
import { Hotkey, HotkeysService, DialogService } from '../../../../projects/swimlane/ngx-ui/src/public_api';

@Component({
  selector: 'app-hotkeys-page',
  templateUrl: './hotkeys-page.component.html'
})
export class HotkeysPageComponent {
  currentTheme = 'night';
  themes = ['day', 'night', 'moonlight'];

  constructor(public hotkeysService: HotkeysService, public dialogMngr: DialogService) {
    this.hotkeysService.add('mod+h', {
      callback: () => {
        alert('Hotkey activated');
      },
      description: 'Show message',
      component: this
    });

    this.hotkeysService.add('mod+alt+s', {
      callback: () => {
        this.switchThemes();
      },
      description: 'Switch themes',
      component: this,
      visible: false
    });
  }
  @Hotkey('mod+s', 'Switch themes')
  switchThemes() {
    let idx = this.themes.indexOf(this.currentTheme);
    idx = (idx + 1) % 3;
    this.setTheme(this.themes[idx]);
  }

  @Hotkey('up up down down left right left right b a enter', 'Do some magic!', {
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
