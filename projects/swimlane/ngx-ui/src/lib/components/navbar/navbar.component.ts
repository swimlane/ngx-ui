import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  exportAs: 'ngxNavbar',
  selector: 'ngx-vertical-navbar, ngx-horizontal-navbar',
  template: `
    <ng-content select="ngx-nav"></ng-content>
  `,
  styleUrls: ['./navbar.component.scss'],
  host: { class: 'ngx-navbar' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private get _name() {
    return this._el.nativeElement.nodeName.toLowerCase();
  }

  constructor(private readonly _el: ElementRef<HTMLElement>) {
    this._el.nativeElement.classList.add(this._name);
  }
}
