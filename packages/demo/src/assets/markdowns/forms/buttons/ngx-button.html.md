```html
<ngx-button [promise]="promises['defaultButton']" (click)="onClick('button click', 'defaultButton')" class="btn">
  Default
</ngx-button>
<ngx-button
  [promise]="promises['primaryButton']"
  (click)="onClick('button click', 'primaryButton')"
  class="btn btn-primary"
>
  Primary
</ngx-button>
<ngx-button
  [promise]="promises['gradiantButton']"
  (click)="onClick('button click', 'gradiantButton')"
  class="btn btn-primary btn-primary-gradient"
>
  Primary Gradient
</ngx-button>
<ngx-button
  #failButton
  [promise]="promises['failButton']"
  (click)="
        onClick('button click', 'failButton');
        failButton.state = 'fail';
        failButton.updateState()
      "
  class="btn btn-warning"
>
  Warning
</ngx-button>
<ngx-button
  #sucessButton
  [promise]="promises['sucessButton']"
  (click)="
        onClick('button click', 'sucessButton');
        sucessButton.state = 'success';
        sucessButton.updateState()
      "
  class="btn btn-danger"
>
  Danger
</ngx-button>
<ngx-button
  [promise]="promises['borderButton']"
  (click)="onClick('button click', 'borderButton')"
  class="btn btn-bordered"
>
  Bordered
</ngx-button>
<ngx-button [promise]="promises['linkButton']" (click)="onClick('button click', 'linkButton')" class="btn btn-link">
  Link
</ngx-button>
<ngx-button
  [promise]="promises['noTimeoutButton']"
  [timeout]="0"
  (click)="onClick('button click', 'noTimeoutButton')"
  class="btn"
>
  No Timeout
</ngx-button>
<br />
<br />
<ngx-button (click)="onClick('button click')" class="btn" disabled>Default</ngx-button>
<ngx-button state="inProgress" class="btn btn-primary" disabled>Primary</ngx-button>
<ngx-button state="inProgress" class="btn btn-primary btn-primary-gradient" disabled>Primary Gradient</ngx-button>
<ngx-button state="fail" class="btn btn-warning" disabled>Warning</ngx-button>
<ngx-button state="success" class="btn btn-danger" disabled>Danger</ngx-button>
<ngx-button class="btn btn-bordered" disabled>Bordered</ngx-button>
<ngx-button class="btn btn-link" disabled>Link</ngx-button>
<ngx-button [timeout]="0" disabled class="btn">No Timeout</ngx-button>
```
