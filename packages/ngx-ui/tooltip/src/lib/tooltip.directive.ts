import type { TemplateRef } from '@angular/core';
import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import {
  BooleanInput,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
  PartialBindings,
} from '@swimlane/ngx-ui/common';
import {
  AlignmentType,
  EnumKey,
  PlacementType,
} from '@swimlane/ngx-ui/typings';
import { TooltipShowTypes, TooltipStyleTypes } from './enums';
import { TooltipContentComponent } from './tooltip-content/tooltip-content.component';
import { TooltipService } from './tooltip.service';

@Directive({
  selector: '[ngxTooltip]',
  exportAs: 'ngxTooltip',
})
export class TooltipDirective implements OnDestroy {
  static ngAcceptInputType_tooltipSpacing: NumericInput;
  static ngAcceptInputType_tooltipDisabled: BooleanInput;
  static ngAcceptInputType_tooltipShowCaret: BooleanInput;
  static ngAcceptInputType_tooltipCloseOnClickOutside: BooleanInput;
  static ngAcceptInputType_tooltipCloseOnMouseLeave: BooleanInput;
  static ngAcceptInputType_tooltipHideTimeout: NumericInput;
  static ngAcceptInputType_tooltipShowTimeout: NumericInput;

  @Input() tooltipCssClass = '';
  @Input() tooltipTitle = '';

  @Input('tooltipPlacement') set _tooltipPlacement(
    v: EnumKey<typeof PlacementType>
  ) {
    this.tooltipPlacement = PlacementType[v];
  }

  tooltipPlacement = PlacementType.top;

  @Input('tooltipAlignment') set _tooltipAlignment(
    v: EnumKey<typeof AlignmentType>
  ) {
    this.tooltipAlignment = AlignmentType[v];
  }

  tooltipAlignment = AlignmentType.center;

  @Input('tooltipType') set _tooltipType(v: EnumKey<typeof TooltipStyleTypes>) {
    this.tooltipType = TooltipStyleTypes[v];
  }

  tooltipType = TooltipStyleTypes.popover;

  @Input() tooltipTemplate?: TemplateRef<unknown>;

  @Input('tooltipShowEvent') set _tooltipShowEvent(
    v: EnumKey<typeof TooltipShowTypes>
  ) {
    this.tooltipShowEvent = TooltipShowTypes[v];
  }

  tooltipShowEvent = TooltipShowTypes.all;

  @Input() tooltipContext: unknown;

  @NgxNumericInput(10)
  @Input()
  tooltipSpacing = 10;

  @NgxBooleanInput()
  @Input()
  tooltipDisabled = false;

  @NgxBooleanInput()
  @Input()
  tooltipShowCaret = true;

  @NgxBooleanInput()
  @Input()
  tooltipCloseOnClickOutside = true;

  @NgxBooleanInput()
  @Input()
  tooltipCloseOnMouseLeave = true;

  @NgxNumericInput(300)
  @Input()
  tooltipHideTimeout = 300;

  @NgxNumericInput(100)
  @Input()
  tooltipShowTimeout = 100;

  @Output() tooltipShow = new EventEmitter<boolean>();

  @Output() tooltipHide = new EventEmitter<boolean>();

  private get listensForFocus(): boolean {
    return (
      this.tooltipShowEvent === TooltipShowTypes.all ||
      this.tooltipShowEvent === TooltipShowTypes.focus
    );
  }

  private get listensForHover(): boolean {
    return (
      this.tooltipShowEvent === TooltipShowTypes.all ||
      this.tooltipShowEvent === TooltipShowTypes.mouseover
    );
  }

  private component?: ComponentRef<TooltipContentComponent>;
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private mouseLeaveContentEvent?: () => void;
  private mouseEnterContentEvent?: () => void;
  private documentClickEvent?: () => void;

  constructor(
    private readonly ngZone: NgZone,
    private readonly tooltipService: TooltipService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly renderer: Renderer2,
    private readonly element: ElementRef<HTMLElement>
  ) {}

