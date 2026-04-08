import {
  Component,
  ComponentRef,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
  AfterViewInit
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { InputComponent } from '../../input/input.component';
import { Column } from './column.types';

export interface ColumnTabClickEvent {
  columnId: string;
  active: boolean;
  title: string;
  children?: Array<ColumnTabClickEvent>;
  content?: boolean;
}

@Component({
  selector: 'ngx-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngx-column',
    '[class.expanded]': 'activeChild && activeChild.content'
  }
})
export class ColumnComponent implements OnChanges, AfterViewInit {
  column = input<Column | null>(null);
  height = input<string>('');
  headerTemplate = input<TemplateRef<any> | null>(null);
  tabClick = output<ColumnTabClickEvent>();
  scrollerHeight = signal('300');
  vcr = viewChild('expandedSection', { read: ViewContainerRef });
  searchInput = viewChild<InputComponent>('searchInput');
  virtualScrollViewport = viewChild<CdkVirtualScrollViewport>('virtualScrollViewport');
  activeChild: Column | null = null;
  list: Column[] = [];
  searchInputValue = '';
  componentRef: ComponentRef<any> | null = null;
  private savedScrollTop: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.column?.currentValue) {
      if (changes.column.currentValue.children) {
        this.list = changes.column.currentValue.children;
      }
      if (changes.column.currentValue.children && changes.column.currentValue.active) {
        this.activeChild = changes.column.currentValue.children
          ? changes.column.currentValue.children?.find(child => child.active)
          : null;
        if (this.activeChild?.content && this.activeChild?.content.component) {
          this.displayContent();
        }
      }
    }
    if (changes.height?.currentValue) {
      this.scrollerHeight.set(String(changes.height.currentValue.split(/(px)/g)[0] - 110));
    }
  }

  ngAfterViewInit(): void {
    // Restore scroll position after view init if it was saved
    if (this.savedScrollTop > 0 && this.virtualScrollViewport()) {
      // Use setTimeout to ensure viewport is fully initialized
      setTimeout(() => {
        const viewport = this.virtualScrollViewport();
        if (viewport) {
          viewport.scrollToOffset(this.savedScrollTop);
        }
      }, 0);
    }
  }

  toTabClickEvent(column: Column): ColumnTabClickEvent {
    const event: ColumnTabClickEvent = {
      columnId: column.id,
      active: true,
      title: column.title,
      content: !!column.content
    };

    if (column.children && column.children.length) {
      event.children = column.children.map(child => this.toTabClickEvent(child));
    }

    return event;
  }

  onChildClick(columnId: string) {
    this.activeChild = this.column().children.find(child => child.id === columnId);
    const tabClickEvent = this.toTabClickEvent(this.activeChild);
    this.tabClick.emit(tabClickEvent);
    if (this.activeChild?.content && this.activeChild?.content.component) {
      this.displayContent();
    }
    this.clearFilter();
  }

  onChildKeyup(event: KeyboardEvent, columnId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.activeChild = this.column().children.find(child => child.id === columnId);
      const tabClickEvent = this.toTabClickEvent(this.activeChild);
      this.tabClick.emit(tabClickEvent);
      if (this.activeChild?.content && this.activeChild?.content.component) {
        this.displayContent();
      }
      this.clearFilter();
    }
  }

  displayContent() {
    if (!this.activeChild || !this.activeChild.content?.component) {
      return;
    }
    this.vcr()?.clear();
    this.componentRef = this.vcr()?.createComponent(
      this.activeChild.content.component,
      this.activeChild.content.options || {}
    );
  }

  onInputChange(event: KeyboardEvent) {
    this.searchInputValue = (event.target as HTMLInputElement).value;
    const change = this.searchInputValue;
    if (!change.length) {
      this.list = this.column().children ? this.column().children : [];
    } else {
      const query = change.toLowerCase();
      const results = this.column().children.filter((child: Column) => {
        return child.title.toLowerCase().includes(query);
      });
      if (!results.length) {
        this.list = this.column().children ? this.column().children : [];
        this.activeChild = this.list.find(child => child.active);
      } else {
        this.list = results;
        if (this.activeChild && !this.list.find(child => child.id === this.activeChild.id)) {
          this.list.unshift(this.activeChild);
        }
      }
    }
  }

  clearFilter(): void {
    this.searchInputValue = '';
    this.list = this.column().children ? this.column().children : [];
    this.activeChild = this.list.find(child => child.active);

    const searchInputCmp = this.searchInput();
    if (searchInputCmp) {
      searchInputCmp.writeValue('');
    }
  }

  getScrollTop(): number {
    const viewport = this.virtualScrollViewport();
    if (viewport) {
      return viewport.measureScrollOffset('top');
    }
    return 0;
  }

  setScrollTop(scrollTop: number): void {
    this.savedScrollTop = scrollTop;
    const viewport = this.virtualScrollViewport();
    if (viewport) {
      viewport.scrollToOffset(scrollTop);
    }
  }

  scrollToChild(targetChildId: string | undefined, targetChildTitle: string | undefined): boolean {
    if (!targetChildId && !targetChildTitle) {
      return false;
    }

    const children = this.column()?.children;
    const viewport = this.virtualScrollViewport();
    if (!children?.length || !viewport) {
      return false;
    }

    const viewportElement = viewport.elementRef.nativeElement as HTMLElement;
    if (!viewportElement || viewportElement.scrollHeight <= 0) {
      return false;
    }

    let childIndex = -1;
    if (targetChildId) {
      childIndex = children.findIndex(child => child.id === targetChildId);
    }

    if (childIndex === -1 && targetChildTitle) {
      childIndex = children.findIndex(child => child.title === targetChildTitle);
    }

    if (childIndex === -1) {
      return false;
    }

    viewport.scrollToIndex(childIndex);
    return true;
  }
}
