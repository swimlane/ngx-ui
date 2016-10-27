import { Injectable, ComponentRef, EventEmitter } from '@angular/core';
import { InjectionService, id } from '../../utils';
import { NotificationType } from './notification.type';
import { NotificationContainerComponent } from './notification-container.component';

@Injectable()
export class NotificationService {

  static defaults = {
    timeout: 2000,
    rateLimit: true,
    pauseOnHover: true,
    type: NotificationType.info,
    showClose: true
  };

  notifications: any[] = [];
  container: ComponentRef<NotificationContainerComponent>;

  constructor(private injectionService: InjectionService) {
  }

  show(options: any) {
    // if container not present, inject it first time
    if(!this.container) this.container = this.injectComponent();

    // apply defaults
    this.transposeDefaults(options);

    // verify flood not happening
    if(options.rateLimit && this.isFlooded(options)) {
      return false;
    }

    // add to stack to render by container
    this.notifications.push(options);
    this.startTimer(options.id);

    return options;
  }

  destroy(id) {
    const idx = this.notifications.findIndex(n => {
      return n.id === id;
    });

    this.notifications.splice(idx, 1);
  }

  destroyAll() {
    this.notifications.splice(0, this.notifications.length);
  }

  pauseTimer(id) {
    let notification = this.notifications.find(n => {
      return n.id === id;
    });

    if(notification) {
      clearTimeout(notification.timer);
    }
  }

  startTimer(id) {
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

  private injectComponent(): ComponentRef<NotificationContainerComponent> {
    return this.injectionService.appendNextToRoot(
      NotificationContainerComponent, {
        notifications: this.notifications
      });
  }

  private isFlooded(newNotification) {
    for(const notification of this.notifications) {
      if(notification.title === newNotification.title &&
         notification.content === newNotification.content &&
         notification.timestamp + 1000 > newNotification.timestamp) {
           return true;
         }
    }

    return false;
  }

  private transposeDefaults(options) {
    const defaults = NotificationService.defaults;

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

  private requestPermission() {
    // todo: for html5
  }

}
