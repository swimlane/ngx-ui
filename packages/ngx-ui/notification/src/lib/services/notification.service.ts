import { DOCUMENT } from '@angular/common';
import { ComponentRef, Inject, Injectable, Type } from '@angular/core';
import type { PartialBindings } from '@swimlane/ngx-ui/injection';
import {
  InjectionRegistryService,
  InjectionService,
} from '@swimlane/ngx-ui/injection';
import { Subscription, timer } from 'rxjs';
import {
  NotificationPermissionType,
  NotificationStyleType,
  NotificationType,
} from '../enums';
import { NotificationOptions } from '../interfaces';
import { NotificationContainerComponent } from '../notification-container/notification-container.component';
import { NotificationComponent } from '../notification.component';

/** @dynamic */
@Injectable()
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
      sound: false,
    },
  };

  permission?: NotificationPermission;
  container?: ComponentRef<NotificationContainerComponent>;
  type = NotificationComponent;

  get isNativeSupported(): boolean {
    return 'Notification' in window;
  }

  constructor(
    readonly injectionService: InjectionService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    super(injectionService);
  }

  create(
    bindings: Partial<NotificationOptions>
  ): ComponentRef<NotificationComponent> {
    // verify flood not happening
    if (bindings.rateLimit && this.isFlooded(bindings)) {
      return null as any;
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
    if (component.instance && component.instance.timeout !== false) {
      this.pauseTimer(component);
      component.instance.timerSubscription = timer(
        component.instance.timeout
      ).subscribe(() => {
        this.destroy(component);
      });
    }
  }

  pauseTimer(component: ComponentRef<NotificationComponent>): void {
    if (component.instance.timerSubscription) {
      component.instance.timerSubscription.unsubscribe();
    }
  }

  requestPermissions(): void {
    if (this.isNativeSupported) {
      Notification.requestPermission(
        /* istanbul ignore next */ (status) => (this.permission = status)
      );
    }
  }

  assignDefaults(options: Partial<NotificationOptions>): PartialBindings {
    const bindings = super.assignDefaults(options as any);

    if (bindings.inputs && bindings.inputs.timeout === true) {
      bindings.inputs.timeout = this.defaults.inputs!.timeout;
    }

    // add a timestamp for flood checks
    bindings.inputs!.timestamp = +new Date();
    return bindings;
  }

  injectComponent(
    type: Type<NotificationComponent>,
    options: PartialBindings
  ): ComponentRef<NotificationComponent> {
    if (
      !this.container ||
      !this.document.contains(this.container.location.nativeElement)
    ) {
      this.container = this.injectionService.appendComponent(
        NotificationContainerComponent
      );
    }

    return this.injectionService.appendComponent(type, options, this.container);
  }

  createSubscriptions(component: ComponentRef<NotificationComponent>): any {
    let pauseSub: Subscription;
    let resumeSub: Subscription;
    let closeSub: Subscription;

    const kill = () => {
      closeSub.unsubscribe();
      resumeSub.unsubscribe();
      pauseSub.unsubscribe();

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

  isFlooded(options: Partial<NotificationOptions>): boolean {
    const compsByType = this.getByType();

    if (compsByType) {
      for (const notification of compsByType) {
        const instance = notification.instance;

        if (
          instance.title === options.title &&
          instance.body === options.body &&
          instance.timestamp &&
          options.timestamp &&
          instance.timestamp + 1000 > options.timestamp
        ) {
          return true;
        }
      }
    }

    return false;
  }

  showNative(options: Partial<NotificationOptions>): any {
    if (!this.isNativeSupported) return;
    if (!this.permission) this.requestPermissions();
    if (this.permission === NotificationPermissionType.denied) return;

    const note = new Notification(options.title!, options);

    note.onerror = () => {
      console.error('Notification failed!', options);
    };

    // manually do this
    if (options && typeof options.timeout === 'number') {
      timer(options.timeout).subscribe(note.close.bind(note));
    }

    return note;
  }
}
