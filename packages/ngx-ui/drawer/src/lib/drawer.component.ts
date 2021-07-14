import { trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { DRAWER_ANIMATION } from './drawer.animation';
import { DrawerDirection, DrawerPosition } from './enums';

@Component({
  selector: 'ngx-drawer',
  exportAs: 'ngxDrawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('drawerTransition', DRAWER_ANIMATION)],
})
export class DrawerComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_isRoot: BooleanInput;
  static ngAcceptInputType_closeOnOutsideClick: BooleanInput;
  static ngAcceptInputType_size: NumericInput;
  static ngAcceptInputType_zIndex: NumericInput;

  @HostBinding('attr.role') hostRole = 'dialog';
  @HostBinding('attr.tabindex') hostTabIndex = -1;

  @Input() cssClass = '';

  @Input('direction')
  set _direction(v: EnumKey<typeof DrawerDirection>) {
    this.direction = DrawerDirection[v];
  }

  @HostBinding('@drawerTransition')
  direction = DrawerDirection.left;

  @Input() template!: TemplateRef<unknown>;
  @Input() context?: unknown;

  @NgxBooleanInput()
  @Input()
  isRoot = true;

  @NgxNumericInput()
  @Input()
  size?: number;

  @HostBinding('style.zIndex')
  @NgxNumericInput()
  @Input()
  zIndex?: number;

  @NgxBooleanInput()
  @Input()
  closeOnOutsideClick?: boolean;

  @Output() drawerClose = new EventEmitter<boolean>();

  @HostBinding('class')
  get cssClasses(): string {
    let clz = `ngx-drawer ${this.cssClass}`;
    if (this.isLeft) clz += ' left-drawer';
    if (this.isBottom) clz += ' bottom-drawer';
    return clz;
  }

  @HostBinding('style.width')
  widthSize?: string | number;

  @HostBinding('style.height')
  heightSize?: string | number;

  @HostBinding('style.position')
  position = DrawerPosition.fixed;

  @HostListener('keyup.esc')
  onEscapeKey(): void {
    this.drawerClose.emit(true);
  }

  private get isLeft(): boolean {
    return this._direction === DrawerDirection.left;
  }

  private get isBottom(): boolean {
    return this._direction === DrawerDirection.bottom;
  }

  ngOnInit(): void {
    this.position = this.isRoot
      ? DrawerPosition.fixed
      : DrawerPosition.absolute;
    this.setDimensions(this.size);
  }

  setDimensions(size?: number): void {
    this.heightSize = `${this.isBottom && size ? size : 100}%`;
    this.widthSize = `${this.isLeft && size ? size : 100}%`;
  }

  ngOnDestroy() {
    this.drawerClose.emit(true);
  }
}
