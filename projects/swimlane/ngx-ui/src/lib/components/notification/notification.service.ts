import { Injectable, ComponentRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { InjectionService } from '../../services/injection.service';
import { InjectionRegisteryService } from '../../services/injection-registery.service';

import { NotificationType } from './notification-type.enum';
import { NotificationStyleType } from './notification-style-type.enum';
import { NotificationPermissionType } from './notification-permission-type.enum';
import { NotificationComponent } from './notification.component';
import { NotificationContainerComponent } from './notification-container.component';
import { NotificationOptions } from './notification-options.interface';

/** adding dynamic to suppress `Document` type metadata error  */
/** @dynamic */
@Injectable()
export class NotificationService extends InjectionRegisteryService<NotificationComponent> {
  static readonly limit: number | boolean = 10;
  readonly defaults: NotificationOptions = {
    inputs: {
      timeout: 2000,
      rateLimit: true,
      pauseOnHover: true,
      type: NotificationType.html,
      styleType: NotificationStyleType.none,
      showClose: true,
      sound: false
    }
  };

  permission: NotificationPermission;
  container?: ComponentRef<NotificationContainerComponent>;
  type = NotificationComponent;

  get isNativeSupported(): boolean {
    return 'Notification' in window;
  }

  constructor(readonly injectionService: InjectionService, @Inject(DOCUMENT) private readonly document: Document) {
    super(injectionService);
  }

  create(bindings: NotificationOptions) {
    // verify flood not happening
    if (bindings.rateLimit && this.isFlooded(bindings)) {
      return;
    }

    // if limit reached, remove the first one
    const compsByType = this.getByType();

    if (compsByType && compsByType.length >= NotificationService.limit) {
      this.destroy(compsByType[0]);
    }

    // native notifications need to be invoked
    let component: ComponentRef<NotificationComponent> | Notification;

    if (bindings.type === NotificationType.native) {
      component = this.showNative(bindings);
    } else {
      component = super.create(bindings);
      this.createSubscriptions(component);
      this.startTimer(component);
    }

    return component as any;
  }

  startTimer(component: ComponentRef<NotificationComponent>): void {
    if (component.instance.timeout !== false) {
      clearTimeout(component.instance.timer);

      component.instance.timer = setTimeout(() => {
        this.destroy(component);
      }, component.instance.timeout as number);
    }
  }

  pauseTimer(component: ComponentRef<NotificationComponent>): void {
    clearTimeout(component.instance.timer);
  }

  requestPermissions(): void {
    if (this.isNativeSupported) {
      Notification.requestPermission(status => (this.permission = status));
    }
  }

  assignDefaults(bindings: NotificationOptions): any {
    bindings = super.assignDefaults(bindings);

    // add a timestamp for flood checks
    bindings.inputs.timestamp = +new Date();
    return bindings;
  }

  injectComponent(type: any, bindings: NotificationOptions): ComponentRef<any> {
    if (!this.container || !this.document.contains(this.container.location.nativeElement)) {
      this.container = this.injectionService.appendComponent(NotificationContainerComponent);
    }

    return this.injectionService.appendComponent(type, bindings, this.container);
  }

  createSubscriptions(component: ComponentRef<NotificationComponent>) {
    let pauseSub: Subscription;
    let resumeSub: Subscription;
    let closeSub: Subscription;

    const kill = () => {
      if (closeSub) closeSub.unsubscribe();
      if (resumeSub) resumeSub.unsubscribe();
      if (pauseSub) pauseSub.unsubscribe();

      this.destroy(component);
    };

    const pause = () => {
      this.pauseTimer(component);
    };

    const resume = () => {
      this.startTimer(component);
    };

    pauseSub = component.instance.pause.subscribe(pause);
    resumeSub = component.instance.resume.subscribe(resume);
    closeSub = component.instance.close.subscribe(kill);
  }

  isFlooded(bindings: NotificationOptions): boolean {
    const compsByType = this.getByType();

    for (const notification of compsByType) {
      const instance = notification.instance;

      if (
        instance.title === bindings.title &&
        instance.body === bindings.body &&
        instance.timestamp + 1000 > bindings.timestamp
      ) {
        return true;
      }
    }

    return false;
  }

  showNative(options: NotificationOptions) {
    if (!this.isNativeSupported) return;
    if (!this.permission) this.requestPermissions();
    if (this.permission === NotificationPermissionType.denied) return;

    const note = new Notification(options.title, options);

    note.onerror = () => {
      console.error('Notification failed!', options);
    };

    // manually do this
    if (options && options.timeout !== false) {
      setTimeout(note.close.bind(note), options.timeout as number);
    }

    return note;
  }
}
