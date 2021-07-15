import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SplitDirection } from '../enums';
import { basisToParts, partsToStyle } from '../utils';

const DEFAULT_BASIS = '0 0 15px';

@Component({
  selector: '[ngxSplitHandle]',
  exportAs: 'ngxSplitHandle',
  templateUrl: './split-handle.component.html',
  styleUrls: ['./split-handle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitHandleComponent implements OnChanges {
  @Input() ngxSplitHandle = DEFAULT_BASIS;

  @Output() splitHandleDrag = new EventEmitter<{ x: number; y: number }>();
  @Output() dragStart = new EventEmitter<MouseEvent>();
  @Output() dragEnd = new EventEmitter<MouseEvent>();
  @Output() splitHandleDblClick = new EventEmitter<MouseEvent>();

  direction = SplitDirection.row;
  subscription?: Subscription;
  currentFlexParts = basisToParts('0', '0', DEFAULT_BASIS);

  @HostBinding('style.flex')
  get flex() {
    return partsToStyle(this.currentFlexParts);
  }

  @HostBinding('class.direction-row')
  get isRow() {
    return this.direction === SplitDirection.row;
  }

  @HostBinding('class.direction-column')
  get isColumn() {
    return this.direction === SplitDirection.column;
  }

  @HostBinding('class.ngx-split-handle') hostClass = true;
  @HostBinding('style.box-sizing') hostBoxSizing = 'border-box';

  ngOnChanges() {
    if (!this.ngxSplitHandle) {
      this.ngxSplitHandle = DEFAULT_BASIS;
    }
    this.currentFlexParts = basisToParts('0', '0', this.ngxSplitHandle);
  }

  onMousedown(ev: MouseEvent): void {
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');
    this.subscription = mouseup$.subscribe(
      /* istanbul ignore next */ (e: MouseEvent) => this.onMouseup(e)
    );

    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(takeUntil(mouseup$))
      .subscribe(
        /* istanbul ignore next */ (e: MouseEvent) => this.onMouseMove(e)
      );

    this.subscription.add(mousemove$);
    this.dragStart.emit(ev);
  }

  onMouseMove(ev: MouseEvent): void {
    this.splitHandleDrag.emit(ev);
  }

  onMouseup(ev: MouseEvent): void {
    if (this.subscription) {
      this.dragEnd.emit(ev);
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
