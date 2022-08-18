import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsPageComponent {
  showExamples = true;
  tabList = [1, 2, 3];
  tab3Disabled = true;

  handleTabChange(event: any) {
    this.showExamples = event.tabId === 'tab-2' ? false : true;
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
