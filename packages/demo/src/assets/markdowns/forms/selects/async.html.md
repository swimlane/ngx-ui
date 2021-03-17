```html
<ngx-select>
  <ngx-select-option
    *ngFor="let option of asyncOptions$ | async"
    [name]="option.name"
    [value]="option"
    [disabled]="option.disabled"
  ></ngx-select-option>
</ngx-select>
```
