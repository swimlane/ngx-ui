import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SplitDirection } from './split-direction.enum';

@Component({
  exportAs: 'ngxSplitHandle',
  // tslint:disable-next-line:component-selector
  selector: '[ngxSplitHandle]',
  templateUrl: './split-handle.component.html',
  styleUrls: ['./split-handle.component.scss'],
  host: {
    class: 'ngx-split-handle',
    '[class.direction-row]': 'isRow',
    '[class.direction-column]': 'isColumn'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitHandleComponent {
  @Output() drag = new EventEmitter<{ x: number; y: number }>();
  @Output() dragStart = new EventEmitter<MouseEvent>();
  @Output() dragEnd = new EventEmitter<MouseEvent>();
  @Output() dblclick = new EventEmitter<MouseEvent>();

  subscription: Subscription;
  direction = SplitDirection.Row;

  get isRow() {
    return this.direction === SplitDirection.Row;
  }

  get isColumn() {
    return this.direction === SplitDirection.Column;
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
