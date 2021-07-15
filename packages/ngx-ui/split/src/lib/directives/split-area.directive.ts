import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  Input,
  OnChanges,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { basisToParts, FlexParts, partsToStyle } from '../utils';

const DEFAULT_BASIS = '1 1 1e-9px';

@Directive({
  selector: '[ngxSplitArea]',
  exportAs: 'ngxSplitArea',
})
export class SplitAreaDirective implements OnChanges {
  static ngAcceptInputType_shouldAdjustMaxMin: BooleanInput;

  @Input() ngxSplitArea = DEFAULT_BASIS;
  @Input() minBasis?: string;
  @Input() maxBasis?: string;

  @NgxBooleanInput()
  @Input()
  shouldAdjustMaxMin = false;

  overflow = 'hidden';
  initialFlexParts?: FlexParts;
  currentFlexParts?: FlexParts;

  @HostBinding('style.flex')
  get flex() {
    return this.currentFlexParts
      ? partsToStyle(this.currentFlexParts)
      : DEFAULT_BASIS;
  }

  @HostBinding('style.max-width')
  @HostBinding('style.min-width')
  get minMaxWidth(): string {
    if (this.shouldAdjustMaxMin && this.currentFlexParts) {
      return this.currentFlexParts[2];
    }
    return '0';
  }

  @HostBinding('class.ngx-split-area') hostClass = true;
  @HostBinding('style.overflow') hostOverflow = 'hidden';

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    if (!this.ngxSplitArea) {
      this.ngxSplitArea = DEFAULT_BASIS;
    }
    const [grow, shrink, basis] = basisToParts('1', '1', this.ngxSplitArea);
    this.currentFlexParts = [grow, shrink, basis];
    this.initialFlexParts = [grow, shrink, basis];
    if (!this.minBasis && shrink === '0') {
      this.minBasis = basis;
    }
    if (!this.maxBasis && grow === '0') {
      this.maxBasis = basis;
    }
  }

  updateBasis(newBasis: string) {
    if (this.currentFlexParts) {
      this.currentFlexParts[2] = newBasis;
    }

    if (this.shouldAdjustMaxMin) {
      this.cdr.detectChanges();
    } else {
      this.cdr.markForCheck();
    }
  }
}
