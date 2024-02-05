import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-buttons-page',
  templateUrl: './buttons-page.component.html',
  styleUrls: ['./buttons-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsPageComponent {
  buttonPromise: any = undefined;

  promises: any = {};

  aLongString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  anUnbrokenString = this.aLongString.replace(/\s/, '_');

  uploadOptions = {
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: true
  };

  uploaderInstance = new FileUploader({
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: false
  });

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

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
