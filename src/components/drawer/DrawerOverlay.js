import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  HostBinding
} from '@angular/core';

@Directive({
  selector: 'drawer-overlay',
  host: {
    class: 'drawer-overlay'
  }
})
export class DrawerOverlay {

  @HostBinding('style.zIndex')
  @Input() zIndex = 990;

  @Output() onClick = new EventEmitter();

  @HostListener('click')
  backdropClick() {
    this.onClick.emit(true);
  }

}
