import { Component, Output, ChangeDetectionStrategy, ViewChild, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: '[ngxSplitHandle]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      #splitHandle
      class="icon-split-handle ngx-split-button">
    </button>
  `,
  host: {
    class: 'ngx-split-handle'
  }
})
export class SplitHandleComponent implements AfterContentInit {

  @ViewChild('splitHandle') button: any;
  @Output() drag: Observable<{ x: number, y: number }>;

  ngAfterContentInit(): void {
    const getMouseEventPosition = (event: MouseEvent) => ({ x: event.movementX, y: event.movementY });

    const mousedown$ = Observable.fromEvent(this.button.nativeElement, 'mousedown').map(getMouseEventPosition);
    const mousemove$ = Observable.fromEvent(document, 'mousemove').map(getMouseEventPosition);
    const mouseup$ = Observable.fromEvent(document, 'mouseup');

    this.drag = mousedown$
      .switchMap(mousedown =>
        mousemove$.map(mousemove => ({
          x: mousemove.x,
          y: mousemove.y
        }))
        .takeUntil(mouseup$)
      );
  }

}
