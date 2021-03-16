import { Type } from '@angular/core';
import type { HotkeyOptions } from '../models';
import { HotkeysFactoryService } from '../services';

export function Hotkey(
  key: string,
  description: string,
  options?: Partial<Omit<HotkeyOptions, 'zone'>>
): PropertyDecorator {
  return (target: { ngOnInit?: () => void; ngOnDestroy?: () => void }, propertyKey) => {
    const oldInit = target.ngOnInit;
    target.ngOnInit = function () {
      if (oldInit) oldInit.bind(this)();

      HotkeysFactoryService.service.add(key, {
        callback: () => {
          (((target as unknown) as Record<string, unknown>)[propertyKey as string] as Function).bind(this)();
        },
        description,
        component: this as Type<unknown>,
        ...options
      });
    };

    const oldDestroy = target.ngOnDestroy;
    target.ngOnDestroy = function () {
      if (oldDestroy) oldDestroy.bind(this)();
      HotkeysFactoryService.service.deregister(this as Type<unknown>);
    };
  };
}
