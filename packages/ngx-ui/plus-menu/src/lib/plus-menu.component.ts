import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { DestroyedService } from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { id } from '@swimlane/ngx-ui/utils';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlusMenuPosition } from './enums';
import { PlusMenuItem } from './models';

@Component({
  selector: 'ngx-plus-menu',
  exportAs: 'ngxPlusMenu',
  templateUrl: './plus-menu.component.html',
  styleUrls: ['./plus-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyedService],
})
export class PlusMenuComponent implements OnInit {
  @Input() items: PlusMenuItem[] = [];

  @Input('position') set _position(v: EnumKey<typeof PlusMenuPosition>) {
    this.position = PlusMenuPosition[v];
  }

  position = PlusMenuPosition.right;
  @Input() menuTitle = '';
  @Input() closeOnClickOutside = true;
  @Input() menuColor = '#9fce36';

  @Output() clickItem = new EventEmitter();
  @Output() toggleMenu = new EventEmitter<boolean>();

  get itemColor0() {
    return this.items[0].color || this.menuColor;
  }

  get itemColor1() {
    return this.items[1].color || this.menuColor;
  }

  get itemColor2() {
    return this.items[2]?.color || this.menuColor;
  }

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

  uid = '';
  readonly PlusMenuPosition = PlusMenuPosition;

  constructor(
    private readonly destroyed: DestroyedService,
    private readonly cdr: ChangeDetectorRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit(): void {
    this.uid = id(); // for svg linear gradient ids
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
      fromEvent<MouseEvent>(this.document, 'click')
        .pipe(takeUntil(this.destroyed))
        .subscribe((event) => {
          const parentContains = this.elementRef.nativeElement.contains(
            event.target as HTMLElement
          );
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

    this.destroyed.imperativeDestroy();
  }
}
