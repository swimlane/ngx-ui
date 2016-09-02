import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  HostBinding,
  HostListener
} from '@angular/core';
import { DrawerManager } from './DrawerManager.js';

@Component({
  selector: 'drawer',
  template: `
    <div class="drawer-inner">
      <toolbar
        [title]="title">
      </toolbar>
      <section class="drawer-content">
        <div
          templateWrapper
          [template]="template"
          [context]="drawerManager">
        </div>
      </section>
    </div>
  `,
  host: {
    role: 'dialog',
    tabindex: '-1'
  }
})
export class Drawer {

  @Input() direction = 'left';

  @Input() title = '';

  @Input() template: TemplateRef;

  @Input() drawerTemplate: TemplateRef;

  @Input() size = '80%'

  @HostBinding('style.width')
  get widthSize() {
    return this.isLeft ?
      this.size : '100%';
  }

  @HostBinding('style.height')
  get heightSize() {
    return this.isBottom ?
      this.size : '100%';
  }

  @HostBinding('class.left-drawer')
  get isLeft() {
    return this.direction === 'left';
  }

  @HostBinding('class.bottom-drawer')
  get isBottom() {
    return this.direction === 'bottom';
  }

  viewContainer: ViewContainerRef;

  drawerManager: DrawerManager;

  constructor(
    elementRef: ElementRef,
    drawerManager: DrawerManager,
    viewContainer: ViewContainerRef) {
    Object.assign(this, { drawerManager, viewContainer });

    elementRef.nativeElement.classList.add('drawer');
  }

  addDrawer(template, options = {}) {
    return this.viewContainer.createEmbeddedView(template, options);
  }

  @HostListener('keyup.esc')
  onEscapeKey() {
    // dismiss
  }

}
