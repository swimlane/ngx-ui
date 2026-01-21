import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent } from '../tabs.component';
import { TabsModule } from '../tabs.module';
import { CommonModule } from '@angular/common';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tabs-label-template-fixture',
  templateUrl: 'tabs-label-template.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TabsModule, CommonModule]
})
export class TabsLabeltemplateFixtureComponent {
  @ViewChild('tabs', { static: true }) tabsComponent: TabsComponent;
}
