import { TemplateRef } from '@angular/core';

import { AlignmentTypes } from '../../utils/position/alignment-types.enum';
import { PlacementTypes } from '../../utils/position/placement-type.enum';
import { ShowTypes } from './show-types.enum';
import { StyleTypes } from './style-types.enum';

export interface TooltipConfig {
  tooltipAlignment: AlignmentTypes;
  tooltipPlacement: PlacementTypes;
  tooltipShowEvent: ShowTypes;
  tooltipShowTimeout: number;
  tooltipTitle: string;
  tooltipContext?: any;
  tooltipCssClass?: string;
  tooltipDisabled?: boolean;
  tooltipTemplate?: TemplateRef<any>;
  tooltipType: StyleTypes;
}

export const DEFAULT_TOOLTIP_CONFIG: TooltipConfig = {
  tooltipAlignment: AlignmentTypes.center,
  tooltipCssClass: '',
  tooltipPlacement: PlacementTypes.top,
  tooltipShowEvent: ShowTypes.all,
  tooltipShowTimeout: 100,
  tooltipTitle: '',
  tooltipType: StyleTypes.popover
};
