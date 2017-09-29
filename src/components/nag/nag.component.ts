import {
  Component, Input, Output, EventEmitter, HostBinding, HostListener, ViewEncapsulation, OnDestroy
} from '@angular/core';

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
          <ngx-icon class="ngx-nag-icon" fontIcon="arrow-up"></ngx-icon>
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
  styleUrls: ['./nag.component.scss']
})
export class NagComponent implements OnDestroy {

  @Input() cssClass: string = '';
  @Input() state: string = 'closed';

  @Output() stateChanged = new EventEmitter<string>();

  @HostBinding('style.zIndex')
  @Input() zIndex: number;

  @Input() title: string = '';

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
}
