import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'docs-basic-date-input',
  templateUrl: './basic-date-input.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDateInputComponent {
  dateControl = new FormControl(new Date('10/10/2016'));
}
