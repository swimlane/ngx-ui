```html
<ngx-input
  type="text"
  label="Pattern validation"
  [(ngModel)]="patternValue"
  name="patern-input"
  [pattern]="'^\\w+$'"
  hint="Pattern: ^\\w+$"
></ngx-input>
```
