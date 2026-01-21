import { Component, ViewChild } from '@angular/core';

import { SectionComponent } from '../section.component';
import { SectionModule } from '../section.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'section-fixture',
  templateUrl: 'section.fixture.html',
  standalone: true,
  imports: [SectionModule]
})
export class SectionFixtureComponent {
  @ViewChild('section', { static: true }) section: SectionComponent;
}
