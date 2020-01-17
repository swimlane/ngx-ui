import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectionStrategy,
  TemplateRef,
  OnInit
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
    '[style.position]': 'position',
    '[style.display]': 'display',
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

  transform: string;
  widthSize: string | number;
  heightSize: string | number;
  position: 'fixed' | 'absolute' = 'absolute';

  private get isLeft(): boolean {
    return this.direction === DrawerDirection.Left;
  }

  private get isBottom(): boolean {
    return this.direction === DrawerDirection.Bottom;
  }

  private _size: number;
  private _zIndex: number;
  private _closeOnOutsideClick: boolean;

  ngOnInit() {
    this.position = this.isRoot ? 'fixed' : 'absolute';
    this.setDimensions(this.size);
  }

  ngOnDestroy() {
    this.close.emit(true);
  }

  setDimensions(size: number): void {
    this.heightSize = `${this.isBottom && size ? size : 100}%`;
    this.widthSize = `${this.isLeft && size ? size : 100}%`;
  }

  @HostListener('keyup.esc')
  onEscapeKey(): void {
    this.close.emit(true);
  }
}
