import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-page',
  templateUrl: './checkbox-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CheckboxPageComponent {
  checked = false;
  alertType: UntypedFormGroup;
  isChecked = true;
  isIndeterminate = true;

  constructor(fb: UntypedFormBuilder) {
    this.alertType = fb.group({
      breach: false,
      ddos: false,
      physical: false
    });
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }

  onChange() {
    this.isIndeterminate = false;
    this.isChecked = true;
  }

  onIndeterminateChange(event) {
    console.log('CheckboxPageComponent.onIndeterminateChange', event);
  }
}
