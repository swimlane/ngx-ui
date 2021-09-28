import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-invalid-date-input',
  templateUrl: './invalid-date-input.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvalidDateInputComponent {
  dateControl = new FormControl('abc123');
}
