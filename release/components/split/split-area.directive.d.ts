import { FlexDirective } from '@angular/flex-layout/flexbox/api/flex';
export declare class SplitAreaDirective {
    flex: FlexDirective;
    minAreaPct: any;
    maxAreaPct: any;
    _minAreaPct: number;
    _maxAreaPct: number;
    readonly cssClass: boolean;
    constructor(flex: FlexDirective);
}
