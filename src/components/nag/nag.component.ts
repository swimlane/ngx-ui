import {
  Component, Input, Output, EventEmitter,
  HostBinding, HostListener, ViewEncapsulation,
  OnDestroy, OnChanges, SimpleChanges
} from '@angular/core';
import {
  trigger, transition, animate, style, state, keyframes
} from '@angular/animations';
import { nagDrawerTransition } from '../../animations';

@Component({
  selector: 'ngx-nag',
  template: `
    <div class="ngx-nag-content">
      <ngx-toolbar
        class="ngx-nag-toolbar"
        (click)="toggle()"
        [title]="title">
        <ngx-toolbar-title *ngIf="!title">
          <ng-content select="[ngx-nag-title]"></ng-content>
        </ngx-toolbar-title>
        <ngx-toolbar-content>
          <ngx-icon class="ngx-nag-icon" fontIcon="arrow-down"></ngx-icon>
        </ngx-toolbar-content>
      </ngx-toolbar>
      <section class="ngx-nag-body ngx-section-content">
        <ng-content></ng-content>
      </section>
    </div>
  `,
  host: {
    role: 'dialog',
    tabindex: '-1'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./nag.component.scss'],
  animations: [
    trigger('drawerTransition', nagDrawerTransition)
  ]
})
export class NagComponent implements OnDestroy, OnChanges {

  @Input() cssClass: string = '';

  @HostBinding('@drawerTransition')
  @Input() state: string = 'closed';

  @Output() stateChanged = new EventEmitter<string>();

  @HostBinding('style.zIndex')
  @Input() zIndex: number;

  @Input() title: string = '';
  @Input() watch: any;

  @HostBinding('class')
  get klass() {
    return `ngx-nag ngx-nag-bottom ngx-nag-${this.state} ${this.cssClass}`;
  }

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
