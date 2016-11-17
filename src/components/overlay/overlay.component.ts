import {
  Component,
  Directive, Input, Output, EventEmitter,
  trigger, transition, animate, style, state
} from '@angular/core';
// import './overlay.scss';

/**
 * Overlay Component for Drawer/Dialogs
 *
 * Ideally this would be a component but issue:
 * https://github.com/angular/angular/issues/9947
 *
 */
@Component({
  selector: 'swui-overlay',
  template: `
    <div
      (click)="click.emit(true)"
      [style.zIndex]="zIndex"
      [@overlayTransition]="animationState"
      class="swui-overlay">
    </div>
  `,
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
