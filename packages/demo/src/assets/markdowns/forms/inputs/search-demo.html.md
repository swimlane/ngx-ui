```html
<div class="demo-search-box">
  <ngx-input
    #searchInput
    [hidden]="!(searchInput?.focused || searchInputValue?.length > 0)"
    placeholder="Search"
    type="text"
    name="searchInputValue"
    [(ngModel)]="searchInputValue"
    (focus)="searchInput.focused = true"
    (blur)="searchInput.focused = false"
  >
    <ngx-input-prefix>
      <i class="ngx-icon ngx-search"></i>
    </ngx-input-prefix>
    <ngx-input-suffix>
      <button class="btn btn-link" *ngIf="searchInputValue?.length > 0" (click)="searchInputValue = ''">
        <i class="ngx-icon ngx-x"></i>
      </button>
    </ngx-input-suffix>
  </ngx-input>
</div>
```
