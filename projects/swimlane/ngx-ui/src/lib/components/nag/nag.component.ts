import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { trigger } from '@angular/animations';

import { bounceAnimation } from '../../animations/bounce.animation';

const enum State {
  open = 'open',
  peek = 'peek',
  closed = 'closed'
}

@Component({
  selector: 'ngx-nag',
  exportAs: 'ngxNag',
  templateUrl: './nag.component.html',
  host: {
    role: 'dialog',
    tabindex: '-1',
    '[style.zIndex]': 'zIndex'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./nag.component.scss'],
  animations: [trigger('bounce', bounceAnimation())],
  standalone: false
})
export class NagComponent implements OnDestroy, OnChanges {
  @Input() cssClass = '';

  @Input()
  state: State | keyof typeof State = State.closed;

  @Output() stateChanged = new EventEmitter<string>();

  get zIndex() {
    return this._zIndex;
  }
  @Input()
  set zIndex(val: number) {
    this._zIndex = coerceNumberProperty(val);
  }

  @Input() nagTitle = '';
  @Input() watch: any; // changes to this value cause animation and state changes
  @Input() hide: any; // setting this value will force the nag to close

  @HostBinding('class')
  get klass() {
    return `ngx-nag ngx-nag-bottom ngx-nag-${this.state} ${this.cssClass}`;
  }

  // Controls the bounce animation
  @HostBinding('@bounce')
  bounce = 0;

  private _zIndex: number;

  toggle() {
    this.state = this.state !== State.open ? State.open : State.peek; // can't toggle if closed
    this.stateChanged.emit(this.state);
  }

  ngOnDestroy() {
    this.stateChanged.emit(this.state);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hide && changes.hide.currentValue !== changes.hide.previousValue) {
      if (changes.hide.currentValue === true) {
        // nag is hidden external from component
        this.state = State.closed;
        this.stateChanged.emit(this.state);
      }
    }
    if (changes.watch && !this.hide) {
      // If watch value changes and nag is not hidden
      switch (this.state) {
        case State.closed: // and nag is closed
          this.state = State.peek; // open it
          this.stateChanged.emit(this.state);
          break;
        case State.peek: // and nag is peeked
          this.bounce = (this.bounce + 1) % 1000; // bounce it
          break;
      }
    }
  }
}
