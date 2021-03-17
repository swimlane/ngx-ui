```html
<ngx-select allowAdditions allowAdditionsText="Add New Value" [selectCaret]="doubleDown">
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>

<ng-template #doubleDown>
  <ngx-icon fontIcon="double-down"></ngx-icon>
</ng-template>
```
