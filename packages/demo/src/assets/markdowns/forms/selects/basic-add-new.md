```html
<ngx-select label="Filter and add new" allowAdditions [allowAdditionsText]="'Add new value'" (keyup)="onKeyup($event)">
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>
```
