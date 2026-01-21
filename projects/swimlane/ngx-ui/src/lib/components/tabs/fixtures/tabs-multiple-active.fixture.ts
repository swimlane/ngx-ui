import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent } from '../tabs.component';
import { TabsModule } from '../tabs.module';
import { CommonModule } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tabs-multiple-active-fixture',
  templateUrl: 'tabs-multiple-active.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TabsModule, CommonModule]
})
export class TabsMultipleActiveFixtureComponent {
  @ViewChild('tabs', { static: true }) tabsComponent: TabsComponent;
}
