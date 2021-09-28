import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'docs-date-time-page',
  template: `
    <ngx-doc-page header="Date Time">
      <ng-template ngxDocPageTab="Date">
        <docs-date-input></docs-date-input>
      </ng-template>

      <ng-template ngxDocPageTab='Time'>
        <docs-time-input></docs-time-input>
      </ng-template>

      <ng-template ngxDocPageTab='DateTime'>
        <docs-date-time-input></docs-date-time-input>
      </ng-template>

      <ng-template ngxDocPageTab='Appearances'>
        <docs-date-time-appearances></docs-date-time-appearances>
      </ng-template>
    </ngx-doc-page>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
