import type { BooleanInput } from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { DropdownShowTypes } from '../enums';

@Directive({
  selector: 'ngx-dropdown-toggle',
  exportAs: 'ngxDropdownToggle',
})
export class DropdownToggleDirective {
  static ngAcceptInputType_disabled: BooleanInput;

  @InputEnum(DropdownShowTypes)
  @Input('showEvent')
  _showEvent!: EnumKey<typeof DropdownShowTypes>;
  showEvent: DropdownShowTypes = DropdownShowTypes.Click;

  @HostBinding('class.disabled')
  @InputBoolean()
  @Input()
  disabled = false;

  @Output() toggle = new EventEmitter<void>();

  @HostBinding('class.ngx-dropdown-toggle') hostClass = true;

  readonly element: HTMLElement;

  constructor(private readonly el: ElementRef<HTMLElement>) {
    this.element = el.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.showEvent === DropdownShowTypes.Click && !this.disabled) {
      event.preventDefault();
      this.toggle.emit();
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextmenu(event: Event) {
    if (this.showEvent === DropdownShowTypes.Contextmenu && !this.disabled) {
      event.preventDefault();
      this.toggle.emit();
    }
  }

  @HostListener('dblclick', ['$event'])
  onDblclick(event: Event) {
    if (this.showEvent === DropdownShowTypes.Dblclick && !this.disabled) {
      event.preventDefault();
      this.toggle.emit();
    }
  }
}
