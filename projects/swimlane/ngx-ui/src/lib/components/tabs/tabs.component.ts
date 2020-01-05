import {
  Component,
  Input,
  Output,
  ContentChildren,
  QueryList,
  EventEmitter,
  ViewEncapsulation,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
  selector: 'ngx-tabs',
  templateUrl: './tabs.component.html',
  host: {
    class: 'ngx-tabs'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterContentInit {
  @Input() vertical: boolean;

  @Output() selectTab = new EventEmitter();

  // For backwards compat... user selectTab instead.
  @Output() select = this.selectTab;

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  get index(): number {
    const tabs = this.tabs.toArray();
    return tabs.findIndex(tab => tab.active);
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    const tabs = this.tabs.toArray();
    const actives = this.tabs.filter(t => t.active);

    if (actives.length > 1) {
      console.error(`Multiple active tabs set 'active'`);
    } else if (!actives.length && tabs.length) {
      setTimeout(() => {
        tabs[0].active = true;
        tabs[0].detectChanges();
        this.cdr.detectChanges();
      });
    }
  }

  tabClicked(activeTab: TabComponent): void {
    this.tabs.forEach(tab => (tab.active = false));

    activeTab.active = true;
    this.tabs.forEach(tab => tab.detectChanges());
    this.cdr.detectChanges();

    this.selectTab.emit(activeTab);
  }

  move(offset: number) {
    const tabs = this.tabs.toArray();
    for (let i = this.index + offset; i < tabs.length && i >= 0; i += offset) {
      const tab = tabs[i];
      if (tab && !tab.disabled) {
        this.tabClicked(tabs[i]);
        return;
      }
    }
  }

  next(): void {
    this.move(1);
  }

  prev(): void {
    this.move(-1);
  }
}
