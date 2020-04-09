import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarContentDirective } from './toolbar-content.directive';
import { ToolbarMenuItem } from './toolbar-menu-item.interface';

@Component({
  selector: 'ngx-toolbar',
  templateUrl: './toolbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./toolbar.component.scss'],
  host: {
    class: 'ngx-toolbar',
  },
})
export class ToolbarComponent {
  @Input() title: string;
  @Input() mainTitle: string;
  @Input() subtitle: string;
  @Input() menu: ToolbarMenuItem[] = [];

  @Output() menuClick = new EventEmitter();

  @ViewChild(ToolbarTitleDirective) toolbarTitle: ToolbarTitleDirective;
  @ViewChild(ToolbarContentDirective) toolbarContent: ToolbarContentDirective;

  get toolbarItems() {
    return this.menu.filter((m) => {
      return !m.dropdown;
    });
  }

  get dropdownItems() {
    return this.menu.filter((m) => {
      return m.dropdown;
    });
  }

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  onMenuClicked(item: ToolbarMenuItem, $event: Event) {
    if (item.click) {
      item.click($event);
    }
  }

  ngOnInit() {
    // backwards compatibility
    if (this.title) {
      this.mainTitle = this.title;
      this.renderer.removeAttribute(this.elRef.nativeElement, 'title');
    }
  }
}
