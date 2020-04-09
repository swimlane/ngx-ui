import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tooltip-page',
  templateUrl: './tooltip-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPageComponent {
  tooltipModel = {
    text: 'foo',
  };
  dynamicVal = `Attack at ${new Date()}`;
  shown: any;
}
