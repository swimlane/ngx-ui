import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  EventEmitter,
  Output,
  HostBinding
} from '@angular/core';

@Directive({ selector: 'swui-dropdown-toggle' })
export class DropdownToggle {

  @HostBinding('class.disabled')
  @Input() disabled = false;

  @Output()
  onToggle = new EventEmitter();

  element: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
    this.element.classList.add('dropdown-toggle');
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    this.onToggle.emit(event);
  }

}
