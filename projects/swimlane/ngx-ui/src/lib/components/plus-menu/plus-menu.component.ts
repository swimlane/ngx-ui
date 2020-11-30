import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  HostBinding,
  ElementRef
} from '@angular/core';
import { HotkeysService } from '../hotkeys/hotkeys.service';
import { PlusMenuPosition } from './plus-menu-position.enum';

@Component({
  selector: 'ngx-plus-menu',
  templateUrl: './plus-menu.component.html',
  styleUrls: ['./plus-menu.component.scss'],
  host: { class: 'ngx-plus-menu' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PlusMenuComponent {
  @Input() items = [];
  @Input() position = PlusMenuPosition.Right;
  @Input() menuColor = '#9fce36';
  @Input() menuTitle = '';

  @Output() clickItem = new EventEmitter();
  @Output() toggleMenu = new EventEmitter<boolean>();

  readonly PlusMenuPosition = PlusMenuPosition;

  @HostBinding('class')
  get p() {
    return 'position-' + this.position;
  }

  @HostBinding('class.open')
  open = false;

  @HostBinding('class.has-three')
  get s() {
    return this.items.length > 2;
  }

  constructor(private hotkeysService: HotkeysService, private elementRef: ElementRef) {}

  ngOnInit() {
    this.initKeys();

    this.elementRef.nativeElement.style.setProperty('--menu-color', this.menuColor);
  }

  onClickOpenClose() {
    this.open = !this.open;
    this.toggleMenu.emit(this.open);
  }

  onClickItem(index: number) {
    console.log('item', index);
    this.clickItem.emit(index);
  }

  private initKeys() {
    this.hotkeysService.deregister(this);

    this.items.map((item, i) => {
      if (item.hotkey) {
        const opt = this.hotkeysService.add(item.hotkey, {
          callback: () => {
            this.onClickItem(i);
          },
          description: item.description,
          component: this
        });

        item.keys = opt.keys;
      }
    });
  }
}
