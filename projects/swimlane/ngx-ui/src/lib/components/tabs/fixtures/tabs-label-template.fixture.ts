import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent } from '../tabs.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tabs-label-template-fixture',
  templateUrl: 'tabs-label-template.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TabsLabeltemplateFixtureComponent {
  @ViewChild('tabs', { static: true }) tabsComponent: TabsComponent;
}
