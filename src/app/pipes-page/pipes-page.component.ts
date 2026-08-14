import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pipes-page',
  templateUrl: './pipes-page.component.html',
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class PipesPageComponent {
  jsonObject = JSON.parse(`{
    "firstName": "John",
    "lastName": "Smith",
    "age": 25,
    "address": {
      "streetAddress": "21 2nd Street",
      "city": "New York",
      "state": "NY",
      "postalCode": "10021-3100"
    }
  }`);

  date = new Date();

  array = [
    'HERMIONE GRANGER',
    'HARRY POTTER',
    'GINNY WEASLEY',
    'RON WEASLEY',
    'NEVILLE LONGBOTTOM',
    'FRED WEASLEY',
    'GEORGE WEASLEY',
    'LUNA LOVEGOOD',
    'ANGELINA JOHNSON',
    'KATIE BELL'
  ];

  stringFilter = '';
}
