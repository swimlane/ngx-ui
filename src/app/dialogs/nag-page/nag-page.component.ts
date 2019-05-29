import { Component } from '@angular/core';

@Component({
  selector: 'app-nag-page',
  templateUrl: './nag-page.component.html'
})
export class NagPageComponent {
  nags = [];

  addNag() {
    this.nags.push({
      type: 'Alert',
      id: Math.trunc(Math.random() * 10000)
    });
  }
}
