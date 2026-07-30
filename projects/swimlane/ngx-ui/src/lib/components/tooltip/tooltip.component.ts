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
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

import { AlignmentTypes } from '../../utils/position/alignment-types.enum';
import { PlacementTypes } from '../../utils/position/placement-type.enum';
import { Dimensions } from '../../utils/position/dimensions.interface';
import { positionContent } from '../../utils/position/position-content/position-content.util';
import { positionCaret } from '../../utils/position/position-caret/position-caret.util';
import { determinePlacement } from '../../utils/position/determine-placement/determine-placement.util';
import { throttleable } from '../../decorators/throttleable/throttleable.decorator';

import { StyleTypes } from './style-types.enum';

@Component({
  exportAs: 'ngxTooltipContent',
  selector: 'ngx-tooltip-content',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TooltipContentComponent implements AfterViewInit {
  @ViewChild('caretElm', { static: true })
  readonly caretElm: ElementRef<HTMLSpanElement>;

  @Input() host: ElementRef<HTMLElement>;
  @Input() type: StyleTypes;
  @Input() placement: PlacementTypes;
  @Input() alignment: AlignmentTypes;
  @Input() cssClass: string;
  @Input() title: string;
  @Input() template: TemplateRef<any>;
  @Input() context: any;

  @Input()
  get showCaret(): boolean {
    return this._showCaret;
  }
  set showCaret(val: boolean) {
    this._showCaret = coerceBooleanProperty(val);
  }

  @Input()
  get spacing(): number {
    return this._spacing;
  }
  set spacing(val: number) {
    this._spacing = coerceNumberProperty(val);
  }

  private _spacing: number;
  private _showCaret: boolean;

  get hostElement(): HTMLElement {
    return this.host?.nativeElement;
  }

  @HostBinding('class')
  get cssClasses(): string {
    let clz = 'ngx-tooltip-content';
    clz += ` position-${this.placement}`;
    clz += ` type-${this.type}`;
    clz += ` ${this.cssClass}`;
    clz += this.hostElement ? ` has-host` : '';
    return clz;
  }

  constructor(readonly element: ElementRef<HTMLElement>, private readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(this.position.bind(this));
  }

  @HostListener('window:resize')
  @throttleable(100)
  onWindowResize(): void {
    this.position();
  }

  position(): void {
    const nativeElm = this.element.nativeElement;
    if (this.hostElement) {
      const hostDim = this.hostElement.getBoundingClientRect();

      // if no dims were found, never show
      if (!hostDim.height && !hostDim.width) return;

      const elmDim = nativeElm.getBoundingClientRect();
      this.checkFlip(hostDim, elmDim);
      this.positionContent(nativeElm, hostDim, elmDim);

      if (this.showCaret) {
        this.positionCaret(hostDim, elmDim);
      }
    }

    // animate its entry
    setTimeout(() => this.renderer.addClass(nativeElm, 'animate'), 1);
  }

  private positionContent(nativeElm: HTMLElement, hostDim: Dimensions, elmDim: Dimensions): void {
    const { top, left } = positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment);

    this.renderer.setStyle(nativeElm, 'top', `${top}px`);
    this.renderer.setStyle(nativeElm, 'left', `${left}px`);
  }

  private positionCaret(hostDim: Dimensions, elmDim: Dimensions): void {
    const caretElm = this.caretElm.nativeElement;
    const caretDimensions = caretElm.getBoundingClientRect();
    const { top, left } = positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment);

    this.renderer.setStyle(caretElm, 'top', `${top}px`);
    this.renderer.setStyle(caretElm, 'left', `${left}px`);
  }

  private checkFlip(hostDim: Dimensions, elmDim: Dimensions): void {
    this.placement = determinePlacement(this.placement, elmDim, hostDim, this.spacing, this.alignment);
  }
}
