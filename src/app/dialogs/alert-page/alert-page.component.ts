import { Component } from '@angular/core';
import { AlertService } from '../../../../projects/swimlane/ngx-ui/src/public_api';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html'
})
export class AlertPageComponent {

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
      complete: v => console.log('Complete', v)
    });
  }

}
