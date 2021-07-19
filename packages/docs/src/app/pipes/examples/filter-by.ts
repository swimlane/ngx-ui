import { Component, NgModule } from '@angular/core';
import { FilterByModule } from '@swimlane/ngx-ui/filter-by';

@Component({
  selector: 'some',
  templateUrl: 'filter-by.html',
})
export class SomeComponent {
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
    'KATIE BELL',
  ];

  stringFilter = '';
}

@NgModule({
  imports: [FilterByModule],
  declarations: [SomeComponent],
})
export class SomeModule {}
