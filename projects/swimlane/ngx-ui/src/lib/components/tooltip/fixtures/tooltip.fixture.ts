import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { TooltipDirective } from '../tooltip.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tooltip-fixture',
  templateUrl: 'tooltip.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ToolTipFixtureComponent {
  @ViewChild(TooltipDirective, { static: true })
  readonly tooltipDirective: TooltipDirective;

  tooltipModel = {
    text: 'foo'
  };
  dynamicVal = `Attack at ${new Date()}`;
  shown: any;
}
