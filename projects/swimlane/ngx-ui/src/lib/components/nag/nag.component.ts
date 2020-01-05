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

import { nagDrawerTransition } from '../../animations/animations';

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
  animations: [trigger('drawerTransition', nagDrawerTransition)]
})
export class NagComponent implements OnDestroy, OnChanges {
  @Input() cssClass: string = '';

  @HostBinding('@drawerTransition')
  @Input()
  state: string = 'closed';

  @Output() stateChanged = new EventEmitter<string>();

  get zIndex() {
    return this._zIndex;
  }
  @Input()
  set zIndex(val: number) {
    this._zIndex = coerceNumberProperty(val);
  }

  @Input() nagTitle: string = '';
  @Input() watch: any;

  @HostBinding('class')
  get klass() {
    return `ngx-nag ngx-nag-bottom ngx-nag-${this.state} ${this.cssClass}`;
  }

  private _zIndex: number;

  toggle() {
    this.state = this.state !== 'open' ? 'open' : 'closed';
    this.stateChanged.emit(this.state);
  }

  ngOnDestroy() {
    this.stateChanged.emit(this.state);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.watch && this.state === 'closed') {
      this.state = 'peek';
      setTimeout(() => {
        this.state = 'closed';
      }, 100);
    }
  }
}
