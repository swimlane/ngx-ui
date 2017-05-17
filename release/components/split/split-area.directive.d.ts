import { FlexDirective } from '@angular/flex-layout/flexbox/api/flex';
export declare class SplitAreaDirective {
    flex: FlexDirective;
    minAreaPct: number;
    maxAreaPct: number;
    readonly cssClass: boolean;
    constructor(flex: FlexDirective);
}
