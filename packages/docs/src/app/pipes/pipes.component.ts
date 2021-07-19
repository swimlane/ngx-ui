import decamelizeHtml from '!!raw-loader!./examples/decamelize.html';
import decamelizeTS from '!!raw-loader!./examples/decamelize.ts';
import filterByHtml from '!!raw-loader!./examples/filter-by.html';
import filterByTS from '!!raw-loader!./examples/filter-by.ts';
import jsonTreeHtml from '!!raw-loader!./examples/json-tree.html';
import jsonTreeTS from '!!raw-loader!./examples/json-tree.ts';
import timezoneHtml from '!!raw-loader!./examples/timezone.html';
import timezoneTS from '!!raw-loader!./examples/timezone.ts';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocExamples } from '@swimlane/ngx-doc';

@Component({
  selector: 'docs-pipes',
  template: `
    <ngx-doc-page header="Pipes">
      <ngx-doc-example
        heading="Decamelize"
        id="decamelize"
        [content]="decamelizeExamples"
      >
        {{ 'decamelizePipe' | decamelize }}
        <br />
        {{ 'fooBar' | decamelize }}
      </ngx-doc-example>

      <ngx-doc-example
        heading="Timezone"
        id="timezone"
        [content]="timezoneExamples"
      >
        <p>Local: {{ date }}</p>
        <p>America/Los_Angeles: {{ date | timeZone: 'America/Los_Angeles' }}</p>
      </ngx-doc-example>

      <ngx-doc-example
        heading="Filter By"
        id="filter-by"
        [content]="filterByExamples"
      >
        <ngx-input
          ngxSize
          ngxAppearance
          ngxInputAttribute
          type="text"
          [(ngModel)]="stringFilter"
          placeholder="Filter by"
        ></ngx-input>
        <ul>
          <li *ngFor="let item of array | filterBy: stringFilter">
            {{ item }}
          </li>
        </ul>
      </ngx-doc-example>

      <ngx-doc-example
        heading="JSON Tree"
        id="json-tree"
        [content]="jsonTreeExamples"
      >
        <pre>{{ jsonObject | jsonTree | json }}</pre>
      </ngx-doc-example>
    </ngx-doc-page>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipesComponent {
  readonly decamelizeExamples: DocExamples = {
    'decamelize.html': [decamelizeHtml, 'markup'],
    'decamelize.ts': [decamelizeTS],
  };

  readonly timezoneExamples: DocExamples = {
    'timezone.html': [timezoneHtml, 'markup'],
    'timezone.ts': [timezoneTS],
  };

  readonly filterByExamples: DocExamples = {
    'filter-by.html': [filterByHtml, 'markup'],
    'filter-by.ts': [filterByTS],
  };

  readonly jsonTreeExamples: DocExamples = {
    'json-tree.html': [jsonTreeHtml, 'markup'],
    'json-tree.ts': [jsonTreeTS],
  };

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
    'KATIE BELL',
  ];

  stringFilter = '';
}
