import { Component, Input, HostListener, Inject, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HotkeysService } from './hotkeys.service';
import { Subscription } from 'rxjs/Subscription';
import { fadeIn, slideDown } from '../../animations';

@Component({
  selector: 'hotkeys',
  template: `
    <div class="hotkeys-container" *ngIf="hotkeys.length > 0">
      <div class="hotkeys" *ngIf="visible" [@containerAnimationState]="'active'">
        <div *ngFor="let hotkey of hotkeys" class="hotkey-row">
            {{hotkey.description}}
            <div class="combination">
              <span *ngFor="let key of hotkey.keys; let i = index">
                <span class="key">{{key}}</span>
                <span *ngIf="i < hotkey.keys.length - 1"> + </span>
              </span>
            </div>
        </div>
      </div>
      <div 
        class="close-icon icon icon-x-filled" 
        *ngIf="visible" 
        (click)="hide()" 
        [@iconAnimationState]="'active'">
      </div>
      <div 
        class="hotkeys-icon icon icon-keyboard" 
        *ngIf="!visible" 
        (click)="show()" 
        [@iconAnimationState]="'active'">
      </div>
    </div>
  `,
  styleUrls: ['./hotkeys.component.scss'],
  animations: [
    trigger('containerAnimationState', slideDown),
    trigger('iconAnimationState', fadeIn)
  ]
})
export class HotkeysComponent implements OnInit, OnDestroy {

  listener: Subscription;
  hotkeys: any[] = [];
  visible: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private hotkeysService: HotkeysService) { }

  ngOnInit(): void {
    this.listener = this.hotkeysService.changeEvent.subscribe(
      this.updateHotkeys.bind(this));

    this.updateHotkeys(this.hotkeysService.hotkeys);
  }

  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }

  updateHotkeys(hotkeys) {
    this.hotkeys = [];

    for (const comb in hotkeys) {
      for (const hotkey of hotkeys[comb]) {
        if (hotkey.status === 'active' && hotkey.visible) {
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
