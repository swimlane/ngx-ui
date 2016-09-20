import { Directive, Input, HostListener } from '@angular/core';
import { PlacementTypes } from './placement-types';

@Directive({
  selector: '[swui-popover]'
})
export class PopoverDirective {

  @Input() title: string = '';

  @Input() disabled: boolean = false;

  @Input() placement: PlacementTypes = PlacementTypes.top;

  private visible: boolean = false;

  @HostListener('focusin')
  @HostListener('mouseenter')
  show() {
    this.visible = true;
  }

}
