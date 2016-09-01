import {
  Component,
  Input,
  Output,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate,
  TemplateRef,
  ViewContainerRef,
  Renderer,
  Injector,
  HostListener
} from '@angular/core';

@Component({
  selector: 'drawer',
  template: `
    <div
      class="drawer"
      [@visibleTrigger]="'visible'">
      <toolbar
        [title]="title">
      </toolbar>
      <section>
        here
      </section>
    </div>
  `,
  animations: [
    trigger('visibleTrigger', [
      state('in', style({ 'max-height': '250px', 'max-width': '250px', opacity: 1 })),
      transition('void => *', [
        style({ 'max-height': '0px', 'max-width': '0px', opacity: 0 }),
        animate('150ms ease-out')
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0 }))
      ])

      /*
      state('expanded', style({ width: '300px' })),
      state('collapsed', style({ width: '0' })),
      transition('void => *', animate('200ms ease-in')),
      transition('* => void', animate('200ms 200ms ease-out'))
      */
    ])
  ],
  host: {
    role: 'dialog',
    tabindex: '-1'
  }
})
export class Drawer {

  @Input() direction = 'left';

  @Input() title = '';

  // height or width
  @Input() size = 300;

  @Input() template: TemplateRef;

  @Input() drawerTemplate: TemplateRef;

  constructor(viewContainerRef: ViewContainerRef, renderer: Renderer, injector: Injector) {
    Object.assign(this, {
      viewContainerRef,
      renderer,
      injector
    })
  }

  open(content, options) {

    const embeddedViewRef = this.viewContainerRef.createEmbeddedView(
        content, options);

    /*
    const nodes = this.getContentNodes(content, options);

    const windowCmptRef = this.viewContainerRef.createComponent(
      this._windowFactory, 0, this.injector, nodes);

    backdropCmptRef = this.viewContainerRef.createComponent(this._backdropFactory, 0, this._injector);
    */
  }

  /*
  getContentNodes(content, context) {
    if (!content) {
      return [];
    } else if (content instanceof TemplateRef) {
      return [this.viewContainerRef.createEmbeddedView(content, context).rootNodes];
    } else {
      return [[this.renderer.createText(null, `${content}`)]];
    }
  }
  */

  @HostListener('keyup.esc')
  onEscapeKey() {
    // dismiss
  }

}
