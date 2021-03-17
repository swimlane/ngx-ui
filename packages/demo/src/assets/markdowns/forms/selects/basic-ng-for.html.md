```html
<ngx-select identifier="attr" [ngModel]="[selects[0]]" label="Select a value...">
  <ngx-select-option
    *ngFor="let option of selects"
    [value]="option"
    [name]="option.name"
    [disabled]="option.disabled"
  ></ngx-select-option>
</ngx-select>
```
