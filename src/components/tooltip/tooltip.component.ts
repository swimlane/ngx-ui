import { Input, Component, Inject, ElementRef } from '@angular/core';
import { PositionHelper } from './position.helper';
import { TooltipOptions } from './tooltip-options';

@Component({
  selector: 'swui-tooltip-content',
  template: `
    <div>
      <div
        class="tooltip-body"
        *ngIf="!title">
        <template
          [ngTemplateOutlet]="template"
          [ngOutletContext]="{ model: context }">
        </template>
      </div>
      <div
        class="tooltip-body"
        *ngIf="title"
        [innerHTML]="title">
      </div>
    </div>
  `,
  host: {
    class: 'swui-tooltip-content'
  }
})
export class TooltipContentComponent {

  @Input() title;
  @Input() htmlContent;
  @Input() context;

  public constructor(
    private element: ElementRef,
    @Inject(TooltipOptions) options: TooltipOptions) {

    Object.assign(this, options);
  }

}
