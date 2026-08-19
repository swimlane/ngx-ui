import { Component, Input, QueryList, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ListColumnComponent } from '../list-column/list-column.component';
import { ListRowStatus } from '../models/list-row-status.enum';
import { ListColumnAlign } from '../models/list-column-align.type';
import { ListNestMode } from '../models/list-nest-mode.type';
import { getListRowDepth } from '../list-nest.utils';
import { shrinkFirstColumnTrack } from '../list-layout.utils';

/** Matches the row stylesheet's base horizontal margin. */
const ROW_BASE_MARGIN_PX = 16;

@Component({
  selector: 'ngx-list-row',
  templateUrl: './list-row.component.html',
  styleUrl: './list-row.component.scss',
  standalone: false,
  host: {
    class: 'ngx-list-row',
    '[class.ngx-list-row--error]': 'status === ListRowStatus.Error || data?.status === ListRowStatus.Error',
    '[class.ngx-list-row--success]': 'status === ListRowStatus.Success || data?.status === ListRowStatus.Success',
    '[class.ngx-list-row--warning]': 'status === ListRowStatus.Warning || data?.status === ListRowStatus.Warning',
    '[class.ngx-list-row--selectable]': 'selectable',
    '[class.ngx-list-row--selected]': 'selected',
    '[class.ngx-list-row--disabled]': 'data?.disabled === true',
    '[style.height.px]': 'rowHeight',
    '[style.margin-left.px]': 'marginLeftPx'
  },
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None
})
export class ListRowComponent {
  @Input() columnLayout: Partial<CSSStyleDeclaration>;
  @Input() columns: QueryList<ListColumnComponent>;
  @Input() data: Record<string, unknown>;
  @Input() index: number;
  @Input() status: ListRowStatus;
  @Input() rowHeight: number | string;
  @Input() nestIndent = 20;
  @Input() indentColumn = 0;
  @Input() nested = false;
  @Input() nestMode: ListNestMode = 'stagger';
  @Input() selectable = false;
  @Input() selected = false;
  @Input() onCheckedChange: (data: Record<string, unknown>, index: number, selected: boolean) => void;

  columnComponent = ListColumnComponent;

  readonly ListRowStatus = ListRowStatus;

  private layoutCacheKey = '';
  private layoutCache: Partial<CSSStyleDeclaration>;

  get depth(): number {
    return getListRowDepth(this.data);
  }

  get marginLeftPx(): number {
    return ROW_BASE_MARGIN_PX + this.indentPx;
  }

  get rowColumnLayout(): Partial<CSSStyleDeclaration> {
    if (this.nestMode !== 'aligned' || this.indentPx <= 0) {
      return this.columnLayout;
    }

    const base = this.columnLayout?.gridTemplateColumns as string | undefined;
    const gridTemplateColumns = shrinkFirstColumnTrack(base, this.indentPx);
    if (!gridTemplateColumns || gridTemplateColumns === base) {
      return this.columnLayout;
    }

    const key = `${base}|${this.indentPx}`;
    if (this.layoutCacheKey !== key) {
      this.layoutCacheKey = key;
      this.layoutCache = { ...this.columnLayout, gridTemplateColumns };
    }
    return this.layoutCache;
  }

  getCellAlign(columnIndex: number, column: ListColumnComponent): ListColumnAlign {
    if (this.nested && this.nestMode === 'stagger') {
      return columnIndex === this.indentColumn ? 'left' : 'center';
    }
    return column?.align ?? 'left';
  }

  private get indentPx(): number {
    return this.depth * (this.nestIndent ?? 0);
  }

  get checkboxAriaLabel(): string {
    const name = this.data?.['name'];
    const label = this.data?.['label'];
    if (typeof name === 'string' && name) {
      return name;
    }
    if (typeof label === 'string' && label) {
      return label;
    }
    return 'Select row';
  }

  onCheckboxChange(checked: boolean): void {
    this.onCheckedChange?.(this.data, this.index, checked);
  }
}
