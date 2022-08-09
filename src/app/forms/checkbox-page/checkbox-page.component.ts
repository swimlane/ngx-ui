import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-page',
  templateUrl: './checkbox-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxPageComponent {
  checked = false;

  alertType: UntypedFormGroup;

  constructor(fb: UntypedFormBuilder) {
    this.alertType = fb.group({
      breach: false,
      ddos: false,
      physical: false
    });
  }
}
