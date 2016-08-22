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
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'drawer-container',
  template: `
    <div class="drawer-container" @visibleTrigger="'visible'">
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
      state('expanded', style({ width: '300px' })),
      state('collapsed', style({ width: '0' })),
      transition('void => *', animate('200ms ease-in')),
      transition('* => void', animate('200ms 200ms ease-out'))
    ])

  ]
})
export class DrawerContainer {

  @Input() direction = 'left';

  @Input() title = '';

  @Input() width = 300;

  @Input() template: TemplateRef;

  @Input() drawerTemplate: TemplateRef;

}
