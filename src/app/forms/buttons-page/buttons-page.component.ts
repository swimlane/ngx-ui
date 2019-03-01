import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-buttons-page',
  templateUrl: './buttons-page.component.html'
})
export class ButtonsPageComponent {
  buttonPromise: any = undefined;

  uploadOptions = {
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: true
  };

  uploaderInstance = new FileUploader({
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: false
  });

  onClick(msg, target) {
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

    if (target) {
      target.buttonPromise = buttonPromise;
    } else {
      this.buttonPromise = buttonPromise;
    }
  }

}
