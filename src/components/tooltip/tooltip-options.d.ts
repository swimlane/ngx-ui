import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
export declare class TooltipOptions {
    id: string;
    title: string;
    template: any;
    context: any;
    host: any;
    showCaret: boolean;
    type: StyleTypes;
    placement: PlacementTypes;
    alignment: AlignmentTypes;
    spacing: number;
    cssClass: string;
    constructor(opts: any);
}
