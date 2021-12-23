import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-page',
  templateUrl: './checkbox-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxPageComponent {
  checked = false;

  alertType: FormGroup;

  constructor(fb: FormBuilder) {
    this.alertType = fb.group({
      breach: false,
      ddos: false,
      physical: false
    });
  }
}
