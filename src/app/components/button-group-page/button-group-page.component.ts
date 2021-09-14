import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-button-group-page',
  templateUrl: './button-group-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonGroupPageComponent {
  promises: any = {};
  buttonPromise: any = undefined;

  onBtnClick(msg: string) {
    console.log(`Demo app click: ${msg}`);
  }

  onClick(msg: string, targetId?: string, successProbability = 0.5) {
    this.onBtnClick(msg);

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
