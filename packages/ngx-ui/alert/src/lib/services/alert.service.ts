import { Injectable } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/common';
import { DialogService } from '@swimlane/ngx-ui/dialog';
import { OverlayService } from '@swimlane/ngx-ui/overlay';
import { Subject } from 'rxjs';
import { AlertComponent } from '../alert.component';
import { AlertStyle, AlertType } from '../enums';
import { AlertOptions } from '../models';

const classMap = {
  [AlertStyle.danger]: 'ngx-alert-danger',
  [AlertStyle.warning]: 'ngx-alert-warning',
  [AlertStyle.info]: 'ngx-alert-info',
};

@Injectable({ providedIn: 'root' })
export class AlertService extends DialogService<AlertComponent> {
  readonly defaults: AlertOptions = {
    inputs: {
      zIndex: 991,
      closeOnBlur: false,
      closeOnEscape: false,
      closeButton: false,
      showOverlay: true,
      visible: true,
    },
  };

  protected type = AlertComponent;

  constructor(
    readonly injectionService: InjectionService,
    overlayService: OverlayService
  ) {
    super(injectionService, overlayService);
  }

  alert(options: AlertOptions) {
    return this.createDialog(options, AlertType.alert);
  }

  confirm(options: AlertOptions) {
    return this.createDialog(options, AlertType.confirm);
  }

  prompt(options: AlertOptions) {
    return this.createDialog(options, AlertType.prompt);
  }

  private createDialog(options: AlertOptions, type: AlertType) {
    const subject = new Subject<{ type: string; data: any }>();
    const {
      title,
      content,
      longPress,
      confirmButtonText,
      cancelButtonText,
      cancelButtonClass = [],
      confirmButtonClass = 'btn-primary',
    } = options;
    const cssClass = ['ngx-alert-dialog', options.cssClass].join(' ');

    if (options.style) {
      cssClass.concat(' ', classMap[options.style]);
    }

    const component = this.create({
      title,
      content,
      longPress,
      type,
      cssClass,
      confirmButtonText,
      cancelButtonText,
      cancelButtonClass,
      confirmButtonClass,
    });

    const okSubscription = component.instance.ok.subscribe(
      (data: { data: any }) => {
        subject.next({
          type: 'ok',
          data,
        });

        subject.complete();
        okSubscription.unsubscribe();
        cancelSubscription.unsubscribe();
      }
    );

    const cancelSubscription = component.instance.cancel.subscribe(
      (data: { data: any }) => {
        subject.next({
          type: 'cancel',
          data,
        });

        subject.complete();
        okSubscription.unsubscribe();
        cancelSubscription.unsubscribe();
      }
    );

    return subject;
  }
}
