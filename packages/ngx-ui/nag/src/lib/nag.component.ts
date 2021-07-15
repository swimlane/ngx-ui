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
  ViewEncapsulation,
} from '@angular/core';
import { bounceAnimation } from '@swimlane/ngx-ui/animations';
import { NgxNumericInput, NumericInput } from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { NagState } from './enums';

@Component({
  selector: 'ngx-nag',
  exportAs: 'ngxNag',
  templateUrl: './nag.component.html',
  styleUrls: ['./nag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('bounce', bounceAnimation())],
})
export class NagComponent implements OnDestroy, OnChanges {
  static ngAcceptInputType_zIndex: NumericInput;

  @HostBinding('attr.role') hostRole = 'dialog';
  @HostBinding('attr.tabindex') hostTabIndex = -1;

  @Input() cssClass = '';

  @Input('state') set _state(v: EnumKey<typeof NagState>) {
    this.state = NagState[v];
  }

  state = NagState.closed;

  @Output() stateChanged = new EventEmitter<string>();

  @HostBinding('style.zIndex')
  @NgxNumericInput()
  @Input()
  zIndex = 0;

  @Input() nagTitle = '';
  @Input() watch: unknown; // changes to this value cause animation and state changes
  @Input() hide?: boolean; // setting this value will force the nag to close

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
    if (
      changes.hide &&
      changes.hide.currentValue !== changes.hide.previousValue
    ) {
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
