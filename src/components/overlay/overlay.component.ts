import {
  Component,
  Directive, Input, Output, EventEmitter,
  HostListener, HostBinding, trigger,
  transition, animate, style, state
} from '@angular/core';
import './overlay.scss';

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
      ])
    ])
  ]
})
export class OverlayComponent {

  get animationState(): string {
    return this.visible ? 'active' : 'inactive';
  }

  /**
   * Indicates if the overlay is visible
   * @return {Boolean} visibility
   */
  @Input() visible: boolean = false;

  /**
   * The z-index for the overlay.
   * @type {Number}
   */
  @Input() zIndex: number = 990;

  /**
   * Click event when the olverlay is clicked.
   * @type {EventEmitter}
   */
  @Output() onClick = new EventEmitter();

  /**
   * Listener for click to emit click event
   */
  @HostListener('click')
  backdropClick() {
    this.onClick.emit(true);
  }

}
