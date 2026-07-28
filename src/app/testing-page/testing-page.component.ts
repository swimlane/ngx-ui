import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class TestingPageComponent {}
