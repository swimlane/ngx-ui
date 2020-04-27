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
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TabComponent } from './tab.component';

@Component({
  exportAs: 'ngxTabs',
  selector: 'ngx-tabs',
  templateUrl: './tabs.component.html',
  host: {
    class: 'ngx-tabs'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterContentInit, OnDestroy {
  @Input() vertical: boolean;

  @Output() selectTab = new EventEmitter();
  // For backwards compat... user selectTab instead.
  @Output() select = this.selectTab;

  @ContentChildren(TabComponent) readonly tabs: QueryList<TabComponent>;

  get index(): number {
    const tabs = this.tabs.toArray();
    return tabs.findIndex(tab => tab.active);
  }

  private readonly _destroy$ = new Subject<void>();

  constructor(readonly cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    const tabs = this.tabs.toArray();
    const actives = this.tabs.filter(t => t.active);

    if (actives.length > 1) {
      console.error(`Multiple active tabs set 'active'`);
    } else if (!actives.length && tabs.length) {
      setTimeout(() => {
        tabs[0].active = true;
        tabs[0].detectChanges();
        this.cdr.markForCheck();
      });
    }

    this.tabs.changes.pipe(takeUntil(this._destroy$)).subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  tabClicked(activeTab: TabComponent): void {
    this.tabs.forEach(tab => (tab.active = false));

    activeTab.active = true;
    this.tabs.forEach(tab => tab.detectChanges());
    this.cdr.markForCheck();

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
