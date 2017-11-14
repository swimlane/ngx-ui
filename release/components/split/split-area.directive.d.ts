import { FlexDirective } from '@angular/flex-layout';
export declare class SplitAreaDirective {
    flexDirective: FlexDirective;
    static isPercent(basis: string): boolean;
    static basisToValue(basis: string): number;
    minBasis: string;
    maxBasis: string;
    fxFlex: string;
    readonly cssClass: boolean;
    readonly fxFlexFill: boolean;
    constructor(flexDirective: FlexDirective);
    getFlexParts(): string[];
    getInputFlexParts(): string[];
    updateStyle(flexBasis?: string | number): void;
    isPercent(basis?: string): boolean;
}
