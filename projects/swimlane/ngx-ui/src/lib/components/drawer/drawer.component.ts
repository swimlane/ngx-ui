import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectionStrategy,
  TemplateRef,
  OnInit,
  NgZone,
  Renderer2,
  ElementRef
} from '@angular/core';
import { ESCAPE } from '@angular/cdk/keycodes';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { trigger } from '@angular/animations';

import { DRAWER_ANIMATION } from './drawer.animation';
import { DrawerDirection } from './drawer-direction.enum';
import { DrawerPosition } from './drawer-position.enum';

@Component({
  exportAs: 'ngxDrawer',
  selector: 'ngx-drawer',
  templateUrl: 'drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [trigger('drawerTransition', DRAWER_ANIMATION)],
  host: {
    role: 'dialog',
    tabindex: '-1',
    '[class]': 'cssClasses',
    '[style.width]': 'widthSize',
    '[style.height]': 'heightSize',
    '[style.zIndex]': 'zIndex',
    '[style.position]': 'position',
    '[@drawerTransition]': 'direction'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() cssClass: string = '';
  @Input() direction: DrawerDirection;
  @Input() template: TemplateRef<any>;
  @Input() context: any;
  @Input() isRoot: boolean = true;

  @Input()
  get size() {
    return this._size;
  }
  set size(val: number) {
    this._size = coerceNumberProperty(val);
  }

  @Input()
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(val: number) {
    this._zIndex = coerceNumberProperty(val);
  }

  @Input()
  get closeOnOutsideClick() {
    return this._closeOnOutsideClick;
  }
  set closeOnOutsideClick(val: boolean) {
    this._closeOnOutsideClick = coerceBooleanProperty(val);
  }

  @Output() close = new EventEmitter<boolean>();

  get cssClasses(): string {
    let clz = `ngx-drawer ${this.cssClass}`;
    if (this.isLeft) clz += ' left-drawer';
    if (this.isBottom) clz += ' bottom-drawer';
    return clz;
  }

  widthSize: string | number;
  heightSize: string | number;
  position: DrawerPosition = DrawerPosition.fixed;

  private get isLeft(): boolean {
    return this.direction === DrawerDirection.Left;
  }

  private get isBottom(): boolean {
    return this.direction === DrawerDirection.Bottom;
  }

  private _size: number;
  private _zIndex: number;
  private _closeOnOutsideClick: boolean;
  private _keyupListener: VoidFunction;

  constructor(ngZone: NgZone, renderer: Renderer2, host: ElementRef<HTMLElement>) {
    ngZone.runOutsideAngular(() => {
      this._keyupListener = renderer.listen(host.nativeElement, 'keyup', (event: KeyboardEvent) => {
        // We will trigger change detection only when the `esc` button is pressed and if there are any
        // `close` observers, e.g. added through template listener: `(close)="handleClose()"`.
        if (event.keyCode === ESCAPE && this.close.observers.length > 0) {
          ngZone.run(() => {
            this.close.emit(true);
          });
        }
      });
    });
  }

  ngOnInit() {
    this.position = this.isRoot ? DrawerPosition.fixed : DrawerPosition.absolute;
    this.setDimensions(this.size);
  }

  ngOnDestroy() {
    this.close.emit(true);
    this._keyupListener();
  }

  setDimensions(size: number): void {
    this.heightSize = `${this.isBottom && size ? size : 100}%`;
    this.widthSize = `${this.isLeft && size ? size : 100}%`;
  }
}
