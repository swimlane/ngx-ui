import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-toggle-page',
  templateUrl: './toggle-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TogglePageComponent {
  toggleChk = true;

  onToggleChange(event) {
    console.log('check?', event);
  }
}
