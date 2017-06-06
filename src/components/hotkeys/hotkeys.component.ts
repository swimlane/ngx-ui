import { Component, Input, HostListener, Inject } from '@angular/core';
import { HotkeysService } from './hotkeys.service';

@Component({
  selector: 'hotkeys',
  templateUrl: './hotkeys.component.html',
  styleUrls: ['./hotkeys.component.scss'],
})
export class HotkeysComponent {

  hotkeys: any[] = [];
  showHotkeys: boolean = false;

  constructor(private hotkeysService: HotkeysService) {
    this.hotkeysService.changeEvent.subscribe(hotkeys => {
      this.updateHotkeys(hotkeys);
    });

    this.updateHotkeys(this.hotkeysService.hotkeys);
  }

  updateHotkeys(hotkeys) {
    this.hotkeys = [];
    for (const comb in hotkeys) {
      for (const hotkey of hotkeys[comb]) {
        if (hotkey.status === 'active') {
          this.hotkeys.push(hotkey);
        }
      }
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event) {
    this.hotkeysService.keyPress(event);
  }

  show() {
    this.showHotkeys = true;
  }

  hide() {
    this.showHotkeys = false;
  }

}
