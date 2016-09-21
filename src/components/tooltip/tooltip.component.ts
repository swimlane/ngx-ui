import { Component, Inject, ElementRef, AfterViewInit, HostListener, ViewChild } from '@angular/core';

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
        class="popover-caret caret-{{this.placement}}">
      </span>
      <div class="tooltip-body">
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
    clz += ` position-${this.placement}`;

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
    this.checkFlip();
    this.position();
  }

  checkFlip(){
    let nativeElm = this.element.nativeElement;
    const elDimensions = this.host.nativeElement.getBoundingClientRect();
    const popoverDimensions = nativeElm.getBoundingClientRect();

    let top = 0;
    let left = 0;

    const shouldFlip = PositionHelper.shouldFlip(
      elDimensions,
      popoverDimensions,
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

  position() {
    let nativeElm = this.element.nativeElement;
    const elDimensions = this.host.nativeElement.getBoundingClientRect();
    const popoverDimensions = nativeElm.getBoundingClientRect();

    let top = 0;
    let left = 0;

    if (this.placement === PlacementTypes.right) {
      left = elDimensions.left + elDimensions.width + this.spacing;
      top = PositionHelper.calculateVerticalAlignment(
        elDimensions,
        popoverDimensions,
        this.alignment);
    } else if (this.placement === PlacementTypes.left) {
      left = elDimensions.left - popoverDimensions.width - this.spacing;
      top = PositionHelper.calculateVerticalAlignment(
        elDimensions,
        popoverDimensions,
        this.alignment);
    } else if (this.placement === PlacementTypes.top) {
      top = elDimensions.top - popoverDimensions.height - this.spacing;
      left = PositionHelper.calculateHorizontalAlignment(
        elDimensions,
        popoverDimensions,
        this.alignment);
    } else if (this.placement === PlacementTypes.bottom) {
      top = elDimensions.top + elDimensions.height + this.spacing;
      left = PositionHelper.calculateHorizontalAlignment(
        elDimensions,
        popoverDimensions,
        this.alignment);
    }

    nativeElm.style['top'] = top + 'px';
    nativeElm.style['left'] = left + 'px';
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



}
