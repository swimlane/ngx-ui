import { Component, ViewChild } from '@angular/core';

import { SectionComponent } from '../section.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section-fixture',
  templateUrl: 'section.fixture.html',
  standalone: false
})
export class SectionFixtureComponent {
  @ViewChild('section', { static: true }) section: SectionComponent;
}
