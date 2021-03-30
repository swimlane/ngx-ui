import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ngx-large-format-dialog-content',
  exportAs: 'ngxLargeFormatDialogContent',
  templateUrl: './large-format-dialog-content.component.html',
  styleUrls: ['./large-format-dialog-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LargeFormatDialogContentComponent implements OnInit {

  @HostBinding('class.ngx-large-format-dialog-content') hostClass = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
