import { Directive, Optional, Self, HostBinding, Input, OnChanges } from '@angular/core';
import { DefaultFlexDirective, validateBasis } from '@angular/flex-layout';

@Directive({
  selector: '[ngxSplitArea]'
})
export class SplitAreaDirective implements OnChanges {
  static isPercent(basis: string): boolean {
    const hasCalc = String(basis).indexOf('calc') > -1;
    return String(basis).indexOf('%') > -1 && !hasCalc;
  }

  static basisToValue(basis: string) {
    if (typeof basis === 'string') {
      return Number(basis.replace('%', '').replace('px', ''));
    }
    return basis;
  }

  @Input()
  minBasis: string;

  @Input()
  maxBasis: string;

  @Input()
  fxFlex: string;

  @HostBinding('class.ngx-split-area')
  get cssClass() {
    return true;
  }

  @HostBinding('style.overflow') overflow: string = 'hidden';

  get fxFlexFill(): boolean {
    return this.fxFlex === '';
  }

  public initialFlexBasis: string[];
  public currentFlexBasis: string[];

  constructor(
    @Optional()
    @Self()
    public flexDirective: DefaultFlexDirective
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
