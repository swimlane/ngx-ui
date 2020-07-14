import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { InjectionService } from '../../../services/injection/injection.service';
import { OverlayService } from '../../overlay/overlay.service';
import { DialogService } from '../dialog.service';
import { AlertComponent } from './alert.component';
import { AlertTypes } from './alert-types.enum';
import { AlertStyles } from './alert-styles.enum';
import { DialogOptions } from '../dialog-options.interface';

const ClsMap = {
  [AlertStyles.Danger]: 'ngx-alert-danger',
  [AlertStyles.Warning]: 'ngx-alert-warning',
  [AlertStyles.Info]: 'ngx-alert-info'
};

@Injectable()
export class AlertService extends DialogService<AlertComponent> {
  readonly defaults: DialogOptions = {
    inputs: {
      zIndex: 991,
      closeOnBlur: false,
      closeOnEscape: false,
      closeButton: false,
      showOverlay: true,
      visible: true
    }
  };

  protected type: any = AlertComponent;

  constructor(readonly injectionService: InjectionService, readonly overlayService: OverlayService) {
    super(injectionService, overlayService);
  }

  alert(options: DialogOptions) {
    return this.createDialog(options, AlertTypes.Alert);
  }

  confirm(options: DialogOptions) {
    return this.createDialog(options, AlertTypes.Confirm);
  }

  prompt(options: DialogOptions) {
    return this.createDialog(options, AlertTypes.Prompt);
  }

  private createDialog(options: DialogOptions, type: AlertTypes) {
    const subject = new Subject<{ type: string; data: any }>();
    const { title, content, longPress } = options;
    const cssClass = ['ngx-alert-dialog', ClsMap[options.style], options.cssClass].join(' ');

    const component = this.create({
      title,
      content,
      longPress,
      type,
      cssClass
    });

    const list = component.instance.ok.subscribe((data: { data: any }) => {
      subject.next({
        type: 'ok',
        data
      });

      subject.complete();
      list.unsubscribe();
      list2.unsubscribe();
    });

    const list2 = component.instance.cancel.subscribe((data: { data: any }) => {
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
