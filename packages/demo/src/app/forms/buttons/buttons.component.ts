import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploader } from '@swimlane/ng2-file-upload';

@Component({
  selector: 'demo-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class ButtonsComponent {
  buttonPromise: Promise<unknown> = undefined;

  promises: Record<string, Promise<unknown>> = {};

  uploadOptions = {
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: true
  };

  uploaderInstance = new FileUploader({
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: false
  });

  onClick(msg: string, targetId?: string) {
    console.log('Demo app click: ', msg);

    const buttonPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
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
