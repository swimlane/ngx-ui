import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-lists-page',
  templateUrl: './lists-page.component.html',
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ListsPageComponent {}
