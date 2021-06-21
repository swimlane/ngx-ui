import { Component } from '@angular/core';

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  curDate = new Date();

  dateChanged(val: Date) {
    console.log('date changed!', val);
  }
}
