import { Injectable } from '@angular/core';
import { DialogService } from '../dialog';

@Injectable()
export class AlertService {

  constructor(private dialogService: DialogService) { }

  alert({ title, content }): any {
    
    console.log('here');

    this.dialogService.create({
      title,
      template: `<div>Foo</div>`,
      cssClass: 'alert-dialog'
    });
  }

}
