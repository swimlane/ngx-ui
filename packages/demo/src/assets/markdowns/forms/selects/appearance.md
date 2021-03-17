```html
<ngx-select [filterable]="false" appearance="legacy">
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>

<ngx-select [filterable]="false" appearance="legacy" label="Legacy input with autosize" autosize>
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
  <ngx-select-option
    name="Really long option to show autosize of the component when autosize is selected"
    value="Really long option to show autosize of the component when autosize is selected"
  ></ngx-select-option>
</ngx-select>

<ngx-select [filterable]="false" appearance="fill">
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="a very long choice that you need to make" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>

<ngx-select [filterable]="true" appearance="fill" label="Fill With Search">
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>

<ngx-select [filterable]="false" multiple appearance="fill" label="Fill With Multiple Selections">
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>

<ngx-select [filterable]="false" tagging appearance="fill" label="Fill With Tagging">
  <ngx-select-option name="Breach" value="breach"></ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical"></ngx-select-option>
</ngx-select>

<ngx-select [filterable]="false" tagging appearance="fill" label="Fill Tagging With No Options"></ngx-select>

<ngx-select [filterable]="false" tagging appearance="fill" label="Fill With Grouping" groupBy="type">
  <ngx-select-option name="Breach" [value]="{ value: 'breach', type: 'IOS' }"></ngx-select-option>
  <ngx-select-option name="DDOS" [value]="{ value: 'ddos', type: 'IOS' }"></ngx-select-option>
  <ngx-select-option name="Physical" [value]="{ value: 'Physical', type: 'MOX' }"></ngx-select-option>
</ngx-select>
```
