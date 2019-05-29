import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-page',
  templateUrl: './toggle-page.component.html'
})
export class TogglePageComponent {
  toggleChk = true;

  onToggleChange(event) {
    console.log('check?', event);
  }
}
