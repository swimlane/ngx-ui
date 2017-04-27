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
      (mousedown)="onMousedown()"
      class="icon-split-handle ngx-split-button">
    </button>
  `,
  host: {
    class: 'ngx-split-handle'
  }
})
export class SplitHandleComponent {

  @Output() drag: EventEmitter<{ x: number, y: number }> = new EventEmitter();

  subscription: Subscription;

  onMousedown(): void {
    const mouseup$ = Observable.fromEvent(document, 'mouseup');
    this.subscription = mouseup$
      .subscribe((ev: MouseEvent) => this.onMouseup());

    const mousemove$ = Observable.fromEvent(document, 'mousemove')
      .takeUntil(mouseup$)
      .subscribe((event: MouseEvent) => this.onMouseMove(event));

    this.subscription.add(mousemove$);
  }

  onMouseMove(event): void {
    this.drag.emit({ 
      x: event.movementX, 
      y: event.movementY 
    });
  }

  onMouseup(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

}
