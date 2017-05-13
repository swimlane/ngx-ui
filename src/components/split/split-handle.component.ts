import { Component, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: '[ngxSplitHandle]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      #splitHandle
      (mousedown)="onMousedown($event)"
      (dblclick)="dblclick.emit($event)"
      class="icon-split-handle ngx-split-button">
    </button>
  `,
  host: {
    class: 'ngx-split-handle'
  }
})
export class SplitHandleComponent {

  @Output() drag: EventEmitter<{ x: number, y: number }> = new EventEmitter();
  @Output() dragStart: EventEmitter<any> = new EventEmitter();
  @Output() dragEnd: EventEmitter<any> = new EventEmitter();
  @Output() dblclick: EventEmitter<any> = new EventEmitter();

  subscription: Subscription;

  onMousedown(ev): void {
    const mouseup$ = Observable.fromEvent(document, 'mouseup');
    this.subscription = mouseup$
      .subscribe((e: MouseEvent) => this.onMouseup(e));

    const mousemove$ = Observable.fromEvent(document, 'mousemove')
      .takeUntil(mouseup$)
      .subscribe((e: MouseEvent) => this.onMouseMove(e));

    this.subscription.add(mousemove$);
    this.dragStart.emit(ev);
  }

  onMouseMove(ev): void {
    this.drag.emit(ev);
  }

  onMouseup(ev): void {
    if(this.subscription) {
      this.dragEnd.emit(ev);
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

}
