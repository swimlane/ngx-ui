import {
  Directive,
  Input,
  HostListener,
  ViewContainerRef,
  ReflectiveInjector,
  TemplateRef,
  ComponentRef
} from '@angular/core';

import { InjectionService } from '../../utils/injection.service';
import { TooltipContentComponent } from './tooltip.component';
import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { TooltipOptions } from './tooltip-options';

@Directive({
  selector: '[swui-tooltip]'
})
export class TooltipDirective {

  @Input() title: string = '';
  @Input() disabled: boolean = false;
  @Input() placement: PlacementTypes = PlacementTypes.top;
  @Input() type: StyleTypes = StyleTypes.popover;
  @Input() closeOnClickOutside: boolean = true;
  @Input() closeOnMouseLeave: boolean = true;
  @Input() dismissTimeout: number = 300;
  @Input() template: any;

  private visible: boolean = false;
  private tooltip: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injectionService: InjectionService) {
  }

  @HostListener('focusin')
  @HostListener('mouseenter')
  show() {
    this.visible = true;

    let options = new TooltipOptions({
      title: this.title,
      template: this.template,
      host: this.viewContainerRef.element,
      placement: this.placement
      /*,
      animation: this.animation,
      popupClass: this.popupClass,
      context: this.tooltipContext
      */
    });

    let binding = ReflectiveInjector.resolve([
      { provide: TooltipOptions, useValue: options }
    ]);

    this.tooltip = this.injectionService.appendNextToLocation(
      TooltipContentComponent,
      this.viewContainerRef,
      binding);
  }

}
