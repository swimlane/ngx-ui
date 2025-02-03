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

  onChange(event) {
    console.log('CheckboxPageComponent.onChange', event);
    this.isIndeterminate = false;
    this.isChecked = true;
    // this.isChecked = event.
  }

  onIndeterminateChange(event) {
    console.log('CheckboxPageComponent.onIndeterminateChange', event);
  }
}
