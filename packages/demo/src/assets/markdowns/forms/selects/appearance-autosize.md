```html
<ngx-select
  [filterable]="false"
  appearance="fill"
  label="Fill Input"
  hint="im a hint"
  placeholder="Select a value..."
  autosize
>
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical" disabled></ngx-select-option>
</ngx-select>

<ngx-select appearance="fill" label="Fill With Search" autosize>
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>

<ngx-select [filterable]="false" multiple appearance="fill" label="Fill With Multiple Selections" autosize>
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>

<ngx-select [filterable]="false" tagging appearance="fill" label="Fill With Tagging" autosize>
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>

<ngx-select [filterable]="false" tagging appearance="fill" label="Fill Tagging With No Options" autosize></ngx-select>

<ngx-select [filterable]="false" tagging appearance="fill" label="Fill With Grouping" groupBy="type" autosize>
  <ngx-select-option name="Breach" [value]="{ value: 'breach', type: 'IOS' }"></ngx-select-option>
  <ngx-select-option name="DDOS" [value]="{ value: 'ddos', type: 'IOS' }"></ngx-select-option>
  <ngx-select-option name="Physical" [value]="{ value: 'Physical', type: 'MOX' }"></ngx-select-option>
</ngx-select>
```
