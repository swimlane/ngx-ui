import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsPageComponent {
  tabList = [1, 2, 3];
  tab3Disabled = true;
}
