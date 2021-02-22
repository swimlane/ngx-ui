import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  HostBinding,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { PlusMenuPosition } from './plus-menu-position.enum';
import { id } from '../../utils/id/id.util';

export interface PlusMenuItem {
  title: string;
  subtitle?: string;
  icon: string;
  color?: string;
}

@Component({
  selector: 'ngx-plus-menu',
  templateUrl: './plus-menu.component.html',
  styleUrls: ['./plus-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PlusMenuComponent implements OnInit, OnDestroy {
  @Input() items: PlusMenuItem[] = [];
  @Input() position = PlusMenuPosition.Right;

  @Input() menuTitle = '';
  @Input() closeOnClickOutside = true;

  @Output() clickItem = new EventEmitter();
  @Output() toggleMenu = new EventEmitter<boolean>();

  readonly PlusMenuPosition = PlusMenuPosition;

  @HostBinding('style.--menu-color')
  @Input()
  menuColor = '#9fce36';

  @HostBinding('class')
  get p() {
    return 'ngx-plus-menu position-' + this.position;
  }

  @HostBinding('class.open')
  open = false;

  @HostBinding('class.has-three')
  @Input()
  get hasThree(): boolean {
    return this.items.length > 2;
  }

  @HostBinding('style.--item-0-color')
  get itemColor0() {
    return this.items[0].color || this.menuColor;
  }

  @HostBinding('style.--item-1-color')
  get itemColor1() {
    return this.items[1].color || this.menuColor;
  }

  @HostBinding('style.--item-2-color')
  get itemColor2() {
    return this.items[2]?.color || this.menuColor;
  }

  uid: string = '';

  private documentClickEvent: () => void;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.uid = id(); // for svg linear gradient ids
  }

  ngOnDestroy(): void {
    if (this.documentClickEvent) this.documentClickEvent();
  }

  onClickOpenClose(): void {
    return this.open ? this.closeMenu() : this.openMenu();
  }

  onClickItem(index: number): void {
    this.closeMenu();
    this.clickItem.emit(index);
  }

  private openMenu(): void {
    this.open = true;
    this.toggleMenu.emit(true);
    this.cdr.markForCheck();

    if (this.closeOnClickOutside) {
      this.documentClickEvent = this.renderer.listen(document, 'click', event => {
        const parentContains = this.elementRef.nativeElement.contains(event.target);
        if (!parentContains && this.open) {
          this.closeMenu();
        }
      });
    }
  }

  private closeMenu(): void {
    this.open = false;
    this.toggleMenu.emit(false);
    this.cdr.markForCheck();

    if (this.documentClickEvent) this.documentClickEvent();
  }
}
