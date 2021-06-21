import { Component } from '@angular/core';

@Component({
  selector: 'docs-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  uploadOptions = {
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: true
  };
}
