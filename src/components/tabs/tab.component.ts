import { Component, Input } from '@angular/core';

@Component({
  selector: 'swui-tab',
  template: `
    <ng-content *ngIf="active"></ng-content>
  `,
  host: {
    class: 'swui-tab'
  }
})
export class TabComponent {

  @Input() title = '';

  @Input() active = false;

  @Input() disabled = false;

}
