import { Component } from '@angular/core';

@Component({
  selector: 'app-checkbox-page',
  templateUrl: './checkbox-page.component.html'
})
export class CheckboxPageComponent {
  checkOne: boolean = true;

  onChange(event: any) {
    console.log('Checkbox changed');
  }
}
