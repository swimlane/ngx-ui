import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { trigger } from '@angular/animations';

import { drawerTransition } from '../../animations/animations';
import { DrawerDirection } from './drawer-direction.enum';

@Component({
  exportAs: 'ngxDrawer',
  selector: 'ngx-drawer',
  templateUrl: 'drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [trigger('drawerTransition', drawerTransition)],
  host: {
    role: 'dialog',
    tabindex: '-1',
    '[class]': 'cssClasses',
    '[style.width]': 'widthSize',
    '[style.height]': 'heightSize',
    '[style.zIndez]': 'zIndex',
    '[style.transform]': 'transform',
    '[@drawerTransition]': 'direction'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnDestroy {
  @Input() cssClass: string = '';
  @Input() direction: DrawerDirection;
  @Input() template: TemplateRef<any>;
  @Input() context: any;

  @Input()
  get size() {
    return this._size;
  }
  set size(val: number) {
    this._size = coerceNumberProperty(val);
    this.setDimensions(this._size);
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

  transform: string;
  widthSize: string | number;
  heightSize: string | number;

  private get isLeft(): boolean {
    return this.direction === DrawerDirection.Left;
  }

  private get isBottom(): boolean {
    return this.direction === DrawerDirection.Bottom;
  }

  private _size: number;
  private _zIndex: number;
  private _closeOnOutsideClick: boolean;

  ngOnDestroy() {
    this.close.emit(true);
  }

  setDimensions(size: number): void {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    let height: string;
    let width: string;
    let transform: string;

    if (this.isLeft) {
      if (size) {
        const innerWidth = size;
        const widthPercent = (innerWidth / 100) * winWidth;
        const newWidth = Math.ceil(widthPercent);

        height = '100%';
        width = `${newWidth}px`;
        transform = `translate(-${width}, 0px)`;
      } else {
        transform = 'translate(100%, 0)';
      }
    } else if (this.isBottom) {
      if (size) {
        const innerHeight = size;
        const heightPercent = (innerHeight / 100) * winHeight;
        const newHeight = Math.ceil(heightPercent);

        width = '100%';
        height = `${newHeight}px`;
        transform = `translate(0px, -${height})`;
      } else {
        transform = 'translate(0, 100%)';
      }
    }

    setTimeout(() => {
      this.heightSize = height;
      this.widthSize = width;
      this.transform = transform;
    });
  }

  @HostListener('keyup.esc')
  onEscapeKey(): void {
    this.close.emit(true);
  }
}
