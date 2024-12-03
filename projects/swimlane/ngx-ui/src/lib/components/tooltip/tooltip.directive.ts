import {
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
  ViewContainerRef,
  ComponentRef
} from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

import { PlacementTypes } from '../../utils/position/placement-type.enum';
import { AlignmentTypes } from '../../utils/position/alignment-types.enum';

import { ShowTypes } from './show-types.enum';
import { StyleTypes } from './style-types.enum';
import { TooltipService } from './tooltip.service';
import { TooltipContentComponent } from './tooltip.component';

@Directive({
  selector: '[ngx-tooltip]',
  exportAs: 'ngxTooltip'
})
export class TooltipDirective implements OnDestroy {
  @Input() tooltipCssClass = '';
  @Input() tooltipTitle = '';
  @Input() tooltipPlacement: PlacementTypes = PlacementTypes.top;
  @Input() tooltipAlignment: AlignmentTypes = AlignmentTypes.center;
  @Input() tooltipType: StyleTypes = StyleTypes.popover;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() tooltipShowEvent: ShowTypes = ShowTypes.all;
  @Input() tooltipContext: any;

  get tooltipSpacing(): number {
    return this._tooltipSpacing;
  }
  @Input()
  set tooltipSpacing(val: number) {
    this._tooltipSpacing = coerceNumberProperty(val);
  }

  get tooltipDisabled(): boolean {
    return this._tooltipDisabled;
  }
  @Input()
  set tooltipDisabled(val: boolean) {
    this._tooltipDisabled = coerceBooleanProperty(val);
  }

  get tooltipShowCaret(): boolean {
    return this._tooltipShowCaret;
  }
  @Input()
  set tooltipShowCaret(val: boolean) {
    this._tooltipShowCaret = coerceBooleanProperty(val);
  }

  get tooltipCloseOnClickOutside(): boolean {
    return this._tooltipCloseOnClickOutside;
  }
  @Input()
  set tooltipCloseOnClickOutside(val: boolean) {
    this._tooltipCloseOnClickOutside = coerceBooleanProperty(val);
  }

  get tooltipCloseOnMouseLeave(): boolean {
    return this._tooltipCloseOnMouseLeave;
  }
  @Input()
  set tooltipCloseOnMouseLeave(val: boolean) {
    this._tooltipCloseOnMouseLeave = coerceBooleanProperty(val);
  }

  get tooltipHideTimeout(): number {
    return this._tooltipHideTimeout;
  }
  @Input()
  set tooltipHideTimeout(val: number) {
    this._tooltipHideTimeout = coerceNumberProperty(val, 300);
  }

  get tooltipShowTimeout(): number {
    return this._tooltipShowTimeout;
  }
  @Input()
  set tooltipShowTimeout(val: number) {
    this._tooltipShowTimeout = coerceNumberProperty(val, 100);
  }

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() show = new EventEmitter<boolean>();
  @Output() hide = new EventEmitter<boolean>();

  private _tooltipSpacing = 10;
  private _tooltipDisabled = false;
  private _tooltipShowCaret = true;
  private _tooltipCloseOnClickOutside = true;
  private _tooltipCloseOnMouseLeave = true;
  private _tooltipHideTimeout = 300;
  private _tooltipShowTimeout = 100;
  private _tooltipIsOpenFromClick = false;

  private get listensForFocus(): boolean {
    return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.focus;
  }

  private get listensForHover(): boolean {
    return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.mouseover;
  }

  private get listensForClick(): boolean {
    return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.click;
  }

  private component: ComponentRef<TooltipContentComponent>;
  private timeout: any;
  private mouseLeaveContentEvent: () => void;
  private mouseEnterContentEvent: () => void;
  private documentClickEvent: () => void;

  get tooltipIsOpenFromClick(): boolean {
    return this._tooltipIsOpenFromClick;
  }

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
  onMouseLeave(event: { toElement: Node }): void {
    if ((this.listensForHover && this.tooltipCloseOnMouseLeave) || this.listensForClick) {
      clearTimeout(this.timeout);

      /* istanbul ignore if */
      if (this.component) {
        const contentDom = this.component.instance.element.nativeElement;
        const contains = contentDom.contains(event.toElement);
        if (contains) return;
      }

      this.hideTooltip();
    }
  }

  @HostListener('click')
  onMouseClick(): void {
    if (this.tooltipShowEvent === ShowTypes.mouseover) {
      this.hideTooltip(true);
    } else if (this.listensForClick) {
      if (this._tooltipIsOpenFromClick) {
        this.hideTooltip(true);
      } else {
        this._tooltipIsOpenFromClick = true;
        this.showTooltip(true);
      }
    }
  }

  showTooltip(immediate?: boolean): void {
    if (this.component || this.tooltipDisabled) return;

    const time = immediate ? 0 : this.tooltipShowTimeout;

    // ngUpgrade bug
    // https://github.com/angular/angular/issues/12318
    this.ngZone.run(() => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.tooltipService.destroyAll();

        const options = this.createBoundOptions();
        this.component = this.tooltipService.create(options);

        // add a tiny timeout to avoid event re-triggers
        setTimeout(() => {
          if (this.component && this.component.instance && this.component.instance.element) {
            this.addHideListeners(this.component.instance.element.nativeElement);
          }
        }, 10);

        this.show.emit(true);
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
      this.hide.emit(true);

      // destroy component
      this.tooltipService.destroy(this.component);
      this.component = undefined;
    };

    clearTimeout(this.timeout);
    if (!immediate) {
      this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
    } else {
      destroyFn();
    }

    this._tooltipIsOpenFromClick = false;
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
        /* istanbul ignore next */ (event: any) => {
          const contentDom = this.element.nativeElement;
          const contains = contentDom.contains(event.toElement);
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

  private createBoundOptions(): any {
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
      context: this.tooltipContext
    };
  }
}
