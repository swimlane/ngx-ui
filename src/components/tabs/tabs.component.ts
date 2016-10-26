import {
  Component,
  Input,
  Output,
  ContentChildren,
  QueryList,
  EventEmitter
} from '@angular/core';

import { TabComponent } from './tab.component';
import './tabs.scss';

@Component({
  selector: 'swui-tabs',
  template: `
    <section>
      <ul
        class="swui-tabs-list list-reset"
        [class.tabs-vertical]="vertical"
        [class.tabs-horizontal]="!vertical">
        <li
          *ngFor="let tab of tabs"
          class="swui-tab"
          [class.disabled]="tab.disabled"
          [class.active]="tab.active">
          <button
            (click)="tabClicked(tab)"
            [disabled]="tab.disabled">
            {{tab.title}}
          </button>
        </li>
      </ul>
      <div class="swui-tab-content">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  host: {
    class: 'swui-tabs'
  }
})
export class TabsComponent {

  @Input() vertical: boolean;
  @Output() select = new EventEmitter();

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit() {
    const tabs = this.tabs.toArray();
    const actives = this.tabs.filter(t => { return t.active; });

    if(actives.length > 1) {
      console.error(`Multiple active tabs set 'active'`);
    } else if(!actives.length && tabs.length) {
      tabs[0].active = true;
    }
  }

  tabClicked(activeTab) {
    const tabs = this.tabs.toArray();

    tabs.forEach(tab => tab.active = false);
    activeTab.active = true;

    this.select.emit(activeTab);
  }

}
