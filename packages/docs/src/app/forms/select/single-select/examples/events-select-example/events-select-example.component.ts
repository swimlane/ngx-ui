import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-events-select-example',
  templateUrl: './events-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsSelectExampleComponent {
  options = [
    { name: 'Breach', value: 'breach' },
    { name: 'DDOS', value: 'ddos' },
    { name: 'Physical', value: 'physical' },
  ];

  selectControl = new FormControl([this.options[0].value]);

  eventInfo: { name: string; $event: unknown } | undefined;

  onEvent(name: string, $event: unknown) {
    this.eventInfo = { name, $event };
    console.log({ name, $event });
  }
}
