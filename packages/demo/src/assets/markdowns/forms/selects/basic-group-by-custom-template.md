```html
<ngx-select groupBy="type" [groupByTemplate]="groupByTemplate" label="Grouping with custom template...">
  <ngx-select-option [name]="'Breach'" [value]="{ value: 'breach', type: 'IOS' }"></ngx-select-option>
  <ngx-select-option [name]="'DDOS'" [value]="{ value: 'ddos', type: 'IOS' }"></ngx-select-option>
  <ngx-select-option [name]="'Physical'" [value]="{ value: 'Physical', type: 'MOX' }"></ngx-select-option>
</ngx-select>
<ng-template #groupByTemplate let-name="groupName">
  {{ name }}
  <ng-container [ngSwitch]="name">
    <ng-container *ngSwitchCase="'IOS'">🔥🔥🔥</ng-container>
    <ng-container *ngSwitchDefault>🎄🎄🎄</ng-container>
  </ng-container>
</ng-template>
```
