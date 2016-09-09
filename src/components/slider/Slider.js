import { Component, Input } from "@angular/core";
import './slider.scss';

@Component({
  selector: 'slider',
  template: `
    <div>
      <input
        type="range"
        [value]="value"
        [min]="min"
        [max]="max"
        [step]="step"
      />
    </div>
  `,
  host: {
    'class': 'slider'
  }
})
export class Slider {

  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 5;
  @Input() step = 1;

}
