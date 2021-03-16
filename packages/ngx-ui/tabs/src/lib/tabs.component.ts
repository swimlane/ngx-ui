import type { BooleanInput } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { DestroyedService } from '@swimlane/ngx-ui/destroyed';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-tab',
  exportAs: 'ngxTab',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div role="tabpanel" [hidden]="!active">
      <ng-content></ng-content>
      <ng-container *ngIf="contentTemplate && (cache ? loaded : active)">
        <ng-container [ngTemplateOutlet]="contentTemplate"></ng-container>
      </ng-container>
    </div>
    <ng-template #labelIsStringTmpl>{{ label }}</ng-template>
  `,
})
export class TabComponent implements OnInit {
  static ngAcceptInputType_cache: BooleanInput;

  get label(): string | TemplateRef<unknown> {
    return this._label;
  }

  @Input()
  set label(value: string | TemplateRef<unknown>) {
    this._label = value;
    this.parent.cdr.markForCheck();
  }

  private _label: string | TemplateRef<unknown> = '';

  get title(): string {
    return this._title;
  }

  @Input()
  set title(value: string) {
    this._title = value;
    this.parent.cdr.markForCheck();
  }

  private _title = '';

  get active(): boolean {
    return this._active;
  }

  @Input() set active(v: boolean) {
    this._active = v;

    if (!this.loaded) {
      this.cdr.detectChanges();
    }

    if (v) {
      this.loaded = true;
    }
  }

  private _active = false;

  @InputBoolean()
  @Input()
  cache = false;

  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    this.parent.cdr.markForCheck();
  }

  private _disabled = false;

  @ViewChild('labelIsStringTmpl', { static: true })
  labelStringTemplate!: TemplateRef<unknown>;
  @ContentChild(TemplateRef) contentTemplate?: TemplateRef<unknown>;

  @HostBinding('class.ngx-tab') hostClass = true;

  labelTemplate!: TemplateRef<unknown>;
  loaded = false;

  constructor(
    @Inject(forwardRef(() => TabsComponent))
    private readonly parent: TabsComponent,
    private readonly cdr: ChangeDetectorRef,
    private readonly renderer: Renderer2,
    private readonly elRef: ElementRef
  ) {}

  ngOnInit(): void {
    // backwards compatibility
    if (this._title) {
      this._label = this._title;
      this.renderer.removeAttribute(this.elRef.nativeElement, 'title');
    }

    this.labelTemplate =
      typeof this._label === 'string' ? this.labelStringTemplate : this._label;
  }
}

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
  @InputBoolean()
  @Input()
  vertical = false;

  @Output() selectTab = new EventEmitter<TabComponent>();
  /**
   * For backwards compat... user selectTab instead.
   * @deprecated see {@link selectTab}
   */
  @Output() select = this.selectTab;

  @ContentChildren(TabComponent) readonly tabs!: QueryList<TabComponent>;

  @HostBinding('class.ngx-tabs') hostClass = true;

  get tabsArray(): TabComponent[] {
    return this.tabs.toArray();
  }

  @Input() get activeIndex(): number {
    return this._activeIndex || -1;
  }

  set activeIndex(val: number) {
    this._activeIndex = val;

    if (
      this.tabsArray &&
      this.tabsArray.length &&
      this._activeIndex != null &&
      this.tabsArray.length > this._activeIndex
    ) {
      const activeTab = this.findActiveTab();
      if (activeTab) {
        activeTab.active = false;
      }
      this.tabsArray[this._activeIndex].active = true;
    }
  }

  private _activeIndex?: number;
  private tabChanged = false;

  constructor(
    public readonly cdr: ChangeDetectorRef,
    private readonly destroyed: DestroyedService
  ) {}

  ngAfterContentInit(): void {
    this.initTabs();

    this.tabs.changes.pipe(takeUntil(this.destroyed)).subscribe(() => {
      this.initTabs();
    });
  }

  open(tab: TabComponent, event?: MouseEvent) {
    if (tab.disabled) {
      if (event) {
        event.preventDefault();
      }
      return;
    }

    if (!tab.active) {
      const currentActiveTab = this.findActiveTab();
      if (currentActiveTab) {
        currentActiveTab.active = false;
      }
      this.tabChanged = true;
      tab.active = true;
      this.selectTab.emit(tab);
    }

    if (event) {
      event.preventDefault();
    }
  }

  move(offset: number) {
    const index = this.tabsArray.findIndex((tab) => tab.active);
    for (
      let i = index + offset;
      i < this.tabsArray.length && i >= 0;
      i += offset
    ) {
      const tab = this.tabsArray[i];
      if (tab && !tab.disabled) {
        this.open(this.tabsArray[i]);
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

  private initTabs() {
    const activeTab = this.findActiveTab();
    if (!activeTab && this.tabsArray.length) {
      if (
        this.activeIndex != null &&
        this.activeIndex !== -1 &&
        this.tabsArray.length > this.activeIndex
      ) {
        this.tabsArray[this.activeIndex].active = true;
      } else {
        this.tabsArray[0].active = true;
      }
      this.tabChanged = true;
    }

    this.cdr.markForCheck();
  }

  private findActiveTab(): TabComponent | null {
    for (let i = 0, len = this.tabsArray.length; i < len; i++) {
      if (this.tabsArray[i].active) {
        return this.tabsArray[i];
      }
    }

    return null;
  }
}
