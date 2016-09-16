import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab',
  template: `
    <ng-content *ngIf="active"></ng-content>
  `
})
export class Tab {

  @Input() title = '';

  @Input() active = false;

  @Input() disabled = false;

}
