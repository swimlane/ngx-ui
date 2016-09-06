import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  HostBinding
} from '@angular/core';

@Directive({ selector: 'drawer-overlay' })
export class DrawerOverlay {

  @HostBinding('style.zIndex')
  @Input() zIndex = 990;

  @Output() onClick = new EventEmitter();

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.classList.add('drawer-overlay');
  }

  @HostListener('click')
  backdropClick() {
    this.onClick.emit(true);
  }

}
