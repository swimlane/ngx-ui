import {
  Directive,
  Output,
  EventEmitter,
  HostListener,
  ElementRef
} from '@angular/core';

@Directive({
  selector: 'drawer-overlay'
})
export class DrawerOverlay {

  @Output() onClick = new EventEmitter();

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.classList.add('drawer-overlay');
  }

  @HostListener('click')
  backdropClick() {
    this.onClick.emit(true);
  }

}
