import {
  Component,
  ComponentRef,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
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
export class ColumnComponent implements OnChanges {
  column = input<Column | null>(null);
  height = input<string>('');
  tabClick = output<ColumnTabClickEvent>();
  scrollerHeight = signal('300');
  vcr = viewChild('expandedSection', { read: ViewContainerRef });
  activeChild: Column | null = null;
  list: Column[] = [];
  searchInputValue = '';
  componentRef: ComponentRef<any> | null = null;

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
  }

  onChildKeyup(event: KeyboardEvent, columnId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.activeChild = this.column().children.find(child => child.id === columnId);
      const tabClickEvent = this.toTabClickEvent(this.activeChild);
      this.tabClick.emit(tabClickEvent);
      if (this.activeChild?.content && this.activeChild?.content.component) {
        this.displayContent();
      }
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
    const change = (event.target as HTMLInputElement).value;
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
}
