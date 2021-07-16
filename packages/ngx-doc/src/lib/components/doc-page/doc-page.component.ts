import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ngx-doc-page',
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
