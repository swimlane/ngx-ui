import { Component } from '@angular/core';
import { Hotkey, HotkeysService, DialogService, ThemeService } from '../../../../projects/swimlane/ngx-ui/src/public_api';

@Component({
  selector: 'app-hotkeys-page',
  templateUrl: './hotkeys-page.component.html'
})
export class HotkeysPageComponent {

  constructor(public hotkeysService: HotkeysService, public dialogMngr: DialogService, public themeService: ThemeService) {

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
    const themes = this.themeService.themes;
    let idx = themes.indexOf(this.themeService.currentTheme);
    idx = (idx + 1) % 3;
    this.themeService.setTheme(themes[idx]);
  }

  @Hotkey('up up down down left right left right b a enter', 'Do some magic!', {
    visible: false
  })
  onKey() {
    alert('BOSS!');
  }

  openDialogAndPauseHotkeys(options) {
    const dlg = this.dialogMngr.create(options);
    this.hotkeysService.pauseOthers(dlg.instance);
    dlg.instance.close.subscribe(() => {
      this.hotkeysService.unpauseOthers(dlg.instance);
    });
  }

}
