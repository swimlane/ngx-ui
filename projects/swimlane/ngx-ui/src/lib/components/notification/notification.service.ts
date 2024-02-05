import { Injectable, ComponentRef, Inject, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { InjectionService } from '../../services/injection/injection.service';
import { InjectionRegistryService } from '../../services/injection-registry/injection-registry.service';
import { PartialBindings } from '../../services/injection-registry/partial-bindings.interface';

import { NotificationType } from './notification-type.enum';
import { NotificationStyleType } from './notification-style-type.enum';
import { NotificationPermissionType } from './notification-permission-type.enum';
import { NotificationComponent } from './notification.component';
import { NotificationContainerComponent } from './notification-container.component';
import { NotificationOptions } from './notification-options.interface';

/** adding dynamic to suppress `Document` type metadata error  */
/** @dynamic */
@Injectable({
  providedIn: 'root'
})
export class NotificationService extends InjectionRegistryService<NotificationComponent> {
  static readonly limit: number | boolean = 10;
  readonly defaults: NotificationOptions = {
    inputs: {
      timeout: 3000,
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

  create(bindings: Partial<NotificationOptions>): ComponentRef<NotificationComponent> {
    // verify flood not happening
    if (bindings.rateLimit && this.isFlooded(bindings)) {
      return;
    }

    // if limit reached, remove the first one
    const compsByType = this.getByType();

    if (compsByType && (compsByType.length as any) >= NotificationService.limit) {
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
    if (component.instance && component.instance.timeout !== false) {
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
      Notification.requestPermission(/* istanbul ignore next */ status => (this.permission = status));
    }
  }

  assignDefaults(options: Partial<NotificationOptions>): PartialBindings {
    const bindings = super.assignDefaults(options as any);

    if (bindings.inputs && bindings.inputs.timeout === true) {
      bindings.inputs.timeout = this.defaults.inputs.timeout;
    }

    // add a timestamp for flood checks
    bindings.inputs.timestamp = +new Date();
    return bindings;
  }

  injectComponent(type: Type<NotificationContainerComponent>, options: PartialBindings): ComponentRef<any> {
    if (!this.container || !this.document.contains(this.container.location.nativeElement)) {
      this.container = this.injectionService.appendComponent(NotificationContainerComponent);
    }

    return this.injectionService.appendComponent(type, options, this.container);
  }

  createSubscriptions(component: ComponentRef<NotificationComponent>): any {
    const pauseSub: Subscription = component.instance.pause.subscribe(() => {
      this.pauseTimer(component);
    });

    const resumeSub: Subscription = component.instance.resume.subscribe(() => {
      this.startTimer(component);
    });

    const closeSub: Subscription = component.instance.close.subscribe(() => {
      closeSub.unsubscribe();
      resumeSub.unsubscribe();
      pauseSub.unsubscribe();

      this.destroy(component);
    });
  }

  isFlooded(options: Partial<NotificationOptions>): boolean {
    const compsByType = this.getByType();

    for (const notification of compsByType) {
      const instance = notification.instance;

      if (
        instance.title === options.title &&
        instance.body === options.body &&
        instance.timestamp + 1000 > options.timestamp
      ) {
        return true;
      }
    }

    return false;
  }

  showNative(options: Partial<NotificationOptions>): any {
    if (!this.isNativeSupported) return;
    if (!this.permission) this.requestPermissions();
    if (this.permission === NotificationPermissionType.denied) return;

    const note = new Notification(options.title, options);

    note.onerror = () => {
      // eslint-disable-next-line no-console
      console.error('Notification failed!', options);
    };

    // manually do this
    if (options && typeof options.timeout === 'number') {
      setTimeout(note.close.bind(note), options.timeout);
    }

    return note;
  }
}
