import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { InjectionService, InjectionRegisteryService } from '../../../services';
import { OverlayService } from '../../overlay';
import { DialogService } from '../dialog.service';
import { AlertComponent } from './alert.component';
import { AlertTypes } from './alert.types';

@Injectable()
export class AlertService extends DialogService {

  defaults: any = {
    inputs: {
      zIndex: 991,
      closeOnBlur: false,
      closeOnEscape: false,
      closeButton: false,
      showOverlay: true,
      visible: true
    }
  };

  type: any = AlertComponent;

  clsMap: any = {
    danger: 'ngx-alert-danger',
    warning: 'ngx-alert-warning',
    info: 'ngx-alert-info'
  };

  constructor(
    injectionService: InjectionService,
    overlayService: OverlayService) {
    super(injectionService, overlayService);
  }

  alert(props): any {
    return this.createDialog(props, AlertTypes.alert);
  }

  confirm(props): any {
    return this.createDialog(props, AlertTypes.confirm);
  }

  prompt(props): any {
    return this.createDialog(props, AlertTypes.prompt);
  }

  private createDialog(props: any, type: AlertTypes): any {
    const subject = new Subject();
    const { title, content } = props;
    const cssClass = 'ngx-alert-dialog ' + this.clsMap[props.style];

    const component = this.create({
      title,
      content,
      type,
      cssClass
    });

    const list = component.instance.ok.subscribe((data) => {
      subject.next({
        type: 'ok',
        data
      });

      subject.complete();
      list.unsubscribe();
      list2.unsubscribe();
    });

    const list2 = component.instance.cancel.subscribe((data) => {
      subject.next({
        type: 'cancel',
        data
      });

      subject.complete();
      list.unsubscribe();
      list2.unsubscribe();
    });

    return subject;
  }

}
