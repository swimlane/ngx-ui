import preface from '!!raw-loader!./docs/preface.md';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'docs-home',
  template: `
    <ngx-doc-page header="NGX-UI">
      <ngx-doc-example heading="Preface" id="preface">
        <ngx-doc-markdown [code]="preface"></ngx-doc-markdown>
      </ngx-doc-example>

      <ngx-doc-example heading="Peer Dependencies" id="peer-dependencies">
        <ul>
          <li *ngFor="let dep of peerDependencies | keyvalue">
            <a [attr.href]="'http://www.npmjs.com/package/' + dep.key">
              {{ dep.key }} - {{ dep.value }}
            </a>
          </li>
        </ul>
      </ngx-doc-example>
    </ngx-doc-page>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly preface = preface;

  readonly peerDependencies = environment.peerDependencies;

  constructor() {}

  ngOnInit(): void {}
}
