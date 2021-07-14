import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { DropdownShowTypes } from '../enums';

@Directive({
  selector: 'ngx-dropdown-toggle',
  exportAs: 'ngxDropdownToggle',
})
export class DropdownToggleDirective {
  static ngAcceptInputType_disabled: BooleanInput;

  @HostBinding('class.ngx-dropdown-toggle') hostClass = true;

  @Input('showEvent') set _showEvent(v: EnumKey<typeof DropdownShowTypes>) {
    this.showEvent = DropdownShowTypes[v];
  }

  showEvent = DropdownShowTypes.click;

  @HostBinding('class.disabled')
  @NgxBooleanInput()
  @Input()
  disabled = false;

  @Output() toggle = new EventEmitter<MouseEvent>();

  readonly element: HTMLElement;

  constructor(private readonly el: ElementRef<HTMLElement>) {
    this.element = this.el.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.showEvent === DropdownShowTypes.click && !this.disabled) {
      event.preventDefault();
      this.toggle.emit(event);
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu(event: MouseEvent) {
    if (this.showEvent === DropdownShowTypes.contextmenu && !this.disabled) {
      event.preventDefault();
      this.toggle.emit(event);
    }
  }

  @HostListener('dblclick', ['$event'])
  onDblclick(event: MouseEvent) {
    if (this.showEvent === DropdownShowTypes.dblclick && !this.disabled) {
      event.preventDefault();
      this.toggle.emit(event);
    }
  }
}
