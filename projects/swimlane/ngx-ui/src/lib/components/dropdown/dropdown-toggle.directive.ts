import { Directive, Input, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  // tslint:disable-next-line:directive-selector
  exportAs: 'ngxDropdownToggle',
  selector: 'ngx-dropdown-toggle',
  host: {
    class: 'ngx-dropdown-toggle',
    '[class.disabled]': 'disabled'
  }
})
export class DropdownToggleDirective {
  @Input()
  get disabled() { return this._disabled; }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Output() toggle = new EventEmitter<Event>();

  readonly element: HTMLElement;
  private _disabled = false;

  constructor(private readonly el: ElementRef<HTMLElement>) {
    this.element = this.el.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!this.disabled) {
      event.preventDefault();
      this.toggle.emit(event);
    }
  }
}
