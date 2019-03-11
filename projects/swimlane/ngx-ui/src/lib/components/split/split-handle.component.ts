import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[ngxSplitHandle]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      #splitHandle
      (mousedown)="onMousedown($event)"
      (dblclick)="dblclick.emit($event)"
      class="icon-split-handle ngx-split-button"
    ></button>
  `,
  host: {
    class: 'ngx-split-handle'
  },
  styleUrls: ['./split-handle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SplitHandleComponent {
  @Output() drag: EventEmitter<{ x: number; y: number }> = new EventEmitter();
  @Output() dragStart: EventEmitter<any> = new EventEmitter();
  @Output() dragEnd: EventEmitter<any> = new EventEmitter();
  @Output() dblclick: EventEmitter<any> = new EventEmitter();

  subscription: Subscription;

  direction: string = 'row';

  @HostBinding('class.direction-row')
  get isRow() {
    return this.direction === 'row';
  }

  @HostBinding('class.direction-column')
  get isColumn() {
    return this.direction === 'column';
  }

  onMousedown(ev): void {
    const mouseup$ = fromEvent(document, 'mouseup');
    this.subscription = mouseup$.subscribe((e: MouseEvent) => this.onMouseup(e));

    const mousemove$ = fromEvent(document, 'mousemove')
      .pipe(takeUntil(mouseup$))
      .subscribe((e: MouseEvent) => this.onMouseMove(e));

    this.subscription.add(mousemove$);
    this.dragStart.emit(ev);
  }

  onMouseMove(ev): void {
    this.drag.emit(ev);
  }

  onMouseup(ev): void {
    if (this.subscription) {
      this.dragEnd.emit(ev);
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
