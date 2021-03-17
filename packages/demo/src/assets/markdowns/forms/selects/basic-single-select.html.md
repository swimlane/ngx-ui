```html
Selected:
<pre>{{ singleSelectModel | json }}</pre>
<ngx-select
  identifier="attr"
  [ngModel]="[singleSelectModel]"
  (ngModelChange)="singleSelectModel = $event[0]"
  label="Select a value..."
>
  <ngx-select-option
    *ngFor="let option of selects"
    [value]="option"
    [name]="option.name"
    [disabled]="option.disabled"
  ></ngx-select-option>
</ngx-select>
```
