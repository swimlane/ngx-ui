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
  selector: 'ngx-dropdown-toggle',
  host: {
    class: 'ngx-dropdown-toggle'
  }
})
export class DropdownToggleDirective {

  @HostBinding('class.disabled')
  @Input() disabled = false;

  @Output() toggle = new EventEmitter();

  element: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    event.preventDefault();
    this.toggle.emit(event);
  }

}
