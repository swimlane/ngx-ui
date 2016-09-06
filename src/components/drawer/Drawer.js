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
  @Input() size = '80%';

  @HostBinding('style.zIndex')
  @Input() zIndex = 995;

  @HostBinding('style.transform')
  get transform() {
    if(this.isLeft) {
      let width = this.widthSize;
      return `translate(-${width},0)`;
    } else {
      let height = this.heightSize;
      return `translate(0, -${height})`;
    }
  }

  @HostBinding('style.width')
  get widthSize() {
    if(this.isLeft) {
      const { width } = this.bounds;
      const size = parseInt(this.size);
      const innerWidth = size || width;
      const newWidth = ((innerWidth / 100) * width);
      return `${newWidth}px`;
    }

    return '100%';
  }

  @HostBinding('style.height')
  get heightSize() {
    if(this.isBottom) {
      const { height } = this.bounds;
      const size = parseInt(this.size);
      const innerHeight = size || height;
      const newHeight = ((innerHeight / 100) * height);
      return `${newHeight}px`;
    }

    return '100%';
  }

  @HostBinding('class.left-drawer')
  get isLeft() {
    return this.direction === 'left';
  }

  @HostBinding('class.bottom-drawer')
  get isBottom() {
    return this.direction === 'bottom';
  }

  get bounds() {
    if(!this._bounds) {
      this._bounds = document.body.getBoundingClientRect();
    }

    return this._bounds;
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
