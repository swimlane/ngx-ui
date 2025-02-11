import {
  Component,
  Input,
  Output,
  ContentChildren,
  EventEmitter,
  ViewEncapsulation,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  HostBinding
} from '@angular/core';
import type { QueryList } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TabComponent } from './tab.component';
import { TabsAppearance } from './tabs-appearance.enum';

@Component({
  exportAs: 'ngxTabs',
  selector: 'ngx-tabs',
  templateUrl: './tabs.component.html',
  host: {
    class: 'ngx-tabs'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TabsComponent implements AfterContentInit, OnDestroy {
  @HostBinding('class.light')
  get light() {
    return this.appearance === TabsAppearance.Light;
  }

  @Input() vertical: boolean;

  @Output() selectTab = new EventEmitter();
  // For backwards compat... user selectTab instead.
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select = this.selectTab;

  @Input() appearance: TabsAppearance = TabsAppearance.Legacy;

  @ContentChildren(TabComponent) readonly tabs: QueryList<TabComponent>;

  @HostBinding('class.tabs-horizontal')
  get horizontalClass() {
    return !this.vertical;
  }

  @HostBinding('class.tabs-vertical')
  get verticalClass() {
    return this.vertical;
  }

  private tabEvents: Subscription[] = [];

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
      // eslint-disable-next-line no-console
      console.error(`Multiple active tabs set 'active'`);
    } else if (!actives.length && tabs.length) {
      setTimeout(() => {
        tabs[0].active = true;
        tabs[0].detectChanges();
        this.cdr.markForCheck();
      });
    }

    // Watches for changes to tab inputs
    this.setupTabInputWatcher();

    // Watches for change tabs themselves
    this.tabs.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.setupTabInputWatcher();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
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

  move(offset: number): void {
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

  private setupTabInputWatcher() {
    this.tabEvents.forEach(t => {
      t.unsubscribe();
    });

    this.tabEvents = this.tabs.toArray().map(t => {
      return t.inputChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.cdr.markForCheck();
      });
    });
  }
}
