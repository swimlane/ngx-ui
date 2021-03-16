import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import type { ToolbarMenuItem } from './models';

@Component({
  selector: 'ngx-toolbar',
  exportAs: 'ngxToolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  @Input() title?: string;
  @Input() mainTitle?: string;
  @Input() subtitle?: string;
  @Input() menu: ToolbarMenuItem[] = [];

  @HostBinding('class.ngx-toolbar') hostClass = true;

  get toolbarItems() {
    return this.menu.filter(m => {
      return !m.dropdown;
    });
  }

  get dropdownItems() {
    return this.menu.filter(m => {
      return m.dropdown;
    });
  }

  constructor(private readonly renderer: Renderer2, private readonly el: ElementRef) {}

  ngOnInit(): void {
    // backwards compatibility
    if (this.title) {
      this.mainTitle = this.title;
      this.renderer.removeAttribute(this.el.nativeElement, 'title');
    }
  }

  onMenuClicked(item: ToolbarMenuItem, $event: MouseEvent) {
    if (item.click) {
      item.click($event);
    }
  }
}
