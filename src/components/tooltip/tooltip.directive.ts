import {
  Directive,
  Input,
  HostListener,
  ViewContainerRef,
  ReflectiveInjector,
  ComponentRef
} from '@angular/core';

import { InjectionService } from '../../utils/injection.service';
import { TooltipContentComponent } from './tooltip.component';

import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
import { TooltipOptions } from './tooltip-options';

@Directive({
  selector: '[swui-tooltip]'
})
export class TooltipDirective {

  @Input() title: string = '';
  @Input() group: string;
  @Input() spacing: number = 0;
  @Input() disabled: boolean = false;
  @Input() showCaret: boolean = true;
  @Input() placement: PlacementTypes = PlacementTypes.top;
  @Input() alignment: AlignmentTypes = AlignmentTypes.center;
  @Input() type: StyleTypes = StyleTypes.popover;
  @Input() closeOnClickOutside: boolean = true;
  @Input() closeOnMouseLeave: boolean = true;
  @Input() dismissTimeout: number = 300;
  @Input() showTimeout: number = 100;
  @Input() template: any;

  private visible: boolean = false;
  private tooltip: ComponentRef<TooltipContentComponent>;
  private timeout: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injectionService: InjectionService) {
  }

  @HostListener('focusin')
  @HostListener('mouseenter')
  show() {
    if (this.visible) return;
    this.visible = true;

    const options = this.createBoundOptions();
    let binding = ReflectiveInjector.resolve([
      { provide: TooltipOptions, useValue: options }
    ]);

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.tooltip = this.injectionService.appendNextToLocation(
        TooltipContentComponent,
        this.viewContainerRef,
        binding);
    }, this.showTimeout);
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  hide() {
    if (!this.visible) return;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.visible = false;
      if(this.tooltip) this.tooltip.destroy();
    }, this.dismissTimeout);
  }

  private createBoundOptions(): TooltipOptions {
    return new TooltipOptions({
      title: this.title,
      template: this.template,
      host: this.viewContainerRef.element,
      placement: this.placement,
      alignment: this.alignment,
      type: this.type,
      showCaret: this.showCaret,
      hide: this.hide,
      closeOnClickOutside: this.closeOnClickOutside,
      closeOnMouseLeave: this.closeOnMouseLeave,
      spacing: this.spacing
    });
  }

}
