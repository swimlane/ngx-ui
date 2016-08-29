import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'drawer-overlay',
  template: `
    <div class="drawer-overlay">

    </div>
  `
})
export class DrawerOverlay {

  @HostListener('click')
  backdropClick() {
    // dismiss
  }

}
