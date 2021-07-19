import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { JsonTreeModule } from '@swimlane/ngx-ui/json-tree';

@Component({
  selector: 'some',
  templateUrl: 'json-tree.html',
})
export class SomeComponent {
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
}

@NgModule({
  imports: [JsonTreeModule, CommonModule],
  declarations: [SomeComponent],
})
export class SomeModule {}
