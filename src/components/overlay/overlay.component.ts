import {
  Component, ViewEncapsulation,
  Directive, Input, Output, EventEmitter,
  trigger, transition, animate, style, state
} from '@angular/core';

/**
 * Overlay Component for Drawer/Dialogs
 */
@Component({
  selector: 'ngx-overlay',
  template: `
    <div
      (click)="click.emit(true)"
      [style.zIndex]="zIndex"
      [@overlayTransition]="animationState"
      class="ngx-overlay">
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./overlay.component.scss'],
  animations: [
    trigger('overlayTransition', [
      state('active', style({
        opacity: 0.8,
        visibility: 'visible'
      })),
      state('inactive', style({
        visibility: 'hidden',
        opacity: 0
      })),
      transition('* => active', [
        animate('100ms ease-in')
      ]),
      transition('* => inactive', [
        animate('100ms ease-out')
      ]),
      transition('* => void', [
        style({
          opacity: 0,
          visibility: 'hidden',
          'pointer-events': 'none'
        }),
        animate('100ms ease-out')
      ])
    ])
  ]
})
export class OverlayComponent {

  @Input() visible: boolean = false;
  @Input() zIndex: number = 990;

  @Output() click = new EventEmitter();

  get animationState(): string {
    return this.visible ? 'active' : 'inactive';
  }
}
