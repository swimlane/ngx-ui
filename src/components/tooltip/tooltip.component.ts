import {
  Component, Inject, ElementRef, AfterViewInit,
  HostListener, ViewChild, HostBinding
} from '@angular/core';

import { throttleable } from '../../utils';
import { PositionHelper } from './position.helper';
import { TooltipOptions } from './tooltip-options';

import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';

@Component({
  selector: 'swui-tooltip-content',
  template: `
    <div>
      <span
        #caretElm
        [hidden]="!showCaret"
        class="tooltip-caret position-{{this.placement}}">
      </span>
      <div class="tooltip-content">
        <div *ngIf="!title">
          <template
            [ngTemplateOutlet]="template"
            [ngOutletContext]="{ model: context }">
          </template>
        </div>
        <div
          *ngIf="title"
          [innerHTML]="title">
        </div>
      </div>
    </div>
  `
})
export class TooltipContentComponent implements AfterViewInit {

  @ViewChild('caretElm') caretElm;

  @HostBinding('class')
  get cssClasses() {
    let clz = 'swui-tooltip-content';
    clz += ` position-${this.placement}`;
    clz += ` type-${this.type}`;
    return clz;
  }

  private title: string;
  private template: any;
  private context: any;
  private host: any;
  private showCaret: boolean;
  private type: StyleTypes;
  private placement: PlacementTypes;
  private alignment: AlignmentTypes;
  private closeOnClickOutside: boolean;
  private closeOnMouseLeave: boolean;
  private hide: any;
  private spacing: number;

  constructor(
    private element: ElementRef,
    @Inject(TooltipOptions) options: TooltipOptions) {

    Object.assign(this, options);
  }

  ngAfterViewInit() {
    this.position();
  }

  position() {
    let nativeElm = this.element.nativeElement;
    const hostDim = this.host.nativeElement.getBoundingClientRect();
    const elmDim = nativeElm.getBoundingClientRect();

    this.checkFlip(hostDim, elmDim);
    this.positionContent(nativeElm, hostDim, elmDim);

    if(this.showCaret) this.positionCaret(hostDim, elmDim);
  }

  positionContent(nativeElm, hostDim, elmDim) {
    let top = 0;
    let left = 0;

    if (this.placement === PlacementTypes.right) {
      left = hostDim.left + hostDim.width + this.spacing;
      top = PositionHelper.calculateVerticalAlignment(
        hostDim,
        elmDim,
        this.alignment);
    } else if (this.placement === PlacementTypes.left) {
      left = hostDim.left - elmDim.width - this.spacing;
      top = PositionHelper.calculateVerticalAlignment(
        hostDim,
        elmDim,
        this.alignment);
    } else if (this.placement === PlacementTypes.top) {
      top = hostDim.top - elmDim.height - this.spacing;
      left = PositionHelper.calculateHorizontalAlignment(
        hostDim,
        elmDim,
        this.alignment);
    } else if (this.placement === PlacementTypes.bottom) {
      top = hostDim.top + hostDim.height + this.spacing;
      left = PositionHelper.calculateHorizontalAlignment(
        hostDim,
        elmDim,
        this.alignment);
    }

    nativeElm.style['top'] = top + 'px';
    nativeElm.style['left'] = left + 'px';
  }

  positionCaret(hostDim, elmDim) {
    let caretElm = this.caretElm.nativeElement;
    const caretDimensions = caretElm.getBoundingClientRect();

    let top = 0;
    let left = 0;

    if (this.placement === PlacementTypes.right) {
      left = -6;
      top = PositionHelper.calculateVerticalCaret(
        hostDim,
        elmDim,
        caretDimensions,
        this.alignment);
    } else if (this.placement === PlacementTypes.left) {
      left = elmDim.width - 2;
      top = PositionHelper.calculateVerticalCaret(
        hostDim,
        elmDim,
        caretDimensions,
        this.alignment);
    } else if (this.placement === PlacementTypes.top) {
      top = elmDim.height - 5;
      left = PositionHelper.calculateHorizontalCaret(
        hostDim,
        elmDim,
        caretDimensions,
        this.alignment);
    } else if (this.placement === PlacementTypes.bottom) {
      top = -8;
      left = PositionHelper.calculateHorizontalCaret(
        hostDim,
        elmDim,
        caretDimensions,
        this.alignment);
    }

    caretElm.style['top'] = top + 'px';
    caretElm.style['left'] = left + 'px';
  }

  checkFlip(hostDim, elmDim) {
    const shouldFlip = PositionHelper.shouldFlip(
      hostDim,
      elmDim,
      this.placement,
      this.alignment,
      this.spacing);

    if(shouldFlip) {
      if (this.placement === PlacementTypes.right) {
        this.placement = PlacementTypes.left;
      } else if (this.placement === PlacementTypes.left) {
        this.placement = PlacementTypes.right;
      } else if (this.placement === PlacementTypes.top) {
        this.placement = PlacementTypes.bottom;
      } else if (this.placement === PlacementTypes.bottom) {
        this.placement = PlacementTypes.top;
      }
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(target) {
    if(this.closeOnMouseLeave) this.hide();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target) {
    if(this.closeOnClickOutside) {
      const contains = this.element.nativeElement.contains(target);
      if(!contains) this.hide();
    }
  }

  @HostListener('window:resize')
  @throttleable(100)
  onWindowResize() {
    this.position();
  }

}
