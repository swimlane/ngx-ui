import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonState } from '@swimlane/ngx-ui/button';

@Component({
  selector: 'docs-basic-ngx-button-example',
  templateUrl: './basic-ngx-button.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNgxButtonComponent {
  buttonPromise: Promise<unknown> | undefined = undefined;

  readonly ButtonState = ButtonState;
  readonly promises: Record<string, Promise<unknown>> = {};

  onClick(msg: string, targetId?: string, successProbability = 0.5) {
    console.log(`Demo app click: ${msg}`);

    const buttonPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < successProbability) {
          resolve('Success!');
        } else {
          reject('I fail you!');
        }
      }, 3000);
    });

    buttonPromise
      .then(() => {
        console.log('success');
      })
      .catch(() => {
        console.log('fail');
      });

    if (targetId) {
      this.promises[targetId] = buttonPromise;
    } else {
      this.buttonPromise = buttonPromise;
    }
  }
}
