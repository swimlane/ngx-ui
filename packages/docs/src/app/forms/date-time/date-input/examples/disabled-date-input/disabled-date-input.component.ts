import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-disabled-date-input',
  templateUrl: './disabled-date-input.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledDateInputComponent {
  dateControl = new FormControl(new Date('10/10/2016'));
}
