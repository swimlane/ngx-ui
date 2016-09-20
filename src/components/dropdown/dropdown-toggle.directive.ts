import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  EventEmitter,
  Output,
  HostBinding
} from '@angular/core';

@Directive({
  selector: 'swui-dropdown-toggle',
  host: {
    class: 'swui-dropdown-toggle'
  }
})
export class DropdownToggleDirective {

  @HostBinding('class.disabled')
  @Input() disabled = false;

  @Output()
  onToggle = new EventEmitter();

  element: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    event.preventDefault();
    this.onToggle.emit(event);
  }

}
