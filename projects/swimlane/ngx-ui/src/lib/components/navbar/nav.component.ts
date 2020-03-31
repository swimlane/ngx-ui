import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  exportAs: 'ngxNav',
  selector: 'ngx-nav',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./nav.component.scss'],
  host: {
    class: 'ngx-nav',
    '[class.active]': 'active'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
  @Input()
  get active() {
    return this._active;
  }
  set active(v: boolean) {
    this._active = coerceBooleanProperty(v);
    this._cdr.markForCheck();
  }

  get height() {
    return this._el.nativeElement.clientHeight;
  }

  get width() {
    return this._el.nativeElement.clientWidth;
  }

  private _active?: boolean;

  constructor(private readonly _cdr: ChangeDetectorRef, private readonly _el: ElementRef<HTMLElement>) {}
}
