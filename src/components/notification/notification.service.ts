import { Injectable, ComponentRef, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { id } from '../../utils';
import { InjectionRegisteryService, InjectionService } from '../../services';

import { NotificationType } from './notification.type';
import { NotificationStyleType } from './notification-style.type';
import { NotificationPermissionType } from './notification-permission.type';
import { NotificationComponent } from './notification.component';
import { NotificationContainerComponent } from './notification-container.component';

@Injectable()
export class NotificationService extends InjectionRegisteryService {

  static limit: number|boolean = 10;

  defaults: any = {
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

  permission: NotificationPermissionType | string;
  type: any = NotificationComponent;
  container: any;

  get isNativeSupported(): boolean {
    return 'Notification' in window;
  }

  constructor(injectionService: InjectionService, @Inject(DOCUMENT) private document: any) {
    super(injectionService);
  }

  create(bindings): any {
    // verify flood not happening
    if(bindings.rateLimit && this.isFlooded(bindings)) {
      return false;
    }

    // if limit reached, remove the first one
    const compsByType = this.getByType();
    if(compsByType && compsByType.length >= NotificationService.limit) {
      this.destroy(compsByType[0]);
    }

    // native notifications need to be invoked
    let component;
    if(bindings.type === NotificationType.native) {
      component = this.showNative(bindings);
    } else {
      component = super.create(bindings);
      this.createSubscriptions(component);
    }

    // start timer for notification
    this.startTimer(component);

    return component;
  }

  startTimer(component): void {
    if(component.instance.timeout !== false) {
      clearTimeout(component.instance.timer);

      component.instance.timer = setTimeout(() => {
        this.destroy(component);
      }, component.instance.timeout);
    }
  }

  pauseTimer(component): void {
    clearTimeout(component.instance.timer);
  }

  requestPermissions(): void {
    if(this.isNativeSupported) {
      Notification.requestPermission(status =>
        this.permission = status);
    }
  }

  assignDefaults(bindings): any {
    bindings = super.assignDefaults(bindings);

    // add a timestamp for flood checks
    bindings.inputs.timestamp = +new Date();

    return bindings;
  }

  injectComponent(type, bindings): ComponentRef<any> {
    if (!this.container || !this.document.contains(this.container.location.nativeElement)) {
      this.container = this.injectionService.appendComponent(
        NotificationContainerComponent);
    }

    return this.injectionService.appendComponent(type, bindings, this.container);
  }

  createSubscriptions(component): any {
    let pauseSub;
    let resumeSub;
    let closeSub;

    const kill = () => {
      if(closeSub) closeSub.unsubscribe();
      if(resumeSub) resumeSub.unsubscribe();
      if(pauseSub) pauseSub.unsubscribe();

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

  isFlooded(newNotification): boolean {
    const compsByType = this.getByType();

    for(const notification of compsByType) {
      const instance = notification.instance;

      if(instance.title === newNotification.title &&
         instance.body === newNotification.body &&
         instance.timestamp + 1000 > newNotification.timestamp) {
           return true;
      }
    }

    return false;
  }

  showNative(options): any {
    if(!this.isNativeSupported) return;
    if(!this.permission) this.requestPermissions();
    if(this.permission === NotificationPermissionType.denied) return;

    const note = new Notification(options.title, options);

    note.onerror = () => {
      console.error('Notification failed!', options);
    };

    // manually do this
    if(options && options.timeout !== false) {
      setTimeout(note.close.bind(note), options.timeout);
    }

    return note;
  }

}