  ngOnDestroy(): void {
    this.hideTooltip(true);
  }

  @HostListener('focusin')
  onFocus(): void {
    if (this.listensForFocus) {
      this.showTooltip();
    }
  }

  @HostListener('blur')
  onBlur(): void {
    if (this.listensForFocus) {
      this.hideTooltip(true);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.listensForHover) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
      if (this.timeout) clearTimeout(this.timeout);

      if (this.component) {
        const contentDom = this.component.instance.element.nativeElement;
        const contains = contentDom.contains(event.relatedTarget as Node);
        if (contains) return;
      }

      this.hideTooltip();
    }
  }

  @HostListener('click')
  onMouseClick() {
    if (this.tooltipShowEvent === TooltipShowTypes.mouseover) {
      this.hideTooltip(true);
    }
  }

  showTooltip(immediate?: boolean): void {
    if (this.component || this.tooltipDisabled) return;

    const time = immediate ? 0 : this.tooltipShowTimeout;

    // ngUpgrade bug
    // https://github.com/angular/angular/issues/12318
    this.ngZone.run(() => {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.tooltipService.destroyAll();

        const options = this.createBoundOptions();
        this.component = this.tooltipService.create(options);

        // add a tiny timeout to avoid event re-triggers
        setTimeout(() => {
          if (
            this.component &&
            this.component.instance &&
            this.component.instance.element
          ) {
            this.addHideListeners(
              this.component.instance.element.nativeElement
            );
          }
        }, 10);

        this.tooltipShow.emit(true);
      }, time);
    });
  }

  hideTooltip(immediate?: boolean): void {
    if (!this.component) return;

    const destroyFn = () => {
      // remove events
      if (this.mouseLeaveContentEvent) this.mouseLeaveContentEvent();
      if (this.mouseEnterContentEvent) this.mouseEnterContentEvent();
      if (this.documentClickEvent) this.documentClickEvent();

      // emit events
      this.tooltipHide.emit(true);

      // destroy component
      if (this.component) {
        this.tooltipService.destroy(this.component);
      }
      this.component = undefined;
    };

    if (this.timeout) clearTimeout(this.timeout);
    if (!immediate) {
      this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
    } else {
      destroyFn();
    }
  }

  addHideListeners(tooltip: HTMLElement): void {
    // on mouse enter, cancel the hide triggered by the leave
    this.mouseEnterContentEvent = this.renderer.listen(
      tooltip,
      'mouseenter',
      () => {
        if (this.timeout) clearTimeout(this.timeout);
      }
    );

    // content mouse leave listener
    if (this.tooltipCloseOnMouseLeave) {
      this.mouseLeaveContentEvent = this.renderer.listen(
        tooltip,
        'mouseleave',
        (event: MouseEvent) => {
          const contentDom = this.element.nativeElement;
          const contains = contentDom.contains(event.relatedTarget as Node);
          if (contains) return;

          this.hideTooltip();
        }
      );
    }

    // content close on click outside
    if (this.tooltipCloseOnClickOutside) {
      this.documentClickEvent = this.renderer.listen(
        document,
        'click',
        (event: MouseEvent) => {
          const tooltipContains = tooltip.contains(event.target as Node);
          const parentContains = this.element.nativeElement.contains(
            event.target as Node
          );
          if (!tooltipContains && !parentContains) {
            this.hideTooltip();
          }
        }
      );
    }
  }

  private createBoundOptions(): PartialBindings {
    return {
      title: this.tooltipTitle,
      template: this.tooltipTemplate,
      host: this.viewContainerRef.element,
      placement: this.tooltipPlacement,
      alignment: this.tooltipAlignment,
      type: this.tooltipType,
      showCaret: this.tooltipShowCaret,
      cssClass: this.tooltipCssClass,
      spacing: this.tooltipSpacing,
      context: this.tooltipContext,
    };
  }
}
