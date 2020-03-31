import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  exportAs: 'ngxNavbar',
  selector: 'ngx-vertical-navbar, ngx-horizontal-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: { class: 'ngx-navbar' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  vertical: boolean;
  private get _name() {
    return this._el.nativeElement.nodeName.toLowerCase();
  }

  constructor(private readonly _el: ElementRef<HTMLElement>) {
    this._el.nativeElement.classList.add(this._name);
  }
}
