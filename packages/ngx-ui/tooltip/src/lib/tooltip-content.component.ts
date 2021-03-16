import type { BooleanInput } from '@angular/cdk/coercion';
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
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';
import { Throttleable } from '@swimlane/ngx-ui/decorators/throttleable';
import type { Dimension, EnumKey } from '@swimlane/ngx-ui/types';
import { AlignmentType, PlacementType } from '@swimlane/ngx-ui/types';
import { determinePlacement, positionCaret, positionContent } from '@swimlane/ngx-ui/utils/position';
import { TooltipStyleType } from './enums';

@Component({
  selector: 'ngx-tooltip-content',
  templateUrl: './tooltip-content.component.html',
  styleUrls: ['./tooltip-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'ngxTooltipContent'
})
export class TooltipContentComponent implements AfterViewInit {
  static ngAcceptInputType_showCaret: BooleanInput;
  static ngAcceptInputType_spacing: NumericInput;

  @ViewChild('caretElm', { static: true })
  readonly caretElm!: ElementRef<HTMLSpanElement>;

  @InputEnum(TooltipStyleType)
  @Input('type')
  _type?: EnumKey<typeof TooltipStyleType>;
  type?: TooltipStyleType;

  @InputEnum(PlacementType)
  @Input('placement')
  _placement?: EnumKey<typeof PlacementType>;
  placement?: PlacementType;

  @InputEnum(AlignmentType)
  @Input('alignment')
  _alignment?: EnumKey<typeof AlignmentType>;
  alignment?: AlignmentType;

  @Input() host!: ElementRef<HTMLElement>;
  @Input() cssClass!: string;
  @Input() title!: string;
  @Input() template!: TemplateRef<unknown>;
  @Input() context!: unknown;

  @InputBoolean()
  @Input()
  showCaret?: boolean;

  @InputNumeric()
  @Input()
  spacing?: number;

  @HostBinding('class') get hostClass(): string {
    return `ngx-tooltip position-${this.placement} type-${this._type} ${this.cssClass}`;
  }

  @HostListener('window:resize')
  @Throttleable(100)
  onWindowResize() {
    this.position();
  }

  constructor(readonly element: ElementRef<HTMLElement>, private readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(this.position.bind(this));
  }

  position(): void {
    const nativeElm = this.element.nativeElement;
    const hostDim = this.host.nativeElement.getBoundingClientRect();

    // if no dims were found, never show
    if (!hostDim.height && !hostDim.width) return;

    const elmDim = nativeElm.getBoundingClientRect();
    this.checkFlip(hostDim, elmDim);
    this.positionContent(nativeElm, hostDim, elmDim);

    if (this.showCaret) {
      this.positionCaret(hostDim, elmDim);
    }

    // animate its entry
    setTimeout(() => this.renderer.addClass(nativeElm, 'animate'));
  }

  private positionContent(nativeElm: HTMLElement, hostDim: Dimension, elmDim: Dimension): void {
    const { top, left } = positionContent(
      this.placement as PlacementType,
      elmDim,
      hostDim,
      this.spacing as number,
      this.alignment as AlignmentType
    );

    this.renderer.setStyle(nativeElm, 'top', `${top}px`);
    this.renderer.setStyle(nativeElm, 'left', `${left}px`);
  }

  private positionCaret(hostDim: Dimension, elmDim: Dimension): void {
    const caretElm = this.caretElm.nativeElement;
    const caretDimensions = caretElm.getBoundingClientRect();
    const { top, left } = positionCaret(
      this.placement as PlacementType,
      elmDim,
      hostDim,
      caretDimensions as Dimension,
      this.alignment as AlignmentType
    );

    this.renderer.setStyle(caretElm, 'top', `${top}px`);
    this.renderer.setStyle(caretElm, 'left', `${left}px`);
  }

  private checkFlip(hostDim: Dimension, elmDim: Dimension): void {
    this.placement = determinePlacement(
      this.placement as PlacementType,
      elmDim,
      hostDim,
      this.spacing as number,
      this.alignment as AlignmentType
    );
  }
}
