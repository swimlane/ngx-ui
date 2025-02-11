import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
  Input,
  HostBinding,
  OnChanges
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FlexParts, partsToStyle, basisToParts } from './utils';
import { SplitDirection } from './split-direction.enum';

const DEFAULT_BASIS = '0 0 15px';

@Component({
  exportAs: 'ngxSplitHandle',
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[ngxSplitHandle]',
  templateUrl: './split-handle.component.html',
  styleUrls: ['./split-handle.component.scss'],
  host: {
    class: 'ngx-split-handle',
    '[class.direction-row]': 'isRow',
    '[class.direction-column]': 'isColumn',
    '[style.box-sizing]': '"border-box"'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class SplitHandleComponent implements OnChanges {
  @Input() ngxSplitHandle = DEFAULT_BASIS;

  @Output() drag = new EventEmitter<{ x: number; y: number }>();
  @Output() dragStart = new EventEmitter<MouseEvent>();
  @Output() dragEnd = new EventEmitter<MouseEvent>();
  @Output() dblclick = new EventEmitter<MouseEvent>();

  direction: SplitDirection = SplitDirection.Row;
  subscription: Subscription;
  currentFlexParts: FlexParts = basisToParts('0', '0', DEFAULT_BASIS);

  @HostBinding('style.flex')
  get flex() {
    return partsToStyle(this.currentFlexParts);
  }

  @HostBinding('class.direction-row')
  get isRow() {
    return this.direction === SplitDirection.Row;
  }

  @HostBinding('class.direction-column')
  get isColumn() {
    return this.direction === SplitDirection.Column;
  }

  ngOnChanges() {
    if (!this.ngxSplitHandle) {
      this.ngxSplitHandle = DEFAULT_BASIS;
    }
    this.currentFlexParts = basisToParts('0', '0', this.ngxSplitHandle);
  }

  onMousedown(ev: MouseEvent): void {
    const mouseup$ = fromEvent(document, 'mouseup');
    this.subscription = mouseup$.subscribe(/* istanbul ignore next */ (e: MouseEvent) => this.onMouseup(e));

    const mousemove$ = fromEvent(document, 'mousemove')
      .pipe(takeUntil(mouseup$))
      .subscribe(/* istanbul ignore next */ (e: MouseEvent) => this.onMouseMove(e));

    this.subscription.add(mousemove$);
    this.dragStart.emit(ev);
  }

  onMouseMove(ev: MouseEvent): void {
    this.drag.emit(ev);
  }

  onMouseup(ev: MouseEvent): void {
    if (this.subscription) {
      this.dragEnd.emit(ev);
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
