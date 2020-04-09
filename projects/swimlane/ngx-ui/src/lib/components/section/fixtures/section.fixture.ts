import { Component, ViewChild } from '@angular/core';

import { SectionComponent } from '../section.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'section-fixture',
  templateUrl: 'section.fixture.html'
})
export class SectionFixtureComponent {
  @ViewChild('section', { static: true }) section: SectionComponent;
}
