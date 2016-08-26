import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  EventEmitter,
  Output,
  HostBinding
} from '@angular/core';

@Directive({ selector: 'dropdown-toggle' })
export class DropdownToggle {

  @HostBinding('class.disabled')
  @Input() disabled = false;

  @HostListener('click', ['$event'])
  onClick(event) {
    this.onToggle.emit(event);
  }

  @Output()
  onToggle = new EventEmitter();

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
    this.element.classList.add('dropdown-toggle');
  }

}
