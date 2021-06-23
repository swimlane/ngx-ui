import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Throttleable } from '@swimlane/ngx-ui/common';
import {
  AlignmentType,
  Dimension,
  PlacementType,
} from '@swimlane/ngx-ui/typings';
import {
  determinePlacement,
  positionCaret,
  positionContent,
} from '@swimlane/ngx-ui/utils';
import { TooltipStyleTypes } from './enums';

@Component({
  selector: 'ngx-tooltip-content',
  exportAs: 'ngxTooltipContent',
  templateUrl: './tooltip-content.component.html',
  styleUrls: ['./tooltip-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipContentComponent implements AfterViewInit {
  @HostBinding('class.ngx-tooltip-content') hostClass = true;

  @ViewChild('caretElm', { static: true })
  readonly caretElm!: ElementRef<HTMLSpanElement>;

  @Input() host?: ElementRef<HTMLElement>;
  @Input() type?: TooltipStyleTypes;
  @Input() placement?: PlacementType;
  @Input() alignment?: AlignmentType;
  @Input() cssClass?: string;
  @Input() title?: string;
  @Input() template?: TemplateRef<unknown>;
  @Input() context?: unknown;

  @Input() showCaret?: boolean;
  @Input() spacing?: number;

  @HostBinding('class')
  get cssClasses(): string {
    let clz = 'ngx-tooltip-content';
    clz += ` position-${this.placement}`;
    clz += ` type-${this.type}`;
    clz += ` ${this.cssClass}`;
    return clz;
  }

  constructor(
    public readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    setTimeout(this.position.bind(this));
  }

  @HostListener('window:resize')
  @Throttleable(100)
  onWindowResize(): void {
    this.position();
  }

  position(): void {
    const nativeElm = this.element.nativeElement;
    const hostDim = this.host?.nativeElement.getBoundingClientRect();

    // if no dims were found, never show
    if (!hostDim?.height && !hostDim?.width) return;

    const elmDim = nativeElm.getBoundingClientRect();
    this.checkFlip(hostDim, elmDim);
    this.positionContent(nativeElm, hostDim, elmDim);

    if (this.showCaret) {
      this.positionCaret(hostDim, elmDim);
    }

    // animate its entry
    setTimeout(() => this.renderer.addClass(nativeElm, 'animate'), 1);
  }

  private positionContent(
    nativeElm: HTMLElement,
    hostDim: Dimension,
    elmDim: Dimension
  ): void {
    if (this.placement && this.spacing && this.alignment) {
      const { top, left } = positionContent(
        this.placement,
        elmDim,
        hostDim,
        this.spacing,
        this.alignment
      );

      this.renderer.setStyle(nativeElm, 'top', `${top}px`);
      this.renderer.setStyle(nativeElm, 'left', `${left}px`);
    }
  }

  private positionCaret(hostDim: Dimension, elmDim: Dimension): void {
    if (this.placement && this.alignment) {
      const caretElm = this.caretElm.nativeElement;
      const caretDimensions = caretElm.getBoundingClientRect();
      const { top, left } = positionCaret(
        this.placement,
        elmDim,
        hostDim,
        caretDimensions,
        this.alignment
      );

      this.renderer.setStyle(caretElm, 'top', `${top}px`);
      this.renderer.setStyle(caretElm, 'left', `${left}px`);
    }
  }

  private checkFlip(hostDim: Dimension, elmDim: Dimension): void {
    if (this.placement && this.spacing && this.alignment) {
      this.placement = determinePlacement(
        this.placement,
        elmDim,
        hostDim,
        this.spacing,
        this.alignment
      );
    }
  }
}
