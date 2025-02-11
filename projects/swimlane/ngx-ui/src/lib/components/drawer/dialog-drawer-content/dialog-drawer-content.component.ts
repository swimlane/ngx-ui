import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ngx-dialog-drawer-content',
  template: `
    <header class="ngx-dialog-drawer-content__header shadow-1" (click)="dismiss.emit()">
      <h2 class="ngx-dialog-drawer-content__header-title">{{ drawerTitle }}</h2>
      <button type="button" class="ngx-dialog-drawer-content__dismiss-btn btn btn-link">
        <i class="ngx-icon ngx-arrow-bold-down"></i>
        {{ dismissBtnText }}
      </button>
    </header>
    <section class="ngx-dialog-drawer-content__content">
      <ng-content></ng-content>
    </section>
  `,
  styleUrls: ['./dialog-drawer-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class DialogDrawerContentComponent {
  @Input() drawerTitle = '';
  @Input() dismissBtnText = 'Dismiss';
  @Output() dismiss = new EventEmitter();

  @HostBinding('class.ngx-dialog-drawer-content') hostClass = true;
}
