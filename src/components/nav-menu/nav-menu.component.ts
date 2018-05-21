import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectionStrategy,
  TemplateRef,
  Input,
  HostBinding,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'ngx-nav-menu',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./nav-menu.component.scss'],
  template: `
    <div class="nav-menu">
      <ng-content></ng-content>
    </div>
  `
})
export class NavMenuComponent {
  @HostBinding('class.expanded')
  @Input()
  expanded: boolean = false;
}
