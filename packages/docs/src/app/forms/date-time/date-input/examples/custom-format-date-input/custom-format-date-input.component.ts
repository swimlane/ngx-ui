import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-custom-format-date-input',
  templateUrl: './custom-format-date-input.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomFormatDateInputComponent {
  readonly customFormat = 'YYYY-MM-ddd';
  dateControl = new FormControl(new Date('5-29-2030'));
}
