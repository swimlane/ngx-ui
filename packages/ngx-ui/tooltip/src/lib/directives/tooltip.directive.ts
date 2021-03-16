import type { BooleanInput } from '@angular/cdk/coercion';
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
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { AlignmentType, PlacementType } from '@swimlane/ngx-ui/types';
import { getEnumKey } from '@swimlane/ngx-ui/utils/get-enum-key';
import { TooltipShowType, TooltipStyleType } from '../enums';
import { TooltipService } from '../services';
import { TooltipContentComponent } from '../tooltip-content.component';

@Directive({
  selector: '[ngx-tooltip]',
  exportAs: 'ngxTooltip'
})
export class TooltipDirective implements OnDestroy {
  static ngAcceptInputType_tooltipSpacing: NumericInput;
  static ngAcceptInputType_tooltipHideTimeout: NumericInput;
  static ngAcceptInputType_tooltipShowTimeout: NumericInput;
  static ngAcceptInputType_tooltipDisabled: BooleanInput;
  static ngAcceptInputType_tooltipShowCaret: BooleanInput;
  static ngAcceptInputType_tooltipCloseOnClickOutside: BooleanInput;
  static ngAcceptInputType_tooltipCloseOnMouseLeave: BooleanInput;

  @Input() tooltipCssClass = '';
  @Input() tooltipTitle = '';

  @InputEnum(PlacementType)
  @Input('tooltipPlacement')
  _tooltipPlacement!: EnumKey<typeof PlacementType>;
  tooltipPlacement = PlacementType.top;

  @InputEnum(AlignmentType)
  @Input('tooltipAlignment')
  _tooltipAlignment!: EnumKey<typeof AlignmentType>;
  tooltipAlignment = AlignmentType.center;

  @InputEnum(TooltipStyleType)
  @Input('tooltipType')
  _tooltipType!: EnumKey<typeof TooltipStyleType>;
  tooltipType = TooltipStyleType.popover;

  @InputEnum(TooltipShowType)
  @Input('tooltipShowEvent')
  _tooltipShowEvent!: EnumKey<typeof TooltipShowType>;
  tooltipShowEvent = TooltipShowType.all;

  @Input() tooltipTemplate?: TemplateRef<unknown>;

  @Input() tooltipContext?: unknown;

  @InputNumeric()
  @Input()
  tooltipSpacing = 10;

  @InputBoolean()
  @Input()
  tooltipDisabled = false;

  @InputBoolean()
  @Input()
  tooltipShowCaret = true;

  @InputBoolean()
  @Input()
  tooltipCloseOnClickOutside = true;

  @InputBoolean()
  @Input()
  tooltipCloseOnMouseLeave = true;

  @InputNumeric(300)
  @Input()
  tooltipHideTimeout = 300;

  @InputNumeric(100)
  @Input()
  tooltipShowTimeout = 100;

  @Output() showed = new EventEmitter<boolean>();
  @Output() hidden = new EventEmitter<boolean>();

  private get listensForFocus(): boolean {
    return this._tooltipShowEvent === TooltipShowType.all || this._tooltipShowEvent === TooltipShowType.focus;
  }

  private get listensForHover(): boolean {
    return this._tooltipShowEvent === TooltipShowType.all || this._tooltipShowEvent === TooltipShowType.mouseover;
  }

  private component?: ComponentRef<TooltipContentComponent>;
  private timeout?: number;
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
      clearTimeout(this.timeout);

      /* istanbul ignore if */
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
    if (this.tooltipShowEvent === TooltipShowType.mouseover) {
      this.hideTooltip(true);
    }
  }

  showTooltip(immediate?: boolean): void {
    if (this.component || this.tooltipDisabled) return;

    const time = immediate ? 0 : this.tooltipShowTimeout;

    // ngUpgrade bug
    // https://github.com/angular/angular/issues/12318
    this.ngZone.run(() => {
      clearTimeout(this.timeout);
      this.timeout = (setTimeout(() => {
        this.tooltipService.destroyAll();

        const options = this.createBoundOptions();
        this.component = this.tooltipService.create(options);

        // add a tiny timeout to avoid event re-triggers
        setTimeout(() => {
          if (this.component && this.component.instance && this.component.instance.element) {
            this.addHideListeners(this.component.instance.element.nativeElement);
          }
        }, 10);

        this.showed.emit(true);
      }, time) as unknown) as number;
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
      this.hidden.emit(true);

      // destroy component
      this.tooltipService.destroy(this.component as ComponentRef<TooltipContentComponent>);
      this.component = undefined;
    };

    clearTimeout(this.timeout);
    if (!immediate) {
      this.timeout = (setTimeout(destroyFn, this.tooltipHideTimeout) as unknown) as number;
    } else {
      destroyFn();
    }
  }

  addHideListeners(tooltip: HTMLElement): void {
    // on mouse enter, cancel the hide triggered by the leave
    this.mouseEnterContentEvent = this.renderer.listen(
      tooltip,
      'mouseenter',
      /* istanbul ignore next */ () => {
        clearTimeout(this.timeout);
      }
    );

    // content mouse leave listener
    if (this.tooltipCloseOnMouseLeave) {
      this.mouseLeaveContentEvent = this.renderer.listen(
        tooltip,
        'mouseleave',
        /* istanbul ignore next */ (event: MouseEvent) => {
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
        /* istanbul ignore next */ event => {
          const tooltipContains = tooltip.contains(event.target);
          const parentContains = this.element.nativeElement.contains(event.target);
          if (!tooltipContains && !parentContains) {
            this.hideTooltip();
          }
        }
      );
    }
  }

  private createBoundOptions() {
    return {
      title: this.tooltipTitle,
      template: this.tooltipTemplate,
      host: this.viewContainerRef.element,
      placement: getEnumKey(PlacementType, this._tooltipPlacement),
      alignment: getEnumKey(AlignmentType, this._tooltipAlignment),
      type: getEnumKey(TooltipStyleType, this._tooltipType),
      showCaret: this.tooltipShowCaret,
      cssClass: this.tooltipCssClass,
      spacing: this.tooltipSpacing,
      context: this.tooltipContext
    };
  }
}
