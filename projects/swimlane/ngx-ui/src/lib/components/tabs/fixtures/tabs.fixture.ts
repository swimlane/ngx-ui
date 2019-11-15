import { Component, ViewChild } from '@angular/core';
import { TabsComponent } from '../tabs.component';

@Component({
  selector: 'tabs-fixture',
  templateUrl: 'tabs.fixture.html'
})
export class TabsFixtureComponent {
  @ViewChild('tabs', { static: true }) tabsComponent: TabsComponent;
}
