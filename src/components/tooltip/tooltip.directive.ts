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
  @Input() appendToBody: boolean = true;
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

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() =>
      this.injectComponent(), this.showTimeout);
  }

  injectComponent() {
    const options = this.createBoundOptions();

    if(this.appendToBody) {
      // append to the body, different arguments
      // since we need to bind the options to the
      // root component instead of this one
      this.tooltip = this.injectionService.appendNextToRoot(
        TooltipContentComponent,
        TooltipOptions,
        options);
    } else {
      // bind our options to this component
      let binding = ReflectiveInjector.resolve([
        { provide: TooltipOptions, useValue: options }
      ]);

      // inject next to this component
      this.tooltip = this.injectionService.appendNextToLocation(
        TooltipContentComponent,
        this.viewContainerRef,
        binding);
    }
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
