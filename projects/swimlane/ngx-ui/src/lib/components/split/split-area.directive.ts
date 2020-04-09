import { Directive, Optional, Self, Input, OnChanges } from '@angular/core';
import { DefaultFlexDirective, validateBasis } from '@angular/flex-layout';

@Directive({
  exportAs: 'ngxSplitArea',
  selector: '[ngxSplitArea]',
  host: {
    class: 'ngx-split-area',
    '[style.overflow]': 'overflow'
  }
})
export class SplitAreaDirective implements OnChanges {
  @Input() minBasis: string;
  @Input() maxBasis: string;
  @Input() fxFlex: string;

  overflow: string = 'hidden';
  initialFlexBasis: string[];
  currentFlexBasis: string[];

  get fxFlexFill(): boolean {
    return this.fxFlex === '';
  }

  constructor(
    @Optional()
    @Self()
    readonly flexDirective: DefaultFlexDirective
  ) {}

  ngOnChanges() {
    this.currentFlexBasis = this.initialFlexBasis = this.getCurrentFlexParts();
  }

  updateStyle(flexBasis?: string | number) {
    const flex = this.flexDirective;
    if (typeof flexBasis === 'undefined') {
      flexBasis = flex.activatedValue || '';
    }
    if (typeof flexBasis === 'number') {
      flexBasis = this.isPercent() ? `${flexBasis}%` : `${flexBasis}px`;
    }

    if (flexBasis.indexOf(' ') < 0) {
      const grow = flex.grow;
      const shrink = flex.shrink;
      this.currentFlexBasis = [grow, shrink, flexBasis];
      flexBasis = this.currentFlexBasis.join(' ');
    } else {
      this.currentFlexBasis = flexBasis.split(' ');
    }

    flex.activatedValue = this.currentFlexBasis[2];
  }

  isPercent(basis?: string): boolean {
    if (!basis) {
      const flex = this.flexDirective;
      basis = flex.activatedValue || '1 1 1e-9px';
    }
    const hasCalc = String(basis).indexOf('calc') > -1;
    return String(basis).indexOf('%') > -1 && !hasCalc;
  }

  private getCurrentFlexParts() {
    const flex = this.flexDirective;
    const basis = (flex && flex.activatedValue) || '1 1 1e-9px';
    return validateBasis(String(basis).replace(';', ''), flex.grow, flex.shrink);
  }
}
