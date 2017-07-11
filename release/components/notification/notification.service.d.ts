import { ComponentRef } from '@angular/core';
import { InjectionRegisteryService, InjectionService } from '../../services';
import { NotificationPermissionType } from './notification-permission.type';
export declare class NotificationService extends InjectionRegisteryService {
    private document;
    static limit: number | boolean;
    defaults: any;
    permission: NotificationPermissionType | string;
    type: any;
    container: any;
    readonly isNativeSupported: boolean;
    constructor(injectionService: InjectionService, document: any);
    create(bindings: any): any;
    startTimer(component: any): void;
    pauseTimer(component: any): void;
    requestPermissions(): void;
    assignDefaults(bindings: any): any;
    injectComponent(type: any, bindings: any): ComponentRef<any>;
    createSubscriptions(component: any): any;
    isFlooded(newNotification: any): boolean;
    showNative(options: any): any;
}
