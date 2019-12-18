import { Component, ViewChild } from '@angular/core';

import { TooltipDirective } from '../tooltip.directive';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tooltip-fixture',
  templateUrl: 'tooltip.fixture.html'
})
export class ToolTipFixtureComponent {
  @ViewChild('tooltip', { static: true }) tooltipDirective: TooltipDirective;

  tooltipModel = {
    text: 'foo'
  };
  dynamicVal = `Attack at ${new Date()}`;
  shown: any;
}
