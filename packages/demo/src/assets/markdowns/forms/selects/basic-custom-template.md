```html
<ngx-select label="Custom template...">
  <ngx-select-option value="breach">
    <ng-template ngx-select-option-input-template let-option="option">
      <span class="ngx-tag">{{ option.value }}</span>
    </ng-template>
    <ng-template ngx-select-option-template let-option="option">
      <i class="ngx-icon ngx-bug"></i>
      {{ option.value }}
    </ng-template>
  </ngx-select-option>
  <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
  <ngx-select-option name="Physical" value="physical">
    <ng-template ngx-select-option-template let-option="option">
      <i class="ngx-icon ngx-chart-spider"></i>
      {{ option.value }}
    </ng-template>
  </ngx-select-option>
</ngx-select>
```
