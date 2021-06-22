import { Component } from '@angular/core';

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        padding: 1rem;
        display: block;
      }
    `,
  ],
})
export class AppComponent {
  onClick() {
    console.log('click');
  }
}
