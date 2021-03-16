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
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import type { EnumKey } from '@swimlane/ngx-ui/types';
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
  @Input()
  cssClass = '';

  @Input() set direction(v: EnumKey<typeof DrawerDirection>) {
    this._direction = DrawerDirection[v];
  }

  private _direction?: DrawerDirection;

  @Input() template!: TemplateRef<unknown>;
  @Input() context?: unknown;
  @InputBoolean()
  @Input()
  isRoot = true;

  @InputNumeric()
  @Input()
  size?: number;

  @HostBinding('style.zIndex')
  @InputNumeric()
  @Input()
  zIndex?: number;

  @InputBoolean()
  @Input()
  closeOnOutsideClick?: boolean;

  @Output() close = new EventEmitter<boolean>();

  @HostBinding('class')
  get cssClasses(): string {
    let clz = `ngx-drawer ${this.cssClass}`;
    if (this.isLeft) clz += ' left-drawer';
    if (this.isBottom) clz += ' bottom-drawer';
    return clz;
  }

  @HostListener('keyup.esc')
  onEscapeKey(): void {
    this.close.emit(true);
  }

  widthSize?: string | number;
  heightSize?: string | number;
  position = DrawerPosition.fixed;

  private get isLeft(): boolean {
    return this._direction === DrawerDirection.Left;
  }

  private get isBottom(): boolean {
    return this._direction === DrawerDirection.Bottom;
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
    this.close.emit(true);
  }
}
