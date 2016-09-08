import {
  Component,
  Input,
  Output,
  ContentChildren,
  ContentChild,
  ElementRef,
  HostListener,
  QueryList,
  EventEmitter
} from '@angular/core';

import { Tab } from './Tab.js';
import './tabs.scss';

@Component({
  selector: 'tabs',
  template: `
    <section class="tabs">
      <ul
        class="tabs-list"
        [class.tabs-vertical]="vertical"
        [class.tabs-horizontal]="!vertical">
        <li
          *ngFor="let tab of tabs"
          class="tab"
          [class.disabled]="tab.disabled"
          [class.active]="tab.active">
          <button
            (click)="tabClicked(tab)"
            [disabled]="tab.disabled">
            {{tab.title}}
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </section>
  `
})
export class Tabs {

  @Input() vertical: boolean;
  @Output() onSelect = new EventEmitter();
  @ContentChildren(Tab) tabs: QueryList<Tab>;

  ngAfterContentInit() {
    const tabs = this.tabs.toArray();
    const actives = this.tabs.filter(t => { return t.active });

    if(actives.length > 1) {
      console.error(`Multiple active tabs set 'active'`);
    } else if(!actives.length && tabs.length) {
      tabs[0].active = true;
    }
  }

  tabClicked(tab) {
    const tabs = this.tabs.toArray();

    tabs.forEach(tab => tab.active = false);
    tab.active = true;

    this.onSelect.emit(tab);
  }

}
