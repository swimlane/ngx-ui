import { Component } from '@angular/core';
import { FileUploader } from '@swimlane/ng2-file-upload';

@Component({
  selector: 'app-buttons-page',
  templateUrl: './buttons-page.component.html'
})
export class ButtonsPageComponent {
  buttonPromise: any = undefined;

  promises: any = {};

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
      .catch(error => {
        console.log('fail');
      });

    if (targetId) {
      this.promises[targetId] = buttonPromise;
    } else {
      this.buttonPromise = buttonPromise;
    }
  }
}
