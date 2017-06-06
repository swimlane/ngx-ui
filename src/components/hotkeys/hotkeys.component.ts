import { Component, Input, HostListener, Inject } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { HotkeysService } from './hotkeys.service';

@Component({
  selector: 'hotkeys',
  templateUrl: './hotkeys.component.html',
  styleUrls: ['./hotkeys.component.scss'],
  animations: [
    trigger('containerAnimationState', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-10px)'
        }),
        animate(250, style({
          opacity: 1,
          transform: 'translateY(0px)'
        }))
      ]),
      transition(':leave', [
        animate(250, style({
          opacity: 0
        }))
      ])
    ]),
    trigger('iconAnimationState', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(250, style({
          opacity: 1
        }))
      ])    
    ])
  ]
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
    return this.hotkeysService.keyPress(event);
  }

  show() {
    this.showHotkeys = true;
  }

  hide() {
    this.showHotkeys = false;
  }

}
