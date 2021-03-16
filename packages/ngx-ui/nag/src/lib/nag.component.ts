import { trigger } from '@angular/animations';
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
import { bounceAnimation } from '@swimlane/ngx-ui/animations';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';

const enum NagState {
  open = 'open',
  peek = 'peek',
  closed = 'closed'
}

@Component({
  selector: 'ngx-nag',
  exportAs: 'ngxNag',
  templateUrl: './nag.component.html',
  styleUrls: ['./nag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('bounce', bounceAnimation())]
})
export class NagComponent implements OnDestroy, OnChanges {
  @Input() cssClass = '';

  @Input()
  state: NagState | keyof typeof NagState = NagState.closed;
  @Output() stateChanged = new EventEmitter<string>();

  @HostBinding('style.zIndex')
  @InputNumeric()
  @Input()
  zIndex?: number;

  @Input() nagTitle = '';

  @Input() watch: unknown; // changes to this value cause animation and state changes
  @Input() hide?: boolean; // setting this value will force the nag to close

  @HostBinding('attr.role') role = 'dialog';
  @HostBinding('attr.tabindex') tabIndex = -1;

  @HostBinding('class')
  get klass() {
    return `ngx-nag ngx-nag-bottom ngx-nag-${this.state} ${this.cssClass}`;
  }

  // Controls the bounce animation
  @HostBinding('@bounce')
  bounce = 0;

  toggle() {
    this.state = this.state !== NagState.open ? NagState.open : NagState.peek; // can't toggle if closed
    this.stateChanged.emit(this.state);
  }

  ngOnDestroy() {
    this.stateChanged.emit(this.state);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hide && changes.hide.currentValue !== changes.hide.previousValue) {
      if (changes.hide.currentValue === true) {
        // nag is hidden external from component
        this.state = NagState.closed;
        this.stateChanged.emit(this.state);
      }
    }
    if (changes.watch && !this.hide) {
      // If watch value changes and nag is not hidden
      switch (this.state) {
        case NagState.closed: // and nag is closed
          this.state = NagState.peek; // open it
          this.stateChanged.emit(this.state);
          break;
        case NagState.peek: // and nag is peeked
          this.bounce = (this.bounce + 1) % 1000; // bounce it
          break;
      }
    }
  }
}
