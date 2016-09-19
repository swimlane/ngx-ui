import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  HostBinding
} from '@angular/core';

@Directive({
  selector: 'swui-drawer-overlay',
  host: {
    class: 'drawer-overlay'
  }
})
export class DrawerOverlay {

  /**
   * The z-index for the overlay.
   * @type {Number}
   */
  @HostBinding('style.zIndex')
  @Input() zIndex = 990;

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
