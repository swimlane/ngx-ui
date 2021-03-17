```html
<ngx-select
  label="Attack Type"
  (change)="onEvent('ngx-select change', $event)"
  (keyup)="onEvent('ngx-select change', $event)"
  (toggle)="onEvent('ngx-select toggle', $event)"
>
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>
```
