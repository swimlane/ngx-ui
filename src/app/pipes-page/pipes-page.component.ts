import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes-page',
  templateUrl: './pipes-page.component.html',
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
