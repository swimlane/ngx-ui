```html
<ngx-select multiple identifier="attr" [ngModel]="[selects[0]]">
  <ngx-select-option *ngFor="let option of selects" [name]="option.name" [disabled]="option.disabled" [value]="option">
    <ng-template ngx-select-option-input-template let-option="option">
      <i class="ngx-icon ngx-bug"></i>
      {{ option.value.name }}
    </ng-template>
  </ngx-select-option>
</ngx-select>
```
