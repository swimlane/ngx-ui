import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'demo-landing',
  template: `
    <demo-section-header>Preface</demo-section-header>
    <demo-markdown path="landing/preface"></demo-markdown>

    <demo-section-header>Dependencies</demo-section-header>
    <ul>
      <li *ngFor="let dep of dependencies | keyvalue">
        <a [attr.href]="'http://www.npmjs.com/package/' + dep.key">{{ dep.key }} - {{ dep.value }}</a>
      </li>
    </ul>

    <demo-section-header>Peer Dependencies</demo-section-header>
    <ul>
      <li *ngFor="let dep of peerDependencies | keyvalue">
        <a [attr.href]="'http://www.npmjs.com/package/' + dep.key">{{ dep.key }} - {{ dep.value }}</a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class LandingComponent {
  dependencies = environment.dependencies;
  peerDependencies = environment.peerDependencies;
}
