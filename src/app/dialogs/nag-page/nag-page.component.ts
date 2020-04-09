import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nag-page',
  templateUrl: './nag-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NagPageComponent {
  nags = [];

  addNag() {
    this.nags.push({
      type: 'Alert',
      id: Math.trunc(Math.random() * 10000),
    });
  }
}
