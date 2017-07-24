import { Component, Input } from '@angular/core';

/**
 * TODO: Remove hidden when https://github.com/angular/angular/issues/18310 is resolved
 */
@Component({
  selector: 'ngx-tab',
  template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    class: 'ngx-tab'
  }
})
export class TabComponent {

  @Input() title = '';

  @Input() active = false;

  @Input() disabled = false;

}
