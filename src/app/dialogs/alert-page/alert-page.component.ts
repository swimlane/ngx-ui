import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AlertService, AlertStyles } from '@swimlane/ngx-ui';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlertPageComponent {
  readonly AlertStyles = AlertStyles;

  constructor(public alertService: AlertService) {}

  onPromptClick() {
    const subject = this.alertService.prompt({
      title: 'Alert SOC',
      content: 'What type of compromise?'
    });

    console.log('Prompt subject', subject);

    subject.subscribe({
      next: v => console.log('Prompt next', v),
      error: err => console.log('Prompt err', err),
      complete: () => console.log('Complete')
    });
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
