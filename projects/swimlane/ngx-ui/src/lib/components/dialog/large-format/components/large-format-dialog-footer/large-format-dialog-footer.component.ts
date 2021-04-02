import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-large-format-dialog-footer',
  template: ` <ng-content></ng-content>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LargeFormatDialogFooterComponent implements OnInit {
  @HostBinding('class.ngx-large-format-dialog-footer') hostClass = true;

  constructor() {}

  ngOnInit(): void {}
}
