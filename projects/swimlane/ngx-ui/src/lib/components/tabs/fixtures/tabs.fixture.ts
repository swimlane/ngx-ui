import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent } from '../tabs.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tabs-fixture',
  templateUrl: 'tabs.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsFixtureComponent {
  @ViewChild('tabs', { static: true }) tabsComponent: TabsComponent;
}
