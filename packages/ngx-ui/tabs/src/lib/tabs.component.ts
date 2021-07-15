import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  DestroyedService,
  NgxBooleanInput,
} from '@swimlane/ngx-ui/common';
import { queueForNextRender } from '@swimlane/ngx-ui/utils';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'ngx-tabs',
  exportAs: 'ngxTabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyedService],
})
export class TabsComponent implements AfterContentInit {
  static ngAcceptInputType_vertical: BooleanInput;

  @HostBinding('class.ngx-tabs') hostClass = true;

  @NgxBooleanInput()
  @Input()
  vertical = false;

  @Output() selectTab = new EventEmitter();

  @ContentChildren(TabComponent) readonly tabs?: QueryList<TabComponent>;

  private tabEvents: Subscription[] = [];

  get index(): number {
    const tabs = this.tabs?.toArray() || [];
    return tabs.findIndex((tab) => tab.active);
  }

  constructor(
    private readonly destroyed: DestroyedService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    const tabs = this.tabs?.toArray() || [];
    const actives = this.tabs?.filter((t) => t.active) || [];

    if (actives.length > 1) {
      console.error("Multiple active tabs set 'active'");
    } else if (!actives.length && tabs.length) {
      queueForNextRender(() => {
        tabs[0].active = true;
        tabs[0].detectChanges();
        this.cdr.markForCheck();
      });
    }

    // Watches for changes to tab inputs
    this.setupTabInputWatcher();

    // Watches for change tabs themselves
    this.tabs?.changes.pipe(takeUntil(this.destroyed)).subscribe(() => {
      this.setupTabInputWatcher();
    });
  }

  tabClicked(activeTab: TabComponent): void {
    this.tabs?.forEach((tab) => (tab.active = false));

    activeTab.active = true;
    this.tabs?.forEach((tab) => tab.detectChanges());
    this.cdr.markForCheck();

    this.selectTab.emit(activeTab);
  }

  move(offset: number): void {
    const tabs = this.tabs?.toArray() || [];
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
    this.tabEvents.forEach((t) => {
      t.unsubscribe();
    });

    this.tabEvents = (this.tabs?.toArray() || []).map((t) => {
      return t.inputChanges.pipe(takeUntil(this.destroyed)).subscribe(() => {
        this.cdr.markForCheck();
      });
    });
  }
}
