import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { SectionComponent } from '../section.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section-fixture',
  templateUrl: 'section.fixture.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class SectionFixtureComponent {
  @ViewChild('section', { static: true }) section: SectionComponent;
}
