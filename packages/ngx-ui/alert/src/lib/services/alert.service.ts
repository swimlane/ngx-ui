import { Injectable } from '@angular/core';
import { DialogService } from '@swimlane/ngx-ui/dialog';
import { InjectionService } from '@swimlane/ngx-ui/injection';
import { OverlayService } from '@swimlane/ngx-ui/overlay';
import { AlertStyle, AlertType } from '@swimlane/ngx-ui/types';
import { Subject } from 'rxjs';
import { AlertComponent } from '../alert.component';
import { AlertOptions } from '../models';

const classMap = {
  [AlertStyle.Danger]: 'ngx-alert-danger',
  [AlertStyle.Warning]: 'ngx-alert-warning',
  [AlertStyle.Info]: 'ngx-alert-info'
};

@Injectable()
export class AlertService extends DialogService<AlertComponent> {
  readonly defaults: AlertOptions = {
    inputs: {
      zIndex: 991,
      closeOnBlur: false,
      closeOnEscape: false,
      closeButton: false,
      showOverlay: true,
      visible: true
    }
  };

  protected type = AlertComponent;

  constructor(readonly injectionService: InjectionService, overlayService: OverlayService) {
    super(injectionService, overlayService);
  }

  alert(options: AlertOptions) {
    return this.createDialog(options, AlertType.Alert);
  }

  confirm(options: AlertOptions) {
    return this.createDialog(options, AlertType.Confirm);
  }

  prompt(options: AlertOptions) {
    return this.createDialog(options, AlertType.Prompt);
  }

  private createDialog(options: AlertOptions, type: AlertType) {
    const subject = new Subject<{ type: string; data: any }>();
    const { title, content, longPress, confirmButtonText, cancelButtonText } = options;
    const cssClass = ['ngx-alert-dialog', classMap[options.style!], options.cssClass].join(' ');

    const component = this.create({
      title,
      content,
      longPress,
      type,
      cssClass,
      confirmButtonText,
      cancelButtonText
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
