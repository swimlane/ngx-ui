```html
<ngx-date-time
  name="calendar-input3"
  hint="Default is invalid"
  [(ngModel)]="invalidDate"
  (change)="dateChanged($event)"
></ngx-date-time>
```
