```html
<ngx-date-time
  name="calendar-input3"
  [(ngModel)]="curDate2"
  [format]="'M/Y'"
  (change)="dateChanged($event)"
></ngx-date-time>
```
