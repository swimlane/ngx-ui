import { Injectable, ComponentRef, EventEmitter } from '@angular/core';
import { InjectionService, id } from '../../utils';

import { NotificationOptions } from './notification-options';
import { NotificationType } from './notification.type';
import { NotificationStyleType } from './notification-style.type';
import { NotificationPermissionType } from './notification-permission.type';
import { NotificationContainerComponent } from './notification-container.component';

@Injectable()
export class NotificationService {

  static limit: number|boolean = 10;

  static defaults: NotificationOptions = {
    timeout: 2000,
    rateLimit: true,
    pauseOnHover: true,
    type: NotificationType.html,
    styleType: NotificationStyleType.info,
    showClose: true,
    sound: false
  };

  permission: NotificationPermissionType;
  notifications: NotificationOptions[] = [];
  container: ComponentRef<NotificationContainerComponent>;

  get isNativeSupported(): boolean {
    return 'Notification' in window;
  }

  constructor(private injectionService: InjectionService) {
  }

  show(options: NotificationOptions): NotificationOptions {
    // if container not present, inject it first time
    if(!this.container) this.container = this.injectComponent();

    // apply defaults
    this.transposeDefaults(options);

    // verify flood not happening
    if(options.rateLimit && this.isFlooded(options)) {
      return false;
    }

    // if limit reached, remove the first one
    if(this.notifications.length >= NotificationService.limit) {
      this.notifications.splice(0, 1);
    }

    // add to stack to render by container
    this.notifications.push(options);

    // native notifications need to be invoked
    if(options.type === NotificationType.native) {
      this.showNative(options);
    }

    // start timer for notification
    this.startTimer(options.id);

    return options;
  }

  destroy(id): void {
    const idx = this.notifications.findIndex(n => {
      return n.id === id;
    });

    this.notifications.splice(idx, 1);
  }

  destroyAll(): void {
    this.notifications.splice(0, this.notifications.length);
  }

  pauseTimer(id): void {
    let notification = this.notifications.find(n => {
      return n.id === id;
    });

    if(notification) {
      clearTimeout(notification.timer);
    }
  }

  startTimer(id): void {
    let notification = this.notifications.find(n => {
      return n.id === id;
    });

    if(notification && notification.timeout !== false) {
      clearTimeout(notification.timer);
      notification.timer = setTimeout(() => {
        this.destroy(id);
      }, notification.timeout);
    }
  }

  requestPermissions(): void {
    if(this.isNativeSupported) {
      Notification.requestPermission(status =>
        this.permission = status);
    }
  }

  private injectComponent(): ComponentRef<NotificationContainerComponent> {
    return this.injectionService.appendNextToRoot(
      NotificationContainerComponent, {
        notifications: this.notifications
      });
  }

  private isFlooded(newNotification): boolean {
    for(const notification of this.notifications) {
      if(notification.title === newNotification.title &&
         notification.body === newNotification.body &&
         notification.timestamp + 1000 > newNotification.timestamp) {
           return true;
         }
    }

    return false;
  }

  private transposeDefaults(options): any {
    const defaults = NotificationService.defaults;

    // transpose the defaults onto the object passed
    for(const def in defaults) {
      if(!options.hasOwnProperty(def)) {
        options[def] = defaults[def];
      }
    }

    // create id
    options.id = id();

    // add a timestamp for flood checks
    options.timestamp = +new Date();

    return options;
  }

  private showNative(options): any {
    if(!this.isNativeSupported) return;
    if(!this.permission) this.requestPermissions();
    if(this.permission === NotificationPermissionType.denied) return;

    const note = new Notification(options.title, options);

    note.onerror = () => {
      console.error('Notification failed!', options);
    };

    note.close = () => {
      // need to update our running list it was removed
      this.destroy(options.id);
    };

    // manually do this
    if(options && options.timeout !== false) {
      setTimeout(note.close.bind(note), options.timeout);
    }

    return note;
  }

}
