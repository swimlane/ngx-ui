import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-controller-form',
  template: `
    <ngx-doc-page header='Form Controllers'></ngx-doc-page>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerFormComponent {

  constructor() {
  }
}
