import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngx-doc-example',
  templateUrl: './doc-example.component.html',
  styleUrls: ['./doc-example.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
