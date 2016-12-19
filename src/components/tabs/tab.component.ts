import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-tab',
  template: `
    <ng-content *ngIf="active"></ng-content>
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
