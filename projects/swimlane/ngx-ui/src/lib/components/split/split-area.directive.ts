import { Directive, Input, OnChanges, HostBinding, ChangeDetectorRef } from '@angular/core';
import { FlexParts, partsToStyle, basisToParts } from './utils';

const DEFAULT_BASIS = '1 1 1e-9px';

export function validateBasis(basis: string, grow = '1', shrink = '1'): FlexParts {
  const parts: FlexParts = [grow, shrink, basis];
  const matches = basis.split(' ');
  if (matches.length === 3) {
    return matches as FlexParts;
  }
  return parts;
}

@Directive({
  exportAs: 'ngxSplitArea',
  selector: '[ngxSplitArea]',
  host: {
    class: 'ngx-split-area',
    '[style.overflow]': 'overflow'
  },
  standalone: false
})
export class SplitAreaDirective implements OnChanges {
  @Input() ngxSplitArea: string = DEFAULT_BASIS;
  @Input() minBasis: string;
  @Input() maxBasis: string;
  @Input() shouldAdjustMaxMin = false;

  overflow = 'hidden';
  initialFlexParts: FlexParts;
  currentFlexParts: FlexParts;

  @HostBinding('style.flex')
  get flex() {
    return partsToStyle(this.currentFlexParts);
  }

  @HostBinding('style.max-width') get maxWidth(): string {
    if (this.shouldAdjustMaxMin) {
      return this.currentFlexParts[2];
    }
  }
  @HostBinding('style.min-width') get minWidth(): string {
    if (this.shouldAdjustMaxMin) {
      return this.currentFlexParts[2];
    }
  }

  constructor(private ref: ChangeDetectorRef) {}

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
    this.currentFlexParts[2] = newBasis;

    if (this.shouldAdjustMaxMin) {
      this.ref.detectChanges();
    } else {
      this.ref.markForCheck();
    }
  }
}
