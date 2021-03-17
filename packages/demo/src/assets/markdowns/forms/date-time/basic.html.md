```html
<ngx-date-time
  name="calendar-input1"
  [label]="'Date of attack'"
  [(ngModel)]="curDate2"
  (change)="dateChanged($event)"
  (blur)="onBlurEvent($event)"
  (dateTimeSelected)="dateTimeSelected($event)"
></ngx-date-time>
```
